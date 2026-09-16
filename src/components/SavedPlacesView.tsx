import React from 'react';
import { useApp } from '../context/AppContext';
import { PlaceCard } from './PlaceCard';
import { Heart, Compass, Download, ShieldCheck } from 'lucide-react';

export const SavedPlacesView: React.FC = () => {
  const { places, savedPlaceIds, setActiveTab } = useApp();

  const savedPlaces = places.filter((p) => savedPlaceIds.includes(p.id));
  const offlinePlaces = places.filter((p) => p.isOfflineSaved);

  return (
    <div id="saved-places-page" className="space-y-6">
      {/* Title & Stats */}
      <div className="bg-emerald-50 rounded-3xl p-5 md:p-6 border border-emerald-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow">
            <Heart className="w-7 h-7 fill-stone-950" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-stone-900">
              Địa Điểm Muốn Đi Của Bạn
            </h2>
            <p className="text-base font-semibold text-emerald-900 mt-0.5">
              Đã lưu <span className="font-black text-amber-800">{savedPlaces.length}</span> nơi dự
              định đi dã ngoại, ngắm cảnh
            </p>
          </div>
        </div>

        {/* Offline Cache Notice */}
        <div className="mt-4 pt-3 border-t border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-emerald-900">
          <span className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-emerald-700" />
            Đã có {offlinePlaces.length} địa điểm được tải lưu ngoại tuyến (xem khi mất sóng).
          </span>
          <span className="flex items-center gap-1.5 text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Tự động lưu vào máy
          </span>
        </div>
      </div>

      {/* Places List or Empty State */}
      {savedPlaces.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-3xl border-2 border-dashed border-stone-300 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-stone-800">
              Bạn chưa lưu địa điểm nào vào danh sách "Muốn đi"
            </h3>
            <p className="text-base text-stone-500 mt-1 max-w-md mx-auto font-medium">
              Khi xem danh sách địa điểm, bạn hãy nhấn vào biểu tượng Trái Tim để lưu lại chuyến đi
              dự định nhé!
            </p>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="min-h-[50px] px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base rounded-2xl inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Compass className="w-5 h-5" />
            <span>KHÁM PHÁ CÁC ĐỊA ĐIỂM NGAY</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};
