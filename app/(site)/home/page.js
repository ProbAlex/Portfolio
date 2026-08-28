import Image from "next/image";
import Link from "next/link";
import CursorTrail from "@/components/CursorTrail";
import WallHole from "@/components/WallHole";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex-grow bg-light py-20 cursor-effect">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Name and Location */}
            <div className="md:w-1/3 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight">
                <span className="block">Alexander</span>
                <span className="block">Dial</span>
              </h1>
              <p className="text-lg text-gray-600 mt-4">New York, NY, USA</p>
            </div>

            {/* Dog punching through the wall */}
            <div className="md:w-1/3 flex justify-center">
              <WallHole src="/dog.jpg" alt="Dog breaking through the wall" />
            </div>

            {/* Headshot */}
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-glow-red headshot-container">
                <Image
                  src="/headshot.jpg"
                  alt="Alexander Dial headshot"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <CursorTrail />
      </section>

      {/* Tagline */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            From Careful Planning to Working Code
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Student developer at New York Tech turning curiosity about how things work into
            Java and JavaScript projects, from web apps like this one to open-source
            automation tools.
          </p>

          <div className="mt-12 flex flex-col items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-accent to-secondary px-10 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Let&apos;s Build Something Together
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="/Alexander_Dial_Resume_FullStack.pdf"
                download
                className="block w-64 py-3 px-6 text-center bg-dark border-2 rounded-lg shadow-sparkle-blue transition-all hover:shadow-lg hover:scale-105"
              >
                Download Résumé
              </a>
              <a
                href="/Alexander_Dial_CV.pdf"
                download
                className="block w-64 py-3 px-6 text-center bg-dark border-2 rounded-lg shadow-sparkle-blue transition-all hover:shadow-lg hover:scale-105"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            A Glimpse Into My World
          </h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              I&apos;m a student developer at New York Institute of Technology with a passion
              for creative software development, especially in Java and JavaScript. Before I
              write a single line of code, I like to slow down and carefully map out my plan.
              I&apos;d rather spend extra time in the design phase than untangle a mess
              later. Outside of class, I build open-source automation tools and apps I find useful,
              making my own life easier and more efficient. Right now, I&apos;m open to internship
              and full-time opportunities where I can sharpen my skills and contribute to
              real-world software projects.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a job in mind?"
        subtext="I'm open to internships and full-time roles where I can sharpen my skills and contribute to real-world software. Let's talk about what you're building."
      />
    </>
  );
}
