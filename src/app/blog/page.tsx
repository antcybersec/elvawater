import BlogIdeasGenerator from "@/components/blog-ideas-generator";

export default function BlogPage() {
  return (
    <>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Blog Ideas Generator</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Leverage AI to generate engaging blog and news topics. Simply provide an industry, relevant keywords, and a desired tone to get started.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <BlogIdeasGenerator />
        </div>
      </section>
    </>
  );
}
