import { products } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  return (
    <>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Products</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explore the full range of Elva mineral waters. Each bottle is a promise of purity and exceptional taste.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 bg-card/50 backdrop-blur-sm group flex flex-col">
                <CardContent className="p-0 flex flex-col flex-grow">
                   <div className="h-64 w-full overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={product.aiHint}
                      />
                    </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline text-2xl font-semibold">{product.name}</h3>
                    <p className="mt-2 text-muted-foreground text-sm flex-grow">{product.description}</p>
                    <div className="mt-4 text-2xl font-bold font-headline text-primary">
                      ₹{product.price}
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto mt-4 self-start text-primary">
                      <Link href={`/products/${product.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
