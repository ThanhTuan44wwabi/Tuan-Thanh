import React, { useState } from 'react';
import { Place } from '../types';
import { useApp } from '../context/AppContext';
import { X, Star, Mic, Camera, Check, Smile, Sparkles } from 'lucide-react';
import { startVoiceRecognition, isSpeechRecognitionSupported } from '../utils/speech';

interface ReviewModalProps {
  place: Place;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ place, onClose }) => {
  const { addReview, showToast } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Người cao tuổi (>60t)');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const voiceSupported = isSpeechRecognitionSupported();

  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    if (!voiceSupported) {
      showToast('Trình duyệt chưa hỗ trợ nhập bằng giọng nói');
      return;
    }

    setIsRecording(true);
    startVoiceRecognition(
      (transcript, isFinal) => {
        setComment((prev) => (prev ? prev + ' ' + transcript : transcript));
        if (isFinal) {
          setIsRecording(false);
        }
      },
      (err) => {
        setIsRecording(false);
        showToast(err);
      },
      () => {
        setIsRecording(false);
      }
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Vui lòng viết vài dòng cảm nhận của bạn');
      return;
    }

    const nameToUse = userName.trim()
      ? `${userName.trim()} (${userRole})`
      : `Bác du khách (${userRole})`;

    addReview(place.id, rating, comment, photoPreview || undefined, nameToUse);
    onClose();
  };

  return (
    <div
      id="review-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        id="review-modal-box"
        className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-300 transition-all"
      >
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 md:p-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black">Viết Đánh Giá Nhanh</h2>
            <p className="text-sm text-emerald-100 font-medium mt-0.5 line-clamp-1">
              {place.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/80 hover:text-white rounded-xl bg-emerald-900/60"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 3 Simple Steps Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-5">
          {/* BƯỚC 1: CHỌN SỐ SAO (Thang điểm 1-5 to bản) */}
          <div className="space-y-2">
            <label className="block text-base md:text-lg font-black text-stone-900">
              <span className="text-emerald-700 mr-1.5">Bước 1:</span>
              Bạn thấy địa điểm này thế nào?
            </label>
            <div className="flex items-center justify-between gap-2 p-3 bg-stone-50 rounded-2xl border border-stone-200">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`flex-1 min-h-[56px] rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-90 ${
                    rating >= star
                      ? 'text-amber-500 bg-amber-50 border border-amber-300 scale-105'
                      : 'text-stone-300 hover:text-stone-400 bg-white'
                  }`}
                  aria-label={`${star} sao`}
                >
                  <Star className={`w-8 h-8 ${rating >= star ? 'fill-amber-400' : ''}`} />
                  <span className="text-xs font-black">{star} sao</span>
                </button>
              ))}
            </div>
            <p className="text-center font-bold text-sm text-stone-600">
              {rating === 5 && '🌟 Rất tuyệt vời, rất an toàn và đáng đi!'}
              {rating === 4 && '👍 Tốt, đi lại tương đối thuận tiện'}
              {rating === 3 && '😐 Bình thường, cần chú ý sức khỏe'}
              {rating <= 2 && '⚠️ Cần cẩn thận, hơi khó đi cho người già'}
            </p>
          </div>

          {/* BƯỚC 2: VIẾT VÀI DÒNG CẢM NHẬN (Có nút micro giọng nói) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-base md:text-lg font-black text-stone-900">
                <span className="text-emerald-700 mr-1.5">Bước 2:</span>
                Vài dòng chia sẻ thực tế
              </label>
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`min-h-[44px] px-3 py-1.5 rounded-xl text-xs md:text-sm font-black flex items-center gap-1.5 transition-all ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>{isRecording ? 'Đang nghe...' : 'Nói để viết'}</span>
              </button>
            </div>

            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ví dụ: Đường bê tông rất phẳng, có ghế đá nghỉ chân, người lớn tuổi đi rất thoải mái..."
              className="w-full p-3.5 text-base md:text-lg font-medium border-2 border-stone-300 rounded-2xl focus:border-emerald-600 focus:outline-none"
            />
          </div>

          {/* BƯỚC 3: TÊN & CHỤP/ĐÍNH KÈM ẢNH (Tùy chọn) */}
          <div className="space-y-3 pt-1">
            <label className="block text-base md:text-lg font-black text-stone-900">
              <span className="text-emerald-700 mr-1.5">Bước 3:</span>
              Thông tin của bạn (Tùy chọn)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Tên của bạn (Ví dụ: Bác Tuấn)"
                className="p-3 text-base font-medium border border-stone-300 rounded-xl focus:border-emerald-600 focus:outline-none"
              />

              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="p-3 text-base font-semibold border border-stone-300 rounded-xl bg-white focus:border-emerald-600 focus:outline-none"
              >
                <option value="Người cao tuổi (>60 tuổi)">Người cao tuổi (&gt;60 tuổi)</option>
                <option value="Gia đình có người già">Gia đình có người già</option>
                <option value="Du khách yêu thiên nhiên">Du khách tự túc</option>
              </select>
            </div>

            {/* Photo Attachment button */}
            <div className="flex items-center gap-3">
              <label className="cursor-pointer min-h-[48px] px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-stone-800 font-bold text-sm flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-700" />
                <span>Thêm ảnh thực tế</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {photoPreview && (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Xem trước ảnh"
                    className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Button: Gửi đánh giá */}
          <div className="pt-2">
            <button
              id="btn-submit-review"
              type="submit"
              className="w-full min-h-[56px] bg-emerald-700 hover:bg-emerald-800 text-white font-black text-lg md:text-xl rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
            >
              <Check className="w-6 h-6 stroke-[3]" />
              <span>GỬI ĐÁNH GIÁ NGAY</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
