export default function Courses({ courses, error }) {
  return (
    <section id="courses">
      <div className="wrap">
        <h2>All Courses</h2>
        <p className="sub">Pick a track that matches your goals.</p>
        {error && <div className="err">{error}</div>}
        <div className="grid">
          {courses.map((c) => (
            <div className="card" key={c._id}>
              <div className="ico">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
