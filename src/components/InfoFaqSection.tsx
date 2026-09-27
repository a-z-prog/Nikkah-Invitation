import React from 'react';
import { Car, Gift, Phone, Moon, Compass, Users, CameraOff, AlertCircle } from 'lucide-react';
import { Language, WeddingData } from '../types';
import { FloralDivider, IslamicStarMotif } from './Ornaments';

interface InfoFaqSectionProps {
  data: WeddingData;
  lang: Language;
}

export const InfoFaqSection: React.FC<InfoFaqSectionProps> = ({ data, lang }) => {
  const infoCards = [
    {
      icon: <CameraOff className="w-5 h-5 text-rose-600" />,
      titleBn: 'কনের ছবি ও ভিডিও ধারণ সম্পূর্ণ নিষেধ',
      titleEn: 'Strictly No Photography / Videography of Bride',
      descBn:
        'কনের ব্যক্তিগত পর্দা, ধর্মীয় অনুশাসন ও পরিবারের বিনীত অনুরোধক্রমে অনুষ্ঠানে কনের কোনো ছবি বা ভিডিও ধারণ করা এবং তা সামাজিক মাধ্যমে পোস্ট করা সম্পূর্ণ নিষেধ। পর্দাবান পরিবেশ রক্ষায় আপনাদের আন্তরিক সহযোগিতা কাম্য।',
      descEn:
        'In strict observance of Islamic modesty and family purdah, taking photos or recording videos of the bride or sharing them online is strictly prohibited. Your kind cooperation is deeply appreciated.',
      highlight: true
    },
    {
      icon: <Gift className="w-5 h-5 text-[#A88338]" />,
      titleBn: 'উপহার ও হাদিয়া সংক্রান্ত বিনীত অনুরোধ',
      titleEn: 'Gift & Hadya Policy',
      descBn:
        'রসূলুল্লাহ (ﷺ) বলেছেন: “তোমরা পরস্পর হাদিয়া বিনিময় করো, এতে পারস্পরিক ভালোবাসা বৃদ্ধি পায়।” তবে আপনাদের উপস্থিতি ও আন্তরিক দোয়াই আমাদের কাছে শ্রেষ্ঠ হাদিয়া। কোনো প্রকার বক্সড উপহার না আনার জন্য বিনম্র অনুরোধ রইল।',
      descEn:
        'The Prophet (ﷺ) said: "Give gifts to one another, you will love each other." Your presence and sincere prayers are the greatest gift. We kindly request du\'a only (no boxed gifts).'
    },
    {
      icon: <Moon className="w-5 h-5 text-[#A88338]" />,
      titleBn: 'নামাজ ও অজুখানার সুব্যবস্থা',
      titleEn: 'Prayer & Wudhu Facilities',
      descBn:
        'অনুষ্ঠানের মাঝে আসর, মাগরিব ও এশার নামাজের ওয়াক্তে নারী ও পুরুষ মেহমানদের জন্য পৃথক সুপরিসর অজুখানা এবং জামাতে নামাজের উত্তম ব্যবস্থা থাকবে।',
      descEn:
        'Dedicated clean prayer halls and separate wudhu facilities are available for both brothers and sisters for Asr, Maghrib, and Isha prayers.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#A88338]" />,
      titleBn: 'পারিবারিক শালীনতা ও মেহমানদারি',
      titleEn: 'Modesty & Family Hospitality',
      descBn:
        'ইসলামিক ভাবগাম্ভীর্য ও শালীনতা বজায় রেখে আয়োজিত এই অনুষ্ঠানে নারী ও শিশু অতিথিদের স্বাচ্ছন্দ্যের জন্য পারিবারিক বসার পৃথক সুশৃঙ্খল ব্যবস্থা থাকবে।',
      descEn:
        'In keeping with Islamic adab and hospitality, comfortable segregated and family seating arrangements will be available for peace and convenience.'
    },
    {
      icon: <Car className="w-5 h-5 text-[#A88338]" />,
      titleBn: 'নিরাপদ পার্কিং ও দিকনির্দেশনা',
      titleEn: 'Parking & Venue Assistance',
      descBn:
        'ভেন্যুতে আমন্ত্রিত সম্মানিত অতিথিদের জন্য পর্যাপ্ত ও নিরাপদ ফ্রি ভ্যালেট কার পার্কিং এবং অভ্যর্থনা দলের সার্বক্ষণিক দিকনির্দেশনা থাকবে।',
      descEn:
        'Complimentary secure valet parking and on-ground guest coordinators will be present at the venue to assist with directions and parking.'
    }
  ];

  return (
    <section id="info" className="py-16 sm:py-24 px-4 bg-white relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#13382C]/5 border border-[#C5A059]/30 text-[#A88338] text-[11px] font-semibold uppercase tracking-widest mb-2">
            <IslamicStarMotif className="w-3 h-3 text-[#C5A059]" />
            <span>{lang === 'bn' ? 'সুন্নাহ ও মেহমান নির্দেশিকা' : 'Guest Guide & Sunnah Etiquette'}</span>
            <IslamicStarMotif className="w-3 h-3 text-[#C5A059]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif-bengali text-[#13382C] mt-1">
            {lang === 'bn' ? 'আমন্ত্রিত মেহমানদের জন্য প্রয়োজনীয় তথ্য' : 'Information & Etiquette for Guests'}
          </h2>
          <FloralDivider className="my-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {infoCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border shadow-2xs flex items-start space-x-4 transition-all ${
                card.highlight
                  ? 'bg-rose-50/70 border-rose-200/90 hover:border-rose-300 md:col-span-2'
                  : 'bg-[#FAF9F6] border-stone-200/80 hover:border-[#C5A059]/60'
              }`}
            >
              <div
                className={`p-3 rounded-2xl border shadow-2xs shrink-0 ${
                  card.highlight ? 'bg-white border-rose-200 text-rose-600' : 'bg-white border-stone-200'
                }`}
              >
                {card.icon}
              </div>
              <div>
                <h3
                  className={`text-base font-bold font-serif-bengali mb-1.5 ${
                    card.highlight ? 'text-rose-950' : 'text-[#13382C]'
                  }`}
                >
                  {lang === 'bn' ? card.titleBn : card.titleEn}
                </h3>
                <p
                  className={`text-xs sm:text-[13px] leading-relaxed font-serif-bengali ${
                    card.highlight ? 'text-rose-900 font-medium' : 'text-stone-600'
                  }`}
                >
                  {lang === 'bn' ? card.descBn : card.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Family Contact Section */}
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#13382C] text-white border border-[#C5A059]/40 shadow-xl text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mb-3">
            <Phone className="w-5 h-5 text-[#E8D7B5]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-bengali text-[#E8D7B5]">
            {lang === 'bn' ? 'যেকোনো প্রয়োজনে যোগাযোগ করুন' : 'Need Assistance with Venue or Travel?'}
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto mt-1 mb-6 font-serif-bengali">
            {lang === 'bn'
              ? 'ভেন্যু খুঁজে পেতে, মেহমানদারি বা যেকোনো সহায়তার জন্য পারিবারিক সমন্বয়কদের সাথে নিঃসঙ্কোচে যোগাযোগ করুন।'
              : 'Our family coordinators are at your service for venue directions, timings, and accommodations.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {data.contactPhone1 && (
              <a
                href={`tel:${data.contactPhone1}`}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-[#C5A059]/40 text-xs sm:text-sm font-semibold flex items-center space-x-3 transition-colors text-[#FAF9F6] text-left group"
              >
                <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 group-hover:bg-[#C5A059]/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-[#E8D7B5] uppercase font-bold tracking-wider">
                    {lang === 'bn' ? 'বরপক্ষ (Groom\'s Family)' : 'Groom\'s Family'}
                  </div>
                  <div className="truncate text-white font-medium">{data.contactName1}</div>
                  <div className="text-stone-300 font-mono text-xs">{data.contactPhone1}</div>
                </div>
              </a>
            )}

            {data.contactPhone2 ? (
              <a
                href={`tel:${data.contactPhone2}`}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-[#C5A059]/40 text-xs sm:text-sm font-semibold flex items-center space-x-3 transition-colors text-[#FAF9F6] text-left group"
              >
                <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 group-hover:bg-[#C5A059]/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-[#E8D7B5] uppercase font-bold tracking-wider">
                    {lang === 'bn' ? 'কনেপক্ষ (Bride\'s Family)' : 'Bride\'s Family'}
                  </div>
                  <div className="truncate text-white font-medium">{data.contactName2 || 'Bride\'s Representative'}</div>
                  <div className="text-stone-300 font-mono text-xs">{data.contactPhone2}</div>
                </div>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
