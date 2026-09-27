import React, { useState } from 'react';
import { X, Save, RotateCcw, Sparkles, Lock, KeyRound, Check, Camera, Upload } from 'lucide-react';
import { WeddingData, Language } from '../types';
import { initialWeddingData } from '../data/initialWeddingData';

interface EditDetailsModalProps {
  data: WeddingData;
  lang: Language;
  onSave: (updated: WeddingData) => void;
  onClose: () => void;
  currentPin: string;
  onUpdatePin: (newPin: string) => void;
}

export const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  data,
  lang,
  onSave,
  onClose,
  currentPin,
  onUpdatePin
}) => {
  const [formData, setFormData] = useState<WeddingData>({ ...data });
  const [newPin, setNewPin] = useState(currentPin);
  const [pinSavedToast, setPinSavedToast] = useState(false);
  const [venueAddress, setVenueAddress] = useState(
    formData.events?.[0]?.addressEn || 'Anis bari, East Gatiadenga, Satkania, Chattogram, Bangladesh'
  );

  const handleChange = (field: keyof WeddingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({ ...initialWeddingData });
    setVenueAddress(initialWeddingData.events[0]?.addressEn || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim() && newPin.trim() !== currentPin.trim()) {
      onUpdatePin(newPin.trim());
    }

    const dateObj = new Date(formData.weddingDate);
    const dateStr = !isNaN(dateObj.getTime())
      ? formData.weddingDate.substring(0, 10)
      : '2026-10-10';

    const formattedTime = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' (Nikkah Majlis)'
      : '12:00 PM (Nikkah Majlis)';

    const currentEvent = (formData.events && formData.events[0]) || initialWeddingData.events[0];
    const finalAddress = venueAddress.trim() || `${formData.mainVenueEn}, ${formData.mainVenueCityEn}`;

    const updatedEvent = {
      ...currentEvent,
      dateStr,
      timeEn: formattedTime,
      timeBn: formattedTime,
      venueNameEn: formData.mainVenueEn,
      venueNameBn: formData.mainVenueEn,
      addressEn: finalAddress,
      addressBn: finalAddress,
      mapLink: `https://maps.google.com/?q=${encodeURIComponent(formData.mainVenueEn + ' ' + formData.mainVenueCityEn)}`
    };

    onSave({
      ...formData,
      events: [updatedEvent]
    });
    onClose();
  };

  const handleSavePinOnly = () => {
    if (newPin.trim()) {
      onUpdatePin(newPin.trim());
      setPinSavedToast(true);
      setTimeout(() => setPinSavedToast(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#C5A059]/40 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-[#13382C] text-[#E8D7B5] flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/50">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="font-serif-bengali font-bold text-base text-[#FAF9F6]">
                Customize Wedding Invitation
              </h3>
              <p className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold">
                Host Admin Mode (Mahmudul Hasan Razin)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          {/* Host PIN Security Card */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-[#C5A059]/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#A88338]" />
                <h4 className="font-bold text-sm text-[#13382C]">
                  Host Security PIN (Only you can edit)
                </h4>
              </div>
              {pinSavedToast && (
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>PIN Updated!</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-600 mb-3 leading-relaxed">
              To prevent guests and visitors from altering your wedding details, this PIN is required to open the editor.
            </p>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Enter 4-8 digit PIN"
                  className="w-full px-3 py-2 rounded-xl border border-[#C5A059]/40 bg-white font-mono font-bold tracking-widest text-stone-800 focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSavePinOnly}
                className="px-3.5 py-2 rounded-xl bg-[#13382C] text-[#E8D7B5] font-semibold text-xs hover:bg-[#1B4332] transition-colors"
              >
                Set PIN
              </button>
            </div>
          </div>

          {/* Groom Section */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200">
            <h4 className="font-bold text-sm text-[#13382C] mb-3">
              Groom Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Groom Name</label>
                <input
                  type="text"
                  value={formData.groomNameEn}
                  onChange={(e) => handleChange('groomNameEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Parents' Names</label>
                <input
                  type="text"
                  value={formData.groomParentsEn}
                  onChange={(e) => handleChange('groomParentsEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-stone-700 font-medium mb-1">Groom Bio / Residence</label>
              <textarea
                rows={2}
                value={formData.groomBioEn}
                onChange={(e) => handleChange('groomBioEn', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>

            {/* Groom Photo Management */}
            <div className="mt-4 pt-3 border-t border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-stone-700 font-semibold">
                  Groom Photo (বরের ছবি)
                </label>
                <span className="text-[11px] text-stone-500">PNG / JPG supported</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A059] shrink-0 shadow-xs bg-stone-100">
                  <img
                    src={formData.groomPhoto || initialWeddingData.groomPhoto}
                    alt="Groom Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-3.5 py-1.5 rounded-xl bg-[#13382C] text-[#E8D7B5] hover:bg-[#1B4332] text-xs font-semibold cursor-pointer flex items-center space-x-1.5 transition-all shadow-xs">
                      <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>গ্যালারি থেকে নতুন ছবি আপলোড</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                handleChange('groomPhoto', reader.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    {formData.groomPhoto !== initialWeddingData.groomPhoto && (
                      <button
                        type="button"
                        onClick={() => handleChange('groomPhoto', initialWeddingData.groomPhoto)}
                        className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-medium transition-colors"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>
                  <input
                    type="url"
                    value={formData.groomPhoto}
                    onChange={(e) => handleChange('groomPhoto', e.target.value)}
                    placeholder="অথবা ইমেজের ওয়েব লিংক (Image URL)"
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-[11px] text-stone-600 focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bride Section */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200">
            <h4 className="font-bold text-sm text-[#13382C] mb-3">
              Bride Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Bride Name</label>
                <input
                  type="text"
                  value={formData.brideNameEn}
                  onChange={(e) => handleChange('brideNameEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Parents' Names (Optional)</label>
                <input
                  type="text"
                  value={formData.brideParentsEn}
                  onChange={(e) => handleChange('brideParentsEn', e.target.value)}
                  placeholder="Optional"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-stone-700 font-medium mb-1">Bride Bio / Message</label>
              <textarea
                rows={2}
                value={formData.brideBioEn}
                onChange={(e) => handleChange('brideBioEn', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          {/* Date, Monogram & Main Venue */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200">
            <h4 className="font-bold text-sm text-[#13382C] mb-3">
              Wedding Date &amp; Venue
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Wedding Date &amp; Time</label>
                <input
                  type="datetime-local"
                  value={formData.weddingDate.substring(0, 16)}
                  onChange={(e) => handleChange('weddingDate', `${e.target.value}:00`)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Monogram Badge</label>
                <input
                  type="text"
                  value={formData.monogram}
                  onChange={(e) => handleChange('monogram', e.target.value)}
                  placeholder="R & K"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-stone-700 font-medium mb-1">Venue Name</label>
              <input
                type="text"
                value={formData.mainVenueEn}
                onChange={(e) => handleChange('mainVenueEn', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>

            <div className="mt-3">
              <label className="block text-stone-700 font-medium mb-1">City / Region</label>
              <input
                type="text"
                value={formData.mainVenueCityEn}
                onChange={(e) => handleChange('mainVenueCityEn', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>

            <div className="mt-3">
              <label className="block text-stone-700 font-medium mb-1">Full Venue Address</label>
              <input
                type="text"
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
                placeholder="Anis bari, East Gatiadenga, Satkania, Chattogram"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          {/* Family Contact Numbers */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-4">
            <div>
              <h4 className="font-bold text-sm text-[#13382C]">
                Family Contact Details (পারিবারিক যোগাযোগ)
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                আমন্ত্রিত মেহমানদের সহায়তায় বর ও কনে উভয় পরিবারের যোগাযোগের নম্বর যোগ করুন।
              </p>
            </div>

            {/* Groom's Family Contact */}
            <div className="p-3 rounded-xl bg-white border border-stone-200/90 shadow-2xs">
              <div className="text-[11px] font-bold text-[#13382C] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#13382C]"></span>
                <span>Groom's Family (বরপক্ষ)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 text-xs font-medium mb-1">Contact Name &amp; Relation</label>
                  <input
                    type="text"
                    value={formData.contactName1}
                    onChange={(e) => handleChange('contactName1', e.target.value)}
                    placeholder="Maulana Abdul Aziz (Groom's Father)"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-[#FAF9F6] focus:bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 text-xs font-medium mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.contactPhone1}
                    onChange={(e) => handleChange('contactPhone1', e.target.value)}
                    placeholder="01874753644"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-[#FAF9F6] focus:bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bride's Family Contact */}
            <div className="p-3 rounded-xl bg-white border border-stone-200/90 shadow-2xs">
              <div className="text-[11px] font-bold text-[#A88338] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A88338]"></span>
                <span>Bride's Family (কনেপক্ষ)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 text-xs font-medium mb-1">Contact Name &amp; Relation</label>
                  <input
                    type="text"
                    value={formData.contactName2 || ''}
                    onChange={(e) => handleChange('contactName2', e.target.value)}
                    placeholder="e.g. Bride's Guardian / Father / Brother"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-[#FAF9F6] focus:bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 text-xs font-medium mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.contactPhone2 || ''}
                    onChange={(e) => handleChange('contactPhone2', e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-[#FAF9F6] focus:bg-white focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer controls */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 flex items-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Default</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#13382C] text-[#E8D7B5] font-semibold shadow-xs hover:bg-[#1B4332] flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
