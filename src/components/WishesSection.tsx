import React, { useState, useEffect } from 'react';
import {
  Heart,
  Send,
  MessageCircleHeart,
  Eye,
  EyeOff,
  Trash2,
  Pin,
  Lock,
  ShieldCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { Language, BlessingEntry } from '../types';
import { initialBlessings } from '../data/initialWeddingData';
import { FloralDivider, IslamicStarMotif } from './Ornaments';
import {
  subscribeBlessings,
  addBlessingToCloud,
  updateBlessingInCloud,
  deleteBlessingFromCloud
} from '../services/weddingSync';

interface WishesSectionProps {
  lang: Language;
  isHostAuthenticated?: boolean;
  onRequireAuth?: () => void;
}

const WISHES_STORAGE_KEY = 'shubho_bibaho_wishes_entries_v3';

export const WishesSection: React.FC<WishesSectionProps> = ({
  lang,
  isHostAuthenticated = false,
  onRequireAuth
}) => {
  const [wishes, setWishes] = useState<BlessingEntry[]>(() => {
    try {
      localStorage.removeItem('shubho_bibaho_wishes_entries');
      localStorage.removeItem('shubho_bibaho_wishes_entries_v2');
    } catch (e) {}

    const saved = localStorage.getItem(WISHES_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((w: BlessingEntry) => w.id !== '1' && w.id !== '2' && w.id !== '3');
        }
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Real-time listener for guest blessings from Cloud Firestore
  useEffect(() => {
    const unsubscribe = subscribeBlessings((cloudBlessings) => {
      const realBlessings = (cloudBlessings || []).filter(
        (w) => w.id !== '1' && w.id !== '2' && w.id !== '3'
      );
      setWishes(realBlessings);
      try {
        localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(realBlessings));
      } catch (e) {}
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'visible' | 'hidden'>('all');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice(null);
    }, 2800);
  };

  const saveWishes = (updated: BlessingEntry[]) => {
    setWishes(updated);
    try {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const bgColors = [
      'bg-emerald-100 text-emerald-900 border-emerald-300',
      'bg-amber-100 text-amber-900 border-amber-300',
      'bg-stone-100 text-stone-800 border-stone-300'
    ];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const wishPayload: Omit<BlessingEntry, 'id'> = {
      author: author.trim(),
      relation: relation.trim() || (lang === 'bn' ? 'শুভাকাঙ্ক্ষী' : 'Well-wisher'),
      message: message.trim(),
      likes: 1,
      createdAt: lang === 'bn' ? 'এইমাত্র' : 'Just now',
      avatarBg: randomBg,
      hidden: false,
      pinned: false
    };

    try {
      await addBlessingToCloud(wishPayload);
    } catch (err) {
      // Fallback local
      const newWish: BlessingEntry = {
        ...wishPayload,
        id: `wish-${Date.now()}`
      };
      saveWishes([newWish, ...wishes]);
    }

    setAuthor('');
    setRelation('');
    setMessage('');
    setShowForm(false);
    showNotice(lang === 'bn' ? 'দোয়া সফলভাবে পোস্ট হয়েছে!' : 'Du\'a successfully shared!');
  };

  const handleLike = (id: string) => {
    const target = wishes.find((w) => w.id === id);
    const newLikes = (target?.likes || 0) + 1;
    const updated = wishes.map((w) => (w.id === id ? { ...w, likes: newLikes } : w));
    saveWishes(updated);
    updateBlessingInCloud(id, { likes: newLikes }).catch(() => {});
  };

  // Host Action: Toggle visibility (Show / Hide)
  const handleToggleHide = (id: string) => {
    const target = wishes.find((w) => w.id === id);
    const newHidden = !target?.hidden;
    const updated = wishes.map((w) => (w.id === id ? { ...w, hidden: newHidden } : w));
    saveWishes(updated);
    updateBlessingInCloud(id, { hidden: newHidden }).catch(() => {});

    if (target?.hidden) {
      showNotice(lang === 'bn' ? 'দোয়াটি সবার জন্য দৃশ্যমান করা হয়েছে' : 'Du\'a is now visible to all guests');
    } else {
      showNotice(lang === 'bn' ? 'দোয়াটি সাধারণ মেহমানদের থেকে লুকিয়ে রাখা হয়েছে' : 'Du\'a is now hidden from public guests');
    }
  };

  // Host Action: Toggle Pin to Top
  const handleTogglePin = (id: string) => {
    const target = wishes.find((w) => w.id === id);
    const newPinned = !target?.pinned;
    const updated = wishes.map((w) => (w.id === id ? { ...w, pinned: newPinned } : w));
    saveWishes(updated);
    updateBlessingInCloud(id, { pinned: newPinned }).catch(() => {});
    showNotice(lang === 'bn' ? 'পিন স্ট্যাটাস পরিবর্তিত হয়েছে' : 'Pin status updated');
  };

  // Host Action: Delete wish permanently
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const updated = wishes.filter((w) => w.id !== itemToDelete);
    saveWishes(updated);
    deleteBlessingFromCloud(itemToDelete).catch(() => {});
    setItemToDelete(null);
    showNotice(lang === 'bn' ? 'দোয়াটি স্থায়ীভাবে মুছে ফেলা হয়েছে' : 'Du\'a permanently removed');
  };

  // Host Action: Restore default blessings
  const handleResetDefaults = () => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি ডিফল্ট দোয়াগুলো ফিরিয়ে আনতে চান?' : 'Restore initial default du\'as?')) {
      saveWishes(initialBlessings);
      showNotice(lang === 'bn' ? 'ডিফল্ট দোয়া পুনরুদ্ধার করা হয়েছে' : 'Default du\'as restored');
    }
  };

  // Calculate counts
  const totalCount = wishes.length;
  const hiddenCount = wishes.filter((w) => w.hidden).length;
  const visibleCount = totalCount - hiddenCount;

  // Filter and sort wishes
  const filteredWishes = wishes.filter((item) => {
    if (!isHostAuthenticated) {
      // Ordinary guests only see non-hidden
      return !item.hidden;
    }
    // Host filter
    if (activeFilter === 'visible') return !item.hidden;
    if (activeFilter === 'hidden') return item.hidden;
    return true; // 'all'
  });

  // Sort pinned to top
  const sortedWishes = [...filteredWishes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <section id="wishes" className="py-16 sm:py-24 px-4 bg-white relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#13382C]/5 border border-[#C5A059]/30 text-[#A88338] text-[11px] font-semibold uppercase tracking-widest mb-2">
            <IslamicStarMotif className="w-3 h-3 text-[#C5A059]" />
            <span>{lang === 'bn' ? 'দোয়া ও নেক বাসনা' : 'Du\'a & Well Wishes'}</span>
            <IslamicStarMotif className="w-3 h-3 text-[#C5A059]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif-bengali text-[#13382C] mt-1">
            {lang === 'bn' ? 'নেক দোয়া ও শুভেচ্ছা বার্তা' : 'Du\'a & Guestbook'}
          </h2>
          <FloralDivider className="my-3" />
          <p className="text-stone-500 max-w-xl mx-auto text-xs sm:text-sm font-serif-bengali">
            {lang === 'bn'
              ? 'নবদম্পতির দ্বীনি ও পার্থিব জীবনের কল্যাণে আপনার পবিত্র দোয়া ও আন্তরিক শুভেচ্ছা লিখে জানান।'
              : 'Share a sincere du\'a and warm wishes for the bride and groom as they step into married life.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2.5 rounded-full bg-[#13382C] text-[#E8D7B5] text-xs sm:text-sm font-semibold hover:bg-[#1B4332] shadow-xs transition-all flex items-center space-x-2 border border-[#C5A059]/40 cursor-pointer"
            >
              <MessageCircleHeart className="w-4 h-4 text-[#C5A059]" />
              <span>{lang === 'bn' ? 'দোয়া বা শুভেচ্ছা লিখুন' : 'Write a Du\'a'}</span>
            </button>

            {!isHostAuthenticated && onRequireAuth && (
              <button
                onClick={onRequireAuth}
                className="px-4 py-2.5 rounded-full bg-[#FAF9F6] text-stone-600 hover:text-[#13382C] text-xs font-medium border border-stone-200 hover:border-[#C5A059]/40 transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                title={lang === 'bn' ? 'হোস্ট নিয়ন্ত্রণ (পিন দিয়ে দোয়া লুকানো বা মুছা)' : 'Host Moderation (PIN required to hide/delete)'}
              >
                <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{lang === 'bn' ? 'দোয়া নিয়ন্ত্রণ (হোস্ট)' : 'Moderate Du\'as'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Action Notice Toast */}
        {actionNotice && (
          <div className="max-w-md mx-auto mb-6 p-3 rounded-xl bg-[#13382C] text-[#E8D7B5] text-xs flex items-center justify-center space-x-2 shadow-md animate-in fade-in">
            <Check className="w-4 h-4 text-[#C5A059]" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Host Moderation Control Panel (Visible only to authenticated host) */}
        {isHostAuthenticated && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-300/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-amber-200/70">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-[#13382C] text-[#E8D7B5]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#13382C]">
                    {lang === 'bn' ? 'হোস্ট দোয়া নিয়ন্ত্রণ প্যানেল (মডারেশন)' : 'Host Du\'a Moderation Panel'}
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    {lang === 'bn'
                      ? 'এখানে আপনি যেকোনো দোয়া সবার থেকে লুকিয়ে রাখতে বা চিরতরে মুছে ফেলতে পারেন।'
                      : 'You can hide unapproved du\'as or delete unwanted messages anytime.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-semibold">
                  {lang === 'bn' ? `দৃশ্যমান: ${visibleCount}` : `Visible: ${visibleCount}`}
                </span>
                {hiddenCount > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 font-semibold">
                    {lang === 'bn' ? `লুকানো: ${hiddenCount}` : `Hidden: ${hiddenCount}`}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-2.5 py-1 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 text-[11px] font-medium transition-colors"
                  title="Reset to default initial du'as"
                >
                  {lang === 'bn' ? 'ডিফল্ট রিস্টোর' : 'Reset Defaults'}
                </button>
              </div>
            </div>

            {/* Filter Tabs for Host */}
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                {lang === 'bn' ? 'ফিল্টার:' : 'Filter:'}
              </span>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#13382C] text-[#E8D7B5]'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {lang === 'bn' ? `সবগুলো (${totalCount})` : `All (${totalCount})`}
              </button>
              <button
                onClick={() => setActiveFilter('visible')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'visible'
                    ? 'bg-[#13382C] text-[#E8D7B5]'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {lang === 'bn' ? `দৃশ্যমান (${visibleCount})` : `Visible to Public (${visibleCount})`}
              </button>
              <button
                onClick={() => setActiveFilter('hidden')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'hidden'
                    ? 'bg-[#13382C] text-[#E8D7B5]'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {lang === 'bn' ? `লুকানো (${hiddenCount})` : `Hidden from Public (${hiddenCount})`}
              </button>
            </div>
          </div>
        )}

        {/* Collapsible Du'a Posting Form */}
        {showForm && (
          <div className="mb-10 max-w-lg mx-auto p-6 rounded-3xl bg-[#FAF9F6] border border-stone-200/90 shadow-lg animate-in fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-bengali font-bold text-base text-[#13382C]">
                {lang === 'bn' ? 'আপনার নেক দোয়া বা বার্তা' : 'Share Your Du\'a'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-stone-400 hover:text-stone-600 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddWish} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your name'}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'সম্পর্ক / পরিচয়' : 'Relationship / Role'}
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: আত্মীয় / বন্ধু / শুভাকাঙ্ক্ষী' : 'e.g. Family / Friend / Colleague'}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'দোয়া ও বার্তা *' : 'Du\'a & Message *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'bn' ? 'বারাকাল্লাহু লাকুমা... আপনার আন্তরিক দোয়া লিখুন' : 'Write your prayer or blessing...'}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#13382C] text-[#E8D7B5] font-semibold text-xs shadow-xs hover:bg-[#1B4332] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{lang === 'bn' ? 'দোয়া পোস্ট করুন' : 'Post Du\'a'}</span>
              </button>
            </form>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {itemToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h4 className="text-center font-bold text-base text-stone-900 mb-1">
                {lang === 'bn' ? 'দোয়াটি মুছে ফেলতে চান?' : 'Delete this Du\'a?'}
              </h4>
              <p className="text-center text-xs text-stone-600 mb-5 leading-relaxed">
                {lang === 'bn'
                  ? 'এটি স্থায়ীভাবে ওয়েবসাইট থেকে মুছে যাবে। আপনি কি নিশ্চিত?'
                  : 'This du\'a will be permanently deleted from the website. Are you sure?'}
              </p>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 py-2 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  {lang === 'bn' ? 'হ্যাঁ, মুছুন' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {sortedWishes.length === 0 && (
          <div className="text-center py-12 sm:py-16 px-6 rounded-3xl bg-[#FAF9F6] border border-[#C5A059]/20 shadow-2xs max-w-lg mx-auto my-4">
            <Heart className="w-10 h-10 text-[#C5A059] mx-auto mb-3 opacity-80" />
            <p className="text-[#13382C] text-sm sm:text-base font-serif-bengali font-bold mb-1">
              {lang === 'bn'
                ? 'এখনো কোনো দোয়া পোস্ট করা হয়নি'
                : 'No du\'as have been posted yet'}
            </p>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
              {lang === 'bn'
                ? 'উপরের ফর্মটি ব্যবহার করে বর-কনের নতুন জীবনের জন্য প্রথম আন্তরিক দোয়াটি আপনিই লিখে পাঠান।'
                : 'Be the first to share your sincere prayers and heartfelt blessings for the newlyweds.'}
            </p>
          </div>
        )}

        {/* Wishes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedWishes.map((item) => {
            const isHidden = !!item.hidden;
            const isPinned = !!item.pinned;

            return (
              <div
                key={item.id}
                className={`relative p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isHidden
                    ? 'bg-stone-50/80 border-dashed border-rose-300 opacity-80'
                    : isPinned
                    ? 'bg-amber-50/40 border-[#C5A059] shadow-xs'
                    : 'bg-[#FAF9F6] border-stone-200/80 shadow-2xs hover:border-[#C5A059]/60'
                }`}
              >
                {/* Badges */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  {isPinned ? (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#13382C] text-[#E8D7B5] text-[10px] font-semibold border border-[#C5A059]/40">
                      <Pin className="w-2.5 h-2.5 fill-[#C5A059] text-[#C5A059]" />
                      <span>{lang === 'bn' ? 'বিশেষ দোয়া' : 'Pinned'}</span>
                    </span>
                  ) : <span />}

                  {isHostAuthenticated && isHidden && (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-[10px] font-bold">
                      <EyeOff className="w-2.5 h-2.5" />
                      <span>{lang === 'bn' ? 'লুকানো (Hidden)' : 'Hidden'}</span>
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-[#13382C]/10 text-[#13382C] border border-[#13382C]/20"
                    >
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                        {item.author}
                      </h4>
                      <span className="text-[11px] text-stone-500">{item.relation}</span>
                    </div>
                  </div>

                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic font-serif-bengali">
                    "{item.message}"
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-400">
                  <span>{item.createdAt}</span>

                  <div className="flex items-center space-x-1">
                    {/* General Like Button */}
                    <button
                      type="button"
                      onClick={() => handleLike(item.id)}
                      className="flex items-center space-x-1 text-[#13382C] hover:scale-105 transition-transform py-1 px-2 rounded-full hover:bg-[#13382C]/5"
                      title="Send Du'a Love"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#13382C]" />
                      <span className="font-semibold text-xs">{item.likes}</span>
                    </button>
                  </div>
                </div>

                {/* Host Moderation Controls on Card */}
                {isHostAuthenticated && (
                  <div className="mt-3 pt-2.5 border-t border-amber-200/70 flex items-center justify-between bg-white/70 px-2 py-1.5 rounded-xl text-xs">
                    {/* Hide/Show Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleHide(item.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        isHidden
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                      title={isHidden ? 'সবার জন্য প্রকাশ করুন' : 'সবার কাছ থেকে লুকান'}
                    >
                      {isHidden ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>{lang === 'bn' ? 'দেখান' : 'Unhide'}</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-stone-500" />
                          <span>{lang === 'bn' ? 'লুকান' : 'Hide'}</span>
                        </>
                      )}
                    </button>

                    {/* Pin/Unpin */}
                    <button
                      type="button"
                      onClick={() => handleTogglePin(item.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        isPinned
                          ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                      title={isPinned ? 'পিন বাতিল' : 'উপরে পিন করুন'}
                    >
                      <Pin className={`w-3 h-3 ${isPinned ? 'fill-amber-600 text-amber-600' : 'text-stone-500'}`} />
                      <span>{isPinned ? (lang === 'bn' ? 'আনপিন' : 'Unpin') : (lang === 'bn' ? 'পিন' : 'Pin')}</span>
                    </button>

                    {/* Delete Permanently */}
                    <button
                      type="button"
                      onClick={() => setItemToDelete(item.id)}
                      className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
