import ContactForm from "@/components/contact/ContactForm";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Contact | Alexander Dial",
  description: "Get in touch with Alexander Dial about internships, full-time roles or projects.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lead="Send a message here or reach me directly. I'm open to internships and full-time roles, and happy to talk about projects."
      />
      <div className="container-page flex-grow py-14 md:py-20">
        <ContactForm />
      </div>
    </>
  );
}
