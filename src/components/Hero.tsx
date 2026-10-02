import React from 'react';
import { Calendar, MapPin, ChevronDown, Download, Sparkles } from 'lucide-react';
import { Language, WeddingData } from '../types';
import { Countdown } from './Countdown';

interface HeroProps {
  data: WeddingData;
  lang: Language;
  onOpenCard: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, lang, onOpenCard }) => {
  const dateObj = new Date(data.weddingDate);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = (lang === 'bn' ? data.events?.[0]?.timeBn : data.events?.[0]?.timeEn) || (
    !isNaN(dateObj.getTime())
      ? (lang === 'bn'
          ? 'দুপুর ১২:০০ টা (ওয়ালিমা ও প্রীতিভোজ)'
          : dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' (Walima Feast)')
      : (lang === 'bn' ? 'দুপুর ১২:০০ টা (ওয়ালিমা ও প্রীতিভোজ)' : '12:00 PM (Walima Feast)')
  );

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 bg-[#FAF9F6]">
      {/* Subtle radial warmth background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Sacred Bismillah */}
        <div className="font-arabic text-xl sm:text-2xl text-[#13382C]/85 font-normal tracking-wide mb-3">
          {data.bismillahAr || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
        </div>

        {/* Minimalist Subtitle */}
        <p className="text-xs sm:text-[13px] uppercase tracking-[0.25em] text-[#A88338] font-medium mb-4">
          The Nikkah Ceremony of
        </p>

        {/* Couple Names - Minimalist Luxury Typography */}
        <div className="my-4 sm:my-6 space-y-1.5 sm:space-y-2">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-bengali font-bold text-[#13382C] tracking-tight leading-tight">
            {data.groomNameEn}
          </h1>

          <div className="flex items-center justify-center py-1">
            <span className="font-serif italic text-xl sm:text-2xl text-[#C5A059] font-normal">
              &amp;
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-bengali font-bold text-[#13382C] tracking-tight leading-tight">
            {data.brideNameEn}
          </h1>
        </div>

        {/* Elegant Invitation Line */}
        <p className="text-stone-600 text-xs sm:text-sm font-serif-bengali max-w-md mx-auto italic mt-3 leading-relaxed">
          “With the blessings of our parents, we cordially invite you to share in our joy and celebrate our union.”
        </p>

        {/* Minimalist Date & Venue Lockup */}
        <div className="my-8 py-5 px-6 rounded-2xl bg-white border border-[#C5A059]/25 shadow-2xs max-w-lg mx-auto">
          <div className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            <div className="flex items-center justify-center space-x-2 font-semibold text-[#13382C]">
              <Calendar className="w-4 h-4 text-[#A88338] shrink-0" />
              <span>{formattedDate}</span>
              <span className="text-stone-400 font-normal">·</span>
              <span className="font-medium text-stone-600">{formattedTime}</span>
            </div>

            <div className="flex items-center justify-center space-x-2 text-stone-600">
              <MapPin className="w-4 h-4 text-[#A88338] shrink-0" />
              <span className="font-medium text-stone-800">{data.mainVenueEn}</span>
              <span className="text-stone-400">·</span>
              <span>{data.mainVenueCityEn}</span>
            </div>
          </div>
        </div>

        {/* Prophetic Blessing (Quiet Typography) */}
        <div className="my-6 max-w-md mx-auto">
          <div className="font-arabic text-sm sm:text-base text-[#13382C]/90 leading-relaxed">
            {data.propheticDuaAr || 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ'}
          </div>
          <p className="text-[11px] sm:text-xs text-stone-500 italic mt-1 font-serif-bengali">
            {data.propheticDuaEn || 'May Allah bless you, shower His blessings upon you, and unite you both in goodness.'}
          </p>
        </div>

        {/* Streamlined Minimal Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <a
            href="#events"
            className="px-6 py-2.5 rounded-full bg-[#13382C] hover:bg-[#1B4332] text-[#E8D7B5] font-semibold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all flex items-center space-x-2 border border-[#C5A059]/30"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>View Ceremony Details</span>
          </a>

          <button
            onClick={onOpenCard}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-[#13382C] font-semibold text-xs sm:text-sm border border-stone-200 hover:border-[#C5A059] shadow-2xs transition-all flex items-center space-x-2"
          >
            <Download className="w-3.5 h-3.5 text-[#A88338]" />
            <span>Digital Card</span>
          </button>
        </div>

        {/* Minimalist Live Countdown */}
        <div className="mt-8 pt-6 border-t border-stone-200/60 max-w-md mx-auto">
          <Countdown targetDate={data.weddingDate} lang={lang} />
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6">
          <a
            href="#events"
            className="p-1.5 rounded-full text-stone-400 hover:text-[#13382C] transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
