const handle = async (r) => {
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || 'Something went wrong');
  return d;
};
const H = (key) => ({ 'x-admin-key': key, 'Content-Type': 'application/json' });

export const getCourses = () => fetch('/api/courses').then(handle);
export const sendEnquiry = (body) =>
  fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(handle);

export const adminList = (key) => fetch('/api/enquiries', { headers: H(key) }).then(handle);
export const adminStatus = (key, id, status) =>
  fetch(`/api/enquiries/${id}`, { method: 'PATCH', headers: H(key), body: JSON.stringify({ status }) }).then(handle);
export const adminDelete = (key, id) => fetch(`/api/enquiries/${id}`, { method: 'DELETE', headers: H(key) }).then(handle);
