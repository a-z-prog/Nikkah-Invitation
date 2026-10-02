import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Check, Download } from 'lucide-react';
import { Language, WeddingData, WeddingEvent } from '../types';
import { FloralDivider, IslamicStarMotif } from './Ornaments';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface EventsScheduleProps {
  data: WeddingData;
  lang: Language;
  onSelectEventForRsvp?: (eventId: string) => void;
}

export const EventsSchedule: React.FC<EventsScheduleProps> = ({
  data,
  lang,
  onSelectEventForRsvp
}) => {
  const [downloadedEventId, setDownloadedEventId] = useState<string | null>(null);

  const handleDownloadIcs = (event: WeddingEvent) => {
    const coupleNames =
      lang === 'bn'
        ? `${data.groomNameBn} ও ${data.brideNameBn}`
        : `${data.groomNameEn} & ${data.brideNameEn}`;
    downloadIcsFile(event, coupleNames);
    setDownloadedEventId(event.id);
    setTimeout(() => setDownloadedEventId(null), 3000);
  };

  return (
    <section id="events" className="py-16 sm:py-24 px-4 bg-[#FAF9F6] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A88338] mb-1.5">
            {lang === 'bn' ? 'অনুষ্ঠান সূচি' : 'Ceremonies & Schedule'}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-bengali text-[#13382C] mt-1">
            {lang === 'bn' ? (data.events[0]?.nameBn || 'ওয়ালিমা ও প্রীতিভোজ') : (data.events[0]?.nameEn || 'Walima Feast')}
          </h2>
          <FloralDivider className="my-2.5" />
          <p className="text-stone-500 max-w-xl mx-auto text-xs sm:text-sm">
            {lang === 'bn'
              ? 'রাসূলুল্লাহ (সা.)-এর সুন্নাহসম্মত ওয়ালিমা ও প্রীতিভোজের পবিত্র অনুষ্ঠানে আপনাদের সপরিবারে আন্তরিক আমন্ত্রণ জানাচ্ছি।'
              : 'Join us in heartfelt prayer and joyous feast for the blessed Walima ceremony solemnized in accordance with the Sunnah.'}
          </p>
        </div>

        <div
          className={
            data.events.length === 1
              ? 'max-w-2xl mx-auto'
              : data.events.length === 2
              ? 'max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'
          }
        >
          {data.events.map((event, index) => {
            const dateObj = new Date(event.dateStr);
            const dateDisplayEn = dateObj.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            const bnMonths = [
              'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
              'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
            ];
            const bnDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
            const dateDisplayBn = `${bnDays[dateObj.getDay()]}, ${dateObj.getDate()}ই ${bnMonths[dateObj.getMonth()]}`;

            const coupleNames =
              lang === 'bn'
                ? `${data.groomNameBn} ও ${data.brideNameBn}`
                : `${data.groomNameEn} & ${data.brideNameEn}`;
            const gCalUrl = getGoogleCalendarUrl(event, coupleNames);

            return (
              <div
                key={event.id}
                className="relative rounded-3xl bg-white border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#C5A059]/60 transition-all duration-300"
              >
                {/* Modern Hairline Emerald Top Strip */}
                <div className="h-1.5 w-full bg-[#13382C]" />

                <div className="p-6 sm:p-7 flex-1">
                  {/* Phase badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-[#A88338] uppercase font-sans-ui">
                      {data.events.length === 1
                        ? lang === 'bn'
                          ? 'ওয়ালিমা লগ্ন'
                          : 'Walima Feast'
                        : lang === 'bn'
                        ? `পর্ব ০${index + 1}`
                        : `Part 0${index + 1}`}
                    </span>
                    <span className="text-xs font-serif italic text-[#A88338]">
                      {lang === 'bn' ? 'ওয়ালিমা' : 'Walima'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-serif-bengali text-[#13382C] mb-2 leading-snug">
                    {lang === 'bn' ? event.nameBn : event.nameEn}
                  </h3>

                  <p className="text-xs text-stone-500 mb-5 leading-relaxed font-serif-bengali">
                    {lang === 'bn' ? event.descriptionBn : event.descriptionEn}
                  </p>

                  <div className="space-y-3 text-xs text-stone-600 border-t border-stone-100 pt-4">
                    {/* Date */}
                    <div className="flex items-start space-x-2.5">
                      <Calendar className="w-4 h-4 text-[#A88338] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-stone-900">
                          {lang === 'bn' ? dateDisplayBn : dateDisplayEn}
                        </span>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start space-x-2.5">
                      <Clock className="w-4 h-4 text-[#A88338] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-stone-800">
                          {lang === 'bn' ? event.timeBn : event.timeEn}
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start space-x-2.5">
                      <MapPin className="w-4 h-4 text-[#A88338] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-stone-900 leading-tight">
                          {lang === 'bn' ? event.venueNameBn : event.venueNameEn}
                        </span>
                        <span className="text-stone-500 text-[11px] block mt-0.5">
                          {lang === 'bn' ? event.addressBn : event.addressEn}
                        </span>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-mono border border-stone-200">
                          GPS: 22.1110825, 92.0374952
                        </span>
                      </div>
                    </div>

                    {/* Embedded Interactive Google Map Preview */}
                    <div className="mt-4 rounded-2xl overflow-hidden border border-stone-200/90 relative aspect-[16/9] w-full bg-stone-100 shadow-2xs">
                      <iframe
                        title="Walima Venue Location Map"
                        src="https://maps.google.com/maps?q=22.1110825,92.0374952&hl=bn&z=16&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-stone-50/70 border-t border-stone-100 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.google.com/maps?q=22.1110825,92.0374952"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#13382C] text-[#E8D7B5] hover:bg-[#0e271f] text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#E8D7B5]" />
                      <span>{lang === 'bn' ? 'গুগল ম্যাপে ডিরেকশন (GPS)' : 'Google Maps (GPS)'}</span>
                    </a>

                    <a
                      href={gCalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-white border border-stone-200 text-stone-700 hover:border-[#A88338] text-xs font-semibold flex items-center space-x-1 transition-colors shadow-2xs"
                      title={lang === 'bn' ? 'গুগল ক্যালেন্ডারে যোগ করুন' : 'Add to Google Calendar'}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">+ Google</span>
                    </a>

                    <button
                      onClick={() => handleDownloadIcs(event)}
                      className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:border-[#A88338] text-xs font-semibold flex items-center transition-colors shadow-2xs"
                      title={lang === 'bn' ? 'iCal / Outlook ক্যালেন্ডার ফাইল (.ics) ডাউনলোড' : 'Download iCal / Outlook (.ics)'}
                    >
                      {downloadedEventId === event.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Download className="w-3.5 h-3.5 text-stone-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
