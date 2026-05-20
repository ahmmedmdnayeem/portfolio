import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Certifications } from '@/components/sections/Certifications';
import { Languages } from '@/components/sections/Languages';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import {
  getProjects,
  getSkills,
  getExperience,
  getCertifications,
  getTestimonials,
} from '@/lib/supabase/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [projects, skills, experience, certifications, testimonials] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperience(),
    getCertifications(),
    getTestimonials(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Certifications certifications={certifications} />
        <Languages />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}