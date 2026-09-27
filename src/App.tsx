import React, { useState, useEffect } from 'react';
import { Language, WeddingData } from './types';
import { initialWeddingData } from './data/initialWeddingData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoupleSection } from './components/CoupleSection';
import { EventsSchedule } from './components/EventsSchedule';
import { WishesSection } from './components/WishesSection';
import { InfoFaqSection } from './components/InfoFaqSection';
import { Footer } from './components/Footer';
import { DigitalCardModal } from './components/DigitalCardModal';
import { EditDetailsModal } from './components/EditDetailsModal';
import { HostAuthModal } from './components/HostAuthModal';
import { Download, Sparkles } from 'lucide-react';

const WEDDING_DATA_KEY = 'nikkah_razin_kanata_photo_v7';
const LANG_KEY = 'blessed_nikkah_lang_en_v4';
const HOST_PIN_KEY = 'blessed_nikkah_host_pin_v1';
const DEFAULT_HOST_PIN = '7860';

// Helper to strictly sanitize events and keep ceremonies synchronized with wedding date and venue
function sanitizeWeddingData(raw: any): WeddingData {
  if (!raw || typeof raw !== 'object') {
    return initialWeddingData;
  }

  const rawTagline = typeof raw.weddingTaglineEn === 'string'
    ? raw.weddingTaglineEn.replace(/blessed nikkah/gi, 'Nikkah').replace(/sacred nikkah/gi, 'Nikkah').replace(/blessed/gi, '')
    : initialWeddingData.weddingTaglineEn;

  const groomPhoto = (raw.groomPhoto && !raw.groomPhoto.includes('unsplash.com/photo-1583939003579'))
    ? raw.groomPhoto
    : initialWeddingData.groomPhoto;

  const weddingDate = raw.weddingDate || initialWeddingData.weddingDate;
  const d = new Date(weddingDate);
  const dateStr = !isNaN(d.getTime()) ? weddingDate.substring(0, 10) : '2026-10-10';
  const timeStr = !isNaN(d.getTime())
    ? d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' (Nikkah Majlis)'
    : '12:00 PM (Nikkah Majlis)';

  const venueNameEn = raw.mainVenueEn || initialWeddingData.mainVenueEn;
  const venueNameBn = raw.mainVenueBn || venueNameEn;
  const cityEn = raw.mainVenueCityEn || initialWeddingData.mainVenueCityEn;

  let existingEvent = (Array.isArray(raw.events) && raw.events[0]) ? raw.events[0] : initialWeddingData.events[0];
  const addressEn = existingEvent.addressEn && !existingEvent.addressEn.includes('Dhaka Cantonment')
    ? existingEvent.addressEn
    : (raw.mainVenueEn ? `${raw.mainVenueEn}, ${cityEn}` : initialWeddingData.events[0].addressEn);

  const syncedEvent = {
    ...initialWeddingData.events[0],
    ...existingEvent,
    dateStr,
    timeEn: timeStr,
    timeBn: timeStr,
    venueNameEn,
    venueNameBn,
    addressEn,
    addressBn: addressEn,
    mapLink: `https://maps.google.com/?q=${encodeURIComponent(venueNameEn + ' ' + cityEn)}`
  };

  const brideBioEn = (raw.brideBioEn && raw.brideBioEn !== 'Embarking on this blissful new journey of marriage.' && raw.brideBioEn !== '')
    ? raw.brideBioEn
    : initialWeddingData.brideBioEn;
  const brideBioBn = (raw.brideBioBn && raw.brideBioBn !== 'আল্লাহর অশেষ রহমতে জীবনের নতুন অধ্যায়ে পদার্পণ।' && raw.brideBioBn !== '')
    ? raw.brideBioBn
    : initialWeddingData.brideBioBn;

  return {
    ...initialWeddingData,
    ...raw,
    groomPhoto,
    brideBioEn,
    brideBioBn,
    weddingDate,
    mainVenueEn: venueNameEn,
    mainVenueBn: venueNameBn,
    mainVenueCityEn: cityEn,
    weddingTaglineEn: rawTagline,
    events: [syncedEvent]
  };
}

