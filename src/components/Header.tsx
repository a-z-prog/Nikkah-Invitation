import React, { useState } from 'react';
import { Menu, X, Edit3, Download, Lock } from 'lucide-react';
import { Language, WeddingData } from '../types';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  data: WeddingData;
  onOpenEdit: () => void;
  onOpenCard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  data,
  onOpenEdit,
  onOpenCard
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#events', labelBn: 'অনুষ্ঠান সূচি', labelEn: 'Events' },
    { href: '#couple', labelBn: 'কনে ও বর', labelEn: 'Couple' },
    { href: '#wishes', labelBn: 'দোয়া ও শুভেচ্ছা', labelEn: 'Du\'a & Wishes' },
    { href: '#info', labelBn: 'সুন্নাহ ও নির্দেশনা', labelEn: 'Guest Guide' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#C5A059]/20 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Monogram / Brand */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border border-[#C5A059]/50 bg-[#13382C] text-[#E8D7B5] flex items-center justify-center font-cinzel font-semibold text-xs sm:text-sm tracking-wider shadow-sm group-hover:border-[#C5A059] transition-all">
            {data.monogram}
          </div>
          <div>
            <div className="font-serif-bengali font-bold text-sm sm:text-base text-[#13382C] leading-tight">
              Razin &amp; Kaneta
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#A88338] font-sans-ui tracking-wider uppercase font-medium">
              {lang === 'bn' ? 'ওয়ালিমা ও প্রীতিভোজ' : 'Walima Feast'}
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium text-[#33463E]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#13382C] transition-colors relative py-1 hover:border-b-2 hover:border-[#C5A059]"
            >
              {lang === 'bn' ? link.labelBn : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Digital Card Preview */}
          <button
            onClick={onOpenCard}
            title={lang === 'bn' ? 'ডিজিটাল আমন্ত্রণপত্র দেখুন ও সেভ করুন' : 'View & Save Digital Invitation'}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-[#C5A059]/40 bg-white text-[#13382C] text-xs font-semibold hover:border-[#C5A059] shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#A88338]" />
            <span>{lang === 'bn' ? 'ডিজিটাল কার্ড' : 'Card'}</span>
          </button>

          {/* Host Protected Edit Details Trigger */}
          <button
            onClick={onOpenEdit}
            title="Host Only: Protected by Secret PIN (Mahmudul Hasan Razin)"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#C5A059]/40 bg-white text-[#13382C] text-xs font-semibold hover:border-[#C5A059] hover:bg-[#13382C]/5 transition-all shadow-2xs"
          >
            <Lock className="w-3 h-3 text-[#A88338]" />
            <span className="hidden sm:inline">Host Edit</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#13382C] hover:bg-stone-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-5 bg-white border-b border-[#C5A059]/20 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-[#2D3E35] font-medium text-sm hover:bg-[#13382C]/5 hover:text-[#13382C]"
              >
                {lang === 'bn' ? link.labelBn : link.labelEn}
              </a>
            ))}
            <div className="pt-3 border-t border-stone-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCard();
                }}
                className="flex-1 py-2.5 px-3 bg-[#13382C] text-[#E8D7B5] rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডিজিটাল কার্ড দেখুন' : 'View Digital Card'}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEdit();
                }}
                className="py-2.5 px-3 border border-[#C5A059]/40 rounded-xl text-xs font-semibold text-[#13382C] flex items-center justify-center space-x-1.5 bg-stone-50"
              >
                <Lock className="w-3.5 h-3.5 text-[#A88338]" />
                <span>Host Edit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
