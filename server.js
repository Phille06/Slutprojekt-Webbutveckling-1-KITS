require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

// TODO Milstolpe 2: API-routes för produkter och autentisering
// POST   /api/login
// GET    /api/produkter
// POST   /api/produkter        (kräver JWT)
// PUT    /api/produkter/:id    (kräver JWT)
// DELETE /api/produkter/:id    (kräver JWT)

app.listen(PORT, () => {
  console.log(`KITS-servern körs på http://localhost:${PORT}`);
});
