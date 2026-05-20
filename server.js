// Dokumentation som jag har läst för att skriva denna kod:
// dotenv       https://www.npmjs.com/package/dotenv
// express      https://expressjs.com/en/4x/api.html
// path         https://nodejs.org/api/path.html
// fs           https://nodejs.org/api/fs.html
// bcryptjs     https://github.com/dcodeIO/bcrypt.js#readme
// jsonwebtoken https://github.com/auth0/node-jsonwebtoken#readme

require('dotenv').config();

const express = require('express');
const path    = require('path');
const fs      = require('fs');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

function läsJSON(fil) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', fil), 'utf8'));
}

function skrivJSON(fil, data) {
  fs.writeFileSync(path.join(__dirname, 'data', fil), JSON.stringify(data, null, 2), 'utf8');
}

function nästaId(lista) {
  return lista.length > 0 ? Math.max(...lista.map(p => p.id)) + 1 : 1;
}

function krävAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ fel: 'Åtkomst nekad – token saknas' });
  }
  try {
    req.admin = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ fel: 'Ogiltig eller utgången token' });
  }
}

app.post('/api/login', async (req, res) => {
  const { användare, lösenord } = req.body;
  if (användare !== process.env.ADMIN_USER) {
    return res.status(401).json({ fel: 'Fel användarnamn eller lösenord' });
  }
  const ok = await bcrypt.compare(lösenord, process.env.ADMIN_PASSWORD_HASH);
  if (!ok) {
    return res.status(401).json({ fel: 'Fel användarnamn eller lösenord' });
  }
  const token = jwt.sign({ användare }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

app.get('/api/produkter', (_req, res) => {
  res.json(läsJSON('produkter.json'));
});

app.post('/api/produkter', krävAuth, (req, res) => {
  const lista = läsJSON('produkter.json');
  const ny = { id: nästaId(lista), ...req.body };
  lista.push(ny);
  skrivJSON('produkter.json', lista);
  res.status(201).json(ny);
});

app.put('/api/produkter/:id', krävAuth, (req, res) => {
  const lista = läsJSON('produkter.json');
  const idx = lista.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ fel: 'Produkt hittades inte' });
  lista[idx] = { ...lista[idx], ...req.body, id: lista[idx].id };
  skrivJSON('produkter.json', lista);
  res.json(lista[idx]);
});

app.delete('/api/produkter/:id', krävAuth, (req, res) => {
  let lista = läsJSON('produkter.json');
  const längdFörut = lista.length;
  lista = lista.filter(p => p.id !== Number(req.params.id));
  if (lista.length === längdFörut) return res.status(404).json({ fel: 'Produkt hittades inte' });
  skrivJSON('produkter.json', lista);
  res.json({ meddelande: 'Produkt borttagen' });
});

app.get('/api/oppettider', (_req, res) => {
  res.json(läsJSON('oppettider.json'));
});

app.put('/api/oppettider', krävAuth, (req, res) => {
  skrivJSON('oppettider.json', req.body);
  res.json(req.body);
});

app.get('/api/tjanster', (_req, res) => {
  res.json(läsJSON('tjanster.json'));
});

app.post('/api/tjanster', krävAuth, (req, res) => {
  const lista = läsJSON('tjanster.json');
  const ny = { id: nästaId(lista), ...req.body };
  lista.push(ny);
  skrivJSON('tjanster.json', lista);
  res.status(201).json(ny);
});

app.put('/api/tjanster/:id', krävAuth, (req, res) => {
  const lista = läsJSON('tjanster.json');
  const idx = lista.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ fel: 'Tjänst hittades inte' });
  lista[idx] = { ...lista[idx], ...req.body, id: lista[idx].id };
  skrivJSON('tjanster.json', lista);
  res.json(lista[idx]);
});

app.delete('/api/tjanster/:id', krävAuth, (req, res) => {
  let lista = läsJSON('tjanster.json');
  const längdFörut = lista.length;
  lista = lista.filter(t => t.id !== Number(req.params.id));
  if (lista.length === längdFörut) return res.status(404).json({ fel: 'Tjänst hittades inte' });
  skrivJSON('tjanster.json', lista);
  res.json({ meddelande: 'Tjänst borttagen' });
});

app.post('/api/bokningar', (req, res) => {
  const lista = läsJSON('bokningar.json');
  const ny = {
    id: nästaId(lista),
    skapad: new Date().toISOString(),
    ...req.body
  };
  lista.push(ny);
  skrivJSON('bokningar.json', lista);
  res.status(201).json({ meddelande: 'Bokning mottagen', id: ny.id });
});

app.get('/api/bokningar', krävAuth, (_req, res) => {
  res.json(läsJSON('bokningar.json'));
});

app.listen(PORT, () => {
  console.log(`KITS-servern körs på http://localhost:${PORT}`);
});
