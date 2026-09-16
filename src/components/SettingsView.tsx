import React from 'react';
import { useApp } from '../context/AppContext';
import { TextSize } from '../types';
import {
  Type,
  Eye,
  PhoneCall,
  ShieldAlert,
  Download,
  Info,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { speakText } from '../utils/speech';

export const SettingsView: React.FC = () => {
  const { preferences, setTextSize, toggleHighContrast, showToast } = useApp();

  const handleTestVoice = () => {
    speakText(
      'Xin chào bác! Đây là âm thanh đọc to của ứng dụng TrailQuest, giúp bác nghe thông tin địa điểm rõ ràng mà không cần đọc chữ nhỏ.'
    );
  };

  const handleClearCache = () => {
    showToast('Đã làm mới dữ liệu ngoại tuyến thành công!');
  };

  return (
    <div id="settings-page" className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-stone-900">
          Cài Đặt & Hỗ Trợ Dễ Đọc
        </h2>
        <p className="text-base text-stone-600 font-medium mt-1">
          Tùy chỉnh cỡ chữ to hơn, chế độ tương phản cao và hướng dẫn an toàn
        </p>
      </div>

      {/* BLOCK 1: FONT SIZE ADJUSTMENT (Quan trọng nhất cho người lớn tuổi) */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border-2 border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
            <Type className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-stone-900">Cỡ Chữ Ứng Dụng</h3>
            <p className="text-sm font-semibold text-stone-500">
              Chọn mức độ phóng to để đọc thoải mái nhất
            </p>
          </div>
        </div>

        {/* 3 Large Font Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {[
            {
              id: 'normal',
              label: 'Vừa (18px)',
              sub: 'Tiêu chuẩn cho mắt sáng',
              sample: 'Chữ kích thước vừa'
            },
            {
              id: 'large',
              label: 'To (21px)',
              sub: 'Rõ ràng, dễ đọc hơn',
              sample: 'Chữ kích thước to'
            },
            {
              id: 'huge',
              label: 'Rất To (24px)',
              sub: 'Tối đa cho người mắt yếu',
              sample: 'Chữ cực to rõ'
            }
          ].map((item) => {
            const isSelected = preferences.textSize === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTextSize(item.id as TextSize)}
                className={`min-h-[96px] p-4 rounded-2xl border-2 text-left flex flex-col justify-between transition-all active:scale-95 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-4 ring-emerald-200'
                    : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">{item.label}</span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </div>
                <span className="text-xs text-stone-500 mt-1">{item.sub}</span>
                <span className="text-base font-bold text-stone-900 mt-2 block border-t pt-1">
                  {item.sample}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BLOCK 2: HIGH CONTRAST & VOICE TEST */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border-2 border-stone-200 shadow-sm space-y-4">
        <h3 className="text-xl font-black text-stone-900">Hiển Thị & Giọng Nói</h3>

        <div className="space-y-4 divide-y divide-stone-100">
          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 mt-1">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base md:text-lg font-black text-stone-900 block">
                  Chế độ Tương Phản Cao
                </span>
                <span className="text-sm text-stone-500 font-medium">
                  Chuyển sang nền tối viền vàng đậm nét, rất dễ nhìn khi ra ngoài trời nắng
                </span>
              </div>
            </div>

            <button
              onClick={toggleHighContrast}
              className={`min-w-[64px] min-h-[38px] rounded-full p-1 transition-colors ${
                preferences.highContrast ? 'bg-yellow-400' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full bg-stone-950 transition-transform ${
                  preferences.highContrast ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Test Voice Reading */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-teal-100 text-teal-900 mt-1">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base md:text-lg font-black text-stone-900 block">
                  Kiểm tra giọng nói đọc to
                </span>
                <span className="text-sm text-stone-500 font-medium">
                  Nghe thử giọng đọc mẫu xem có to rõ không
                </span>
              </div>
            </div>

            <button
              onClick={handleTestVoice}
              className="min-h-[46px] px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm"
            >
              Nghe Thử
            </button>
          </div>
        </div>
      </div>

      {/* BLOCK 3: EMERGENCY RESCUE PHONE NUMBERS (Cứu hộ khẩn cấp) */}
      <div className="bg-red-50 rounded-3xl p-5 md:p-6 border-2 border-red-300 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-600 text-white">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-red-950">Đường Dây Nóng Khẩn Cấp Quốc Gia</h3>
            <p className="text-sm font-semibold text-red-800">
              Nhấn trực tiếp để gọi ngay khi gặp nguy hiểm hoặc cần cấp cứu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href="tel:114"
            className="min-h-[56px] p-3.5 bg-white rounded-2xl border-2 border-red-400 flex items-center justify-between font-black text-red-900 shadow-sm hover:bg-red-100 transition-colors"
          >
            <span>🚒 114 - Cứu nạn, cứu hộ núi rừng</span>
            <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-lg">GỌI NGAY</span>
          </a>

          <a
            href="tel:115"
            className="min-h-[56px] p-3.5 bg-white rounded-2xl border-2 border-red-400 flex items-center justify-between font-black text-red-900 shadow-sm hover:bg-red-100 transition-colors"
          >
            <span>🚑 115 - Cấp cứu y tế 24/7</span>
            <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-lg">GỌI NGAY</span>
          </a>
        </div>
      </div>

      {/* BLOCK 4: SAFETY GUIDELINES FOR SENIORS */}
      <div className="bg-stone-50 rounded-3xl p-5 md:p-6 border border-stone-200 space-y-3">
        <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-emerald-700" />
          <span>5 Nguyên Tắc Vàng Khi Đi Dã Ngoại Cho Người Cao Tuổi</span>
        </h3>
        <ul className="space-y-2.5 text-base font-semibold text-stone-700">
          <li className="flex items-start gap-2">
            <span className="text-emerald-700 font-black">1.</span>
            <span>Luôn đi cùng người thân hoặc bạn bè, tránh đi một mình vào đường vắng.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-700 font-black">2.</span>
            <span>Mang theo thuốc men thường dùng (thuốc huyết áp, tim mạch, dầu gió).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-700 font-black">3.</span>
            <span>Sử dụng gậy chống dã ngoại để trợ lực đầu gối và giữ thăng bằng.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-700 font-black">4.</span>
            <span>Uống từng ngụm nước ấm nhỏ đều đặn, không để khát mới uống.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-700 font-black">5.</span>
            <span>Ưu tiên chọn địa điểm có cáp treo, xe điện hoặc đường bê tông phẳng.</span>
          </li>
        </ul>
      </div>

      {/* App Info & Offline Data */}
      <div className="p-4 text-center text-stone-500 text-sm space-y-2">
        <p className="font-semibold">TrailQuest - Phiên bản 1.0 (MVP Thực Dụng Cho Người Lớn Tuổi)</p>
        <p>Thiết kế theo chuẩn tiếp cận Accessibility WCAG AA, không quảng cáo làm phiền.</p>
        <button
          onClick={handleClearCache}
          className="text-emerald-700 underline font-bold hover:text-emerald-900 inline-flex items-center gap-1"
        >
          <Download className="w-4 h-4" /> Làm mới dữ liệu ngoại tuyến
        </button>
      </div>
    </div>
  );
};
