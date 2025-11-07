Deployment instructions

Option 1 — GitHub + Vercel (frontend) + Render (backend) — recommended for simplicity

1) Push your repo to GitHub

   git init
   git add .
   git commit -m "initial"
   git remote add origin <your-github-repo-url>
   git push -u origin main

2) Deploy backend to Render (or Heroku)

- Create a new Web Service on Render and connect your GitHub repo.
- Set the build command: `npm install` (root). Start command: `npm start`.
- Set environment variables in Render's dashboard (important):
  - `PORT` (Render sets this automatically)
  - Database connection string (e.g. `MONGO_URI`) — match names your app expects in `config/config.env`
  - `JWT_SECRET`, email creds, and any other secrets
- The `heroku-postbuild` script in `package.json` will build the React client during deploy so the server can serve it from `client/build`.

3) Deploy frontend to Vercel (optional — alternative is to let backend serve static files)

- In Vercel, import the GitHub repo and choose the `client` directory as the project root.
- Build command: `npm run build` (default). Output directory: `build`.
- Set an Environment Variable on Vercel: `REACT_APP_API_URL` to the URL of your backend (for example, `https://your-backend.onrender.com`). This makes the client call the deployed backend.

Option 2 — Single deployment (backend serves frontend)

- If you prefer the backend to serve the frontend, deploy only the root repo to Render/Heroku. During deploy the `heroku-postbuild` script will build the client and `server.js` serves the static `client/build` when `NODE_ENV=production`.

Local testing (quick)

From project root in PowerShell:

```powershell
npm install
cd client
npm install
npm run build
cd ..
#$env:NODE_ENV = 'production'   # optional for Windows PowerShell session
node server.js
```

Docker (optional)

```powershell
docker build -t gas-agency:latest .
docker run -p 5000:5000 --env-file .env gas-agency:latest
```

Important notes

- Keep secrets out of the repo; set them using the host's environment variable UI.
- Client code uses `REACT_APP_API_URL` for the backend URL. If not set, it falls back to `http://localhost:5000`.
- If you deploy frontend separately (Vercel), set `REACT_APP_API_URL` to your backend URL on Vercel's Environment Variables page.
Deployment instructions

Docker (recommended)

1. Build the image:

   docker build -t gas-agency:latest .

2. Run the container (set your env vars or use an env file):

   docker run -p 5000:5000 --env-file .env gas-agency:latest

Render / Heroku (using heroku-postbuild)

- Ensure your remote service runs `npm install` and `npm start` from the project root.
- The `heroku-postbuild` script will build the React app during deployment.
- Set environment variable `NODE_ENV=production` and `PORT` if needed.

Notes

- The server serves static files from `client/build` when `NODE_ENV` is `production`.
- Make sure `config/config.env` is present or set the required env vars for database connection and JWT secrets in your hosting provider.
