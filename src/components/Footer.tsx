import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Language, WeddingData } from '../types';
import { FloralDivider, IslamicStarMotif } from './Ornaments';

interface FooterProps {
  data: WeddingData;
  lang: Language;
  onOpenCard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, lang, onOpenCard }) => {
  return (
    <footer className="bg-[#13382C] text-[#FAF9F6] py-16 px-4 relative overflow-hidden border-t border-[#C5A059]/40">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Monogram Seal */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1B4332] text-[#E8D7B5] border border-[#C5A059]/60 flex items-center justify-center font-cinzel font-bold text-lg shadow-sm mb-4">
          {data.monogram}
        </div>

        {/* Arabic Callout */}
        <div className="font-arabic text-lg sm:text-xl text-[#E8D7B5] mb-2">
          بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-[#FAF9F6]">
          {lang === 'bn' ? `${data.groomNameBn} ও ${data.brideNameBn}` : `${data.groomNameEn} & ${data.brideNameEn}`}
        </h3>

        <p className="text-xs sm:text-sm text-[#FAF9F6]/75 mt-2 font-serif-bengali max-w-md mx-auto italic leading-relaxed">
          {lang === 'bn'
            ? '“আপনাদের সস্নেহ উপস্থিতি, আন্তরিক দোয়া ও ভালোবাসাই আমাদের নতুন জীবনের সেরা পাথেয়।”'
            : '"Your sincere prayers, warm presence, and blessings are the most treasured gifts for our new journey."'}
        </p>

        <FloralDivider className="my-6 opacity-40" />

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#FAF9F6]/75 font-medium my-4">
          <a href="#events" className="hover:text-[#E8D7B5] transition-colors">
            {lang === 'bn' ? 'অনুষ্ঠান সূচি' : 'Events'}
          </a>
          <a href="#couple" className="hover:text-[#E8D7B5] transition-colors">
            {lang === 'bn' ? 'বর ও কনে' : 'The Couple'}
          </a>
          <a href="#wishes" className="hover:text-[#E8D7B5] transition-colors">
            {lang === 'bn' ? 'দোয়া ও শুভেচ্ছা' : 'Du\'a Board'}
          </a>
          <a href="#info" className="hover:text-[#E8D7B5] transition-colors">
            {lang === 'bn' ? 'সুন্নাহ ও নির্দেশনা' : 'Guest Guide'}
          </a>
          <button onClick={onOpenCard} className="hover:text-[#E8D7B5] transition-colors underline">
            {lang === 'bn' ? 'ডিজিটাল কার্ড' : 'Digital Card'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-[#FAF9F6]/50 flex items-center justify-center space-x-2 font-mono">
          <span>© 2026 Razin's project</span>
        </div>
      </div>
    </footer>
  );
};
