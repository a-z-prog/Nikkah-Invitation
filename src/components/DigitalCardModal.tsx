import React, { useState } from 'react';
import { X, Printer, Share2, Check, Download, Sparkles, CameraOff } from 'lucide-react';
import { Language, WeddingData } from '../types';
import { FloralDivider, IslamicStarMotif } from './Ornaments';

interface DigitalCardModalProps {
  data: WeddingData;
  lang: Language;
  onClose: () => void;
}

export const DigitalCardModal: React.FC<DigitalCardModalProps> = ({ data, lang, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const dateObj = new Date(data.weddingDate);
  const formattedDate = dateObj.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
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

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ai.studio';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&color=19-56-44&bgcolor=250-249-246&data=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-[#C5A059]/40">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print p-4 bg-[#FAF9F6] border-b border-[#C5A059]/20 flex items-center justify-between">
          <span className="text-xs font-bold font-serif-bengali text-[#13382C] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{lang === 'bn' ? 'পবিত্র ডিজিটাল নিমন্ত্রণপত্র কার্ড' : 'Digital Invitation Card'}</span>
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-semibold flex items-center space-x-1 hover:border-[#C5A059]"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#A88338]" />}
              <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'শেয়ার' : 'Share')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1 rounded-full bg-[#13382C] text-[#E8D7B5] text-xs font-semibold flex items-center space-x-1 hover:bg-[#1B4332]"
              title="Print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Islamic Invitation Card */}
        <div className="p-6 sm:p-8 bg-[#FAF9F6] print-card-only relative text-center border-4 border-double border-[#C5A059]/50 m-3 rounded-2xl">
          {/* Subtle Corner Stars */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <IslamicStarMotif className="w-4 h-4 text-[#C5A059]/60" />
          </div>
          <div className="absolute top-3 right-3 pointer-events-none">
            <IslamicStarMotif className="w-4 h-4 text-[#C5A059]/60" />
          </div>
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <IslamicStarMotif className="w-4 h-4 text-[#C5A059]/60" />
          </div>
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <IslamicStarMotif className="w-4 h-4 text-[#C5A059]/60" />
          </div>

          {/* Bismillah */}
          <div className="font-arabic text-sm sm:text-base text-[#13382C]/90 mb-1 font-normal tracking-normal">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          {/* Monogram Badge */}
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#13382C] text-[#E8D7B5] border border-[#C5A059]/60 flex items-center justify-center font-cinzel font-bold text-base shadow-xs my-2">
            {data.monogram}
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif-bengali text-[#13382C] mt-1 mb-1">
            {lang === 'bn' ? 'শুভ ওয়ালিমা নিমন্ত্রণপত্র' : 'Walima Invitation'}
          </h3>

          <div className="font-arabic text-xs sm:text-sm text-[#13382C] max-w-sm mx-auto">
            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </div>

          <p className="text-xs text-stone-500 italic max-w-xs mx-auto mt-2 leading-relaxed font-serif-bengali">
            {lang === 'bn'
              ? 'আল্লাহর অশেষ রহমতে আমাদের সন্তানদ্বয়ের সুন্নতি শুভ পরিণয় ও ওয়ালিমা প্রীতিভোজে আপনার সপরিবারে আন্তরিক দোয়া ও উপস্থিতি কামনা করছি।'
              : 'Under the grace of Allah, we cordially invite you to celebrate the blessed Walima of our children.'}
          </p>

          {/* Bride Photography Strict Restriction Notice on Print/Card */}
          <div className="my-2.5 py-1.5 px-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center justify-center space-x-1.5 max-w-xs mx-auto">
            <CameraOff className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="font-serif-bengali">
              {lang === 'bn' ? 'কনের ছবি বা ভিডিও তোলা সম্পূর্ণ নিষেধ' : 'Strictly No Photography of the Bride'}
            </span>
          </div>

          <FloralDivider className="my-2" />

          {/* Groom & Bride names */}
          <div className="my-3">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-[#13382C]">
              {lang === 'bn' ? data.groomNameBn : data.groomNameEn}
            </h2>
            <div className="text-xs text-stone-500 font-serif-bengali mt-0.5">
              {lang === 'bn' ? `পিতা-মাতা: ${data.groomParentsBn}` : `Parents: ${data.groomParentsEn}`}
            </div>

            <div className="my-1.5 font-cinzel text-xs text-[#A88338] font-bold">
              &
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-[#13382C]">
              {lang === 'bn' ? data.brideNameBn : data.brideNameEn}
            </h2>
            {(lang === 'bn' ? data.brideParentsBn : data.brideParentsEn) ? (
              <div className="text-xs text-stone-500 font-serif-bengali mt-0.5">
                {lang === 'bn' ? `পিতা-মাতা: ${data.brideParentsBn}` : `Parents: ${data.brideParentsEn}`}
              </div>
            ) : null}
          </div>

          <FloralDivider className="my-2" />

          {/* Date & Venue Box */}
          <div className="py-3 px-4 rounded-xl bg-white border border-stone-200/80 max-w-sm mx-auto my-3 text-xs text-stone-800 space-y-1 shadow-2xs">
            <div className="font-bold text-sm text-[#13382C] font-serif-bengali">
              📅 {formattedDate}
            </div>
            <div className="font-medium text-xs text-stone-600">
              ⏰ {formattedTime}
            </div>
            <div className="text-xs text-stone-600">
              📍 {lang === 'bn' ? data.mainVenueBn : data.mainVenueEn}
            </div>
          </div>

          {/* QR Code */}
          <div className="mt-3 pt-2 border-t border-stone-200/70 flex flex-col items-center">
            <img
              src={qrCodeUrl}
              alt="Scan for interactive invitation"
              className="w-18 h-18 rounded-lg p-1 bg-white border border-stone-200 shadow-2xs"
            />
            <span className="text-[10px] text-stone-400 mt-1 font-medium">
              {lang === 'bn'
                ? 'অনুষ্ঠান সূচি ও গুগল ম্যাপের জন্য স্ক্যান করুন'
                : 'Scan for Event Details & Google Maps'}
            </span>
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-stone-500 font-serif-bengali italic mt-2.5">
            {lang === 'bn'
              ? 'বিনীত: বর ও কনের পরিবারের পক্ষ থেকে'
              : 'Warm regards: From the families of the Bride & Groom'}
          </p>
        </div>
      </div>
    </div>
  );
};
