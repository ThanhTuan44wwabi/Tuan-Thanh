import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Mic, MicOff, X, MapPin, Loader2 } from 'lucide-react';
import { startVoiceRecognition, isSpeechRecognitionSupported } from '../utils/speech';

export const SearchBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    requestUserLocation,
    userLocation,
    preferences,
    showToast
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [voiceHint, setVoiceHint] = useState<string | null>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const voiceSupported = isSpeechRecognitionSupported();

  const handleVoiceSearch = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setVoiceHint(null);
      return;
    }

    if (!voiceSupported) {
      showToast('Trình duyệt chưa hỗ trợ tìm kiếm bằng giọng nói');
      return;
    }

    setIsListening(true);
    setVoiceHint('Đang lắng nghe... Hãy nói tên nơi bạn muốn đến (Ví dụ: "Đồi chè", "Bà Đen")');

    const handle = startVoiceRecognition(
      (transcript, isFinal) => {
        setSearchQuery(transcript);
        if (isFinal) {
          setIsListening(false);
          setVoiceHint(null);
          showToast(`Đã tìm kiếm: "${transcript}"`);
        }
      },
      (error) => {
        setIsListening(false);
        setVoiceHint(null);
        showToast(error);
      },
      () => {
        setIsListening(false);
        setVoiceHint(null);
      }
    );

    recognitionRef.current = handle;
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const quickHints = ['Đồi Chè', 'Bà Đen', 'Cúc Phương', 'Đi bộ dễ'];

  return (
    <div id="search-section" className="w-full space-y-3">
      {/* Voice Status Alert Box if active */}
      {isListening && (
        <div
          id="voice-active-banner"
          className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 flex items-center justify-between animate-pulse shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600"></span>
            </span>
            <span className="text-red-900 font-bold text-base md:text-lg">
              {voiceHint || 'Đang nghe bạn nói...'}
            </span>
          </div>
          <button
            onClick={handleVoiceSearch}
            className="min-h-[44px] px-3.5 py-1.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700"
          >
            Dừng
          </button>
        </div>
      )}

      {/* Main Big Search Input */}
      <div
        className={`relative flex items-center rounded-2xl transition-all shadow-md ${
          preferences.highContrast
            ? 'bg-black border-4 border-yellow-400 text-yellow-300'
            : 'bg-white border-2 border-emerald-600 focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-100'
        }`}
      >
        <div className="pl-4 pr-2 text-emerald-700">
          <Search className="w-7 h-7 stroke-[2.5]" />
        </div>

        <input
          ref={inputRef}
          id="main-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm địa điểm, đỉnh núi, thác nước..."
          className={`w-full py-4 pr-24 text-lg md:text-xl font-medium outline-none bg-transparent placeholder:text-stone-400 ${
            preferences.highContrast ? 'text-white placeholder:text-yellow-200' : 'text-stone-900'
          }`}
          aria-label="Thanh tìm kiếm địa điểm"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {searchQuery && (
            <button
              id="btn-clear-search"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="min-h-[48px] min-w-[48px] flex items-center justify-center text-stone-500 hover:text-stone-800 rounded-xl"
              aria-label="Xóa nội dung tìm kiếm"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {/* Voice Search Mic Button */}
          <button
            id="btn-voice-search"
            onClick={handleVoiceSearch}
            className={`min-h-[50px] min-w-[50px] flex items-center justify-center rounded-xl transition-all ${
              isListening
                ? 'bg-red-600 text-white shadow-lg animate-bounce'
                : preferences.highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
            }`}
            title="Tìm kiếm bằng giọng nói"
            aria-label="Tìm kiếm bằng giọng nói"
          >
            {isListening ? (
              <MicOff className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <Mic className="w-6 h-6 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Prominent "Near Me" Button & Quick Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
        {/* Big "Địa điểm gần tôi" button */}
        <button
          id="btn-near-me"
          onClick={requestUserLocation}
          disabled={userLocation.loading}
          className={`min-h-[52px] px-5 py-3 rounded-2xl font-black text-base md:text-lg flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-98 ${
            preferences.highContrast
              ? 'bg-yellow-400 text-black border-2 border-yellow-300 hover:bg-yellow-300'
              : 'bg-amber-500 hover:bg-amber-600 text-stone-950 border border-amber-600/30'
          }`}
        >
          {userLocation.loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-stone-900" />
          ) : (
            <MapPin className="w-6 h-6 stroke-[2.5] text-stone-950" />
          )}
          <span>{userLocation.isAvailable ? 'ĐÃ ĐỊNH VỊ GẦN BẠN' : 'TÌM ĐỊA ĐIỂM GẦN TÔI NHẤT'}</span>
        </button>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Gợi ý:</span>
          {quickHints.map((hint) => (
            <button
              key={hint}
              onClick={() => setSearchQuery(hint)}
              className="min-h-[40px] px-3 py-1.5 bg-stone-100 hover:bg-emerald-100 text-stone-800 hover:text-emerald-900 rounded-xl text-sm font-bold border border-stone-200 whitespace-nowrap transition-colors"
            >
              {hint}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
