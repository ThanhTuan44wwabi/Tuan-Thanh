import React from 'react';
import { Place } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, Clock, Heart, Navigation, AlertTriangle, Star, CheckCircle2 } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const { savedPlaceIds, toggleSavePlace, setActivePlace, preferences } = useApp();
  const isSaved = savedPlaceIds.includes(place.id);

  const handleOpenGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      id={`place-card-${place.id}`}
      onClick={() => setActivePlace(place)}
      className={`rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border-2 ${
        preferences.highContrast
          ? 'bg-black text-white border-yellow-400'
          : 'bg-white text-stone-900 border-stone-200 hover:border-emerald-500'
      }`}
    >
      {/* Image & Quick Badges */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-200">
        <img
          src={place.images[0]}
          alt={place.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Difficulty Pill (Top Left) */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-xl text-xs md:text-sm font-black shadow-md border ${place.difficultyColor}`}
          >
            {place.difficulty === 'de'
              ? '🟢 RẤT DỄ ĐI'
              : place.difficulty === 'trung_binh'
              ? '🟡 VỪA SỨC'
              : '🔴 CẦN CẨN THẬN'}
          </span>
        </div>

        {/* Save / Bookmark Button (Top Right, min 48px) */}
        <button
          id={`btn-save-${place.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSavePlace(place.id);
          }}
          className={`absolute top-3 right-3 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-md ${
            isSaved
              ? 'bg-red-600 text-white'
              : 'bg-white/90 text-stone-700 hover:bg-white'
          }`}
          aria-label={isSaved ? 'Bỏ lưu địa điểm này' : 'Lưu vào danh sách muốn đi'}
        >
          <Heart className={`w-6 h-6 ${isSaved ? 'fill-white stroke-white' : 'stroke-stone-700'}`} />
        </button>

        {/* Rating and Distance Badge (Bottom overlay) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs md:text-sm font-bold">
          <div className="bg-stone-900/85 backdrop-blur-sm text-amber-300 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow">
            <Star className="w-4 h-4 fill-amber-300" />
            <span>{place.rating}</span>
            <span className="text-stone-300 font-normal">({place.reviewCount} đánh giá)</span>
          </div>

          {place.distanceFromUser !== undefined && (
            <div className="bg-emerald-900/90 backdrop-blur-sm text-emerald-100 px-3 py-1 rounded-xl flex items-center gap-1 shadow">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Cách bạn ~{place.distanceFromUser} km</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-5 space-y-3.5">
        <div>
          <h3 className="text-xl md:text-2xl font-black leading-snug tracking-tight hover:text-emerald-700 transition-colors">
            {place.name}
          </h3>
          <p className="text-sm md:text-base text-stone-500 flex items-center gap-1.5 mt-1 font-medium">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{place.locationName}</span>
          </p>
        </div>

        {/* Safety Note Alert Snippet */}
        <div
          className={`p-3 rounded-xl border text-sm font-semibold flex items-start gap-2.5 ${
            place.safetyAlertLevel === 'warning'
              ? 'bg-amber-50 text-amber-950 border-amber-300'
              : 'bg-stone-100 text-stone-800 border-stone-200'
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="line-clamp-2 leading-relaxed">{place.safetyAlert}</p>
        </div>

        {/* Essential Key Facts (Time & Transport) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base font-medium">
          <div className="flex items-center gap-2 text-stone-600">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="line-clamp-1">{place.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="line-clamp-1">{place.transport.split(',')[0]}</span>
          </div>
        </div>

        {/* Action Buttons (Large, min 48px touch target) */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            id={`btn-view-detail-${place.id}`}
            onClick={() => setActivePlace(place)}
            className="flex-1 min-h-[50px] px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
          >
            <span>XEM CHI TIẾT & HƯỚNG DẪN</span>
          </button>

          <button
            id={`btn-directions-${place.id}`}
            onClick={handleOpenGoogleMaps}
            className="min-h-[50px] px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-base flex items-center justify-center gap-2 border border-stone-300 transition-all active:scale-98"
            title="Mở chỉ đường bằng Google Maps"
          >
            <Navigation className="w-5 h-5 text-blue-600" />
            <span>Chỉ đường</span>
          </button>
        </div>
      </div>
    </article>
  );
};
