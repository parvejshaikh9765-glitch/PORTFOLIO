import React, { useState } from 'react';
import { Camera, MapPin, X } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  category: string;
  location: string;
  partner: string;
  imageUrl: string;
  caption: string;
  altText: string;
}

export const FieldworkMediaGalleryModal: React.FC = () => {
  const mediaItems: MediaItem[] = [
    {
      id: 'med_1',
      title: 'Solapuri GI Tag Artisan Workshop & Co-design Session',
      category: 'Artisan Capacity Building',
      location: 'Solapur, Maharashtra',
      partner: 'Digital Empowerment Foundation (DEF)',
      imageUrl: '/assets/aistudio/_DSC0957_ecba3fd6.JPG',
      caption: 'Direct stakeholder engagement with 300+ traditional weavers documenting heritage Solapuri Chaddar motifs and facilitating digital literacy onboarding.',
      altText: 'Traditional handloom weaver working on Solapuri Chaddar in Solapur'
    },
    {
      id: 'med_2',
      title: 'ICSSR Urban Transport Driver Precarity Survey',
      category: 'Primary Field Research',
      location: 'Mumbai Transport Hubs',
      partner: 'ICSSR & TISS Mumbai',
      imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-11_at_16.59.00_848ca65c.jpeg',
      caption: 'Field research interviewing 100+ migrant taxi, auto-rickshaw, and platform transport workers regarding income vulnerability and social protection access in Mumbai.',
      altText: 'ICSSR primary field intercept interview with migrant taxi driver in Mumbai'
    },
    {
      id: 'med_3',
      title: 'Shahapur Rural Water Infrastructure & Scarcity Survey',
      category: 'Rural Infrastructure & Power BI',
      location: 'Shahapur, Thane',
      partner: 'MySocially Impact Hub',
      imageUrl: '/src/assets/images/shahapur_water_dashboard_1794395650634.jpg',
      caption: 'Ground baseline survey inspecting rural water distress, pipeline breakdowns, and Katkari/Warli tribal hamlets across 42 hamlets in Shahapur Taluka.',
      altText: 'Shahapur rural water scarcity baseline survey and Power BI analytics dashboard'
    }
  ];

  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  return (
    <section className="py-12 md:py-16 bg-[#F5F4EE] dark:bg-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Frame */}
        <div className="bg-white dark:bg-[#1A1D24] rounded-[32px] border border-[#E5E4DD] dark:border-[#272A30] shadow-xs p-8 lg:p-12 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E5E4DD] dark:border-[#272A30]">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#2D4A3E] dark:text-[#6E9E88] mb-2 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                Fieldwork & Academic Archive
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                Field Research & Media Gallery
              </h2>
            </div>
            <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-3 md:mt-0">
              Photographic documentation of ground-level surveys, artisan workshops, and academic field engagements.
            </p>
          </div>

          {/* 3-Card Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer rounded-2xl bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-[#1C1917]">
                    <img
                      src={item.imageUrl}
                      alt={item.altText}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#1C1917]/80 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#1C1917] dark:text-[#F3F4F6] line-clamp-2 leading-snug group-hover:text-[#2D4A3E] dark:group-hover:text-[#6E9E88] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 pt-0 text-[11px] font-medium text-[#78716C] dark:text-[#9CA3AF]">
                  Partner: {item.partner}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Lightbox */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl bg-white dark:bg-[#1A1D24] rounded-2xl overflow-hidden border border-[#E5E4DD] dark:border-[#272A30] shadow-2xl space-y-0">
              
              <div className="relative h-80 sm:h-96 overflow-hidden bg-black">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.altText}
                  className="w-full h-full object-contain bg-black"
                />
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">
                  <span className="uppercase tracking-wider">{activeItem.category}</span>
                  <span>{activeItem.location}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">
                  {activeItem.title}
                </h3>

                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                  {activeItem.caption}
                </p>

                <div className="pt-4 border-t border-[#E5E4DD] dark:border-[#272A30] flex items-center justify-between text-xs text-[#78716C] dark:text-[#9CA3AF]">
                  <span>Partner: {activeItem.partner}</span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] rounded-md cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
