import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Target, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const timelineEvents = [
  { year: '2010', event: 'The Discovery', description: 'Our founders discover a pristine, untouched spring in the heart of ancient mountains.' },
  { year: '2012', event: 'First Bottle', description: 'The first bottle of Elva water is produced, with a commitment to preserving its natural purity.' },
  { year: '2018', event: 'Sustainability Pledge', description: 'We launch our 100% recycled packaging and carbon-neutral initiatives.' },
  { year: '2023', event: 'Global Recognition', description: 'Elva wins the "Purest Water" award at the International Water Tasting Competition.' },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full flex items-center justify-center text-center text-foreground">
        <Image
          src="https://placehold.co/1920x600.png"
          alt="Mountain landscape"
          data-ai-hint="mountain landscape"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Our Story</h1>
          <p className="mt-2 text-lg">From the source to your hands, a journey of purity.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">From Nature's Heart to Yours</h2>
            <p className="mt-4 text-muted-foreground">
              Elva was founded on a simple yet profound principle: everyone deserves access to water in its most authentic form. Our journey started not in a boardroom, but at the base of a remote, serene mountain range, where we stumbled upon a spring of such exceptional quality that we knew we had to share it with the world. We are more than just a water company; we are custodians of a natural treasure, dedicated to preserving its integrity from the moment it leaves the earth to the moment it quenches your thirst.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="font-headline text-3xl font-bold">Our Mission & Vision</h3>
            <div className="mt-6 space-y-6">
              <div className="flex items-start space-x-4">
                <Target className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-headline text-xl font-semibold">Our Mission</h4>
                  <p className="text-muted-foreground">To provide the world's purest mineral water while championing environmental sustainability and promoting a lifestyle of health and wellness.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Eye className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-headline text-xl font-semibold">Our Vision</h4>
                  <p className="text-muted-foreground">To be the most trusted and respected name in natural hydration, inspiring a global community to make conscious choices for their health and the planet.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="https://placehold.co/800x800.png"
              alt="Clear water stream"
              data-ai-hint="water stream"
              width={800}
              height={800}
              className="rounded-full shadow-xl aspect-square object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">Our Journey</h2>
          <div className="mt-12 relative">
            <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
            {timelineEvents.map((item, index) => (
              <div key={index} className="md:grid md:grid-cols-2 md:gap-8 items-center mb-8 relative">
                <div className={`md:text-right ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="inline-block p-4">
                    <h3 className="font-headline text-2xl font-bold text-primary">{item.year}</h3>
                  </div>
                </div>
                <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <Card className="shadow-lg bg-card">
                    <CardHeader>
                      <CardTitle className='font-headline text-xl'>{item.event}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <Leaf className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">A Promise for the Planet</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              Our love for pure water is inseparable from our love for the planet. We are passionately committed to sustainable practices in every aspect of our business.
            </p>
            <Button asChild className="mt-8 rounded-full" size="lg">
                <Link href="/contact">Get In Touch</Link>
            </Button>
        </div>
      </section>

    </div>
  );
}
