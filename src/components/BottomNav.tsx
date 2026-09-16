import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Map, Heart, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, savedPlaceIds, preferences } = useApp();

  const navItems = [
    {
      id: 'explore' as const,
      label: 'Khám phá',
      sub: 'Tìm kiếm',
      icon: Compass
    },
    {
      id: 'map' as const,
      label: 'Bản đồ',
      sub: 'Gần tôi',
      icon: Map
    },
    {
      id: 'saved' as const,
      label: 'Đã lưu',
      sub: 'Muốn đi',
      badge: savedPlaceIds.length,
      icon: Heart
    },
    {
      id: 'settings' as const,
      label: 'Cài đặt',
      sub: 'Chữ to',
      icon: Settings
    }
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className={`fixed bottom-0 left-0 right-0 z-40 transition-colors border-t-2 shadow-2xl ${
        preferences.highContrast
          ? 'bg-black text-white border-yellow-400'
          : 'bg-white text-stone-700 border-stone-200'
      }`}
    >
      <div className="max-w-4xl mx-auto px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-h-[60px] py-1 px-1 rounded-2xl flex flex-col items-center justify-center relative transition-all active:scale-95 ${
                isActive
                  ? preferences.highContrast
                    ? 'text-yellow-300 font-black'
                    : 'text-emerald-800 font-black'
                  : preferences.highContrast
                  ? 'text-stone-400 font-semibold hover:text-white'
                  : 'text-stone-500 font-bold hover:text-emerald-700'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active pill background */}
              {isActive && (
                <div
                  className={`absolute inset-x-2 inset-y-1 rounded-xl -z-10 ${
                    preferences.highContrast ? 'bg-yellow-400/20' : 'bg-emerald-50'
                  }`}
                />
              )}

              <div className="relative">
                <Icon
                  className={`w-6 h-6 stroke-[2.5] ${
                    isActive ? 'scale-110' : ''
                  } transition-transform`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-3 min-w-[18px] h-[18px] px-1 bg-amber-500 text-stone-950 text-[11px] font-black rounded-full flex items-center justify-center shadow">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-xs md:text-sm tracking-tight mt-1 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
