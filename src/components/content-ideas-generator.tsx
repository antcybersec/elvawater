'use client';

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { suggestBlogTopics, SuggestBlogTopicsOutput } from '@/ai/flows/suggest-blog-topics';
import { Loader2, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const formSchema = z.object({
  industry: z.string().min(2, "Industry is required."),
  keywords: z.string().min(2, "Keywords are required."),
  tone: z.string().optional(),
  numTopics: z.coerce.number().min(1).max(10).optional().default(3),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ContentIdeasGenerator() {
    const { toast } = useToast();
    const [suggestions, setSuggestions] = useState<SuggestBlogTopicsOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            industry: "Beverage and Mineral Water",
            keywords: "health, hydration, sustainability, natural minerals",
            tone: "informative and inspiring",
            numTopics: 3,
        },
    });

    async function onSubmit(values: FormSchema) {
        setIsLoading(true);
        setSuggestions(null);
        try {
            const result = await suggestBlogTopics(values);
            setSuggestions(result);
            toast({
                title: "Suggestions Generated!",
                description: "Your new blog topics are ready below."
            })
        } catch (error) {
            console.error("Failed to generate blog topics:", error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "Could not generate blog topics. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Topic Generator</CardTitle>
                        <CardDescription>Fill in the details to generate ideas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="industry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industry</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="keywords"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SEO Keywords</FormLabel>
                                            <FormControl><Input placeholder="e.g., health, hydration" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tone (Optional)</FormLabel>
                                            <FormControl><Input placeholder="e.g., professional, friendly" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    {isLoading ? 'Generating...' : 'Generate Ideas'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="shadow-lg min-h-[60vh]">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Generated Suggestions</CardTitle>
                        <CardDescription>Here are the AI-powered topic ideas for your content.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center pt-16">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="mt-4 text-muted-foreground">Generating ideas, please wait...</p>
                            </div>
                        )}
                        {suggestions && suggestions.length > 0 && (
                            <Accordion type="single" collapsible className="w-full">
                                {suggestions.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="font-headline text-lg text-left">{item.title}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {item.introduction}
                                    </AccordionContent>
                                </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                        {!isLoading && !suggestions && (
                            <div className="flex flex-col items-center justify-center pt-16 text-center">
                                 <Sparkles className="h-12 w-12 text-muted" />
                                <p className="mt-4 text-muted-foreground">Your generated content ideas will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
