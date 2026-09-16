import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { Place } from '../types';
import { Navigation, MapPin, LocateFixed, Eye } from 'lucide-react';

export const MapView: React.FC = () => {
  const { places, userLocation, requestUserLocation, setActivePlace, preferences } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(places[0] || null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Vietnam or user location
    const initialLat = userLocation.isAvailable ? userLocation.latitude : 11.9404; // Đà Lạt default
    const initialLng = userLocation.isAvailable ? userLocation.longitude : 108.4583;

    // Create map
    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 8,
      zoomControl: false // We will render senior-friendly large zoom buttons
    });

    mapInstanceRef.current = map;

    // Tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add User location marker if available
    if (userLocation.isAvailable) {
      const userIcon = L.divIcon({
        className: 'user-loc-pin',
        html: `<div style="background-color: #2563eb; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
        icon: userIcon
      })
        .addTo(map)
        .bindPopup('<b>Vị trí của bạn</b>');
      markersRef.current.push(userMarker);
    }

    // Add place markers
    places.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;
      const color =
        place.difficulty === 'de' ? '#059669' : place.difficulty === 'trung_binh' ? '#d97706' : '#dc2626';

      const customIcon = L.divIcon({
        className: 'custom-place-pin',
        html: `
          <div style="background-color: ${color}; color: white; padding: 6px 10px; border-radius: 12px; font-weight: bold; font-size: 13px; border: 2px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 4px; white-space: nowrap;">
            <span>📍</span>
            <span>${place.name.split(' ')[0]} ${place.name.split(' ')[1] || ''}</span>
          </div>
        `,
        iconSize: [120, 36],
        iconAnchor: [60, 18]
      });

      const marker = L.marker([place.latitude, place.longitude], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedPlace(place);
        map.setView([place.latitude, place.longitude], Math.max(map.getZoom(), 11), {
          animate: true
        });
      });

      markersRef.current.push(marker);
    });
  }, [places, userLocation, selectedPlace]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleCenterUser = () => {
    if (userLocation.isAvailable && mapInstanceRef.current) {
      mapInstanceRef.current.setView([userLocation.latitude, userLocation.longitude], 12, {
        animate: true
      });
    } else {
      requestUserLocation();
    }
  };

  return (
    <div id="map-view-page" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900">
            Bản Đồ Địa Điểm Du Lịch
          </h2>
          <p className="text-sm font-semibold text-stone-500">
            Chạm vào điểm đánh dấu trên bản đồ để xem chi tiết
          </p>
        </div>

        {/* Center GPS button */}
        <button
          onClick={handleCenterUser}
          className="min-h-[44px] px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <LocateFixed className="w-4 h-4" />
          <span>Vị trí của tôi</span>
        </button>
      </div>

      {/* Map Container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-stone-300 shadow-md h-[460px] md:h-[520px]">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Senior-Friendly Big Zoom Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-12 h-12 rounded-2xl bg-white text-stone-900 font-black text-2xl shadow-lg border-2 border-stone-300 flex items-center justify-center hover:bg-stone-100 active:scale-95"
            aria-label="Phóng to bản đồ"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-12 h-12 rounded-2xl bg-white text-stone-900 font-black text-2xl shadow-lg border-2 border-stone-300 flex items-center justify-center hover:bg-stone-100 active:scale-95"
            aria-label="Thu nhỏ bản đồ"
          >
            -
          </button>
        </div>

        {/* Selected Place Overlay Card (Bottom) */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 border-2 border-emerald-600 shadow-xl max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <img
              src={selectedPlace.images[0]}
              alt={selectedPlace.name}
              className="w-20 h-20 rounded-xl object-cover shrink-0 hidden sm:block border"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                {selectedPlace.difficultyLabel}
              </span>
              <h3 className="font-black text-base md:text-lg text-stone-900 line-clamp-1">
                {selectedPlace.name}
              </h3>
              <p className="text-xs md:text-sm font-semibold text-stone-500 line-clamp-1">
                {selectedPlace.locationName}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActivePlace(selectedPlace)}
                className="flex-1 sm:flex-none min-h-[46px] px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Xem</span>
              </button>

              <button
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.latitude},${selectedPlace.longitude}`;
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="flex-1 sm:flex-none min-h-[46px] px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Chỉ đường</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
