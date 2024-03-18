# TODO TEST TASK 
**!!! STILL WORK IN PROGRESS, ESPECIALLY FRONTEND PART !!!**  


## Project structure
- Postgres database
- Adminer GUI for database
- Backend (Nest.js / Typescript)
  - TypeORM
  - Auto seeding `State` table in database during first running of container
- Frontend (React.js / Typescript)
  - Webpack (custom build)
  - Pure CSS with CSS Modules

## Local development
### Prerequisites
- Docker
- Docker Compose

### To run the app
1. `cd` to root directory (where `server` and `client` folders allocated)
2. Run command: `docker compose -f docker-compose.dev.yml up -d`
3. Open `http://localhost:9500/` in browser

### To stop the app
In root directory run: `docker compose -f docker-compose.dev.yml down`
