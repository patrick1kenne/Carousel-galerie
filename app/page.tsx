"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Download, Camera, MapPin, Calendar } from 'lucide-react';
import { useEffect } from 'react';

interface ImageData {
  id: number;
  url: string;
  title: string;
  description: string;
  photographer: string;
  location: string;
  date: string;
  category: string;
  likes: number;
}

const images: ImageData[] = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Sommet Alpin Majestueux',
    description: 'Une vue époustouflante des sommets alpins baignés dans la lumière dorée du coucher de soleil, créant un spectacle naturel inoubliable.',
    photographer: 'Simon Berger',
    location: 'Alpes Suisses',
    date: '15 Mars 2024',
    category: 'Montagne',
    likes: 1247
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Paradis Tropical',
    description: 'Eaux cristallines turquoise rencontrant une plage de sable blanc immaculé, entourée de palmiers ondulants sous la brise marine.',
    photographer: 'Jeremy Bishop',
    location: 'Maldives',
    date: '8 Avril 2024',
    category: 'Océan',
    likes: 2156
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Forêt Enchantée',
    description: 'Un sentier mystérieux serpentant à travers une forêt dense où les rayons de soleil filtrent à travers la canopée verdoyante.',
    photographer: 'Johannes Plenio',
    location: 'Forêt Noire, Allemagne',
    date: '22 Mai 2024',
    category: 'Nature',
    likes: 892
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Danse des Aurores',
    description: 'Spectacle magique des aurores boréales illuminant le ciel nocturne de couleurs vertes et violettes au-dessus du paysage arctique.',
    photographer: 'Tobias Bjørkli',
    location: 'Norvège',
    date: '3 Février 2024',
    category: 'Ciel',
    likes: 3421
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/1209798/pexels-photo-1209798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Océan de Sable',
    description: 'Dunes dorées ondulant à perte de vue sous un ciel azur, créant un paysage désertique d\'une beauté saisissante et infinie.',
    photographer: 'Taryn Elliott',
    location: 'Sahara, Maroc',
    date: '18 Janvier 2024',
    category: 'Désert',
    likes: 1678
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Cascade Puissante',
    description: 'Une cascade majestueuse plongeant dans un bassin naturel entouré de roches moussues et de végétation luxuriante.',
    photographer: 'Michael Block',
    location: 'Islande',
    date: '12 Juin 2024',
    category: 'Eau',
    likes: 1534
  }
];

const categoryColors = {
  'Montagne': 'bg-slate-500',
  'Océan': 'bg-blue-500',
  'Nature': 'bg-green-500',
  'Ciel': 'bg-purple-500',
  'Désert': 'bg-orange-500',
  'Eau': 'bg-cyan-500'
};

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const currentImage = images[current - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative z-10 p-6 bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">
                Galerie Photographique
              </h1>
              <p className="text-slate-600">
                Collection de paysages exceptionnels du monde entier
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Camera className="w-4 h-4" />
              <span>{images.length} photos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Carousel 
          setApi={setApi} 
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id}>
                <Card className="border-0 shadow-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative">
                      {/* Main Image */}
                      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <Badge 
                          className={`absolute top-4 left-4 ${categoryColors[image.category as keyof typeof categoryColors]} text-white border-0`}
                        >
                          {image.category}
                        </Badge>

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                            onClick={() => toggleLike(image.id)}
                          >
                            <Heart 
                              className={`h-4 w-4 ${
                                likedImages.has(image.id) 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-white'
                              }`} 
                            />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                          >
                            <Share2 className="h-4 w-4 text-white" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                          >
                            <Download className="h-4 w-4 text-white" />
                          </Button>
                        </div>

                        {/* Image Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            {image.title}
                          </h2>
                          <p className="text-lg opacity-90 mb-3 max-w-3xl">
                            {image.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
                            <div className="flex items-center">
                              <Camera className="w-4 h-4 mr-1" />
                              {image.photographer}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {image.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {image.date}
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {image.likes.toLocaleString()} likes
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30" />
          <CarouselNext className="right-4 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30" />
        </Carousel>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index + 1 === current 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Current Image Details */}
        {currentImage && (
          <Card className="mt-8 bg-white/80 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    À propos de cette photo
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {currentImage.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-500">
                      <Camera className="w-4 h-4 mr-2" />
                      <span className="font-medium">Photographe:</span>
                      <span className="ml-1">{currentImage.photographer}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">Lieu:</span>
                      <span className="ml-1">{currentImage.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">Date:</span>
                      <span className="ml-1">{currentImage.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {current}
                      </div>
                      <div className="text-sm text-slate-600">Image actuelle</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {currentImage.likes.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600">Likes</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {count}
                      </div>
                      <div className="text-sm text-slate-600">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Thumbnail Grid */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Toutes les photos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <Card
                key={image.id}
                className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                  index + 1 === current 
                    ? 'ring-2 ring-blue-500 scale-105' 
                    : 'hover:scale-102 opacity-80 hover:opacity-100'
                }`}
                onClick={() => api?.scrollTo(index)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1">
                      <p className="text-white text-xs font-medium truncate">
                        {image.title}
                      </p>
                    </div>
                    <Badge 
                      size="sm"
                      className={`absolute top-1 right-1 ${categoryColors[image.category as keyof typeof categoryColors]} text-white border-0 text-xs`}
                    >
                      {image.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}