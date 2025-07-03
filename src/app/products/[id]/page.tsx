'use client';

import { notFound } from 'next/navigation';
import { products, reviews as allReviews } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';
import { useState } from 'react';

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      ))}
      {halfStar && <StarHalf className="h-5 w-5 text-yellow-400 fill-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300 fill-gray-300" />
      ))}
    </div>
  );
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes[0]);

  if (!product) {
    notFound();
  }

  const productReviews = allReviews.filter((review) => review.productId === product.id);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <Card className="overflow-hidden shadow-lg bg-card">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-auto object-cover aspect-square"
              data-ai-hint={product.aiHint}
            />
          </Card>
        </div>
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.details}</p>
          <div className="mt-6">
            <span className="text-4xl font-bold font-headline text-primary">₹{product.price}</span>
          </div>
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold">Select Size</h3>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="mt-4 flex space-x-4">
              {product.sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size} id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`} className="text-base">{size}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button size="lg" className="mt-8 w-full md:w-auto rounded-full">
            Add to Inquiry
          </Button>
        </div>
      </div>
      <div className="mt-16 md:mt-24">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Customer Reviews</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productReviews.length > 0 ? (
            productReviews.map((review) => (
              <Card key={review.id} className="shadow-lg bg-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-headline text-xl">{review.author}</CardTitle>
                    <StarRating rating={review.rating} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">No reviews yet for this product.</p>
          )}
        </div>
      </div>
    </div>
  );
}
