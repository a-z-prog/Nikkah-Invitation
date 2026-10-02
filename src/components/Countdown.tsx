import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface CountdownProps {
  targetDate: string;
  lang: Language;
}

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number): string {
  const str = Math.max(0, num).toString().padStart(2, '0');
  return str
    .split('')
    .map((char) => {
      const parsed = parseInt(char, 10);
      return !isNaN(parsed) ? bnDigits[parsed] : char;
    })
    .join('');
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, lang }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculate = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    {
      val: timeLeft.days,
      labelBn: 'দিন',
      labelEn: 'Days'
    },
    {
      val: timeLeft.hours,
      labelBn: 'ঘণ্টা',
      labelEn: 'Hours'
    },
    {
      val: timeLeft.minutes,
      labelBn: 'মিনিট',
      labelEn: 'Mins'
    },
    {
      val: timeLeft.seconds,
      labelBn: 'সেকেন্ড',
      labelEn: 'Secs'
    }
  ];

  return (
    <div className="w-full max-w-sm mx-auto my-3">
      <div className="text-center mb-3">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#A88338] font-semibold">
          {lang === 'bn' ? 'পবিত্র ওয়ালিমা লগ্নের অপেক্ষা' : 'Countdown to Walima Celebration'}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {units.map((unit, index) => {
          const displayVal =
            lang === 'bn'
              ? toBengaliNumber(unit.val)
              : Math.max(0, unit.val).toString().padStart(2, '0');

          return (
            <div
              key={index}
              className="py-2.5 px-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs"
            >
              <div className="text-xl sm:text-2xl font-bold font-serif-bengali text-[#13382C] tabular-nums tracking-tight">
                {displayVal}
              </div>
              <div className="text-[10px] font-medium text-stone-500 uppercase tracking-wider mt-0.5">
                {lang === 'bn' ? unit.labelBn : unit.labelEn}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
