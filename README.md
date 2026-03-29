# CS696A - Full-Stack Enterprise Application

Node.js/Express backend with JWT auth, MongoDB, Docker, Grafana, and CI.

## Quick Start

1. Copy `.env.example` to `.env` and fill in your values
2. Install the Loki Docker plugin: `docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions`
3. Run `docker compose up --build -d`
4. API is at `http://localhost:8000`, Grafana at `http://localhost:3000`

## Project Structure

```
├── src/
│   ├── middleware/
│   │   └── requireAuth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── tests/
│   │   └── routes/
│   │       └── auth.test.js
│   └── utils/
│       └── jwt.js
├── calculator/          # React calculator app (Lab 4)
├── .github/workflows/   # CI workflow (Lab 7)
├── server.js
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## API Endpoints

- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Log in
- `POST /api/auth/refresh` - Refresh tokens
- `POST /api/auth/logout` - Log out
- `GET /api/auth/me` - Get current user (requires auth)

## Services (Docker Compose)

- **pace-auth-api** - Node.js backend on port 8000
- **pace-mongo** - MongoDB on port 27017
- **pace-grafana** - Grafana on port 3000
- **pace-loki** - Loki log aggregator on port 3100

## Testing

```
npm test
```

Tests run automatically on push to main via GitHub Actions (requires `.js` file changes).
