# Krilles IT Shop (KITS)

## 📌 Syfte

Syftet med projektet **Krilles IT Shop (KITS)** är att skapa en modern, informativ och visuellt tilltalande webbplats åt den fiktiva kunden **Krille**, som driver en liten IT-butik med inriktning på datorkomponenter, reparationer och hemelektronik.  
Webbplatsen ska fungera som en digital butikssida för både befintliga och potentiella kunder genom att erbjuda lättillgänglig information om sortiment, tjänster och kontaktmöjligheter.

Hemsidan ska:
- Presentera butikens öppettider och kontaktuppgifter
- Visa tillgängliga komponenter och produkter i lager
- Informera om reparations- och felsökningstjänster
- Möjliggöra tidsbokning för hemservice
- Vara informativ, lättnavigerad och professionell
- Fungera på dator, surfplatta och mobil
- Drivas av en lokal Node.js/Express-server med REST API
- Erbjuda en lösenordsskyddad adminpanel för produkthantering



## 📋 Kravspecifikation

### 🗺️ Innehåll
Webbplatsen ska innehålla följande sidor och sektioner:

- **Startsida** – Välkomstsida med kort presentation av butiken
- **Sortiment / Lager** – Lista över tillgängliga datorkomponenter
- **Tjänster** – Beskrivning av reparationer, felsökningar och OS-/hårdvaruoptimering
- **TV & Hemmabio** – Presentation av TV-apparater och ljud-/bildsystem
- **Boka hemservice** – Formulär för att boka tid för hembesök
- **Om oss** – Information om Krille och butiken
- **Admin** – Lösenordsskyddad panel för att hantera produkter i lager (lägg till, redigera, ta bort)

För varje sida gäller:
- Relevant och beskrivande innehåll anpassat till sidan
- Bilder och media som passar in i butikskontexten
- Bilder ska visas med **CSS Flexbox**
- Upphovsrätt ska respekteras för alla bilder som hämtas online



### 🎨 Design & Användarupplevelse
- Webbplatsens namn ska vara **Krilles IT Shop** med logotyp/varumärke **KITS**
- Navigationsmeny (navbar) ska finnas på alla sidor och innehålla:
  - Länk till startsida
  - Sortiment / Lager
  - Tjänster
  - TV & Hemmabio
  - Boka hemservice
  - Om oss
  - Kontakt
- Footer ska innehålla:
  - Dynamiskt årtal som hämtas via JavaScript
  - Butiksnamn och kortfattad kontaktinfo
- Webbplatsen ska ha **Ljust och Mörkt läge**
  - Växling sker via knapp
  - Valet sparas i `localStorage`
- Webbplatsen ska vara **responsiv** för PC, surfplatta och mobil
- DOM-manipulation med JavaScript ska användas för interaktiva element



### 🧑‍💻 Teknik & Struktur

#### Fil- och mappstruktur
Projektet ska använda följande struktur:

```
KITS/
├── server.js               # Express-server & API-routes
├── .env                    # Inloggningsuppgifter (ej committad)
├── .env.example            # Mall för .env utan riktiga värden
├── .gitignore              # Ignorerar .env och node_modules
├── package.json
├── data/
│   └── produkter.json      # Produktdata (tillfällig "databas")
└── src/
    ├── index.html
    ├── om-oss.html
    ├── kontakt.html
    ├── boka.html
    ├── admin.html          # Adminpanel (skyddad via JWT)
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── main.js
    │   └── admin.js        # Admin-specifik JS (login, CRUD)
    └── sidor/
        ├── sortiment.html
        ├── tjanster.html
        └── tv-hemmabio.html
```

- `server.js` kör Express och exponerar REST API på `/api/`
- `.env` innehåller admin-användare och bcrypt-hashade lösenord — **committeas aldrig**
- `.env.example` committeas och visar vilka variabler som behövs
- `data/produkter.json` används som tillfällig datalagring (se notering om databas nedan)
- All JavaScript-kod för frontend ligger i `src/js/`
- All CSS ska ligga i extern fil: `src/css/style.css`
- Projektet ska publiceras på GitHub med **MIT-licens**



## 👤 Användarfall (User Cases)

