import { useState } from 'react';
import { sendEnquiry } from '../api.js';

export default function Contact({ courses }) {
  const [form, setForm] = useState({ name: '', phone: '', course: '' });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    try {
      await sendEnquiry(form);
      setMsg('Thanks! We’ll call you soon.');
      setForm({ name: '', phone: '', course: '' });
    } catch (err) {
      setMsg(err.message || 'Server not reachable');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact">
      <div className="wrap split">
        <div>
          <h2>Request a Call Back</h2>
          <p className="sub">Share your details and our counsellor will reach out shortly.</p>
        </div>
        <form onSubmit={submit}>
          <input placeholder="Full name" required minLength={2} value={form.name} onChange={set('name')} />
          <input type="tel" placeholder="Phone number" required value={form.phone} onChange={set('phone')} />
          <select value={form.course} onChange={set('course')}>
            <option value="">Select a course</option>
            {courses.map((c) => <option key={c._id}>{c.title}</option>)}
          </select>
          <button className="btn" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Submit'}</button>
          <small style={{ color: 'var(--brand)' }}>{msg}</small>
        </form>
      </div>
    </section>
  );
}
