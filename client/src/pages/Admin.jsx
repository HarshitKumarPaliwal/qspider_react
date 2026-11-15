import { useState } from 'react';
import { adminList, adminStatus, adminDelete } from '../api.js';

export default function Admin() {
  const [key, setKey] = useState(sessionStorage.getItem('ak') || '');
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState('');

  const load = async () => {
    try {
      setRows(await adminList(key));
      sessionStorage.setItem('ak', key);
      setMsg('');
    } catch (e) {
      setRows([]);
      setMsg(e.message);
    }
  };
  const change = async (id, status) => { await adminStatus(key, id, status); load(); };
  const remove = async (id) => { if (confirm('Delete this enquiry?')) { await adminDelete(key, id); load(); } };

  return (
    <div className="admin">
      <h1>Enquiries</h1>
      <p>
        <input type="password" placeholder="Admin key" value={key} onChange={(e) => setKey(e.target.value)} />{' '}
        <button className="btn" onClick={load}>Load</button> <a href="/">← Website</a>
      </p>
      {msg && <div className="err">{msg}</div>}
      <div className="tw">
        <table>
          <thead><tr><th>Date</th><th>Name</th><th>Phone</th><th>Course</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id}>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.course || '-'}</td>
                <td>
                  <select value={r.status} onChange={(e) => change(r._id, e.target.value)}>
                    <option>new</option><option>contacted</option><option>closed</option>
                  </select>
                </td>
                <td><button onClick={() => remove(r._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
