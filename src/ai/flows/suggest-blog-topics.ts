'use server';

/**
 * @fileOverview A blog topic suggestion AI agent.
 *
 * - suggestBlogTopics - A function that suggests blog topics.
 * - SuggestBlogTopicsInput - The input type for the suggestBlogTopics function.
 * - SuggestBlogTopicsOutput - The return type for the suggestBlogTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogTopicsInputSchema = z.object({
  industry: z.string().describe('The industry to generate blog topics for.'),
  keywords: z.string().describe('Comma separated list of SEO keywords.'),
  tone: z.string().optional().describe('The tone of the blog topics (e.g., professional, friendly, humorous).'),
  numTopics: z.number().optional().default(3).describe('The number of blog topics to generate.'),
});
export type SuggestBlogTopicsInput = z.infer<typeof SuggestBlogTopicsInputSchema>;

const SuggestBlogTopicsOutputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the blog topic.'),
    introduction: z.string().describe('A brief introduction for the blog topic.'),
  })
);
export type SuggestBlogTopicsOutput = z.infer<typeof SuggestBlogTopicsOutputSchema>;

export async function suggestBlogTopics(input: SuggestBlogTopicsInput): Promise<SuggestBlogTopicsOutput> {
  return suggestBlogTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogTopicsPrompt',
  input: {schema: SuggestBlogTopicsInputSchema},
  output: {schema: SuggestBlogTopicsOutputSchema},
  prompt: `You are a marketing expert specializing in generating blog topic ideas.

  Based on the industry, keywords, and desired tone, suggest {{numTopics}} blog topics with compelling titles and introductions to attract customer engagement.

  Industry: {{{industry}}}
  Keywords: {{{keywords}}}
  Tone: {{{tone}}}

  Format your response as a JSON array of objects with 'title' and 'introduction' fields.`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const suggestBlogTopicsFlow = ai.defineFlow(
  {
    name: 'suggestBlogTopicsFlow',
    inputSchema: SuggestBlogTopicsInputSchema,
    outputSchema: SuggestBlogTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