export default function App() {
  // Purely English as requested by user ("ভাষা হবে অনলি ইংলিশ")
  const [lang, setLang] = useState<Language>('en');

  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    // Purge any stale legacy localStorage items from user's device
    try {
      localStorage.removeItem('blessed_nikkah_razin_kanata_en_v1');
      localStorage.removeItem('blessed_nikkah_razin_kanata_en_v2');
      localStorage.removeItem('blessed_nikkah_razin_kanata_en_v3');
      localStorage.removeItem('blessed_nikkah_pure_v6');
      localStorage.removeItem('blessed_nikkah_lang_v6');
      localStorage.removeItem('shubho_bibaho_custom_wedding_data');
      localStorage.removeItem('shubho_bibaho_custom_wedding_data_v1');
      localStorage.removeItem('islamic_nikkah_pure_v2');
      localStorage.removeItem('shubho_bibaho_language');
    } catch (e) {
      // Ignore browser privacy sandboxing errors
    }

    const saved = localStorage.getItem(WEDDING_DATA_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return sanitizeWeddingData(parsed);
      } catch (e) {
        return initialWeddingData;
      }
    }
    return initialWeddingData;
  });

  // Ensure any cached legacy data in browser is completely cleaned on mount
  useEffect(() => {
    try {
      localStorage.removeItem('blessed_nikkah_razin_kanata_en_v1');
      localStorage.removeItem('blessed_nikkah_razin_kanata_en_v2');
      localStorage.removeItem('blessed_nikkah_razin_kanata_en_v3');
      localStorage.removeItem('blessed_nikkah_pure_v6');
      localStorage.removeItem('blessed_nikkah_lang_v6');
      localStorage.removeItem('shubho_bibaho_custom_wedding_data');
      localStorage.removeItem('shubho_bibaho_custom_wedding_data_v1');
      localStorage.removeItem('islamic_nikkah_pure_v2');
      localStorage.removeItem('shubho_bibaho_language');
    } catch (e) {}
  }, []);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHostAuthenticated, setIsHostAuthenticated] = useState(false);
  const [hostPin, setHostPin] = useState<string>(() => {
    try {
      return localStorage.getItem(HOST_PIN_KEY) || DEFAULT_HOST_PIN;
    } catch (e) {
      return DEFAULT_HOST_PIN;
    }
  });

  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  };

  const handleOpenEdit = () => {
    if (isHostAuthenticated) {
      setIsEditOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsHostAuthenticated(true);
    setIsAuthModalOpen(false);
    setIsEditOpen(true);
  };

  const handleUpdatePin = (newPin: string) => {
    setHostPin(newPin);
    try {
      localStorage.setItem(HOST_PIN_KEY, newPin);
    } catch (e) {}
  };

  const handleSaveWeddingData = (updated: WeddingData) => {
    const sanitized = sanitizeWeddingData(updated);
    setWeddingData(sanitized);
    try {
      localStorage.setItem(WEDDING_DATA_KEY, JSON.stringify(sanitized));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#13382C] font-sans selection:bg-[#C5A059]/20 selection:text-[#13382C]">
      {/* Navigation Header */}
      <Header
        lang={lang}
        onLanguageChange={handleLanguageChange}
        data={weddingData}
        onOpenEdit={handleOpenEdit}
        onOpenCard={() => setIsCardOpen(true)}
      />

      {/* Main Wedding Content */}
      <main className="flex-1">
        {/* Royal Hero & Inscription */}
        <Hero
          data={weddingData}
          lang={lang}
          onOpenCard={() => setIsCardOpen(true)}
        />

        {/* Ceremonies & Schedule */}
        <EventsSchedule
          data={weddingData}
          lang={lang}
        />

        {/* Meet the Bride & Groom */}
        <CoupleSection
          data={weddingData}
          lang={lang}
          isHostAuthenticated={isHostAuthenticated}
          onUpdateGroomPhoto={(newUrl) => {
            handleSaveWeddingData({ ...weddingData, groomPhoto: newUrl });
          }}
        />

        {/* Warm Wishes & Blessings Board */}
        <WishesSection
          lang={lang}
          isHostAuthenticated={isHostAuthenticated}
          onRequireAuth={() => setIsAuthModalOpen(true)}
        />

        {/* Important Guest FAQs & Guidelines */}
        <InfoFaqSection
          data={weddingData}
          lang={lang}
        />
      </main>

      {/* Royal Footer */}
      <Footer
        data={weddingData}
        lang={lang}
        onOpenCard={() => setIsCardOpen(true)}
      />

      {/* Printable Digital Card Modal */}
      {isCardOpen && (
        <DigitalCardModal
          data={weddingData}
          lang={lang}
          onClose={() => setIsCardOpen(false)}
        />
      )}

      {/* Host Verification Passcode Modal */}
      <HostAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        currentPin={hostPin}
      />

      {/* Edit Details Customizer Modal (Host Only) */}
      {isEditOpen && (
        <EditDetailsModal
          data={weddingData}
          lang={lang}
          onSave={handleSaveWeddingData}
          onClose={() => setIsEditOpen(false)}
          currentPin={hostPin}
          onUpdatePin={handleUpdatePin}
        />
      )}
    </div>
  );
}
