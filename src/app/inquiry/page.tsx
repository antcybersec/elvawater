import InquiryForm from "@/components/inquiry-form";

export default function InquiryPage() {
  return (
    <>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Bulk & Corporate Inquiry</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Interested in partnering with Elva or making a bulk purchase? Please fill out the form below, and our team will get in touch with you shortly.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
             <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
