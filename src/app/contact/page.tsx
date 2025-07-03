'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
    })
    form.reset()
  }

  return (
    <>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-1 space-y-8">
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center space-x-4">
                        <MapPin className="h-8 w-8 text-primary"/>
                        <CardTitle className="font-headline">Our Office</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">123 Spring Way, Pureville, 45678</p>
                    </CardContent>
                </Card>
                 <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center space-x-4">
                        <Mail className="h-8 w-8 text-primary"/>
                        <CardTitle className="font-headline">Email Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">contact@elva.com</p>
                    </CardContent>
                </Card>
                 <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center space-x-4">
                        <Phone className="h-8 w-8 text-primary"/>
                        <CardTitle className="font-headline">Call Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">(123) 456-7890</p>
                    </CardContent>
                </Card>
                <div>
                  <h3 className="font-headline text-lg font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Button asChild variant="outline" size="icon">
                      <Link href="#"><Facebook /></Link>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <Link href="#"><Twitter /></Link>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <Link href="#"><Instagram /></Link>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <Link href="#"><Linkedin /></Link>
                    </Button>
                  </div>
                </div>
            </div>
            <div className="lg:col-span-2">
                <Card className="shadow-lg bg-card">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                    <Input placeholder="your@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                    <Textarea rows={6} placeholder="How can we help you?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="rounded-full">
                                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
