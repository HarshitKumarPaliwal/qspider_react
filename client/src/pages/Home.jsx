import { useEffect, useState } from 'react';
import { getCourses } from '../api.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Courses from '../components/Courses.jsx';
import Contact from '../components/Contact.jsx';
import { Hero, Why, Stats, Learn, Placements, Faq } from '../components/Sections.jsx';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getCourses().then(setCourses).catch(() => setError('Courses load nahi ho paaye. Kya server chal raha hai?'));
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Why />
        <Stats />
        <Courses courses={courses} error={error} />
        <Learn />
        <Placements />
        <Faq />
        <Contact courses={courses} />
      </main>
      <Footer />
      <a className="wa" href="#contact">💬 WhatsApp</a>
    </>
  );
}
