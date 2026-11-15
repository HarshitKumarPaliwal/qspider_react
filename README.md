# Qspiders – React + Node + MongoDB (Full Stack)

```
qspiders-react-fullstack/
├── client/   → React (Vite) frontend
└── server/   → Node.js + Express backend + MongoDB (Mongoose)
```

## Setup
1. `server/.env` kholkar `REPLACE_WITH_DB_PASSWORD` ki jagah apna MongoDB password daalein (special characters URL-encode karein, jaise @ → %40). `ADMIN_KEY` bhi badlein.
2. MongoDB Atlas → Network Access me apna IP allow karein.
3. Root folder me:
   ```
   npm run install:all
   npm run seed          # courses DB me daalne ke liye (ek baar)
   ```

## Development (2 terminals)
```
npm run dev:server     # http://localhost:3000  (API)
npm run dev:client     # http://localhost:5173  (React, /api proxy ke saath)
```

## Production (ek hi server se)
```
npm run build          # client/dist banata hai
npm start              # http://localhost:3000 par poori site + API
```
Admin panel: `/admin` (header ke liye `ADMIN_KEY` daalein).

## API
- GET  /api/courses
- POST /api/enquiries  { name, phone, course }
- GET / PATCH / DELETE /api/enquiries[/:id]  (admin, header `x-admin-key`)
