import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Language, GalleryPhoto } from '../types';
import { initialGallery } from '../data/initialWeddingData';
import { FloralDivider, IslamicStarMotif } from './Ornaments';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [photos] = useState<GalleryPhoto[]>(initialGallery);
  const [activeTag, setActiveTag] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const tags = [
    { id: 'all', labelBn: 'সকল ছবি', labelEn: 'All Photos' },
    { id: 'বাগদান', labelBn: 'পারিবারিক সম্মতি', labelEn: 'Families' },
    { id: 'আংটি বদল', labelBn: 'স্মারক', labelEn: 'Keepsakes' },
    { id: 'দোয়া', labelBn: 'দোয়া ও মোনাজাত', labelEn: 'Du\'a & Prayers' },
    { id: 'পোর্ট্রেট', labelBn: 'পোর্ট্রেট', labelEn: 'Portraits' }
  ];

  const filteredPhotos =
    activeTag === 'all'
      ? photos
      : photos.filter((p) => p.tagBn === activeTag || p.tagEn.toLowerCase() === activeTag.toLowerCase());

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) =>
        prev === 0 ? filteredPhotos.length - 1 : (prev ?? 1) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) =>
        prev === filteredPhotos.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 bg-[#FAF9F6] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#13382C]/5 border border-[#C5A059]/30 text-[#A88338] text-[11px] font-semibold uppercase tracking-widest mb-2">
            <IslamicStarMotif className="w-3 h-3 text-[#C5A059]" />
            <span>{lang === 'bn' ? 'মধুর স্মৃতিমালা' : 'Treasured Moments'}</span>
            <IslamicStarMotif className="w-3 h-3 text-[#C5A059]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif-bengali text-[#13382C] mt-1">
            {lang === 'bn' ? 'স্মরণীয় মুহূর্ত ও স্থিরচিত্র' : 'Gallery of Memories'}
          </h2>
          <FloralDivider className="my-3" />
          <p className="text-stone-500 max-w-xl mx-auto text-xs sm:text-sm font-serif-bengali">
            {lang === 'bn'
              ? 'দুই পরিবারের দোয়া, পারিবারিক মেলবন্ধন ও আনন্দঘন আয়োজনের কিছু স্থিরচিত্র।'
              : 'Cherished memories from the engagement, prayer gatherings, and family celebrations.'}
          </p>

          {/* Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeTag === tag.id
                    ? 'bg-[#13382C] text-[#E8D7B5] border-[#13382C] shadow-2xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                }`}
              >
                {lang === 'bn' ? tag.labelBn : tag.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-52 sm:h-72 rounded-3xl overflow-hidden cursor-pointer bg-stone-100 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-[#C5A059]/60 transition-all"
            >
              <img
                src={photo.url}
                alt={photo.captionEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#E8D7B5] font-semibold">
                  {lang === 'bn' ? photo.tagBn : photo.tagEn}
                </span>
                <p className="text-xs sm:text-sm font-serif-bengali font-bold leading-tight mt-0.5">
                  {lang === 'bn' ? photo.captionBn : photo.captionEn}
                </p>
                <div className="mt-2 flex items-center space-x-1 text-[11px] text-white/80">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'বড় করে দেখুন' : 'View Full'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
          >
            {/* Close */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={filteredPhotos[selectedPhotoIndex].url}
              alt="Full Preview"
              className="max-h-[75vh] w-auto object-contain rounded-2xl border border-stone-700 shadow-2xl"
            />

            <div className="mt-4 text-center text-white">
              <p className="text-sm sm:text-base font-serif-bengali font-bold">
                {lang === 'bn'
                  ? filteredPhotos[selectedPhotoIndex].captionBn
                  : filteredPhotos[selectedPhotoIndex].captionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
