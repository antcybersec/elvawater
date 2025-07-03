'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/lib/data';
import { ArrowRight, Leaf, Droplet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="relative min-h-[80vh] w-full flex items-center justify-center text-left py-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
                    Elva: The Essence of Purity
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                    Sourced from pristine springs, Elva brings you mineral water in its most natural and refreshing form. Experience hydration like never before.
                </p>
                <Button asChild size="lg" className="mt-8 rounded-full">
                    <Link href="/products">Explore Our Products <ArrowRight className="ml-2" /></Link>
                </Button>
            </motion.div>
            <motion.div 
              className="relative h-[400px] md:h-[600px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
               <Image
                    src="https://images.pexels.com/photos/3124674/pexels-photo-3124674.jpeg"
                    alt="Elva Pure Still Water"
                    layout="fill"
                    objectFit="contain"
                    className="z-10"
                    data-ai-hint="water bottle product"
                />
                <motion.div 
                    className="absolute -top-10 -left-10 z-0"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Leaf className="h-24 w-24 text-primary/30" />
                </motion.div>
                 <motion.div 
                    className="absolute -bottom-10 -right-10 z-0"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Droplet className="h-24 w-24 text-primary/30" />
                </motion.div>
            </motion.div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">
              Discover Our Collection
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              From sparkling to still, find the perfect Elva water to suit your taste.
            </p>
          </motion.div>
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 bg-card/50 backdrop-blur-sm group">
                  <CardContent className="p-0">
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
                    <div className="p-6">
                      <h3 className="font-headline text-2xl font-semibold">{product.name}</h3>
                      <p className="mt-2 text-muted-foreground h-12">{product.description.split('.')[0]}.</p>
                      <div className="mt-4 text-2xl font-bold font-headline text-primary">
                        ₹{product.price}
                      </div>
                      <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
                        <Link href={`/products/${product.id}`}>
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Image
              src="/istockphoto-182145531-1024x1024.jpg"
              alt="Elva bottle catalogue"
              width={800}
              height={600}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div className="text-left" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Story of Purity</h2>
            <p className="mt-4 text-muted-foreground">
              Elva was born from a passion for delivering water in its purest state. Our journey began at the foothills of ancient mountains, where we discovered a spring of unparalleled quality.
            </p>
            <p className="mt-2 text-muted-foreground">
              We are dedicated to preserving this natural gift, bottling at the source to ensure every drop you taste is as crisp and clean as nature intended.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Leaf className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">Committed to Sustainability</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              We believe in protecting the source of our purity. Our commitment to sustainability extends from our eco-friendly packaging to our water conservation efforts, ensuring a healthier planet for generations to come.
            </p>
          </motion.div>
          <motion.div 
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="p-6" variants={itemVariants}>
              <h3 className="font-headline text-xl font-semibold">Recycled Materials</h3>
              <p className="mt-2 text-muted-foreground">Our bottles are made from 100% recycled plastic and are fully recyclable.</p>
            </motion.div>
            <motion.div className="p-6" variants={itemVariants}>
              <h3 className="font-headline text-xl font-semibold">Carbon Neutral</h3>
              <p className="mt-2 text-muted-foreground">We offset our carbon footprint through reforestation projects and renewable energy.</p>
            </motion.div>
            <motion.div className="p-6" variants={itemVariants}>
              <h3 className="font-headline text-xl font-semibold">Water Stewardship</h3>
              <p className="mt-2 text-muted-foreground">We actively work to conserve water resources and protect our natural springs.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
