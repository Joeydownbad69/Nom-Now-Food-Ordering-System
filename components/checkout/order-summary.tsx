'use client';

import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function OrderSummary() {
  const { items, getSubtotal, getTax, getTotal, deliveryMethod, deliveryFee } = useCartStore();
  
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">{formatCurrency(item.totalPrice)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatCurrency(getSubtotal())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>{formatCurrency(getTax())}</span>
            </div>
            {deliveryMethod === 'delivery' && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(getTotal())}</span>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md mt-4">
            <p className="text-xs text-gray-600">
              {deliveryMethod === 'delivery' 
                ? 'Your order will be delivered to your address in approximately 30-45 minutes.'
                : 'Your order will be ready for pickup in approximately 15-20 minutes.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}