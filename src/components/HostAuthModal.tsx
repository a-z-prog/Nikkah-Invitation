import React, { useState } from 'react';
import { Lock, KeyRound, X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { IslamicStarMotif } from './Ornaments';

interface HostAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentPin: string;
}

export const HostAuthModal: React.FC<HostAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentPin
}) => {
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === currentPin.trim()) {
      setError(false);
      setPinInput('');
      onSuccess();
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden border border-[#C5A059]/40 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-[#13382C] text-[#E8D7B5] flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/60 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#E8D7B5]" />
            </div>
            <div>
              <h3 className="font-serif-bengali font-bold text-sm text-[#FAF9F6]">
                Host Verification
              </h3>
              <p className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold">
                Protected Editor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 border border-[#C5A059]/30 flex items-center justify-center mb-3">
              <KeyRound className="w-6 h-6 text-[#A88338]" />
            </div>
            <h4 className="text-base font-bold text-[#13382C] font-serif-bengali">
              Authorized Host Only
            </h4>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              This wedding invitation details can only be customized by authorized hosts (<span className="font-semibold text-[#13382C]">Mahmudul Hasan Razin</span>).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 text-center">
                Enter Host PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="••••"
                  className="w-full text-center tracking-[0.5em] text-xl font-bold py-3 px-4 rounded-xl border border-stone-300 bg-stone-50 text-[#13382C] focus:bg-white focus:ring-2 focus:ring-[#C5A059] focus:border-[#C5A059] focus:outline-none transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>Incorrect Host PIN. Access is restricted.</span>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={!pinInput.trim()}
                className="w-full py-3 px-4 rounded-xl bg-[#13382C] text-[#E8D7B5] font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-sm hover:bg-[#1B4332] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Verify &amp; Unlock Editor</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 px-3 text-stone-500 hover:text-stone-700 text-xs font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
