import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { WeddingData, BlessingEntry, RsvpEntry } from '../types';
import { initialWeddingData, initialBlessings } from '../data/initialWeddingData';

const WEDDING_DOC_ID = 'main';
const WEDDING_COLLECTION = 'wedding';
const BLESSINGS_COLLECTION = 'blessings';
const RSVPS_COLLECTION = 'rsvps';

const LOCAL_BACKUP_KEY = 'nikkah_razin_kanata_cloud_cache_v1';

/**
 * Real-time listener for the wedding invitation details.
 * Whenever the host updates details, all connected devices (guests & hosts)
 * receive the update instantaneously.
 */
export function subscribeWeddingData(
  onUpdate: (data: WeddingData) => void,
  onError?: (err: unknown) => void
): () => void {
  const docRef = doc(db, WEDDING_COLLECTION, WEDDING_DOC_ID);

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const cloudData = snapshot.data() as Partial<WeddingData>;
        let events = cloudData.events && cloudData.events.length > 0 ? cloudData.events : initialWeddingData.events;
        let needsCloudUpdate = false;

        // Automatically upgrade any legacy "Aqd" or "Majlis" references to Walima
        events = events.map(ev => {
          let updated = { ...ev };
          let changed = false;
          if (ev.nameEn?.toLowerCase().includes('aqd') || ev.nameBn?.includes('আকদ') || ev.id === 'nikkah') {
            updated.id = 'walima';
            updated.nameBn = 'ওয়ালিমা ও প্রীতিভোজ';
            updated.nameEn = 'Walima Ceremony';
            updated.descriptionBn = 'রাসূলুল্লাহ (সা.)-এর পবিত্র সুন্নাহ অনুযায়ী ওয়ালিমা ও প্রীতিভোজের আয়োজন। আপনাদের আন্তরিক উপস্থিতি ও দোয়া একান্ত কাম্য। (বিশেষ অনুরোধ: কনের ছবি বা ভিডিও তোলা সম্পূর্ণ নিষেধ)।';
            updated.descriptionEn = 'The blessed Walima feast organized in accordance with the prophetic Sunnah. We warmly invite you to join us with prayers and love. (Special Request: Strictly no photography or videography of the bride).';
            changed = true;
          }
          if (updated.timeEn?.toLowerCase().includes('majlis') || updated.timeEn?.toLowerCase().includes('nikkah')) {
            updated.timeEn = '12:00 PM (Walima Ceremony & Feast)';
            changed = true;
          }
          if (updated.timeBn?.includes('আকদ') || updated.timeBn?.includes('মজলিস') || updated.timeBn?.toLowerCase().includes('majlis')) {
            updated.timeBn = 'দুপুর ১২:০০ টা (ওয়ালিমা ও প্রীতিভোজ)';
            changed = true;
          }
          if (changed) {
            needsCloudUpdate = true;
          }
          return updated;
        });

        let taglineBn = cloudData.weddingTaglineBn || initialWeddingData.weddingTaglineBn;
        let taglineEn = cloudData.weddingTaglineEn || initialWeddingData.weddingTaglineEn;
        if (taglineBn.includes('নিকাহ ও')) {
          taglineBn = initialWeddingData.weddingTaglineBn;
          needsCloudUpdate = true;
        }
        if (taglineEn.includes('United in Nikkah')) {
          taglineEn = initialWeddingData.weddingTaglineEn;
          needsCloudUpdate = true;
        }

        const merged: WeddingData = {
          ...initialWeddingData,
          ...cloudData,
          weddingTaglineBn: taglineBn,
          weddingTaglineEn: taglineEn,
          events
        };

        if (needsCloudUpdate) {
          saveWeddingDataToCloud(merged).catch(() => {});
        }

        // Cache locally for offline resilience
        try {
          localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(merged));
        } catch (e) {
          // ignore storage quota error
        }

        onUpdate(merged);
      } else {
        // Document does not exist in Firestore yet: seed initial data to cloud
        saveWeddingDataToCloud(initialWeddingData).catch(() => {});
        onUpdate(initialWeddingData);
      }
    },
    (error) => {
      console.warn('Firestore snapshot error, falling back to cached/default data:', error);
      onError?.(error);
    }
  );
}

/**
 * Saves wedding data to Firestore so every guest across the globe sees it in real-time.
 */
export async function saveWeddingDataToCloud(data: WeddingData): Promise<void> {
  const docRef = doc(db, WEDDING_COLLECTION, WEDDING_DOC_ID);
  const payload = {
    ...data,
    updatedAt: new Date().toISOString()
  };

  // Cache locally first for instant feedback
  try {
    localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(payload));
  } catch (e) {}

  await setDoc(docRef, payload, { merge: true });
}

/**
 * Subscribe to real-time Guest Blessings & Prayers
 */
export function subscribeBlessings(
  onUpdate: (blessings: BlessingEntry[]) => void
): () => void {
  const q = query(collection(db, BLESSINGS_COLLECTION), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as BlessingEntry[];
        onUpdate(items);
      } else {
        onUpdate(initialBlessings);
      }
    },
    (error) => {
      console.warn('Blessings fetch error, using initial blessings:', error);
      onUpdate(initialBlessings);
    }
  );
}

/**
 * Add a new guest blessing to Firestore
 */
export async function addBlessingToCloud(entry: Omit<BlessingEntry, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, BLESSINGS_COLLECTION), {
    ...entry,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

/**
 * Update a blessing (e.g. host likes or pins)
 */
export async function updateBlessingInCloud(id: string, updates: Partial<BlessingEntry>): Promise<void> {
  const docRef = doc(db, BLESSINGS_COLLECTION, id);
  await updateDoc(docRef, updates);
}

/**
 * Delete a blessing (host moderation)
 */
export async function deleteBlessingFromCloud(id: string): Promise<void> {
  const docRef = doc(db, BLESSINGS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Helper to compress user photos before uploading to Firestore
 */
export function compressImage(file: File, maxDim = 800, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
