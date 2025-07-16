"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageData {
  id: number;
  url: string;
  title: string;
  description: string;
  photographer: string;
}

const images: ImageData[] = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Paysage Montagneux',
    description: 'Une vue spectaculaire des montagnes au coucher du soleil',
    photographer: 'Simon Berger'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Océan Tropical',
    description: 'Eaux cristallines et plage de sable blanc',
    photographer: 'Jeremy Bishop'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Forêt Mystique',
    description: 'Sentier enchanteur à travers la forêt dense',
    photographer: 'Johannes Plenio'
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Aurore Boréale',
    description: 'Spectacle magique des lumières du nord',
    photographer: 'Tobias Bjørkli'
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/1209798/pexels-photo-1209798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Désert Doré',
    description: 'Dunes de sable ondulantes sous le soleil',
    photographer: 'Taryn Elliott'
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isPlaying && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">
            Galerie d'Images
          </h1>
          <p className="text-blue-200 text-center text-lg">
            Découvrez une collection de paysages époustouflants
          </p>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <Card className="relative overflow-hidden rounded-3xl shadow-2xl bg-black/20 backdrop-blur-sm border-white/10">
          <div 
            className="relative h-[60vh] md:h-[70vh] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Image Container */}
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </Button>

            {/* Play/Pause Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <Play className="h-4 w-4 text-white" />
              )}
            </Button>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 transform translate-y-0 transition-transform duration-500">
                {images[currentIndex].title}
              </h2>
              <p className="text-lg opacity-90 mb-1">
                {images[currentIndex].description}
              </p>
              <p className="text-sm opacity-70">
                Par {images[currentIndex].photographer}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </Card>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-blue-400 scale-105' 
                  : 'hover:scale-102 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-20 md:h-24 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-white text-xs font-medium truncate">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{images.length}</div>
              <div className="text-blue-200">Images</div>
            </div>
          </Card>
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">4K</div>
              <div className="text-blue-200">Résolution</div>
            </div>
          </Card>
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-blue-200">Défilement</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}