'use client';

import Image from 'next/image';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  pricing: string;
  image: string;
  href?: string;
  longDescription?: string;
  features?: string[];
  isExpanded: boolean;
  onExpand: (cardId: string) => void;
}

export default function ServiceCard({
  id,
  title,
  description,
  pricing,
  image,
  href,
  longDescription,
  features,
  isExpanded,
  onExpand
}: ServiceCardProps) {
  const handleToggle = () => {
    onExpand(id);
  };

  return (
    <div className="relative w-full h-80 perspective-1000">
      {/* Card Container with 3D Flip */}
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isExpanded ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of Card (Image View) */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="flex flex-col overflow-hidden transition-all duration-500 ease-in-out card-dark hover:shadow-xl border-glow h-full">
            {/* Image */}
            <div className="relative h-48 bg-gray-dark overflow-hidden w-full">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            
            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
              {/* Title */}
              <h3 className="text-xl font-semibold font-headings text-headings mb-4">{title}</h3>
              
              {/* Description */}
              <p className="mb-4 text-text line-clamp-3 flex-grow">{description}</p>
              
              {/* Button */}
              <div className="mt-auto">
                <button
                  onClick={handleToggle}
                  className="inline-flex items-center font-medium transition-colors duration-200 text-accent hover:text-accent-dark"
                >
                  Les Mer
                  <ChevronDownIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card (Text View) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="flex flex-col overflow-hidden transition-all duration-500 ease-in-out card-dark hover:shadow-xl border-glow h-full">
            {/* Header with accent border */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-accent/20">
              <h3 className="text-xl font-semibold font-headings text-headings">{title}</h3>
              <button
                onClick={handleToggle}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 hover:bg-accent/20 transition-all duration-200 text-accent hover:text-accent-dark hover:scale-105"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4">
              {longDescription && (
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                  <h4 className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">Beskrivelse</h4>
                  <p className="text-sm text-text leading-relaxed">{longDescription}</p>
                </div>
              )}
              
              {features && features.length > 0 && (
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                  <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">Hva vi tilbyr</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-text">
                        <span className="text-accent mr-3 mt-0.5 flex-shrink-0">✓</span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 