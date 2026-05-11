# EconPulse

A real-time economic indicator dashboard powered by the FRED API. Track key economic metrics, search for additional series, and bookmark indicators for monitoring.

## Setup

### Local Development

```bash
# Start MongoDB
docker run -d --name econpulse-mongo -p 27017:27017 mongo:7

# Server
cd server
npm install
npm run dev

# Client (separate terminal)
cd client
npm install
npm start
```

Create a `.env` file in the project root:

```
FRED_API_KEY=your_api_key
MONGODB_URL=mongodb://127.0.0.1:27017/econpulse
PORT=3001
```

### Docker

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
docker compose up --build -d
```

- App: http://localhost:3001
- Grafana: http://localhost:3000 (admin/admin)

## Tech Stack

- **Frontend:** React 19, React Router 6
- **Backend:** Express, Mongoose, Node.js
- **Database:** MongoDB 7
- **Observability:** Grafana, Loki
- **CI:** GitHub Actions

## API Endpoints

| Method | Endpoint | Description |
|--------|---------------------|-------------------------------|
| GET | /api/pulse | Fetch 5 key economic indicators |
| GET | /api/search?q=term | Search FRED series |
| POST | /api/bookmarks | Create bookmark (body: {seriesId}) |
| GET | /api/bookmarks | List all bookmarks |
| GET | /api/bookmarks/:id | Get single bookmark |
| PUT | /api/bookmarks/:id | Update notes (body: {notes}) |
| DELETE | /api/bookmarks/:id | Delete bookmark |

## Tests

```bash
cd server && npm test    # 18 backend tests
cd client && CI=true npx react-scripts test --watchAll=false  # 4 frontend tests
```
