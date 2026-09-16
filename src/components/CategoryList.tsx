import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryType, DifficultyLevel } from '../types';
import { Footprints, Mountain, Waves, Sunset, Compass, Sparkles } from 'lucide-react';

interface CategoryItem {
  type: CategoryType;
  label: string;
  sub: string;
  icon: React.ReactNode;
  accent: string;
}

export const CategoryList: React.FC = () => {
  const { selectedCategory, setSelectedCategory, difficultyFilter, setDifficultyFilter, preferences } = useApp();

  const categories: CategoryItem[] = [
    {
      type: 'all',
      label: 'Tất cả nơi đến',
      sub: 'Xem toàn bộ địa điểm',
      icon: <Compass className="w-8 h-8 stroke-[2.5]" />,
      accent: 'from-emerald-700 to-emerald-900 text-white'
    },
    {
      type: 'dibo',
      label: 'Đường bằng dễ đi',
      sub: 'Phẳng, có ghế nghỉ, êm chân',
      icon: <Footprints className="w-8 h-8 stroke-[2.5]" />,
      accent: 'from-teal-700 to-teal-900 text-white'
    },
    {
      type: 'nui',
      label: 'Núi & Đỉnh núi',
      sub: 'Có cáp treo hoặc xe Jeep',
      icon: <Mountain className="w-8 h-8 stroke-[2.5]" />,
      accent: 'from-amber-700 to-amber-900 text-white'
    },
    {
      type: 'thac',
      label: 'Thác & Suối rừng',
      sub: 'Mát rượi, có thang máy/máng',
      icon: <Waves className="w-8 h-8 stroke-[2.5]" />,
      accent: 'from-cyan-800 to-blue-900 text-white'
    },
    {
      type: 'ngamcanh',
      label: 'Biển & Ngắm cảnh',
      sub: 'Ô tô đưa tận nơi, thoáng mát',
      icon: <Sunset className="w-8 h-8 stroke-[2.5]" />,
      accent: 'from-orange-700 to-rose-900 text-white'
    }
  ];

  return (
    <div id="category-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>Chọn kiểu địa điểm</span>
          <span className="text-xs font-bold text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">
            1 chạm
          </span>
        </h2>
      </div>

      {/* Grid of Large Category Buttons (Senior Friendly, min 85px height) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.type;
          return (
            <button
              key={cat.type}
              id={`cat-btn-${cat.type}`}
              onClick={() => setSelectedCategory(cat.type)}
              className={`min-h-[96px] p-3.5 rounded-2xl text-left flex flex-col justify-between transition-all transform active:scale-95 shadow-sm border-2 ${
                isSelected
                  ? preferences.highContrast
                    ? 'bg-yellow-400 text-black border-white ring-4 ring-yellow-300'
                    : 'bg-emerald-800 text-white border-emerald-600 ring-4 ring-emerald-200 shadow-md'
                  : preferences.highContrast
                  ? 'bg-stone-900 text-white border-stone-700 hover:border-yellow-400'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-400 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`p-2 rounded-xl ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {cat.icon}
                </div>
                {isSelected && (
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block animate-ping" />
                )}
              </div>
              <div className="mt-2">
                <span className="block font-black text-base md:text-lg leading-tight">
                  {cat.label}
                </span>
                <span
                  className={`block text-xs mt-0.5 line-clamp-1 ${
                    isSelected ? 'text-emerald-100' : 'text-stone-500'
                  }`}
                >
                  {cat.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Simple 1-row Difficulty Filter */}
      <div className="pt-2">
        <div className="text-sm font-bold text-stone-600 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Lọc mức độ sức khỏe & đường đi:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Tất cả mức độ' },
            { id: 'de', label: '🟢 Rất dễ đi (Không dốc)' },
            { id: 'trung_binh', label: '🟡 Vừa sức (Dốc nhẹ/bậc đá)' },
            { id: 'kho', label: '🔴 Cần cẩn thận (Có đoạn gồ ghề)' }
          ].map((item) => {
            const isSel = difficultyFilter === item.id;
            return (
              <button
                key={item.id}
                id={`filter-diff-${item.id}`}
                onClick={() => setDifficultyFilter(item.id as any)}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-sm md:text-base font-bold transition-all border-2 ${
                  isSel
                    ? preferences.highContrast
                      ? 'bg-yellow-400 text-black border-black'
                      : 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
