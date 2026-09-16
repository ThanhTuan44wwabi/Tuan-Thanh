import { Place, Review } from '../types';

export const INITIAL_PLACES: Place[] = [
  {
    id: 'place-1',
    name: 'Đồi Chè Cầu Đất & Đường Đi Bộ Rừng Thông',
    category: 'dibo',
    categoryName: 'Đường bằng dễ đi',
    difficulty: 'de',
    difficultyLabel: 'Đường bằng dễ đi (Rất thích hợp cho người lớn tuổi)',
    difficultyColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    locationName: 'Trạm Hành, TP. Đà Lạt, Lâm Đồng',
    estimatedTime: 'Khoảng 30 - 45 phút dạo bộ nhẹ nhàng',
    transport: 'Ô tô, xe du lịch đậu ngay trước cổng, có xe điện hỗ trợ người mỏi chân',
    elevationGain: 'Độ cao 1.650m (Không khí mát mẻ, trong lành)',
    trailLength: '1,8 km (Đường bê tông phẳng, có lan can và ghế nghỉ)',
    safetyAlert: '⚠️ Lưu ý: Buổi sáng sớm và chiều có sương mù se lạnh (khoảng 15°C). Hãy mặc áo ấm kín cổ và mang giày chống trơn khi có sương.',
    safetyAlertLevel: 'caution',
    preparationTips: [
      'Mang theo áo khoác ấm và khăn choàng cổ',
      'Đế giày bằng phẳng, ma sát tốt để tránh trượt trên cỏ ướt sương',
      'Có dịch vụ xe điện (15.000đ/lượt) nếu không muốn đi bộ nhiều',
      'Có nhà vệ sinh sạch sẽ và quán trà/nước ấm ngay cổng'
    ],
    weather: {
      temp: '18°C',
      condition: 'Trời mát, nhiều mây, nắng nhẹ buổi trưa',
      icon: '⛅',
      advice: 'Rất lý tưởng để dạo bộ từ 7h00 - 10h00 sáng'
    },
    contactPhone: '02633838180',
    contactName: 'Ban Quản Lý Du Lịch Cầu Đất Farm',
    latitude: 11.9042,
    longitude: 108.5446,
    description: 'Khu vực đồi chè cổ thụ hơn 100 năm tuổi với thảm xanh trải dài ngút ngàn. Không khí tại đây vô cùng trong lành, mát mẻ quanh năm. Toàn bộ lối đi chính đã được trải bê tông phẳng phiu, độ dốc thoai thoải, hai bên đường có rào chắn an toàn và đặt nhiều băng ghế đá cho người lớn tuổi ngồi ngắm cảnh và nghỉ chân.',
    highlights: [
      'Đường đi bằng phẳng, hoàn toàn không có dốc đứng',
      'Băng ghế đá nghỉ chân cách nhau mỗi 100 mét',
      'Quán trà nóng và bánh mứt atiso ngay lối vào',
      'Xe điện đưa đón tận nơi cho người hạn chế vận động'
    ],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: 'place-2',
    name: 'Khu Di Tích & Đỉnh Núi Bà Đen (Tây Ninh)',
    category: 'nui',
    categoryName: 'Núi & Đỉnh núi',
    difficulty: 'de',
    difficultyLabel: 'Dễ dàng (Đi bằng hệ thống Cáp Treo hiện đại)',
    difficultyColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    locationName: 'Thạnh Tân, TP. Tây Ninh, Tây Ninh',
    estimatedTime: '8 phút cáp treo + 45 phút dạo quanh quảng trường tượng Phật',
    transport: 'Xe 16-45 chỗ đến bãi xe, có thang cuốn & cáp treo Sun World lên thẳng đỉnh',
    elevationGain: 'Độ cao 986m (Nóc nhà Nam Bộ)',
    trailLength: 'Đường dạo bộ bậc đá có tay vịn tại quảng trường đỉnh',
    safetyAlert: '⚠️ Lưu ý: Trên đỉnh gió lớn và nhiệt độ thấp hơn chân núi 5-8 độ C. Không leo các tảng đá tự nhiên ngoài khu vực rào chắn.',
    safetyAlertLevel: 'caution',
    preparationTips: [
      'Nên chuẩn bị áo khoác mỏng hoặc mũ che nắng/gió',
      'Mang giày đi bộ êm chân vì quảng trường rất rộng',
      'Có lối đi riêng cho xe lăn và thang máy tại nhà ga cáp treo',
      'Uống nước đầy đủ, tại ga có phát nước uống miễn phí'
    ],
    weather: {
      temp: '24°C',
      condition: 'Trời quang, gió nhẹ, tầm nhìn xa rất tốt',
      icon: '☀️',
      advice: 'Nên đi buổi sáng từ 8h00 hoặc buổi chiều ngắm hoàng hôn'
    },
    contactPhone: '02763535353',
    contactName: 'Trung Tâm Hỗ Trợ Khách Hàng Sun World Bà Đen',
    latitude: 11.3789,
    longitude: 106.1685,
    description: 'Được mệnh danh là nóc nhà Nam Bộ, hiện nay đỉnh Núi Bà Đen đã được đầu tư hệ thống cáp treo và thang cuốn hiện đại hàng đầu thế giới. Người lớn tuổi có thể ngắm toàn cảnh đồng bằng trù phú mà không cần leo trèo nặng nhọc. Trên đỉnh có Tượng Phật Bà Tây Bổ Đà Sơn bằng đồng uy nghiêm và vườn hoa rực rỡ.',
    highlights: [
      'Cáp treo êm ái, người trên 70 tuổi được ưu tiên hỗ trợ',
      'Thang cuốn và thang máy lên tận chân tượng Phật',
      'Nhiều ghế đá râm mát và nhà vệ sinh tiêu chuẩn 5 sao',
      'Nhà hàng buffet chay thanh tịnh ngay trên đỉnh núi'
    ],
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewCount: 56
  },
  {
    id: 'place-3',
    name: 'Đường Rừng Bằng Vườn Quốc Gia Cúc Phương',
    category: 'dibo',
    categoryName: 'Đường bằng dễ đi',
    difficulty: 'de',
    difficultyLabel: 'Đường bằng dễ đi (Đường dạo bộ sinh thái)',
    difficultyColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    locationName: 'Nho Quan, Ninh Bình',
    estimatedTime: 'Khoảng 40 phút tản bộ dưới bóng cây râm mát',
    transport: 'Xe ô tô đậu tại Trung tâm du khách, đi theo lối mòn lót đá phẳng',
    elevationGain: 'Địa hình bằng phẳng thoai thoải',
    trailLength: '1,2 km vòng quanh vườn thực vật và hồ nước',
    safetyAlert: '⚠️ Lưu ý: Trong rừng có côn trùng và muỗi rừng. Cần xoa thuốc chống côn trùng trước khi bước vào lối đi.',
    safetyAlertLevel: 'caution',
    preparationTips: [
      'Mặc quần dài, áo dài tay vải mỏng thoáng khí',
      'Bôi kem chống côn trùng / thuốc xịt muỗi Remos',
      'Mang theo bình nước uống cá nhân',
      'Có gậy gỗ hỗ trợ phát tại quầy thông tin'
    ],
    weather: {
      temp: '23°C',
      condition: 'Mát mẻ trong bóng râm tán cây cổ thụ',
      icon: '🌳',
      advice: 'Đi vào sáng sớm tiếng chim hót rất êm tai'
    },
    contactPhone: '02293848006',
    contactName: 'Đội Kiểm Lâm & Cứu Hộ Cúc Phương (24/7)',
    latitude: 20.3167,
    longitude: 105.6167,
    description: 'Vườn quốc gia đầu tiên của Việt Nam với thảm thực vật nguyên sinh trù phú. Tuyến đường dạo bộ sinh thái quanh hồ và vườn bách thảo được thiết kế đặc biệt êm chân, không gồ ghề. Cây cổ thụ rợp bóng mát suốt chặng đường, không khí chứa nhiều ion âm rất tốt cho sức khỏe tim mạch và hô hấp người cao tuổi.',
    highlights: [
      'Bóng cây cổ thụ che mát 90% chặng đường',
      'Đường lót gỗ và đá xẻ không lo trơn trượt',
      'Không gian yên tĩnh tuyệt đối, tiếng suối và chim rừng',
      'Hướng dẫn viên địa phương am hiểu thực vật rừng'
    ],
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.7,
    reviewCount: 31
  },
  {
    id: 'place-4',
    name: 'Đỉnh Radar Bán Đảo Sơn Trà & Cây Đa Ngàn Năm',
    category: 'ngamcanh',
    categoryName: 'Biển & Ngắm cảnh',
    difficulty: 'trung_binh',
    difficultyLabel: 'Vừa sức (Đi xe lên đèo, đi bộ ngắn ngắm cảnh)',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-300',
    locationName: 'Quận Sơn Trà, TP. Đà Nẵng',
    estimatedTime: 'Khoảng 30 phút ngắm cảnh biển và rừng',
    transport: 'Ô tô số sàn hoặc xe du lịch (không cho xe tay ga lên dốc)',
    elevationGain: 'Độ cao 693m so với mực nước biển',
    trailLength: '800 mét đường bê tông dốc thoai thoải',
    safetyAlert: '🚨 Chú ý nguy hiểm: Đường đèo có một số khúc cua gắt, cấm tuyệt đối xe máy tay ga. Hãy đi cùng người lái xe ô tô có kinh nghiệm.',
    safetyAlertLevel: 'warning',
    preparationTips: [
      'Đi xe ô tô hoặc thuê xe dịch vụ có tài xế quen đường',
      'Mang mũ rộng vành, kính râm chống chói nắng biển',
      'Không cho khỉ ăn nếu gặp trên đường để giữ an toàn',
      'Có trạm gác kiểm lâm hướng dẫn tận tình ngay chân đèo'
    ],
    weather: {
      temp: '27°C',
      condition: 'Nắng chan hòa, gió biển thổi lồng lộng',
      icon: '🌊',
      advice: 'Ngắm cảnh đẹp nhất lúc 9h sáng hoặc 16h30 chiều'
    },
    contactPhone: '02363848777',
    contactName: 'Ban Quản Lý Bán Đảo Sơn Trà & Cứu Hộ Bờ Biển',
    latitude: 16.1189,
    longitude: 108.2831,
    description: 'Điểm ngắm toàn cảnh vịnh Đà Nẵng và biển Đông từ trên mây. Điểm đến phù hợp để gia đình đưa ông bà, cha mẹ lên hít thở khí trời trong lành. Không cần leo trèo phức tạp, xe đưa đến gần đỉnh ngắm cảnh.',
    highlights: [
      'Toàn cảnh 360 độ ngắm trọn vẹn thành phố và biển xanh',
      'Nhiệt độ trên đỉnh luôn mát hơn trung tâm thành phố 3-4 độ',
      'Không gian tĩnh lặng, thoáng đãng'
    ],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.6,
    reviewCount: 28
  },
  {
    id: 'place-5',
    name: 'Đường Mòn Ven Suối Thác Datanla (Đà Lạt)',
    category: 'thac',
    categoryName: 'Thác & Suối rừng',
    difficulty: 'trung_binh',
    difficultyLabel: 'Vừa sức (Có máng trượt và thang máy nâng)',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-300',
    locationName: 'Đèo Prenn, Phường 3, TP. Đà Lạt',
    estimatedTime: '1 giờ tham quan thác và tản bộ rừng thông',
    transport: 'Đến bãi xe bằng ô tô, xuống thác bằng máng trượt tốc độ tự chỉnh hoặc thang máy',
    elevationGain: 'Chênh lệch độ cao 80m (có cầu thang máy hỗ trợ)',
    trailLength: '1,5 km lối đi lát gạch dọc bờ suối',
    safetyAlert: '⚠️ Lưu ý: Khu vực gần chân thác hơi nước bắn lên làm nền đá bị ẩm trơn. Luôn bám vào tay vịn kim loại hai bên.',
    safetyAlertLevel: 'caution',
    preparationTips: [
      'Chọn đi thang máy hoặc cáp trượt có người điều khiển tốc độ chậm',
      'Đi dép quai hậu hoặc giày thể thao chống trượt nước',
      'Cầm ô dù hoặc áo mưa mỏng để tránh hơi nước thác tạt vào người'
    ],
    weather: {
      temp: '19°C',
      condition: 'Mát lạnh, hơi nước tỏa sảng khoái',
      icon: '💧',
      advice: 'Buổi trưa tại đây rất mát mẻ nhờ bóng thông và thác nước'
    },
    contactPhone: '02633835844',
    contactName: 'Phòng Y Tế & Điều Hành Thác Datanla',
    latitude: 11.9036,
    longitude: 108.4489,
    description: 'Thác nước hùng vĩ nằm giữa rừng thông đại ngàn. Khu du lịch đã trang bị hệ thống máng trượt thế hệ mới và thang máy hiện đại giúp người lớn tuổi xuống tận chân thác chiêm ngưỡng dòng nước bạc trắng xóa mà không phải bước lên hàng trăm bậc dốc.',
    highlights: [
      'Có thang máy xuống tận chân thác cho người lớn tuổi',
      'Cầu gỗ ngắm cảnh có lan can an toàn kiên cố',
      'Quán cà phê ngắm thác có phục vụ trà gừng ấm nóng'
    ],
    images: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.7,
    reviewCount: 39
  },
  {
    id: 'place-6',
    name: 'Đỉnh Núi Langbiang (Tuyến Xe Jeep Lên Đỉnh Radar)',
    category: 'nui',
    categoryName: 'Núi & Đỉnh núi',
    difficulty: 'de',
    difficultyLabel: 'Dễ dàng (Xe Jeep chuyên dụng đưa đón 100%)',
    difficultyColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    locationName: 'Thị trấn Lạc Dương, Huyện Lạc Dương, Lâm Đồng',
    estimatedTime: '15 phút xe Jeep lên đỉnh + 45 phút tản bộ ngắm cảnh',
    transport: 'Xe Jeep U-oát của ban quản lý chở thẳng từ chân núi lên đỉnh',
    elevationGain: 'Độ cao 1.929m (Đỉnh Radar)',
    trailLength: 'Đường trải nhựa phẳng trên đỉnh rộng rãi',
    safetyAlert: '⚠️ Lưu ý: Khi xe Jeep chạy đường dốc uốn lượn, nhớ ngồi vững và bám chắc vào tay cầm xe. Trên đỉnh trời gió mạnh.',
    safetyAlertLevel: 'caution',
    preparationTips: [
      'Nên mặc áo gió có mũ để tránh gió lùa trên đỉnh núi',
      'Có người cao huyết áp nên ngồi ghế phụ cạnh tài xế để êm nhất',
      'Có kính viễn vọng ngắm toàn cảnh hồ Đan Kia và TP. Đà Lạt'
    ],
    weather: {
      temp: '17°C',
      condition: 'Trời nhiều gió, mây bềnh bồng',
      icon: '🏔️',
      advice: 'Thời điểm ngắm mây đẹp nhất từ 8h00 - 11h00'
    },
    contactPhone: '02633839454',
    contactName: 'Đội Xe Jeep & Trạm Điều Hành Langbiang',
    latitude: 12.0461,
    longitude: 108.4389,
    description: 'Được mệnh danh là trái tim của cao nguyên Lâm Viên. Tuyến đường chinh phục đỉnh núi này cực kỳ thuận tiện cho người lớn tuổi vì 100% được di chuyển bằng xe Jeep chuyên dụng do các tài xế địa phương dày dặn kinh nghiệm lái, chỉ việc ngồi ngắm rừng thông reo.',
    highlights: [
      'Xe Jeep đưa đón tận nơi, không cần leo bộ mất sức',
      'Tượng chàng K’lang và nàng H’biang huyền thoại',
      'Quầy bán trà hoa cúc nóng và thuốc thảo mộc cao nguyên'
    ],
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    reviewCount: 65
  },
  {
    id: 'place-7',
    name: 'Đường Mòn Suối Đá & Chùa Hang (Núi Dinh - BR-VT)',
    category: 'thac',
    categoryName: 'Thác & Suối rừng',
    difficulty: 'trung_binh',
    difficultyLabel: 'Vừa sức (Đường bậc đá có bóng mát)',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-300',
    locationName: 'Thị xã Phú Mỹ, Bà Rịa - Vũng Tàu',
    estimatedTime: 'Khoảng 45 phút đi bộ vãn cảnh chùa và suối',
    transport: 'Ô tô vào đến bãi giữ xe Suối Tiên / Suối Đá',
    elevationGain: 'Độ cao khoảng 250m',
    trailLength: '1,5 km theo bậc thang đá rợp bóng cây cổ thụ',
    safetyAlert: '⚠️ Lưu ý an toàn: Vào mùa mưa đá có rêu trơn, các bác cao tuổi nên dùng thêm gậy chống và không đi tắm ở các vũng nước sâu.',
    safetyAlertLevel: 'caution',
    preparationTips: [
      'Mang theo gậy chống (có bán gậy tre 10k ở chân núi)',
      'Giày vải đế bám tốt hoặc giày thể thao',
      'Có quán nước mía và chòi tre nghỉ mát dọc suốt đường đi'
    ],
    weather: {
      temp: '28°C',
      condition: 'Nắng ấm, gió rừng mát rượi',
      icon: '🌿',
      advice: 'Đi từ sáng sớm 7h00 không khí rất thanh tịnh'
    },
    contactPhone: '02543892115',
    contactName: 'Ban Trị Sự Chùa Hang & Bảo Vệ Rừng Núi Dinh',
    latitude: 10.5186,
    longitude: 107.1352,
    description: 'Địa điểm tâm linh và dã ngoại gần Sài Gòn rất được các hội người cao tuổi yêu thích. Lối đi rợp mát bóng tre và tán cây rừng rậm rạp, suối róc rách chảy êm dịu, có nhiều chòi lá để dừng chân uống trà và hít thở không khí trong lành.',
    highlights: [
      'Tiếng suối reo và tiếng chuông chùa an lạc',
      'Nhiều trạm nghỉ chân có nước suối mát lành',
      'Đường đi có bậc đá vững chãi'
    ],
    images: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.5,
    reviewCount: 22
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    placeId: 'place-1',
    userName: 'Bác Nguyễn Văn Hùng',
    userAgeGroup: 'Người lớn tuổi (63 tuổi, Hà Nội)',
    rating: 5,
    date: '12/03/2026',
    comment: 'Tôi đi cùng câu lạc bộ hưu trí. Đường ở đồi chè rất phẳng, không hề mỏi khớp gối. Cứ đi một đoạn lại có ghế đá ngồi ngắm cảnh uống trà nóng. Rất an toàn và dễ đi cho người già!',
    helpfulCount: 18
  },
  {
    id: 'rev-2',
    placeId: 'place-1',
    userName: 'Cô Trần Thị Mai',
    userAgeGroup: 'Gia đình cùng mẹ 68 tuổi',
    rating: 5,
    date: '08/03/2026',
    comment: 'Mẹ tôi chân yếu nên thuê xe điện đưa vào tận điểm đẹp nhất. Không khí buổi sáng trong lành tuyệt vời, mẹ tôi rất vui và khỏe ra nhiều.',
    helpfulCount: 12
  },
  {
    id: 'rev-3',
    placeId: 'place-2',
    userName: 'Bác Lê Hoàng Long',
    userAgeGroup: 'Người cao tuổi (66 tuổi, TP.HCM)',
    rating: 5,
    date: '10/03/2026',
    comment: 'Hệ thống cáp treo và thang máy lên chùa Bà Đen làm rất chu đáo cho người lớn tuổi. Cửa rộng, nhân viên niềm nở dìu đỡ tận tình. Trên đỉnh mát rượi, ngắm tượng Phật linh thiêng.',
    helpfulCount: 25
  },
  {
    id: 'rev-4',
    placeId: 'place-3',
    userName: 'Bác Phạm Hồng Quân',
    userAgeGroup: 'Người lớn tuổi (59 tuổi)',
    rating: 5,
    date: '02/03/2026',
    comment: 'Không khí Cúc Phương nhiều oxy hít thở nhẹ hẳn lồng ngực. Đường dạo bằng phẳng, chỉ cần lưu ý bôi kem chống muỗi trước khi vào rừng là an tâm hoàn toàn.',
    helpfulCount: 9
  }
];
