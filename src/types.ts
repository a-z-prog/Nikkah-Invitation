export type Language = 'bn' | 'en';

export interface WeddingEvent {
  id: string;
  nameBn: string;
  nameEn: string;
  dateStr: string; // ISO date string e.g. "2026-11-20"
  timeBn: string;
  timeEn: string;
  venueNameBn: string;
  venueNameEn: string;
  addressBn: string;
  addressEn: string;
  mapLink: string;
  dressCodeBn: string;
  dressCodeEn: string;
  colorScheme: string; // e.g. 'amber', 'rose', 'indigo'
  descriptionBn: string;
  descriptionEn: string;
}

export interface WeddingData {
  groomNameBn: string;
  groomNameEn: string;
  groomParentsBn: string;
  groomParentsEn: string;
  groomBioBn: string;
  groomBioEn: string;
  groomPhoto: string;

  brideNameBn: string;
  brideNameEn: string;
  brideParentsBn: string;
  brideParentsEn: string;
  brideBioBn: string;
  brideBioEn: string;
  bridePhoto: string;

  monogram: string;
  weddingDate: string; // ISO format e.g. "2026-11-21T18:00:00"
  weddingTaglineBn: string;
  weddingTaglineEn: string;
  blessingHeaderBn: string;
  blessingHeaderEn: string;
  blessingVerseBn: string;
  blessingVerseEn: string;
  bismillahAr?: string;
  quranVerseAr?: string;
  propheticDuaAr?: string;
  propheticDuaBn?: string;
  propheticDuaEn?: string;

  mainVenueBn: string;
  mainVenueEn: string;
  mainVenueCityBn: string;
  mainVenueCityEn: string;

  contactPhone1: string;
  contactName1: string;
  contactPhone2: string;
  contactName2: string;

  events: WeddingEvent[];
}

export interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  attending: 'yes' | 'no';
  eventsAttending: string[]; // event IDs
  guestsCount: number;
  dietPreference: string;
  message?: string;
  createdAt: string;
}

export interface BlessingEntry {
  id: string;
  author: string;
  relation: string;
  message: string;
  likes: number;
  createdAt: string;
  avatarBg: string;
  hidden?: boolean;
  pinned?: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  captionBn: string;
  captionEn: string;
  tagBn: string;
  tagEn: string;
}
