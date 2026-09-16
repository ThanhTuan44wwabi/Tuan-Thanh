import React, { useState, useEffect } from 'react';
import { Place } from '../types';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Volume2,
  Square,
  Navigation,
  PhoneCall,
  CloudSun,
  AlertTriangle,
  Heart,
  Download,
  CheckCircle,
  Share2,
  Star,
  MapPin,
  Clock,
  Car,
  Footprints,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { speakText, stopSpeaking, isSpeechSynthesisSupported } from '../utils/speech';

interface PlaceDetailModalProps {
  place: Place;
  onClose: () => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({ place, onClose }) => {
  const {
    savedPlaceIds,
    toggleSavePlace,
    toggleOfflineCache,
    setReviewingPlace,
    reviews,
    preferences,
    showToast
  } = useApp();

  const isSaved = savedPlaceIds.includes(place.id);
  const isOffline = place.isOfflineSaved;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Stop TTS when closing
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Filter reviews for this place
  const placeReviews = reviews.filter((r) => r.placeId === place.id);

  // TTS Reader
  const handleToggleSpeak = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    if (!isSpeechSynthesisSupported()) {
      showToast('Trình duyệt chưa hỗ trợ đọc to giọng nói');
      return;
    }

    const narrationText = `Địa điểm: ${place.name}. Thuộc danh mục: ${
      place.categoryName
    }. Mức độ đi lại: ${place.difficultyLabel}. ${place.safetyAlert}. Phương tiện: ${
      place.transport
    }. Thời gian đi: ${place.estimatedTime}. Thời tiết: ${place.weather.temp}, ${
      place.weather.condition
    }. ${place.description}. Những điều cần chuẩn bị: ${place.preparationTips.join('. ')}.`;

    setIsPlayingAudio(true);
    speakText(
      narrationText,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => {
        setIsPlayingAudio(false);
        showToast('Có lỗi khi đọc giọng nói');
      }
    );
  };

  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCallEmergency = () => {
    window.location.href = `tel:${place.contactPhone}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: place.name,
          text: `Xem địa điểm an toàn, dễ đi cho cả nhà: ${place.name} - ${place.difficultyLabel}`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${place.name} - ${place.difficultyLabel}. Xem trên TrailQuest: ${window.location.href}`
      );
      showToast('Đã sao chép liên kết địa điểm để gửi Zalo/tin nhắn');
    }
  };

  return (
    <div
      id="place-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex justify-center"
    >
      <div
        id="place-detail-container"
        className={`w-full max-w-3xl min-h-screen my-0 md:my-6 md:rounded-3xl overflow-hidden shadow-2xl transition-colors ${
          preferences.highContrast
            ? 'bg-black text-white border-2 border-yellow-400'
            : 'bg-white text-stone-900'
        }`}
      >
        {/* Top Sticky Navigation Bar (Senior-focused: impossible to miss back button) */}
        <div
          id="detail-top-bar"
          className="sticky top-0 z-30 bg-emerald-800 text-white px-4 py-3 flex items-center justify-between shadow-md"
        >
          <button
            id="btn-back-detail"
            onClick={onClose}
            className="min-h-[48px] px-3.5 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-700 text-white font-black text-base md:text-lg flex items-center gap-2 border border-emerald-600 transition-all active:scale-95"
            aria-label="Quay lại trang chủ"
          >
            <ArrowLeft className="w-6 h-6 stroke-[3]" />
            <span>QUAY LẠI</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Audio Read Button */}
            <button
              id="btn-read-aloud"
              onClick={handleToggleSpeak}
              className={`min-h-[48px] px-3 py-2 rounded-xl font-bold text-sm md:text-base flex items-center gap-1.5 transition-all shadow-sm ${
                isPlayingAudio
                  ? 'bg-amber-400 text-stone-950 animate-pulse'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500'
              }`}
              title="Đọc to toàn bộ thông tin địa điểm này"
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-5 h-5 fill-stone-950" />
                  <span>DỪNG ĐỌC</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5" />
                  <span className="hidden sm:inline">ĐỌC TO THÔNG TIN</span>
                  <span className="sm:hidden">ĐỌC TO</span>
                </>
              )}
            </button>

            {/* Bookmark button */}
            <button
              id="btn-detail-save"
              onClick={() => toggleSavePlace(place.id)}
              className={`min-h-[48px] min-w-[48px] rounded-xl flex items-center justify-center transition-all ${
                isSaved ? 'bg-red-600 text-white' : 'bg-emerald-700 text-white hover:bg-emerald-600'
              }`}
              aria-label={isSaved ? 'Đã lưu vào danh sách' : 'Lưu vào danh sách'}
            >
              <Heart className={`w-6 h-6 ${isSaved ? 'fill-white stroke-white' : ''}`} />
            </button>

            {/* Share button */}
            <button
              id="btn-detail-share"
              onClick={handleShare}
              className="min-h-[48px] min-w-[48px] rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 flex items-center justify-center"
              title="Chia sẻ qua Zalo/tin nhắn"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Image & Gallery */}
        <div className="relative bg-stone-900">
          <div className="aspect-[16/10] w-full overflow-hidden">
            <img
              src={place.images[activeImageIndex] || place.images[0]}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Photo Selector thumbnails if multiple */}
          {place.images.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 overflow-x-auto p-1 bg-stone-950/60 backdrop-blur-md rounded-2xl">
              {place.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt={`Ảnh ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-3 py-1.5 rounded-xl text-sm font-black border shadow-sm ${place.difficultyColor}`}
              >
                {place.difficultyLabel}
              </span>

              <span className="px-3 py-1.5 rounded-xl text-sm font-bold bg-stone-100 text-stone-800 border border-stone-200">
                {place.categoryName}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {place.name}
            </h1>
            <p className="text-base md:text-lg text-stone-600 flex items-center gap-1.5 mt-1 font-semibold">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{place.locationName}</span>
            </p>
          </div>

          {/* BLOCK 1: CRITICAL SAFETY ALERT (Prominent, safety-first) */}
          <div
            id="safety-warning-banner"
            className={`p-4 md:p-5 rounded-2xl border-2 flex items-start gap-3.5 shadow-sm ${
              place.safetyAlertLevel === 'warning'
                ? 'bg-amber-50 border-amber-400 text-amber-950'
                : 'bg-emerald-50 border-emerald-400 text-emerald-950'
            }`}
          >
            <AlertTriangle
              className={`w-8 h-8 shrink-0 ${
                place.safetyAlertLevel === 'warning' ? 'text-amber-600' : 'text-emerald-600'
              }`}
            />
            <div>
              <h2 className="text-lg md:text-xl font-black uppercase tracking-wide">
                Cảnh Báo An Toàn & Lưu Ý Thực Tế
              </h2>
              <p className="text-base md:text-lg font-medium leading-relaxed mt-1">
                {place.safetyAlert}
              </p>
            </div>
          </div>

          {/* BLOCK 2: TWO HUGE ACTION BUTTONS (Dẫn đường & Gọi hỗ trợ) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Direct Google Maps */}
            <button
              id="btn-modal-maps"
              onClick={handleOpenGoogleMaps}
              className="min-h-[58px] p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg flex items-center justify-center gap-3 shadow-md transition-all active:scale-98"
            >
              <Navigation className="w-7 h-7 stroke-[2.5]" />
              <span>MỞ GOOGLE MAPS DẪN ĐƯỜNG</span>
            </button>

            {/* Direct Emergency / Park Ranger Call */}
            <button
              id="btn-modal-call"
              onClick={handleCallEmergency}
              className="min-h-[58px] p-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-lg flex items-center justify-center gap-3 shadow-md transition-all active:scale-98"
            >
              <PhoneCall className="w-7 h-7 stroke-[2.5]" />
              <div className="text-left leading-tight">
                <span className="block text-xs text-emerald-200">GỌI CỨU HỘ / BAN QUẢN LÝ</span>
                <span className="block text-base">{place.contactPhone}</span>
              </div>
            </button>
          </div>

          {/* BLOCK 3: ESSENTIAL INFO MATRIX */}
          <div className="bg-stone-50 rounded-2xl p-4 md:p-5 border border-stone-200 space-y-4">
            <h3 className="text-lg font-black text-stone-900 border-b border-stone-200 pb-2">
              Thông Tin Thiết Yếu Trước Khi Đi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Transport */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-stone-500 block">
                    Phương Tiện & Lối Vào
                  </span>
                  <span className="text-base font-bold text-stone-900">{place.transport}</span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-stone-500 block">
                    Thời Gian Ước Tính
                  </span>
                  <span className="text-base font-bold text-stone-900">{place.estimatedTime}</span>
                </div>
              </div>

              {/* Trail Length / Elevation */}
              {place.trailLength && (
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                    <Footprints className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-stone-500 block">
                      Chiều Dài Tuyến & Đường Đi
                    </span>
                    <span className="text-base font-bold text-stone-900">{place.trailLength}</span>
                  </div>
                </div>
              )}

              {/* Weather Forecast */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-800 shrink-0">
                  <CloudSun className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-stone-500 block">
                    Thời Tiết Hiện Tại ({place.weather.temp})
                  </span>
                  <span className="text-base font-bold text-stone-900">
                    {place.weather.condition}. {place.weather.advice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 4: PREPARATION CHECKLIST (Cần mang gì) */}
          <div className="bg-amber-50/70 rounded-2xl p-4 md:p-5 border border-amber-200 space-y-3">
            <h3 className="text-lg font-black text-amber-950 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-700" />
              <span>Cần Chuẩn Bị Gì Khi Đi (Dành cho người lớn tuổi)</span>
            </h3>
            <ul className="space-y-2">
              {place.preparationTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-base md:text-lg font-semibold text-stone-800">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BLOCK 5: DESCRIPTION & HIGHLIGHTS */}
          <div className="space-y-3">
            <h3 className="text-xl font-black text-stone-900">Mô Tả Thực Tế Về Nơi Này</h3>
            <p className="text-base md:text-lg text-stone-700 leading-relaxed font-normal">
              {place.description}
            </p>

            <div className="pt-2">
              <h4 className="text-base font-bold text-stone-900 mb-2">Điểm thuận tiện nổi bật:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {place.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 bg-stone-100 rounded-xl text-sm md:text-base font-bold text-stone-800 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BLOCK 6: OFFLINE PACKAGE DOWNLOAD (Nhóm 2: Thực dụng) */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-black text-base text-emerald-950 flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-700" />
                <span>Gói Thông Tin Ngoại Tuyến (Offline)</span>
              </h4>
              <p className="text-sm text-emerald-800 mt-0.5">
                Tải về để tra cứu số điện thoại cứu hộ và đường đi ngay cả khi mất sóng trên núi.
              </p>
            </div>
            <button
              id="btn-download-offline"
              onClick={() => toggleOfflineCache(place.id)}
              className={`min-h-[44px] px-4 py-2 rounded-xl font-black text-sm whitespace-nowrap transition-all ${
                isOffline
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
              }`}
            >
              {isOffline ? '✓ ĐÃ LƯU OFFLINE' : 'TẢI XEM OFFLINE'}
            </button>
          </div>

          {/* BLOCK 7: REVIEWS SECTION (Đánh giá thực tế) */}
          <div id="reviews-section" className="pt-4 border-t border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-stone-900 flex items-center gap-2">
                  <span>Đánh Giá Của Người Đã Đi</span>
                  <span className="text-sm font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                    {placeReviews.length} nhận xét
                  </span>
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  Đánh giá thực tế từ người cao tuổi và các gia đình
                </p>
              </div>

              <button
                id="btn-write-review"
                onClick={() => setReviewingPlace(place)}
                className="min-h-[50px] px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
                <span>VIẾT ĐÁNH GIÁ NHANH</span>
              </button>
            </div>

            {/* Review Cards List */}
            <div className="space-y-3">
              {placeReviews.length === 0 ? (
                <div className="p-6 text-center bg-stone-50 rounded-2xl border border-stone-200">
                  <p className="text-stone-500 font-medium">Chưa có đánh giá nào cho nơi này.</p>
                  <p className="text-stone-700 font-bold mt-1">
                    Hãy là người đầu tiên chia sẻ kinh nghiệm cho mọi người!
                  </p>
                </div>
              ) : (
                placeReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-base text-stone-900 block">
                          {rev.userName}
                        </span>
                        {rev.userAgeGroup && (
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md inline-block">
                            {rev.userAgeGroup}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs text-stone-400 font-medium">{rev.date}</span>
                      </div>
                    </div>

                    <p className="text-base text-stone-800 leading-relaxed font-normal">
                      "{rev.comment}"
                    </p>

                    {rev.photos && rev.photos.length > 0 && (
                      <div className="flex gap-2 pt-1">
                        {rev.photos.map((p, i) => (
                          <img
                            key={i}
                            src={p}
                            alt="Ảnh đính kèm"
                            className="w-20 h-20 object-cover rounded-xl border border-stone-300"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Back Button (Always accessible) */}
        <div className="p-4 bg-stone-100 border-t border-stone-200">
          <button
            onClick={onClose}
            className="w-full min-h-[52px] rounded-2xl bg-stone-900 hover:bg-black text-white font-black text-lg flex items-center justify-center gap-2 shadow transition-all active:scale-98"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>ĐÓNG & QUAY VỀ TRANG CHỦ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
