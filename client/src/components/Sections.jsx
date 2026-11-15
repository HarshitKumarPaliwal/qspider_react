import { useEffect, useRef, useState } from 'react';

export function Hero() {
  return (
    <div className="hero">
      <div className="wrap">
        <h1>Launch your IT career with industry-ready training</h1>
        <p>Hands-on courses in software development, testing, data and cloud — taught by working professionals, backed by dedicated placement support.</p>
        <div className="btns">
          <a className="btn" href="#contact">Request a Call Back</a>
          <a className="btn alt" href="#courses">Explore Courses</a>
        </div>
      </div>
    </div>
  );
}

const WHY = [
  ['💼', 'Placement Assistance', 'A dedicated placement cell with regular recruitment drives and corporate partners.'],
  ['👩‍🏫', 'Experienced Faculty', 'Trainers with real-world industry experience and strong mentoring skills.'],
  ['🛠️', 'Industry-Relevant Curriculum', 'Live projects and tools that match what employers actually use today.'],
  ['🤝', 'Career Support', 'Resume building, mock interviews and soft-skill sessions until you land the role.']
];

export function Why() {
  return (
    <section id="why">
      <div className="wrap">
        <h2>Why Choose Us</h2>
        <p className="sub">Everything you need to go from learner to job-ready professional.</p>
        <div className="grid">
          {WHY.map(([icon, title, text]) => (
            <div className="card" key={title}>
              <div className="ico">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ n }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    let t;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let s = 0;
      const step = Math.ceil(n / 50);
      t = setInterval(() => {
        s = Math.min(n, s + step);
        setV(s);
        if (s >= n) clearInterval(t);
      }, 30);
    });
    io.observe(ref.current);
    return () => { io.disconnect(); clearInterval(t); };
  }, [n]);
  return <b ref={ref}>{v.toLocaleString()}+</b>;
}

export function Stats() {
  const items = [[25000, 'Students Placed'], [500, 'Hiring Companies'], [100, 'Technologies Offered'], [90, 'Training Centers']];
  return (
    <section className="alt-bg">
      <div className="wrap">
        <div className="stats">
          {items.map(([n, label]) => (
            <div className="stat" key={label}><Counter n={n} /><span>{label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Learn() {
  return (
    <section className="alt-bg" id="centers">
      <div className="wrap split">
        <div>
          <h2>Learn Your Way</h2>
          <p className="sub">Classroom training at our centers across India, or live online with the same curriculum, recorded sessions and doubt support.</p>
          <div className="chips">
            {['Offline Centers', 'Online Courses', 'Corporate Training', 'Weekend Batches'].map((c) => <span className="chip" key={c}>{c}</span>)}
          </div>
        </div>
        <div className="ph" aria-hidden="true">🎓</div>
      </div>
    </section>
  );
}

const Chips = ({ list }) => <div className="chips">{list.map((c) => <span className="chip" key={c}>{c}</span>)}</div>;

export function Placements() {
  return (
    <section id="placements">
      <div className="wrap">
        <h2>Our Placement Statistics</h2>
        <p className="sub">Graduates from every background have built careers with us.</p>
        <h4>From various degrees</h4>
        <Chips list={['BE/BTech', 'BCA', 'BSc', 'BCom', 'MCA', 'ME/MTech', 'MBA', 'MSc']} />
        <h4>From various streams</h4>
        <Chips list={['CS', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Others']} />
      </div>
    </section>
  );
}

const FAQ = [
  ['Do I need prior coding experience?', 'No. Our beginner tracks start from the basics and build up step by step.'],
  ['Do you offer placement support?', 'Yes. We provide resume help, mock interviews and connect you with hiring partners.'],
  ['Are online classes available?', 'Yes, live online batches with recordings and doubt-clearing sessions.'],
  ['How long are the courses?', 'Most programs run 3 to 6 months depending on the track and batch type.']
];

export function Faq() {
  return (
    <section className="alt-bg" id="faq">
      <div className="wrap">
        <h2>Frequently Asked Questions</h2>
        <p className="sub">Quick answers to common questions.</p>
        {FAQ.map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}
