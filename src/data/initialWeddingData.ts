import { WeddingData, BlessingEntry, GalleryPhoto } from '../types';
import groomPhotoDefault from '../assets/images/groom_razin_photo_1790540815819.jpg';

export const initialWeddingData: WeddingData = {
  groomNameBn: 'মাহমুদুল হাসান রাজিন',
  groomNameEn: 'Mahmudul Hasan Razin',
  groomParentsBn: 'মাওলানা আবদুল আজিজ ও মিসেস মরিয়ম বেগম',
  groomParentsEn: 'Maulana Abdul Aziz & Mrs. Mariom Begum',
  groomBioBn: 'অনার্স ৩য় বর্ষের শিক্ষার্থী। বাড়ি: আনিচ বাড়ি, পূর্ব গাটিয়াডেঙ্গা, সাতকানিয়া, চট্টগ্রাম।',
  groomBioEn: 'Honours 3rd year student. Residence: Anis bari, East Gatiadenga, Satkania, Chattogram.',
  groomPhoto: groomPhotoDefault,

  brideNameBn: 'কানাতা',
  brideNameEn: 'Kanata',
  brideParentsBn: '',
  brideParentsEn: '',
  brideBioBn: 'পবিত্র সুন্নাহর ছায়াতলে এক পুণ্যময় জীবনের শুভ সূচনা। শান্তি, পারস্পরিক ভালোবাসা ও বরকতময় দাম্পত্য জীবনের জন্য সবার আন্তরিক দোয়া প্রার্থী।',
  brideBioEn: 'Beginning a righteous journey under the divine shade of Sunnah. Seeking your sincere prayers for peace, love, and barakah.',
  bridePhoto: '',

  monogram: 'R & K',
  weddingDate: '2026-10-10T12:00:00', // User selected date: 10/10/2026, 12:00 PM
  weddingTaglineBn: 'পবিত্র সুন্নতি বন্ধন ও শুভ ওয়ালিমা উপলক্ষে দুটি হৃদয়ের শুভ সূচনা',
  weddingTaglineEn: 'United in Sunnah & Walima celebration under the divine blessings of Allah',
  blessingHeaderBn: 'বিসমিল্লাহির রাহমানির রাহিম',
  blessingHeaderEn: 'In the name of Allah, Most Gracious, Most Merciful',
  blessingVerseBn: '“এবং তাঁর নিদর্শনাবলীর অন্যতম এই যে, তিনি তোমাদের মধ্য হতেই তোমাদের সঙ্গিনী সৃষ্টি করেছেন যাতে তোমরা তাদের নিকট প্রশান্তি লাভ কর এবং তোমাদের মধ্যে পারস্পরিক ভালোবাসা ও সহানুভূতি সৃষ্টি করেছেন।” — সূরা আর-রূম: ২১',
  blessingVerseEn: '“And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.” — Surah Ar-Rum: 21',
  bismillahAr: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  quranVerseAr: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  propheticDuaAr: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
  propheticDuaBn: 'আল্লাহ তোমাদের বরকত দান করুন, তোমাদের উপর রহমত বর্ষণ করুন এবং কল্যাণের সাথে তোমাদের একত্রিত রাখুন।',
  propheticDuaEn: 'May Allah bless you, shower His blessings upon you, and unite you both in goodness.',

  mainVenueBn: 'সাতকানিয়া, চট্টগ্রাম',
  mainVenueEn: 'Satkania',
  mainVenueCityBn: 'চট্টগ্রাম, বাংলাদেশ',
  mainVenueCityEn: 'Chittagong, Bangladesh',

  contactPhone1: '01874753644',
  contactName1: "Maulana Abdul Aziz (Groom's Father)",
  contactPhone2: '',
  contactName2: '',

  events: [
    {
      id: 'walima',
      nameBn: 'ওয়ালিমা ও প্রীতিভোজ',
      nameEn: 'Walima Ceremony',
      dateStr: '2026-10-10',
      timeBn: 'দুপুর ১২:০০ টা (ওয়ালিমা ও প্রীতিভোজ)',
      timeEn: '12:00 PM (Walima Ceremony & Feast)',
      venueNameBn: 'সাতকানিয়া',
      venueNameEn: 'Satkania',
      addressBn: 'আনিচ বাড়ি, পূর্ব গাটিয়াডেঙ্গা, সাতকানিয়া, চট্টগ্রাম',
      addressEn: 'Anis bari, East Gatiadenga, Satkania, Chattogram, Bangladesh',
      mapLink: 'https://www.google.com/maps?q=22.1110825,92.0374952',
      dressCodeBn: 'শালীন সাদা, অফ-হোয়াইট, ক্রিম ও মার্জিত ইসলামিক পোশাক',
      dressCodeEn: 'Modest Elegant White, Cream & Traditional Formal',
      colorScheme: 'emerald',
      descriptionBn: 'রাসূলুল্লাহ (সা.)-এর পবিত্র সুন্নাহ অনুযায়ী ওয়ালিমা ও প্রীতিভোজের আয়োজন। আপনাদের আন্তরিক উপস্থিতি ও দোয়া একান্ত কাম্য। (বিশেষ অনুরোধ: কনের ছবি বা ভিডিও তোলা সম্পূর্ণ নিষেধ)।',
      descriptionEn: 'The blessed Walima feast organized in accordance with the prophetic Sunnah. We warmly invite you to join us with prayers and love. (Special Request: Strictly no photography or videography of the bride).'
    }
  ]
};

