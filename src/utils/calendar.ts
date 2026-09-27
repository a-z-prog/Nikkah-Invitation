import { WeddingEvent } from '../types';

export function getGoogleCalendarUrl(event: WeddingEvent, coupleNames: string): string {
  const title = encodeURIComponent(`${coupleNames} - ${event.nameEn}`);
  const details = encodeURIComponent(
    `${event.descriptionEn}\n\nTime: ${event.timeEn}\nVenue: ${event.venueNameEn}, ${event.addressEn}`
  );
  const location = encodeURIComponent(`${event.venueNameEn}, ${event.addressEn}`);

  // Construct dates string in format YYYYMMDDTHHmmSSZ
  // Event dateStr is like "2026-11-20"
  const cleanDate = event.dateStr.replace(/-/g, '');
  const startDate = `${cleanDate}T120000Z`;
  const endDate = `${cleanDate}T170000Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event: WeddingEvent, coupleNames: string) {
  const cleanDate = event.dateStr.replace(/-/g, '');
  const startDate = `${cleanDate}T120000Z`;
  const endDate = `${cleanDate}T170000Z`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shubho Bibaho//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${coupleNames} - ${event.nameEn}`,
    `DESCRIPTION:${event.descriptionEn.replace(/\n/g, ' ')}`,
    `LOCATION:${event.venueNameEn}, ${event.addressEn}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-wedding-invitation.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
