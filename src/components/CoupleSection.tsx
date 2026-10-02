import React, { useRef } from 'react';
import { Sparkles, Heart, CameraOff, ShieldAlert, Camera } from 'lucide-react';
import { Language, WeddingData } from '../types';
import { FloralDivider } from './Ornaments';
import brideFloralImg from '../assets/images/bride_avatar_floral_1790533418146.jpg';
import groomPhotoDefault from '../assets/images/groom_razin_portrait_1790981962429.jpg';

interface CoupleSectionProps {
  data: WeddingData;
  lang: Language;
  isHostAuthenticated?: boolean;
  onUpdateGroomPhoto?: (photoUrl: string) => void;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({
  data,
  lang,
  isHostAuthenticated = false,
  onUpdateGroomPhoto
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateGroomPhoto) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateGroomPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="couple" className="py-16 sm:py-24 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A88338] mb-1.5">
            {lang === 'bn' ? 'সুন্নতি বন্ধনের দম্পতি' : 'The Couple'}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-bengali text-[#13382C] mt-1">
            {lang === 'bn' ? 'বর ও কনের পরিচিতি' : 'Bride & Groom'}
          </h2>
          <FloralDivider className="my-2.5" />
          <p className="text-stone-500 max-w-xl mx-auto text-xs sm:text-sm">
            {lang === 'bn'
              ? 'আল্লাহর সন্তুষ্টি ও সুন্নাহ অনুসরণে দুই পরিবারের নেক দোয়া ও সম্মতিতে তাদের নতুন জীবনের পথচলা।'
              : 'Alhamdulillah, with the duas and consent of parents and seeking the pleasure of Allah, they embark on this sacred journey of marriage.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* The Groom Card */}
          <div className="relative p-6 sm:p-8 rounded-[2rem] bg-[#FAF9F6] border border-stone-200/90 shadow-xs text-center flex flex-col justify-between hover:border-[#C5A059]/60 transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#13382C] text-[#E8D7B5] text-xs font-semibold px-4 py-1 rounded-full border border-[#C5A059]/40 shadow-xs">
              {lang === 'bn' ? 'বর' : 'The Groom'}
            </div>

            <div>
              <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 my-5 group">
                <div className="absolute inset-0 rounded-full border border-[#C5A059]/40 p-1" />
                <img
                  src={data.groomPhoto || groomPhotoDefault}
                  alt={data.groomNameEn}
                  className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm"
                  loading="lazy"
                />
                {/* Host Only Photo Change Button */}
                {isHostAuthenticated && onUpdateGroomPhoto && (
                  <>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-1 right-1 bg-[#13382C] text-[#E8D7B5] hover:bg-[#1B4332] p-2.5 rounded-full shadow-lg border-2 border-white transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer"
                      title={lang === 'bn' ? 'বরের ছবি পরিবর্তন করুন (হোস্ট কন্ট্রোল)' : 'Change Groom Photo (Host Control)'}
                    >
                      <Camera className="w-4 h-4 text-[#C5A059]" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-[#13382C]">
                {lang === 'bn' ? data.groomNameBn : data.groomNameEn}
              </h3>

              <div className="my-4 py-2.5 px-4 rounded-xl bg-white border border-stone-200/80 text-xs sm:text-sm text-stone-700 font-medium">
                <span className="text-[#A88338] font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                  {lang === 'bn' ? 'শ্রদ্ধেয় পিতামাতা' : 'Parents'}
                </span>
                {lang === 'bn' ? data.groomParentsBn : data.groomParentsEn}
              </div>

              <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed px-2 font-serif-bengali">
                "{lang === 'bn' ? data.groomBioBn : data.groomBioEn}"
              </p>
            </div>
          </div>

          {/* The Bride Card */}
          <div className="relative p-6 sm:p-8 rounded-[2rem] bg-[#FAF9F6] border border-stone-200/90 shadow-xs text-center flex flex-col justify-between hover:border-[#C5A059]/60 transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#13382C] text-[#E8D7B5] text-xs font-semibold px-4 py-1 rounded-full border border-[#C5A059]/40 shadow-xs">
              {lang === 'bn' ? 'কনে' : 'The Bride'}
            </div>

            <div>
              <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 my-5">
                <div className="absolute inset-0 rounded-full border border-[#C5A059]/40 p-1" />
                <img
                  src={brideFloralImg}
                  alt={lang === 'bn' ? data.brideNameBn : data.brideNameEn}
                  className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm"
                  loading="lazy"
                />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-[#13382C]">
                {lang === 'bn' ? data.brideNameBn : data.brideNameEn}
              </h3>

              {(lang === 'bn' ? data.brideParentsBn : data.brideParentsEn) ? (
                <div className="my-4 py-2.5 px-4 rounded-xl bg-white border border-stone-200/80 text-xs sm:text-sm text-stone-700 font-medium">
                  <span className="text-[#A88338] font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                    {lang === 'bn' ? 'শ্রদ্ধেয় পিতামাতা' : 'Parents'}
                  </span>
                  {lang === 'bn' ? data.brideParentsBn : data.brideParentsEn}
                </div>
              ) : null}

              <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed px-2 font-serif-bengali">
                "{lang === 'bn' ? data.brideBioBn : data.brideBioEn}"
              </p>

              {/* Bride Photography Strict Prohibition Alert Card */}
              <div className="mt-5 p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200/80 text-left flex items-start space-x-2.5 text-xs text-rose-950">
                <div className="p-1 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                  <CameraOff className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-[13px] text-rose-900 font-serif-bengali">
                    {lang === 'bn' ? 'কনের ছবি ও ভিডিও ধারণ সম্পূর্ণ নিষেধ' : 'Strictly No Photography / Videography of the Bride'}
                  </span>
                  <span className="text-[11px] leading-relaxed text-rose-800/90 block mt-1 font-serif-bengali">
                    {lang === 'bn'
                      ? 'ইসলামিক পর্দা ও পরিবারের বিনীত অনুরোধক্রমে অনুষ্ঠানে কনের কোনো ছবি বা ভিডিও ধারণ করা এবং তা যেকোনো সামাজিক যোগাযোগ মাধ্যমে প্রকাশ থেকে সম্পূর্ণ বিরত থাকার অনুরোধ করা হচ্ছে।'
                      : 'In strict observance of Islamic modesty and family purdah, taking photos or recording videos of the bride, or posting them on social media, is strictly prohibited.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Prophetic Hadith Callout */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-3xl bg-[#13382C]/5 border border-[#C5A059]/25 max-w-2xl mx-auto">
          <div className="font-arabic text-lg sm:text-xl text-[#13382C] mb-2 font-normal leading-relaxed">
            النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي
          </div>
          <p className="font-serif-bengali text-xs sm:text-sm text-stone-700 font-medium">
            {lang === 'bn'
              ? '“বিবাহ আমার সুন্নাত; অতএব যে ব্যক্তি আমার সুন্নাত অনুযায়ী আমল করে না, সে আমার দলভুক্ত নয়।” — [ইবনে মাজাহ: ১৮৪৬]'
              : '"Marriage is part of my Sunnah, and whoever does not follow my Sunnah has nothing to do with me." — [Sunan Ibn Majah: 1846]'}
          </p>
        </div>
      </div>
    </section>
  );
};