export const initialBlessings: BlessingEntry[] = [
  {
    id: '1',
    author: 'Mufti Muhammad Faruq',
    relation: 'Family Elder & Well-wisher',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fee khair. May Allah bless Razin and Kanata with an abundance of peace, affection, and righteous companionship.',
    likes: 28,
    createdAt: '2 days ago',
    avatarBg: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: '2',
    author: 'Afsana Rahman',
    relation: 'Cousin & Friend',
    message: 'MashaAllah TabarakAllah! Sending heartfelt prayers and warmest love for Kanata and brother Razin. May your bond be blessed in this world and Jannah.',
    likes: 35,
    createdAt: 'Yesterday',
    avatarBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: '3',
    author: 'Engr. Tanveer Chowdhury',
    relation: 'Close Friend of Groom',
    message: 'Alhamdulillah! Congratulations dear brother Razin on entering this beautiful Sunnah journey with Kanata. May Allah make both of you the coolness of each other\'s eyes.',
    likes: 22,
    createdAt: 'Today',
    avatarBg: 'bg-teal-100 text-teal-800'
  }
];

export const initialGallery: GalleryPhoto[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    captionBn: 'প্রেমের শুভ সূচনা ও বাগদান পর্ব',
    captionEn: 'The beginning of forever - Engagement',
    tagBn: 'বাগদান',
    tagEn: 'Engagement'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80',
    captionBn: 'আংটি বদলের মিষ্টি মুহূর্ত',
    captionEn: 'Cherished Ring Ceremony',
    tagBn: 'আংটি বদল',
    tagEn: 'Rings'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    captionBn: 'একটি সুন্দর ভবিষ্যতের স্বপ্ন দেখা',
    captionEn: 'Looking forward to a lifetime together',
    tagBn: 'পোর্ট্রেট',
    tagEn: 'Portrait'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    captionBn: 'পবিত্র দোয়া ও বরকতময় স্মৃতিমালা',
    captionEn: 'Moments of blessed du\'a and blessings',
    tagBn: 'দোয়া',
    tagEn: 'Du\'a'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
    captionBn: 'হাসি আর ভালোবাসায় ঘেরা স্মরণীয় দিন',
    captionEn: 'Laughter, joy and golden sunsets',
    tagBn: 'স্মৃতি',
    tagEn: 'Memories'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    captionBn: 'হাতে হাত রেখে চিরদিনের পথচলা',
    captionEn: 'Walking hand in hand forever',
    tagBn: 'পথচলা',
    tagEn: 'Together'
  }
];
