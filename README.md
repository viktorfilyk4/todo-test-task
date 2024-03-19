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
- Docker (used `v25.0.2` on MacOS)
- Docker Compose (used `v2.24.3` on MacOS)

### To run the app
1. Rename `.env.sample` to `.env` in root directory 
2. `cd` to root directory (where `server` and `client` folders allocated)
3. Run command: `docker compose -f docker-compose.dev.yml up -d`
4. Open `http://localhost:9500/` in browser

### To stop the app
In root directory run: `docker compose -f docker-compose.dev.yml down`


## UI
Inspired with Trello and this [Figma template](https://www.figma.com/file/qn3ALd8L1ghVuXEeYFXm1N/Frello---Your-Trello-Board-in-Figma-(Community)) :)