| # | Användare | Vill... | Så att... |
|---|-----------|---------|-----------|
| 1 | Kund | Se vilka komponenter som finns i lager | De kan planera ett köp eller reparation |
| 2 | Kund | Boka tid för hemservice | En tekniker kan komma hem och hjälpa dem |
| 3 | Kund | Ta reda på var de kan lämna in sin dator | De vet vart de ska gå för reparation/optimering |
| 4 | Kund | Se öppettider och kontaktuppgifter | De kan planera sitt besök eller ta kontakt |
| 5 | Kund | Läsa om vilka reparationer och tjänster som erbjuds | De vet om butiken kan lösa deras problem |
| 6 | Kund | Bläddra bland TV-apparater och hemmabiosystem | De kan hitta produkter som passar deras behov |
| 7 | Kund | Växla mellan ljust och mörkt läge | Webbplatsen är bekväm att använda i olika ljusmiljöer |
| 8 | Kund | Navigera enkelt på mobil | De kan använda sidan även när de är på språng |
| 9 | Admin | Logga in på adminpanelen | Åtkomst skyddas från obehöriga |
| 10 | Admin | Lägga till en ny produkt med namn, pris, mängd och bild | Sortimentet hålls uppdaterat |
| 11 | Admin | Redigera befintlig produkt | Felaktig info kan korrigeras snabbt |
| 12 | Admin | Ta bort en produkt | Utgångna eller slutsålda produkter kan rensas |



## 🗓️ Tidsplan & Milstolpar

### Milstolpe 1 – Projektplan & Grundstruktur
**Datum:** Vecka 1

- Projektplan klar och godkänd
- Mappstruktur och tomma HTML-filer skapade
- Gemensam navbar och footer implementerad
- Grundläggande CSS-variabler och färgtema satt upp

**Möte med Krille:** Genomgång av projektplan och förväntningar

---

### Milstolpe 2 – Backend, Innehåll & Layout
**Datum:** Vecka 2–3

- Alla sidor har innehåll (text, bilder, listor)
- Flexbox-baserade bildgallerier implementerade
- Responsiv layout med media queries klar
- Ljust/mörkt läge fungerar och sparas i `localStorage`
- Bokningsformuläret är färdigbyggt
- Express-server körs lokalt med REST API för produkter
- JWT-baserad inloggning till adminpanelen fungerar
- Admin kan lägga till, redigera och ta bort produkter via adminpanelen
- Produktdata läses från och skrivs till `data/produkter.json`

**Möte med Krille:** Genomgång av design och innehåll, feedback inhämtas

---

### Milstolpe 3 – Testning, Optimering & Publicering
**Datum:** Vecka 4 (klart senast 17 maj)**

- Webbplatsen testad i flera webbläsare och på mobil
- Tillgänglighetstester genomförda (Lighthouse + manuellt)
- Bilder optimerade för webben
- HTML och CSS validerade
- Dokumentation och utvärdering klar
- Publicerad på GitHub med MIT-licens

**Möte med Krille:** Slutredovisning och leverans



## 🛠️ Genomförande

### 1️⃣ Planering
- Definiera sidstruktur och navigationsflöde
- Samla och bearbeta bilder för sortiment, tjänster och produkter
- Säkerställa upphovsrätt för alla externa bilder
- Fastställa färgtema och designriktning

### 2️⃣ Struktur & HTML
- Skapa `index.html` som startsida
- Skapa separata HTML-sidor för varje sektion
- Skapa `admin.html` med inloggningsformulär och produkthanteringsgränssnitt
- Implementera gemensam navbar med alla länkar
- Implementera footer med dynamiskt årtal

### 3️⃣ Backend & API (Node.js / Express)
- Sätta upp `server.js` med Express och statisk filservering av `src/`
- Skapa REST API-routes:
  - `GET /api/produkter` – hämta alla produkter
  - `POST /api/produkter` – lägg till produkt (kräver auth)
  - `PUT /api/produkter/:id` – uppdatera produkt (kräver auth)
  - `DELETE /api/produkter/:id` – ta bort produkt (kräver auth)
  - `POST /api/login` – autentisera admin, returnera JWT
- Läsa inloggningsuppgifter från `.env` med `dotenv`
- Lösenord lagras bcrypt-hashade i `.env`
- JWT-token används för att skydda admin-routes
- Produktdata läses/skrivs till `data/produkter.json`

### 3️⃣ CSS & Layout
- Implementera färgtema med CSS-variabler
- Använda Flexbox för bildgallerier och layouter
- Säkerställa god kontrast och läsbarhet
- Skapa responsiv layout med media queries

### 5️⃣ JavaScript-funktionalitet
- Implementera ljust/mörkt läge i `main.js`
- Spara användarens temval i `localStorage`
- Dynamiskt uppdatera årtal i footer
- DOM-manipulation för interaktiva element (t.ex. meny, formulär)
- `admin.js`: hantera inloggning, spara JWT i `sessionStorage`, CRUD mot API

