import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Eye, Type, Heart } from 'lucide-react';
import { TextSize } from '../types';

export const Header: React.FC = () => {
  const { preferences, setTextSize, toggleHighContrast, savedPlaceIds, setActiveTab } = useApp();

  const cycleTextSize = () => {
    const sizes: TextSize[] = ['normal', 'large', 'huge'];
    const currentIndex = sizes.indexOf(preferences.textSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    setTextSize(nextSize);
  };

  const getTextSizeLabel = () => {
    switch (preferences.textSize) {
      case 'huge':
        return 'Chữ: Cực lớn (A++)';
      case 'large':
        return 'Chữ: Lớn (A+)';
      default:
        return 'Chữ: Vừa (A)';
    }
  };

  return (
    <header
      id="app-header"
      className={`sticky top-0 z-30 transition-colors shadow-sm ${
        preferences.highContrast
          ? 'bg-black text-white border-b-2 border-yellow-400'
          : 'bg-emerald-800 text-white'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          id="btn-brand-home"
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
          aria-label="Về trang chủ TrailQuest"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black shadow-inner">
            <Compass className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-wide leading-none flex items-center gap-1.5">
              TrailQuest
              <span className="text-xs bg-emerald-600/80 text-amber-200 font-semibold px-2 py-0.5 rounded-full border border-emerald-500">
                Thực Dụng
              </span>
            </h1>
            <p className="text-xs text-emerald-100/90 font-medium mt-0.5">
              Đường Mòn & Điểm Ngắm Cảnh Dễ Đi
            </p>
          </div>
        </button>

        {/* Quick Accessibility Actions */}
        <div className="flex items-center gap-2">
          {/* Font Size Quick Toggle */}
          <button
            id="btn-quick-text-size"
            onClick={cycleTextSize}
            className={`min-h-[44px] px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              preferences.highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500/50'
            }`}
            title="Nhấn để đổi cỡ chữ to hơn"
            aria-label={getTextSizeLabel()}
          >
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">{getTextSizeLabel()}</span>
            <span className="sm:hidden font-black">
              {preferences.textSize === 'huge' ? 'A++' : preferences.textSize === 'large' ? 'A+' : 'A'}
            </span>
          </button>

          {/* High Contrast Mode Quick Toggle */}
          <button
            id="btn-quick-contrast"
            onClick={toggleHighContrast}
            className={`min-h-[44px] min-w-[44px] p-2 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 ${
              preferences.highContrast
                ? 'bg-yellow-400 text-black font-black'
                : 'bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500/50'
            }`}
            title="Đổi chế độ tương phản cao cho người mắt yếu"
            aria-label="Đổi chế độ tương phản cao"
          >
            <Eye className="w-5 h-5" />
          </button>

          {/* Quick link to Saved count */}
          <button
            id="btn-quick-saved"
            onClick={() => setActiveTab('saved')}
            className="min-h-[44px] px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold flex items-center gap-1.5 transition-all active:scale-95"
            title="Xem danh sách muốn đi"
          >
            <Heart className="w-4 h-4 fill-emerald-950" />
            <span className="text-sm font-black">{savedPlaceIds.length}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
