// Dokumentation som jag har läst för att skriva denna kod:
// fetch API     https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// sessionStorage https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

document.addEventListener('DOMContentLoaded', () => {
  const token = () => sessionStorage.getItem('kits_token');

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token()}`
  });

  function visaLogin() {
    document.getElementById('loginSektion').hidden = false;
    document.getElementById('adminDashboard').hidden = true;
  }

  function visaDashboard() {
    document.getElementById('loginSektion').hidden = true;
    document.getElementById('adminDashboard').hidden = false;
    laddaProdukt();
    laddaTjanster();
    laddaOppettider();
    laddaBokningar();
  }

  token() ? visaDashboard() : visaLogin();

  document.getElementById('loginFormulär').addEventListener('submit', async (e) => {
    e.preventDefault();
    const felEl = document.getElementById('loginFel');
    felEl.hidden = true;

    try {
      const svar = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          användare: document.getElementById('loginAnvändare').value.trim(),
          lösenord:  document.getElementById('loginLösenord').value
        })
      });

      const data = await svar.json();
      if (!svar.ok) {
        felEl.textContent = data.fel || 'Fel användarnamn eller lösenord.';
        felEl.hidden = false;
        return;
      }
      sessionStorage.setItem('kits_token', data.token);
      visaDashboard();
    } catch {
      felEl.textContent = 'Kunde inte nå servern. Är den igång? Starta med: npm start';
      felEl.hidden = false;
    }
  });

  document.getElementById('logoutKnapp').addEventListener('click', () => {
    sessionStorage.removeItem('kits_token');
    visaLogin();
  });

  document.querySelectorAll('.flik').forEach(knapp => {
    knapp.addEventListener('click', () => {
      document.querySelectorAll('.flik').forEach(f => f.classList.remove('active'));
      document.querySelectorAll('.flik-innehall').forEach(f => f.hidden = true);
      knapp.classList.add('active');
      document.getElementById(`flik-${knapp.dataset.flik}`).hidden = false;
    });
  });

  async function laddaProdukt() {
    const lista = document.getElementById('produkter-lista');
    const produkter = await fetch('/api/produkter').then(r => r.json());

    if (produkter.length === 0) {
      lista.innerHTML = '<p>Inga produkter ännu.</p>';
      return;
    }

    lista.innerHTML = `
      <table class="admin-tabell">
        <thead><tr>
          <th>Namn</th><th>Kategori</th><th>Pris</th><th>Antal</th><th></th>
        </tr></thead>
        <tbody>
          ${produkter.map(p => `
            <tr>
              <td>${p.namn}</td>
              <td>${p.kategori}</td>
              <td>${p.pris.toLocaleString('sv-SE')} kr</td>
              <td>${p.antal}</td>
              <td class="tabell-knappar">
                <button class="btn-liten btn-redigera" data-id="${p.id}">Redigera</button>
                <button class="btn-liten btn-ta-bort" data-id="${p.id}">Ta bort</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>`;

    lista.querySelectorAll('.btn-redigera').forEach(b =>
      b.addEventListener('click', () => redigeraProdukt(Number(b.dataset.id), produkter))
    );
    lista.querySelectorAll('.btn-ta-bort').forEach(b =>
      b.addEventListener('click', () => taBortProdukt(Number(b.dataset.id)))
    );
  }

  function visaProduktFormulär(p = null) {
    const form = document.getElementById('produktFormulär');
    document.getElementById('produktFormulärRubrik').textContent = p ? 'Redigera produkt' : 'Ny produkt';
    document.getElementById('produktId').value      = p?.id ?? '';
    document.getElementById('produktNamn').value    = p?.namn ?? '';
    document.getElementById('produktKategori').value = p?.kategori ?? '';
    document.getElementById('produktPris').value    = p?.pris ?? '';
    document.getElementById('produktAntal').value   = p?.antal ?? '';
    document.getElementById('produktBild').value    = p?.bild ?? '';
    form.hidden = false;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.getElementById('visaProduktFormulär').addEventListener('click', () => visaProduktFormulär());
  document.getElementById('avbrytProdukt').addEventListener('click', () => {
    document.getElementById('produktFormulär').hidden = true;
  });

  function redigeraProdukt(id, lista) {
    visaProduktFormulär(lista.find(p => p.id === id));
  }

  async function taBortProdukt(id) {
    if (!confirm('Ta bort produkten?')) return;
    await fetch(`/api/produkter/${id}`, { method: 'DELETE', headers: authHeaders() });
    laddaProdukt();
  }

  document.getElementById('produktFormulär').addEventListener('submit', async (e) => {
    e.preventDefault();
    const felEl = document.getElementById('produktFel');
    felEl.hidden = true;

    const id = document.getElementById('produktId').value;
    const data = {
      namn:      document.getElementById('produktNamn').value.trim(),
      kategori:  document.getElementById('produktKategori').value.trim(),
      pris:      Number(document.getElementById('produktPris').value),
      antal:     Number(document.getElementById('produktAntal').value),
      bild:      document.getElementById('produktBild').value.trim()
    };

    const svar = await fetch(id ? `/api/produkter/${id}` : '/api/produkter', {
      method:  id ? 'PUT' : 'POST',
      headers: authHeaders(),
      body:    JSON.stringify(data)
    });

    if (!svar.ok) {
      felEl.textContent = 'Kunde inte spara produkten.';
      felEl.hidden = false;
      return;
    }
    document.getElementById('produktFormulär').hidden = true;
    laddaProdukt();
  });

  async function laddaTjanster() {
    const lista = document.getElementById('tjanster-lista');
    const tjanster = await fetch('/api/tjanster').then(r => r.json());

    if (tjanster.length === 0) {
      lista.innerHTML = '<p>Inga tjänster ännu.</p>';
      return;
    }

    lista.innerHTML = `
      <table class="admin-tabell">
        <thead><tr><th>Namn</th><th>Pris</th><th>Beskrivning</th><th></th></tr></thead>
        <tbody>
          ${tjanster.map(t => `
            <tr>
              <td>${t.namn}</td>
              <td>${t.pris.toLocaleString('sv-SE')} kr</td>
              <td>${t.beskrivning}</td>
              <td class="tabell-knappar">
                <button class="btn-liten btn-redigera" data-id="${t.id}">Redigera</button>
                <button class="btn-liten btn-ta-bort" data-id="${t.id}">Ta bort</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>`;

    lista.querySelectorAll('.btn-redigera').forEach(b =>
      b.addEventListener('click', () => redigeraTjanst(Number(b.dataset.id), tjanster))
    );
    lista.querySelectorAll('.btn-ta-bort').forEach(b =>
      b.addEventListener('click', () => taBortTjanst(Number(b.dataset.id)))
    );
  }

  function visaTjanstFormulär(t = null) {
    const form = document.getElementById('tjanstFormulär');
    document.getElementById('tjanstFormulärRubrik').textContent = t ? 'Redigera tjänst' : 'Ny tjänst';
    document.getElementById('tjanstId').value          = t?.id ?? '';
    document.getElementById('tjanstNamn').value        = t?.namn ?? '';
    document.getElementById('tjanstBeskrivning').value = t?.beskrivning ?? '';
    document.getElementById('tjanstPris').value        = t?.pris ?? '';
    form.hidden = false;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.getElementById('visaTjanstFormulär').addEventListener('click', () => visaTjanstFormulär());
  document.getElementById('avbrytTjanst').addEventListener('click', () => {
    document.getElementById('tjanstFormulär').hidden = true;
  });

  function redigeraTjanst(id, lista) {
    visaTjanstFormulär(lista.find(t => t.id === id));
  }

  async function taBortTjanst(id) {
    if (!confirm('Ta bort tjänsten?')) return;
    await fetch(`/api/tjanster/${id}`, { method: 'DELETE', headers: authHeaders() });
    laddaTjanster();
  }

  document.getElementById('tjanstFormulär').addEventListener('submit', async (e) => {
    e.preventDefault();
    const felEl = document.getElementById('tjanstFel');
    felEl.hidden = true;

    const id = document.getElementById('tjanstId').value;
    const data = {
      namn:        document.getElementById('tjanstNamn').value.trim(),
      beskrivning: document.getElementById('tjanstBeskrivning').value.trim(),
      pris:        Number(document.getElementById('tjanstPris').value)
    };

    const svar = await fetch(id ? `/api/tjanster/${id}` : '/api/tjanster', {
      method:  id ? 'PUT' : 'POST',
      headers: authHeaders(),
      body:    JSON.stringify(data)
    });

    if (!svar.ok) {
      felEl.textContent = 'Kunde inte spara tjänsten.';
      felEl.hidden = false;
      return;
    }
    document.getElementById('tjanstFormulär').hidden = true;
    laddaTjanster();
  });

  async function laddaOppettider() {
    const data = await fetch('/api/oppettider').then(r => r.json());
    const fältEl = document.getElementById('oppettider-fält');

    fältEl.innerHTML = Object.entries(data).map(([nyckel, rad]) => `
      <fieldset class="oppettider-rad">
        <legend>${rad.dag}</legend>
        <div class="admin-form-rad">
          <div class="form-grupp">
            <label for="dag-${nyckel}">Dag/period</label>
            <input type="text" id="dag-${nyckel}" name="dag-${nyckel}" value="${rad.dag}" />
          </div>
          <div class="form-grupp">
            <label for="tider-${nyckel}">Tider</label>
            <input type="text" id="tider-${nyckel}" name="tider-${nyckel}" value="${rad.tider}" />
          </div>
        </div>
      </fieldset>`).join('');

    document.getElementById('oppettiderFormulär')._nycklar = Object.keys(data);
  }

  document.getElementById('oppettiderFormulär').addEventListener('submit', async (e) => {
    e.preventDefault();
    const felEl  = document.getElementById('oppettiderFel');
    const okEl   = document.getElementById('oppettiderOk');
    felEl.hidden = true;
    okEl.hidden  = true;

    const nycklar = e.target._nycklar;
    const payload = {};
    nycklar.forEach(k => {
      payload[k] = {
        dag:   document.getElementById(`dag-${k}`).value.trim(),
        tider: document.getElementById(`tider-${k}`).value.trim()
      };
    });

    const svar = await fetch('/api/oppettider', {
      method:  'PUT',
      headers: authHeaders(),
      body:    JSON.stringify(payload)
    });

    if (!svar.ok) {
      felEl.textContent = 'Kunde inte spara öppettider.';
      felEl.hidden = false;
      return;
    }
    okEl.hidden = false;
  });

  async function laddaBokningar() {
    const lista = document.getElementById('bokningar-lista');
    const svar = await fetch('/api/bokningar', { headers: authHeaders() });
    const bokningar = await svar.json();

    if (bokningar.length === 0) {
      lista.innerHTML = '<p>Inga bokningar ännu.</p>';
      return;
    }

    lista.innerHTML = `
      <table class="admin-tabell">
        <thead><tr>
          <th>Datum</th><th>Namn</th><th>Telefon</th><th>E-post</th><th>Adress</th><th>Ärende</th>
        </tr></thead>
        <tbody>
          ${bokningar.map(b => `
            <tr>
              <td>${b.datum}</td>
              <td>${b.namn}</td>
              <td><a href="tel:${b.telefon}">${b.telefon}</a></td>
              <td><a href="mailto:${b.epost}">${b.epost}</a></td>
              <td>${b.adress}</td>
              <td>${b.arende}</td>
            </tr>`).join('')}
        </tbody>
      </table>`;
  }
});