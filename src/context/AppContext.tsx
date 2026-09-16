import React, { createContext, useContext, useState, useEffect } from 'react';
import { Place, Review, AppPreferences, TextSize, CategoryType } from '../types';
import { INITIAL_PLACES, INITIAL_REVIEWS } from '../data/mockPlaces';
import { calculateDistance } from '../utils/speech';

interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  isAvailable: boolean;
  loading: boolean;
  errorMessage?: string;
}

interface AppContextType {
  places: Place[];
  savedPlaceIds: string[];
  reviews: Review[];
  preferences: AppPreferences;
  userLocation: UserLocation;
  searchQuery: string;
  selectedCategory: CategoryType;
  difficultyFilter: 'all' | 'de' | 'trung_binh' | 'kho';
  activePlace: Place | null;
  reviewingPlace: Place | null;
  activeTab: 'explore' | 'map' | 'saved' | 'settings';
  toastMessage: string | null;
  
  // Actions
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: CategoryType) => void;
  setDifficultyFilter: (diff: 'all' | 'de' | 'trung_binh' | 'kho') => void;
  setActivePlace: (place: Place | null) => void;
  setReviewingPlace: (place: Place | null) => void;
  setActiveTab: (tab: 'explore' | 'map' | 'saved' | 'settings') => void;
  toggleSavePlace: (placeId: string) => void;
  toggleOfflineCache: (placeId: string) => void;
  addReview: (placeId: string, rating: number, comment: string, photo?: string, authorName?: string) => void;
  requestUserLocation: () => void;
  setTextSize: (size: TextSize) => void;
  toggleHighContrast: () => void;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PREF_KEY = 'trailquest_preferences_v1';
const SAVED_KEY = 'trailquest_saved_places_v1';
const REVIEWS_KEY = 'trailquest_user_reviews_v1';
const OFFLINE_KEY = 'trailquest_offline_cache_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Preferences
  const [preferences, setPreferences] = useState<AppPreferences>(() => {
    try {
      const saved = localStorage.getItem(PREF_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { textSize: 'normal', highContrast: false, voiceSpeed: 1.0 };
  });

  // Saved list ("Muốn đi")
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['place-1', 'place-2']; // Pre-populate 2 favorites for easy testing
  });

  // Offline cached place IDs
  const [offlineCachedIds, setOfflineCachedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(OFFLINE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['place-1'];
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_REVIEWS];
      }
    } catch {
      // ignore
    }
    return INITIAL_REVIEWS;
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'de' | 'trung_binh' | 'kho'>('all');

  // Navigation states
  const [activeTab, setActiveTab] = useState<'explore' | 'map' | 'saved' | 'settings'>('explore');
  const [activePlace, setActivePlace] = useState<Place | null>(null);
  const [reviewingPlace, setReviewingPlace] = useState<Place | null>(null);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User location
  const [userLocation, setUserLocation] = useState<UserLocation>({
    latitude: 10.7769, // Default to TP.HCM coordinates for distance reference if GPS off
    longitude: 106.7009,
    isAvailable: false,
    loading: false
  });

  // Save preferences
  useEffect(() => {
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(preferences));
    } catch {
      // ignore
    }
  }, [preferences]);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(savedPlaceIds));
    } catch {
      // ignore
    }
  }, [savedPlaceIds]);

  // Save offline cache
  useEffect(() => {
    try {
      localStorage.setItem(OFFLINE_KEY, JSON.stringify(offlineCachedIds));
    } catch {
      // ignore
    }
  }, [offlineCachedIds]);

  // Auto-hide toast after 4s
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Request actual user location
  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setUserLocation(prev => ({
        ...prev,
        loading: false,
        errorMessage: 'Thiết bị không hỗ trợ định vị GPS'
      }));
      showToast('Thiết bị không hỗ trợ định vị GPS');
      return;
    }

    setUserLocation(prev => ({ ...prev, loading: true, errorMessage: undefined }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          isAvailable: true,
          loading: false
        });
        showToast('Đã xác định vị trí của bạn thành công!');
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setUserLocation(prev => ({
          ...prev,
          loading: false,
          errorMessage: 'Chưa thể lấy vị trí. Đang dùng vị trí ước tính.'
        }));
        showToast('Chưa thể lấy GPS. Vui lòng cho phép quyền định vị');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Toggle Save to "Muốn đi"
  const toggleSavePlace = (placeId: string) => {
    const isSaved = savedPlaceIds.includes(placeId);
    let nextSaved: string[];
    if (isSaved) {
      nextSaved = savedPlaceIds.filter(id => id !== placeId);
      showToast('Đã xóa khỏi danh sách Muốn Đi');
    } else {
      nextSaved = [...savedPlaceIds, placeId];
      showToast('Đã lưu vào danh sách Muốn Đi ⭐');
    }
    setSavedPlaceIds(nextSaved);
  };

  // Toggle Offline caching
  const toggleOfflineCache = (placeId: string) => {
    const isCached = offlineCachedIds.includes(placeId);
    let next: string[];
    if (isCached) {
      next = offlineCachedIds.filter(id => id !== placeId);
      showToast('Đã xóa gói ngoại tuyến địa điểm này');
    } else {
      next = [...offlineCachedIds, placeId];
      showToast('Đã tải và lưu trữ thông tin ngoại tuyến! Có thể xem khi mất sóng');
    }
    setOfflineCachedIds(next);
  };

  // Add review
  const addReview = (
    placeId: string,
    rating: number,
    comment: string,
    photo?: string,
    authorName?: string
  ) => {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}`;

    const newRev: Review = {
      id: 'rev-user-' + Date.now(),
      placeId,
      userName: authorName?.trim() || 'Người dùng TrailQuest',
      userAgeGroup: 'Du khách thực tế',
      rating,
      date: dateStr,
      comment: comment.trim(),
      photos: photo ? [photo] : undefined,
      helpfulCount: 0
    };

    const nextReviews = [newRev, ...reviews];
    setReviews(nextReviews);
    try {
      const userOnly = nextReviews.filter(r => r.id.startsWith('rev-user-'));
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(userOnly));
    } catch {
      // ignore
    }
    showToast('Cảm ơn bạn! Đã gửi đánh giá thành công.');
  };

  const setTextSize = (size: TextSize) => {
    setPreferences(prev => ({ ...prev, textSize: size }));
  };

  const toggleHighContrast = () => {
    setPreferences(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  // Enhance places with dynamic distance calculation and offline status
  const placesWithMeta: Place[] = INITIAL_PLACES.map(p => {
    const dist = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      p.latitude,
      p.longitude
    );
    return {
      ...p,
      distanceFromUser: dist,
      isOfflineSaved: offlineCachedIds.includes(p.id)
    };
  });

  return (
    <AppContext.Provider
      value={{
        places: placesWithMeta,
        savedPlaceIds,
        reviews,
        preferences,
        userLocation,
        searchQuery,
        selectedCategory,
        difficultyFilter,
        activePlace,
        reviewingPlace,
        activeTab,
        toastMessage,
        setSearchQuery,
        setSelectedCategory,
        setDifficultyFilter,
        setActivePlace,
        setReviewingPlace,
        setActiveTab,
        toggleSavePlace,
        toggleOfflineCache,
        addReview,
        requestUserLocation,
        setTextSize,
        toggleHighContrast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
