# 🌐 CONFLICT INTEL — Global Conflict & Intelligence Tracker

A full-stack MERN application with an interactive 3D globe for tracking global conflicts, military intelligence, and geopolitical data.

---

## ✨ Features

- **Interactive 3D Globe** — Three.js powered globe with draggable rotation, zoom, and conflict markers
- **Conflict Type Color Coding** — Civil Wars (orange), Proxy Wars (purple), Interstate Wars (red)
- **Severity Index** — Visual severity scoring (1–10) with animated indicator rings on the globe
- **Hover Tooltips** — Real-time casualty counts, displacement figures, conflict type on hover
- **Full Intel Report** — Dedicated detail page per conflict with 4 tabs:
  - Overview (summary, casualties, parties, territory)
  - Military Intel (side-by-side force comparison with bar charts)
  - Power Rankings (Global Fire Power Index top 10 table)
  - Timeline (chronological key events)
- **Filtering & Search** — Filter by conflict type, search by country
- **Dark Tactical UI** — Military-aesthetic design with Orbitron + Rajdhani + Share Tech Mono fonts
- **API-Ready Architecture** — Backend Express API ready to swap static JSON for live data

---

## 🗂 Project Structure

```
conflict-tracker/
├── server/                  # Express.js backend
│   ├── data/
│   │   ├── conflicts.json   # ← ADD YOUR CONFLICTS HERE
│   │   └── powerRankings.json
│   ├── routes/
│   │   ├── conflicts.js
│   │   └── rankings.js
│   ├── index.js
│   └── package.json
│
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Globe.js           # Three.js 3D globe
│   │   │   ├── Navbar.js
│   │   │   ├── ConflictCard.js    # Sidebar conflict cards
│   │   │   ├── StatsBar.js        # Top statistics bar
│   │   │   ├── MilitaryComparison.js
│   │   │   └── PowerRankings.js
│   │   ├── pages/
│   │   │   ├── HomePage.js        # Globe + sidebar layout
│   │   │   └── ConflictDetailPage.js
│   │   ├── data/
│   │   │   └── conflictsData.js   # Frontend data (mirrors server JSON)
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── package.json             # Root (monorepo runner)
└── README.md
```

---

## 🚀 Setup & Running

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Install dependencies

```bash
# From the root conflict-tracker/ directory
npm install
npm run install:all
```

Or manually:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Run development servers

```bash
# From root — runs both simultaneously
npm run dev
```

Or separately:
```bash
# Terminal 1 — Backend API on http://localhost:5000
npm run dev:server

# Terminal 2 — React frontend on http://localhost:3000
npm run dev:client
```

### 3. Open the app

Visit **http://localhost:3000**

---

## 📊 Adding Conflict Data

### Method 1: Edit JSON directly (current)

Edit `server/data/conflicts.json` and `client/src/data/conflictsData.js` — they mirror each other.

### Conflict Data Schema

```json
{
  "id": "unique-conflict-id",
  "country": "Country Name",
  "countryCode": "XX",
  "coordinates": { "lat": 0.0, "lng": 0.0 },
  "conflictType": "civil war | proxy war | interstate war",
  "severity": 7.5,
  "status": "active | ceasefire | simmering | resolved",
  "startDate": "YYYY-MM-DD",
  "parties": ["Party A", "Party B"],
  "proxyActors": ["External Actor 1"],
  "activeDeaths": 50000,
  "civilianCasualties": 20000,
  "displaced": 500000,
  "summary": "Brief description of the conflict.",
  "territory": "Affected regions",
  "keyEvents": [
    { "date": "YYYY-MM-DD", "event": "Event description" }
  ],
  "military": {
    "sideA": {
      "activePersonnel": 100000,
      "tanks": 500,
      "aircraft": 200,
      "navy": 50,
      "militaryBudgetUSD": 5000000000,
      "nuclearWarheads": 0,
      "gwpIndex": 0.2500
    }
  },
  "globalPowerRankings": [
    { "country": "Country", "rank": 10, "score": 0.2500 }
  ]
}
```

### Method 2: Connect a Live API (future)

In `client/src/pages/HomePage.js`, replace the static import with an axios call:

```javascript
// Replace this:
import { conflictsData } from '../data/conflictsData';

// With this (when backend is live):
const [conflicts, setConflicts] = useState([]);
useEffect(() => {
  axios.get('/api/conflicts').then(res => setConflicts(res.data.data));
}, []);
```

---

## 🎮 Globe Controls

| Action | Control |
|--------|---------|
| Rotate | Click + Drag |
| Zoom | Scroll wheel |
| Inspect conflict | Click on marker |
| Auto-rotate | Resumes 3s after drag |

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/conflicts` | All conflicts |
| GET | `/api/conflicts?type=civil+war` | Filter by type |
| GET | `/api/conflicts?severity=8` | Filter by min severity |
| GET | `/api/conflicts/:id` | Single conflict |
| GET | `/api/conflicts/country/:code` | By country code |
| GET | `/api/rankings` | All power rankings |
| GET | `/api/rankings/:code` | Single country ranking |

---

## 🔮 Future Roadmap

- [ ] MongoDB integration (replace JSON files with Mongoose models)
- [ ] Live API data (ACLED, GDELT, ReliefWeb, UNOCHA)
- [ ] Country boundary GeoJSON rendering on globe
- [ ] News feed integration per conflict
- [ ] Conflict heat-map layer toggle
- [ ] Admin dashboard for adding/editing conflicts
- [ ] WebSocket live updates
- [ ] Export reports as PDF

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| 3D Globe | Three.js |
| Charts | Recharts |
| Animation | Framer Motion |
| Backend | Express.js |
| Database | JSON (→ MongoDB ready) |
| HTTP Client | Axios |
| Fonts | Orbitron, Rajdhani, Share Tech Mono |

---

## 📜 License

MIT — Built for open intelligence and awareness.
