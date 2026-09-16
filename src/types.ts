export type DifficultyLevel = 'de' | 'trung_binh' | 'kho';

export type CategoryType = 'all' | 'dibo' | 'nui' | 'thac' | 'ngamcanh';

export interface Review {
  id: string;
  placeId: string;
  userName: string;
  userAgeGroup?: string; // e.g. "Người cao tuổi (62 tuổi)", "Gia đình"
  rating: number; // 1-5
  date: string;
  comment: string;
  photos?: string[];
  helpfulCount?: number;
}

export interface Place {
  id: string;
  name: string;
  category: CategoryType;
  categoryName: string;
  difficulty: DifficultyLevel;
  difficultyLabel: string; // e.g. "Đường bằng dễ đi", "Vừa sức", "Dốc cần cẩn thận"
  difficultyColor: string; // Tailwind color class
  locationName: string; // e.g. "Đà Lạt, Lâm Đồng"
  distanceFromUser?: number; // km (calculated dynamically)
  estimatedTime: string; // e.g. "Khoảng 45 phút đi bộ"
  transport: string; // e.g. "Xe ô tô đến tận cổng, sau đó đi bộ đường lót bê tông"
  elevationGain?: string; // e.g. "Độ cao 1.450m"
  trailLength?: string; // e.g. "2,5 km khứ hồi"
  safetyAlert: string; // Critical warning displayed prominently
  safetyAlertLevel: 'warning' | 'caution' | 'info';
  preparationTips: string[]; // e.g. ["Mang giày bata đế bám", "Mang theo 1 chai nước ấm", "Có gậy chống sẽ đỡ mỏi gối"]
  weather: {
    temp: string;
    condition: string;
    icon: string;
    advice: string;
  };
  contactPhone: string; // Hotline/kiểm lâm
  contactName: string; // e.g. "Trạm Quản Lý & Cứu Hộ Núi"
  latitude: number;
  longitude: number;
  description: string;
  highlights: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isOfflineSaved?: boolean;
}

export type TextSize = 'normal' | 'large' | 'huge';

export interface AppPreferences {
  textSize: TextSize;
  highContrast: boolean;
  voiceSpeed: number; // 0.8 - 1.2
}
