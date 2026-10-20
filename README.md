# Customer Dashboard

A React customer-spending dashboard with customer profile, spending summaries, category breakdowns, trends, transactions, and goals. The current data service uses local mock data; no backend service is required.

## Requirements

- Node.js 22 or later and npm
- Docker with the Compose plugin for container workflows

## Run with Docker Compose

Build the production image and start the dashboard:

```sh
docker compose up --build
```

Open <http://localhost:8080>. The container serves the optimized static build through Nginx. Stop it with `Ctrl+C`; remove the container with:

```sh
docker compose down
```

To build and run the image without Compose:

```sh
docker build -t customer-dashboard .
docker run --rm -p 3000:80 customer-dashboard
```

## Local Development

Install the locked dependencies and start the development server:

```sh
npm ci
npm start
```

Open <http://localhost:3000>. The development server reloads when source files change.

## Build and Test

Create the optimized production bundle:

```sh
npm run build
```

Run the test suite once in CI mode:

```sh
npm test -- --watchAll=false --runInBand
```

For the interactive test watcher, run `npm test`.

## Project Structure

- `src/screens/` contains dashboard views and UI components.
- `src/services/api.js` provides the mock-data API used by the dashboard.
- `src/mockData/` contains the sample customer and spending data.
- `Dockerfile` builds the app and serves it with Nginx.
- `nginx.conf` configures SPA routing, response headers, and static asset caching.
- `compose.yaml` exposes the container on port 3000.
