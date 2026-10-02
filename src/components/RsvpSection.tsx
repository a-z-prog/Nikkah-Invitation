import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Users, Calendar, Phone, Mail, Sparkles, Heart } from 'lucide-react';
import { Language, WeddingData, RsvpEntry } from '../types';
import { FloralDivider, RoyalArchFrame, IslamicStarMotif } from './Ornaments';

interface RsvpSectionProps {
  data: WeddingData;
  lang: Language;
  preselectedEventId?: string | null;
}

const STORAGE_KEY = 'shubho_bibaho_rsvp_entries';

const defaultRsvps: RsvpEntry[] = [
  {
    id: 'rsvp-1',
    name: 'তানজিলা তাসনিম ও পরিবার',
    phone: '01712349876',
    email: 'tanjila@example.com',
    attending: 'yes',
    eventsAttending: ['nikkah'],
    guestsCount: 3,
    dietPreference: 'ঐতিহ্যবাহী জাফরানি কাচ্চি ও বোরহানি (হালাল জবেহ)',
    message: 'ইনশাআল্লাহ আমরা আসছি। নতুন দম্পতির জন্য বারাকাহ ও আন্তরিক দোয়া রইল!',
    createdAt: '১৫ সেপ্টেম্বর ২০২৬'
  },
  {
    id: 'rsvp-2',
    name: 'মাহমুদুল হাসান',
    phone: '01819871234',
    attending: 'yes',
    eventsAttending: ['walima'],
    guestsCount: 2,
    dietPreference: 'মোরগ পোলাও ও রেজালা',
    message: 'বারাকাল্লাহু লাকুমা! ইনশাআল্লাহ ওয়ালিমা অনুষ্ঠানে দেখা হবে।',
    createdAt: '১৬ সেপ্টেম্বর ২০২৬'
  }
];

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  data,
  lang,
  preselectedEventId
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(() => data.events.map((e) => e.id));
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [diet, setDiet] = useState('kacchi');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Guest list modal state for hosts
  const [rsvpList, setRsvpList] = useState<RsvpEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultRsvps;
      }
    }
    return defaultRsvps;
  });
  const [showHostList, setShowHostList] = useState(false);

  // Sync preselectedEventId
  useEffect(() => {
    if (preselectedEventId && !selectedEvents.includes(preselectedEventId)) {
      setSelectedEvents((prev) => [...prev, preselectedEventId]);
    }
  }, [preselectedEventId]);

  const toggleEventSelection = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newEntry: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      attending,
      eventsAttending: attending === 'yes' ? selectedEvents : [],
      guestsCount: attending === 'yes' ? guestsCount : 0,
      dietPreference: diet,
      message: message.trim() || undefined,
      createdAt: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')
    };

    const updated = [newEntry, ...rsvpList];
    setRsvpList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (attending === 'yes') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#13382C', '#E8D7B5', '#2D6A4F']
      });
    }

    setSubmitted(true);
  };

  // Stats calculation
  const totalGuests = rsvpList
    .filter((r) => r.attending === 'yes')
    .reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);

  return (
    <section id="rsvp" className="py-16 sm:py-24 px-4 bg-[#FAF9F6] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#13382C]/5 border border-[#C5A059]/30 text-[#A88338] text-[11px] font-semibold uppercase tracking-widest mb-2">
            <IslamicStarMotif className="w-3 h-3 text-[#C5A059]" />
            <span>{lang === 'bn' ? 'উপস্থিতি ও নিমন্ত্রণ গ্রহণ' : 'RSVP Confirmation'}</span>
            <IslamicStarMotif className="w-3 h-3 text-[#C5A059]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif-bengali text-[#13382C] mt-1">
            {lang === 'bn' ? 'উপস্থিতি নিশ্চিতকরণ (RSVP)' : 'Confirm Your Presence'}
          </h2>
          <FloralDivider className="my-3" />
          <p className="text-stone-500 max-w-xl mx-auto text-xs sm:text-sm">
            {lang === 'bn'
              ? 'সুশৃঙ্খল মেহমানদারি ও বরকতময় আয়োজনের সুবিধার্থে অনুগ্রহ করে ১৫ নভেম্বর ২০২৬-এর মধ্যে উপস্থিতি নিশ্চিত করুন।'
              : 'Kindly confirm your presence by November 15, 2026 to help us gracefully arrange hospitable guest services.'}
          </p>
        </div>

        <RoyalArchFrame className="bg-white/95">
          {submitted ? (
            <div className="text-center py-10 px-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-serif-bengali text-[#13382C] mb-2">
                {lang === 'bn' ? 'জাযাকাল্লাহু খাইরান!' : 'Thank You & JazakAllah Khair!'}
              </h3>
              <p className="text-stone-600 max-w-md mx-auto text-xs sm:text-sm leading-relaxed mb-6 font-serif-bengali">
                {attending === 'yes'
                  ? lang === 'bn'
                    ? `আপনার উপস্থিতি (${guestsCount} জন) সফলভাবে সংরক্ষিত হয়েছে। আমরা আন্তরিকভাবে আপনার অপেক্ষায় রইলাম!`
                    : `Your RSVP for ${guestsCount} guest(s) has been successfully recorded. We look forward to welcoming you!`
                  : lang === 'bn'
                  ? 'আপনার আন্তরিক বার্তার জন্য ধন্যবাদ। সশরীরে থাকতে না পারলেও আপনার নেক দোয়া আমাদের পরিবারের পাথেয়।'
                  : 'Thank you for letting us know. Your prayers and blessings remain warmly cherished.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-full border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
                >
                  {lang === 'bn' ? 'আরেকটি RSVP জমা দিন' : 'Submit Another RSVP'}
                </button>
                <button
                  onClick={() => setShowHostList(true)}
                  className="px-5 py-2.5 rounded-full bg-[#13382C] text-[#E8D7B5] text-xs font-semibold hover:bg-[#1B4332] transition-colors"
                >
                  {lang === 'bn' ? 'অতিথি তালিকা দেখুন (হোস্ট)' : 'View Guestlist Summary'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Attending Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  {lang === 'bn' ? 'আপনি কি উপস্থিত থাকছেন?' : 'Will you be joining us?'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                      attending === 'yes'
                        ? 'bg-[#13382C] text-[#E8D7B5] border-[#13382C] shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>{lang === 'bn' ? 'ইনশাআল্লাহ উপস্থিত থাকব' : 'Joyfully Accept'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                      attending === 'no'
                        ? 'bg-stone-800 text-white border-stone-800 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{lang === 'bn' ? 'উপস্থিত হতে অপারগ' : 'Regretfully Decline'}</span>
                  </button>
                </div>
              </div>

              {/* Guest Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ আরিফুর রহমান' : 'e.g. Arifur Rahman'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={lang === 'bn' ? '০১৭xxxxxxxx' : '+880 17xxxxxxxx'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'bn' ? 'ইমেইল ঠিকানা (ঐচ্ছিক)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                />
              </div>

              {attending === 'yes' && (
                <>
                  {/* Which events will you attend */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      {lang === 'bn' ? 'আমন্ত্রিত পবিত্র আয়োজন' : 'Invited Ceremony'}
                    </label>
                    {data.events.length === 1 ? (
                      <div className="p-3.5 rounded-2xl border border-[#13382C]/30 bg-[#13382C]/5 text-[#13382C] text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs">
                        <span className="font-serif-bengali">
                          {lang === 'bn' ? data.events[0]?.nameBn : data.events[0]?.nameEn}
                        </span>
                        <div className="flex items-center space-x-1 text-[#13382C] text-xs font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#13382C]" />
                          <span>{lang === 'bn' ? 'নির্ধারিত' : 'Confirmed'}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {data.events.map((ev) => {
                          const isChecked = selectedEvents.includes(ev.id);
                          return (
                            <button
                              key={ev.id}
                              type="button"
                              onClick={() => toggleEventSelection(ev.id)}
                              className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs font-medium transition-all ${
                                isChecked
                                  ? 'bg-[#13382C]/5 border-[#13382C] text-[#13382C] ring-1 ring-[#13382C]'
                                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                              }`}
                            >
                              <span className="font-semibold">
                                {lang === 'bn' ? ev.nameBn : ev.nameEn}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                  isChecked
                                    ? 'bg-[#13382C] border-[#13382C] text-[#E8D7B5]'
                                    : 'border-stone-300 bg-white'
                                }`}
                              >
                                {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Guest Count & Food Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        {lang === 'bn' ? 'মোট কতজন অতিথি আসবেন?' : 'Number of Guests attending'}
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((cnt) => (
                          <button
                            key={cnt}
                            type="button"
                            onClick={() => setGuestsCount(cnt)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                              guestsCount === cnt
                                ? 'bg-[#13382C] text-[#E8D7B5] border-[#13382C]'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {cnt}
                            {cnt === 5 ? '+' : ''}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        {lang === 'bn' ? 'খাবার পছন্দ (হালাল মেহমানদারি)' : 'Meal Preference (Halal Hospitality)'}
                      </label>
                      <select
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                      >
                        <option value="kacchi">
                          {lang === 'bn' ? 'ঐতিহ্যবাহী জাফরানি কাচ্চি ও বোরহানি (হালাল)' : 'Traditional Saffron Kacchi & Borhani (Halal)'}
                        </option>
                        <option value="polao">
                          {lang === 'bn' ? 'মোরগ পোলাও ও রেজালা' : 'Morog Polao & Rezala'}
                        </option>
                        <option value="veg">
                          {lang === 'bn' ? 'ভেজিটেরিয়ান স্পেশাল' : 'Vegetarian Special'}
                        </option>
                        <option value="kids">
                          {lang === 'bn' ? 'বাচ্চাদের উপযোগী খাবার' : 'Kids Friendly Meal'}
                        </option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Heartfelt Du'a / Note */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'bn' ? 'বর-কনের জন্য দোয়া বা শুভবার্তা' : 'Du\'a or Message for the Couple'}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'আল্লাহ তাদের দাম্পত্য জীবনে বারাকাহ দান করুন—এমন কোনো নেক দোয়া বা শুভেচ্ছা...'
                      : 'Share your warm du\'a and blessings...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#13382C] hover:bg-[#1B4332] text-[#E8D7B5] font-semibold text-xs sm:text-sm shadow-sm border border-[#C5A059]/40 flex items-center justify-center space-x-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>
                    {attending === 'yes'
                      ? lang === 'bn'
                        ? 'উপস্থিতি নিশ্চিত করুন (RSVP)'
                        : 'Confirm RSVP'
                      : lang === 'bn'
                      ? 'বার্তা পাঠান'
                      : 'Send Regrets'}
                  </span>
                </button>

                {/* Host Guestlist Link */}
                <button
                  type="button"
                  onClick={() => setShowHostList(true)}
                  className="text-xs text-stone-500 hover:text-[#13382C] font-medium flex items-center space-x-1.5 underline"
                >
                  <Users className="w-3.5 h-3.5 text-[#A88338]" />
                  <span>
                    {lang === 'bn' ? `হোস্ট ড্যাশবোর্ড (${totalGuests} জন নিশ্চিত)` : `Host View (${totalGuests} Confirmed)`}
                  </span>
                </button>
              </div>
            </form>
          )}
        </RoyalArchFrame>
      </div>

      {/* Host Guest List Drawer / Modal */}
      {showHostList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#C5A059]/30 overflow-hidden">
            <div className="p-5 bg-[#13382C] text-[#E8D7B5] flex items-center justify-between">
              <div>
                <h3 className="font-bold font-serif-bengali text-base sm:text-lg">
                  {lang === 'bn' ? 'আমন্ত্রিত অতিথি তালিকা ও পরিসংখ্যান' : 'Guest List & RSVP Summary'}
                </h3>
                <p className="text-xs text-[#E8D7B5]/80">
                  {lang === 'bn' ? 'পারিবারিক মেহমানদারি ও ব্যবস্থাপনার সুবিধার্থে' : 'Hospitality planning for family hosts'}
                </p>
              </div>
              <button
                onClick={() => setShowHostList(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                ✕
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="p-4 bg-[#FAF9F6] border-b border-stone-200 text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-xs text-stone-500">{lang === 'bn' ? 'মোট নিশ্চিত মেহমান:' : 'Total Confirmed Guests:'}</span>
                <span className="text-base font-bold text-[#13382C]">{totalGuests} {lang === 'bn' ? 'জন' : ''}</span>
              </div>
            </div>

            {/* Guest Entries Scroll List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
              {rsvpList.map((guest) => (
                <div key={guest.id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-stone-900 text-sm flex items-center space-x-2">
                      <span>{guest.name}</span>
                      {guest.attending === 'yes' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          {guest.guestsCount} {lang === 'bn' ? 'জন' : 'guests'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600">
                          {lang === 'bn' ? 'আসতে পারছেন না' : 'Declined'}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5 flex flex-wrap gap-2">
                      <span>📞 {guest.phone}</span>
                      {guest.dietPreference && <span>🍽️ {guest.dietPreference}</span>}
                      <span>🕒 {guest.createdAt}</span>
                    </div>
                    {guest.message && (
                      <p className="text-xs text-stone-600 italic mt-1 bg-stone-50 p-2 rounded-xl font-serif-bengali">
                        "{guest.message}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setShowHostList(false)}
                className="px-5 py-2 rounded-xl bg-stone-800 text-white text-xs font-semibold hover:bg-stone-900"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
