import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Alexander Dial",
};

export default function ContactPage() {
  return (
    <section className="flex-grow py-20 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>
        <ContactForm />
      </div>
    </section>
  );
}
