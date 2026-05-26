# Works. landing — Railway deploy útmutató

Egy szolgáltatás: az Express API kiszolgálja a React SPA-t és a `/api/*` route-okat. A leadek Railway Postgres add-onban tárolódnak. Egy `git push` → Railway build és deploy.

---

## 1. Kód GitHub-ra

```bash
git init                       # ha még nincs
git add .
git commit -m "Works. landing + lead form"
git branch -M main
git remote add origin git@github.com:<USER>/<REPO>.git
git push -u origin main
```

## 2. Railway projekt létrehozása

1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
2. Engedélyezd Railway GitHub appot a repodra → válaszd ki a repót.
3. A Railway felismeri a `Dockerfile`-t és a `railway.json`-t — nem kell beállítani semmit.

## 3. Postgres add-on

A projektedben: **+ New** → **Database** → **Add PostgreSQL**.
Ez automatikusan beinjektálja a `DATABASE_URL` env változót az app service-be (a tábla a deploy release commandjából — `drizzle-kit push` — magától létrejön).

## 4. Admin token beállítása

Generálj egy hosszú véletlen tokent:

```bash
openssl rand -hex 32
```

A Railwayn az app service → **Variables** fülön add hozzá:

| kulcs          | érték                                |
| -------------- | ------------------------------------ |
| `ADMIN_TOKEN`  | a generált hex token                 |
| `NODE_ENV`     | `production` *(opcionális, már default)* |

(A `DATABASE_URL` és `PORT` automatikusan ott van.)

## 5. Domain

App service → **Settings → Networking** → **Generate Domain** → kapsz egy `*.up.railway.app` címet.
Saját domainhez: **+ Custom Domain** → írd be (pl. `kepzes.worksdot.hu`) → másold a CNAME célt → állítsd be a DNS-nél.

## 6. Deploy

A `git push origin main` minden alkalommal triggereli a deployt. Az első deploy ~3–5 perc (Docker build), utána ~1–2 perc.

A deploy után ellenőrzés:

```bash
curl https://<your-domain>/api/healthz
# {"status":"ok"}
```

Töltsd ki a formot a publikus URL-en → 201-et kell kapnod (Network tab).

## 7. Leadek lekérdezése

Három mód, mindegyikhez az `ADMIN_TOKEN` kell.

### Terminálból CSV (Excel-kompat)

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
     -o leads.csv \
     https://<your-domain>/api/leads.csv
open leads.csv   # macOS: Excelben/Numbersben megnyitja
```

Egy `~/.zshrc` aliasszal egy parancs:

```bash
alias leads-csv='curl -H "Authorization: Bearer $WORKS_ADMIN_TOKEN" -o ~/Downloads/leads-$(date +%F).csv https://<your-domain>/api/leads.csv && open ~/Downloads/leads-$(date +%F).csv'
```

(A token URL paraméterként történő átadását szándékosan eltávolítottuk — a böngésző history, server access log és referer headerek mind szivárogtatnák.)

### Terminálból, JSON

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" https://<your-domain>/api/leads.json | jq
```

### Desktop DB-kliens (a legkomolyabb lekérdezésekhez)

[TablePlus](https://tableplus.com) vagy [Beekeeper Studio](https://www.beekeeperstudio.io) (mindkettő ingyenes):

1. Railway → Postgres service → **Variables** fül → másold a `DATABASE_PUBLIC_URL`-t (külső access).
2. A kliensben **+ new connection → from URL** → beillesztés.
3. Tetszőleges SQL: `SELECT * FROM leads ORDER BY created_at DESC;`

---

## Helyi futtatás (opcionális)

A Replit envben (vagy lokálban, ha be van állítva `DATABASE_URL`):

```bash
pnpm install
pnpm --filter @workspace/db run migrate      # alkalmazza a lib/db/drizzle/*.sql migrációkat
pnpm --filter @workspace/works-landing dev   # frontend
pnpm --filter @workspace/api-server dev      # backend
```

Új séma változtatás után:

```bash
pnpm --filter @workspace/db run generate      # új SQL migration a lib/db/drizzle/-be
git add lib/db/drizzle && git commit -m "..."
```

A development NEM serve-eli a buildelt SPA-t — a Vite dev server adja a fronendet, az API a `:8080`-on.

## Hibakeresés

| Tünet                                       | Megoldás                                                                                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Form submit `500`-at ad                     | Railway logban nézd meg az api-server hibát. Tipikusan hiányzó vagy rossz `DATABASE_URL`.                                                            |
| `/api/leads.csv` `503`-at ad                | Az `ADMIN_TOKEN` változó nincs beállítva a service Variables fülén.                                                                                  |
| `/api/leads.csv` `401`-et ad                | Rossz vagy hiányzó `Authorization: Bearer <ADMIN_TOKEN>` header.                                                                                     |
| Domain felmegy de a frontend 404            | Build hibás. Railway → Deployments → kattints a buildre → ellenőrizd, hogy `pnpm --filter @workspace/works-landing build` lefutott a Docker buildben. |
| `column "..." does not exist`               | A `drizzle-kit migrate` nem futott le a deploy startCommandban. Nézd meg a Deploy logot. Új séma esetén lokálban `pnpm --filter @workspace/db run generate` után commit-old a `lib/db/drizzle/*.sql` fájlokat is.                              |
| Túl sok spam beérkezik a formon             | A jelenlegi védés: 1 submit / 30s / IP. Ha kell, follow-up: honeypot mező vagy hCaptcha.                                                              |

## Mi van bekonfigurálva

- `Dockerfile` — multi-stage Node 20 Alpine + pnpm.
- `railway.json` — Dockerfile builder, `/api/healthz` healthcheck, startCommand `drizzle-kit migrate` (verziókövetett SQL migrációk a `lib/db/drizzle/` mappából — sosem destruktív auto-diff).
- `.dockerignore` — kihagyja a `node_modules`/`dist`/`.local`/`attached_assets` mappákat a build kontextusból.
- `STATIC_DIR` env var alapértelmezetten `/app/artifacts/works-landing/dist/public` — az Express innen szolgálja a React SPA-t produkcióban, SPA-fallbackkel az `/api`-n kívüli útvonalakra.
