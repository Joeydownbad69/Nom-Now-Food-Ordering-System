'use client';

import { MenuItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export default function MenuSection({ title, items, onItemClick }: MenuSectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 border-b border-gray-200 pb-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-white/60 backdrop-blur-sm"
            onClick={() => onItemClick(item)}
          >
            <div className="relative h-52 w-full overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">{item.name}</h3>
                <span className="font-medium text-primary bg-primary/10 px-2 py-1 rounded-full text-sm">{formatCurrency(item.price)}</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}