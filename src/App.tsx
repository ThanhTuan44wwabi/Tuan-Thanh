import React, { useMemo } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryList } from './components/CategoryList';
import { PlaceCard } from './components/PlaceCard';
import { MapView } from './components/MapView';
import { SavedPlacesView } from './components/SavedPlacesView';
import { SettingsView } from './components/SettingsView';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { ReviewModal } from './components/ReviewModal';
import { BottomNav } from './components/BottomNav';
import { Sparkles, X, CheckCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    places,
    searchQuery,
    selectedCategory,
    difficultyFilter,
    activeTab,
    activePlace,
    reviewingPlace,
    toastMessage,
    preferences,
    setActivePlace,
    setReviewingPlace,
    setSearchQuery,
    setSelectedCategory,
    setDifficultyFilter
  } = useApp();

  // Filter and sort places
  const filteredPlaces = useMemo(() => {
    return places
      .filter((place) => {
        // Category filter
        if (selectedCategory !== 'all' && place.category !== selectedCategory) {
          return false;
        }

        // Difficulty filter
        if (difficultyFilter !== 'all' && place.difficulty !== difficultyFilter) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = place.name.toLowerCase().includes(q);
          const matchLoc = place.locationName.toLowerCase().includes(q);
          const matchDesc = place.description.toLowerCase().includes(q);
          const matchCat = place.categoryName.toLowerCase().includes(q);
          const matchSafety = place.safetyAlert.toLowerCase().includes(q);
          return matchName || matchLoc || matchDesc || matchCat || matchSafety;
        }

        return true;
      })
      .sort((a, b) => {
        // If distances available, sort closest first
        if (a.distanceFromUser !== undefined && b.distanceFromUser !== undefined) {
          return a.distanceFromUser - b.distanceFromUser;
        }
        return b.rating - a.rating;
      });
  }, [places, selectedCategory, difficultyFilter, searchQuery]);

  // Determine text scale class
  const textScaleClass =
    preferences.textSize === 'huge'
      ? 'text-scale-huge'
      : preferences.textSize === 'large'
      ? 'text-scale-large'
      : 'text-scale-normal';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDifficultyFilter('all');
  };

  const isFiltered =
    searchQuery.trim().length > 0 || selectedCategory !== 'all' || difficultyFilter !== 'all';

  return (
    <div
      id="app-root-shell"
      className={`min-h-screen transition-colors duration-200 ${textScaleClass} ${
        preferences.highContrast
          ? 'bg-neutral-950 text-white'
          : 'bg-stone-50 text-stone-900'
      }`}
    >
      {/* Toast Notification Alert (Accessible, fixed at top) */}
      {toastMessage && (
        <div
          role="alert"
          id="global-toast"
          className="fixed top-16 left-4 right-4 z-50 max-w-lg mx-auto p-4 rounded-2xl bg-stone-900/95 text-white border-2 border-amber-400 shadow-2xl flex items-center justify-between gap-3 animate-fade-in"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-6 h-6 text-amber-400 shrink-0" />
            <span className="font-bold text-base md:text-lg">{toastMessage}</span>
          </div>
          <span className="text-xs text-stone-400 font-semibold uppercase">Đã thực hiện</span>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* View Content depending on active tab */}
      <main className="max-w-4xl mx-auto px-4 pt-4 pb-28 space-y-6">
        {activeTab === 'explore' && (
          <div className="space-y-6">
            {/* Search Bar with Voice */}
            <SearchBar />

            {/* Category Selector with big cards */}
            <CategoryList />

            {/* Section Divider & Results Summary */}
            <div className="pt-2 flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-lg md:text-xl text-stone-900">
                  Danh Sách Điểm Đến ({filteredPlaces.length})
                </h3>
              </div>

              {isFiltered && (
                <button
                  onClick={resetAllFilters}
                  className="min-h-[40px] px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Xóa bộ lọc</span>
                </button>
              )}
            </div>

            {/* Places Grid or Empty State */}
            {filteredPlaces.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border-2 border-stone-200 space-y-4">
                <Info className="w-12 h-12 text-stone-400 mx-auto" />
                <div>
                  <h4 className="text-xl font-black text-stone-800">
                    Không tìm thấy địa điểm nào phù hợp
                  </h4>
                  <p className="text-base text-stone-500 mt-1 max-w-md mx-auto">
                    Bác hãy thử xóa từ khóa tìm kiếm hoặc chọn danh mục "Tất cả nơi đến" nhé!
                  </p>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="min-h-[48px] px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base rounded-2xl inline-flex items-center gap-2 shadow"
                >
                  <span>Xem Lại Tất Cả Địa Điểm</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'map' && <MapView />}

        {activeTab === 'saved' && <SavedPlacesView />}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav />

      {/* Place Detail Modal */}
      {activePlace && (
        <PlaceDetailModal place={activePlace} onClose={() => setActivePlace(null)} />
      )}

      {/* Review Modal */}
      {reviewingPlace && (
        <ReviewModal place={reviewingPlace} onClose={() => setReviewingPlace(null)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