### 5️⃣ Testning & Kvalitetssäkring
- Testa i flera webbläsare (Chrome, Firefox, Edge)
- Testa på mobil och surfplatta
- Köra Lighthouse-analys för tillgänglighet och prestanda
- Genomföra manuella tillgänglighetskontroller
- Validera HTML (W3C) och CSS
- Optimera bildstorlekar och minska antal nätverksanrop



## 🎨 Färgtema

### 🔵 Temafärger
- Primary: `#0057B7`
- Hover: `#0041A3`
- Subtle: `#E6F0FF`

### 🌕 Ljust läge
- Background: `#F8F9FB`
- Surface / Card: `#FFFFFF`
- Border / Divider: `#E5E7EB`

- Text Primary: `#0F172A`
- Text Secondary: `#475569`
- Text Muted: `#94A3B8`

### 🌑 Mörkt läge
- Background: `#0B0F14`
- Surface / Card: `#111827`
- Border / Divider: `#1F2933`

- Text Primary: `#E5E7EB`
- Text Secondary: `#9CA3AF`
- Text Muted: `#6B7280`

### 🟢 Statusfärger
- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#38BDF8`



## 📚 Dokumentation & Kvalitetskrav (A-nivå)

### Tillgänglighet
- Alt-texter på alla bilder
- Semantisk HTML-struktur (`<header>`, `<nav>`, `<main>`, `<footer>`, etc.)
- Lighthouse-analys dokumenteras med skärmdumpar
- Manuella tester: tangentbordsnavigering, kontrast, skärmläsarsimulering

### Testning
- Webbläsare: Chrome, Firefox, Edge
- Enheter: Desktop, surfplatta, mobil
- Optimering: Komprimerade bilder, minimalt antal HTTP-anrop

### 🖼️ Bildoptimering & CDN
- Bilder komprimeras innan de läggs till i projektet (t.ex. via Squoosh eller TinyPNG)
- Som alternativ eller komplement kan bilder serveras via ett **CDN (Content Delivery Network)**, t.ex. Cloudinary eller jsDelivr
- Fördelar med CDN:
  - Bilder cachas globalt och levereras från närmaste server till användaren
  - Minskad belastning på den lokala servern
  - Automatisk bildoptimering och formatkonvertering (t.ex. WebP) i vissa CDN-tjänster
  - Snabbare laddningstider, särskilt för användare långt från servern
- I produktion bör produktbilder som laddas upp via adminpanelen lagras i en CDN-tjänst snarare än lokalt på servern

### Lagar & Etik
- GDPR-hänsyn vid eventuell formulärhantering
- Upphovsrätt respekteras för alla bilder och media
- Resonemang om val av publiceringsplattform och säkerhet dokumenteras

### 🔐 Säkerhet & Produktionsnoteringar

> ⚠️ **Detta projekt använder en förenklad säkerhetsmodell lämplig för skolmiljö.**  
> Nedan dokumenteras vad som *bör* implementeras i en riktig produktionsmiljö.

#### Lösenord & autentisering
- Lösenord i `.env` ska vara **bcrypt-hashade** — aldrig sparade i klartext
- `.env` ska **aldrig committeas** till Git — lägg till i `.gitignore`
- `.env.example` committeas med tomma värden som mall:
  ```
  ADMIN_USER=
  ADMIN_PASSWORD_HASH=
  JWT_SECRET=
  PORT=3000
  ```
- I produktion bör lösenord hanteras via en riktig autentiseringstjänst (t.ex. OAuth, Passport.js)
- JWT-tokens bör ha kort livslängd och förnyas via refresh tokens

#### Databas
- `data/produkter.json` är en **tillfällig lösning** — inte lämplig för produktion
- I en verklig miljö ska data lagras i en relationsdatabas eller dokumentdatabas, t.ex.:
  - **MariaDB / PostgreSQL** – strukturerad data med relationer
  - **MongoDB** – flexibelt dokumentbaserat alternativ
- Databasuppgifter ska också hanteras via miljövariabler, aldrig hårdkodas

#### Webbhotell & deployment
- Vid val av webbhotell bör man beakta: HTTPS/TLS-stöd, brandväggsinställningar, regelbundna säkerhetsuppdateringar och var data fysiskt lagras (GDPR)
- En Node.js-app i produktion bör köras bakom en reverse proxy (t.ex. Nginx) och processhanterare (t.ex. PM2)

### Terminologi
- Korrekt och konsekvent användning av webbutvecklingsterminologi i all dokumentation
- Termer som DOM, responsivitet, tillgänglighet, validering m.fl. används professionellt