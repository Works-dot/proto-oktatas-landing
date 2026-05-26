import { Router, type IRouter } from "express";

const router: IRouter = Router();

const HTML = `<!doctype html>
<html lang="hu">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>Works. — Jelentkezések</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --coral: #EE3956;
    --aubergine: #2A1A2E;
    --bg: #FBF7F5;
    --muted: #6B5E70;
    --hairline: #E7DCE0;
    --white: #FFFFFF;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'Mulish', system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--aubergine);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 28px;
    border-bottom: 1px solid var(--hairline);
    background: var(--white);
  }
  .brand {
    font-weight: 800;
    font-size: 18px;
    letter-spacing: -0.01em;
  }
  .brand .dot { color: var(--coral); }
  .topbar-actions { display: flex; gap: 10px; align-items: center; }
  .btn {
    font-family: inherit;
    font-weight: 600;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 999px;
    border: 1px solid var(--aubergine);
    background: var(--aubergine);
    color: var(--white);
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    line-height: 1.4;
  }
  .btn:hover { opacity: 0.9; }
  .btn-ghost {
    background: transparent;
    color: var(--aubergine);
  }
  .btn-coral { background: var(--coral); border-color: var(--coral); }
  .container { max-width: 1200px; margin: 0 auto; padding: 28px; }
  h1 { font-size: 22px; font-weight: 800; margin: 0 0 6px 0; }
  .sub { color: var(--muted); font-size: 14px; margin-bottom: 24px; }
  .login-card {
    max-width: 420px;
    margin: 80px auto;
    background: var(--white);
    border: 1px solid var(--hairline);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 8px 32px rgba(42, 26, 46, 0.06);
  }
  .login-card h1 { margin-bottom: 8px; }
  label { display: block; font-weight: 600; font-size: 13px; margin-bottom: 6px; color: var(--aubergine); }
  input[type="password"] {
    font-family: inherit;
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--hairline);
    font-size: 15px;
    color: var(--aubergine);
    background: var(--white);
    outline: none;
  }
  input[type="password"]:focus {
    border-color: var(--coral);
    box-shadow: 0 0 0 3px rgba(238, 57, 86, 0.15);
  }
  .err {
    color: var(--coral);
    font-size: 13px;
    margin-top: 12px;
    min-height: 18px;
  }
  .table-wrap {
    background: var(--white);
    border: 1px solid var(--hairline);
    border-radius: 16px;
    overflow: hidden;
  }
  table { width: 100%; border-collapse: collapse; font-size: 13px; table-layout: fixed; }
  thead {
    background: var(--aubergine);
    color: var(--white);
    position: sticky;
    top: 0;
  }
  th, td {
    padding: 10px 12px;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--hairline);
    overflow-wrap: break-word;
  }
  th { font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; }
  /* Explicit column widths: message gets ~half the table, others stay compact. */
  col.c-date { width: 11%; }
  col.c-name { width: 13%; }
  col.c-company { width: 13%; }
  col.c-email { width: 17%; }
  col.c-att { width: 6%; }
  col.c-msg { width: 40%; }
  tbody tr:hover { background: #FAF4F5; }
  td.num { font-variant-numeric: tabular-nums; }
  td.msg { white-space: pre-wrap; word-break: break-word; line-height: 1.45; }
  .empty {
    padding: 60px 20px;
    text-align: center;
    color: var(--muted);
  }
  .stats {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    align-items: baseline;
  }
  .count {
    font-size: 28px;
    font-weight: 800;
    color: var(--aubergine);
  }
  .count-label { color: var(--muted); font-size: 14px; }
  .actions { display: flex; gap: 10px; }
  .hidden { display: none !important; }
  @media (max-width: 720px) {
    .container { padding: 16px; }
    th, td { padding: 8px 8px; font-size: 12px; }
    .table-wrap { overflow-x: auto; }
    table { min-width: 720px; }
  }
</style>
</head>
<body>

<div id="login-view">
  <div class="login-card">
    <h1>Works. <span style="color:var(--coral)">jelentkezések</span></h1>
    <p class="sub">Add meg a belépési kulcsot a jelentkezések megtekintéséhez.</p>
    <form id="login-form" autocomplete="off">
      <label for="token">Belépési kulcs</label>
      <input type="password" id="token" name="token" autocomplete="off" autofocus required />
      <div class="err" id="login-err" role="alert"></div>
      <button type="submit" class="btn btn-coral" style="width:100%;margin-top:12px;padding:12px 16px;font-size:15px">Belépés</button>
    </form>
  </div>
</div>

<div id="admin-view" class="hidden">
  <div class="topbar">
    <div class="brand">Works.<span class="dot">.</span> jelentkezések</div>
    <div class="topbar-actions">
      <a class="btn btn-ghost" id="csv-btn" href="/api/submissions.csv">CSV letöltés</a>
      <button class="btn btn-ghost" id="logout-btn" type="button">Kijelentkezés</button>
    </div>
  </div>
  <div class="container">
    <h1>Beérkezett jelentkezések</h1>
    <p class="sub">Legfrissebb felül. Frissítéshez töltsd újra az oldalt.</p>
    <div class="stats">
      <span class="count" id="count">–</span>
      <span class="count-label">jelentkezés összesen</span>
    </div>
    <div class="table-wrap">
      <table>
        <colgroup>
          <col class="c-date" />
          <col class="c-name" />
          <col class="c-company" />
          <col class="c-email" />
          <col class="c-att" />
          <col class="c-msg" />
        </colgroup>
        <thead>
          <tr>
            <th>Időpont</th>
            <th>Név</th>
            <th>Cég</th>
            <th>Email</th>
            <th class="num">Fő</th>
            <th>Üzenet</th>
          </tr>
        </thead>
        <tbody id="rows"></tbody>
      </table>
      <div class="empty hidden" id="empty">Még nem érkezett jelentkezés.</div>
    </div>
  </div>
</div>

<script>
(function () {
  var loginView = document.getElementById('login-view');
  var adminView = document.getElementById('admin-view');
  var loginForm = document.getElementById('login-form');
  var tokenInput = document.getElementById('token');
  var loginErr = document.getElementById('login-err');
  var rowsEl = document.getElementById('rows');
  var emptyEl = document.getElementById('empty');
  var countEl = document.getElementById('count');
  var logoutBtn = document.getElementById('logout-btn');

  function showLogin() {
    adminView.classList.add('hidden');
    loginView.classList.remove('hidden');
    setTimeout(function () { tokenInput.focus(); }, 0);
  }
  function showAdmin() {
    loginView.classList.add('hidden');
    adminView.classList.remove('hidden');
    loadLeads();
  }
  function fmtDate(s) {
    try {
      var d = new Date(s);
      return d.toLocaleDateString('hu-HU', {
        year: 'numeric', month: '2-digit', day: '2-digit'
      });
    } catch (e) { return String(s); }
  }
  function escapeHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  async function loadLeads() {
    rowsEl.innerHTML = '';
    emptyEl.classList.add('hidden');
    countEl.textContent = '–';
    try {
      var r = await fetch('/api/submissions', { credentials: 'same-origin' });
      if (r.status === 401) { showLogin(); return; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      var data = await r.json();
      var leads = data.leads || [];
      countEl.textContent = String(leads.length);
      if (leads.length === 0) {
        emptyEl.classList.remove('hidden');
        return;
      }
      var html = '';
      for (var i = 0; i < leads.length; i++) {
        var L = leads[i];
        html += '<tr>'
          + '<td>' + escapeHtml(fmtDate(L.createdAt)) + '</td>'
          + '<td>' + escapeHtml(L.name) + '</td>'
          + '<td>' + escapeHtml(L.company) + '</td>'
          + '<td><a href="mailto:' + escapeHtml(L.email) + '" style="color:var(--coral);text-decoration:none;word-break:break-all">' + escapeHtml(L.email) + '</a></td>'
          + '<td class="num">' + escapeHtml(L.attendees) + '</td>'
          + '<td class="msg">' + escapeHtml(L.message || '') + '</td>'
          + '</tr>';
      }
      rowsEl.innerHTML = html;
    } catch (e) {
      rowsEl.innerHTML = '<tr><td colspan="6" style="color:var(--coral);padding:20px">Nem sikerült lekérdezni a jelentkezéseket. Frissítsd az oldalt.</td></tr>';
    }
  }

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    loginErr.textContent = '';
    var btn = loginForm.querySelector('button[type=submit]');
    btn.disabled = true;
    var prev = btn.textContent;
    btn.textContent = 'Belépés…';
    try {
      var r = await fetch('/api/submissions/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: tokenInput.value })
      });
      if (r.status === 429) {
        loginErr.textContent = 'Túl sok próbálkozás. Próbáld újra 15 perc múlva.';
        return;
      }
      if (!r.ok) {
        loginErr.textContent = 'Hibás belépési kulcs.';
        tokenInput.select();
        return;
      }
      tokenInput.value = '';
      showAdmin();
    } catch (err) {
      loginErr.textContent = 'Hálózati hiba. Próbáld újra.';
    } finally {
      btn.disabled = false;
      btn.textContent = prev;
    }
  });

  logoutBtn.addEventListener('click', async function () {
    try { await fetch('/api/submissions/logout', { method: 'POST', credentials: 'same-origin' }); } catch (e) {}
    showLogin();
  });

  (async function init() {
    try {
      var r = await fetch('/api/submissions/me', { credentials: 'same-origin' });
      if (r.ok) { showAdmin(); } else { showLogin(); }
    } catch (e) { showLogin(); }
  })();
})();
</script>
</body>
</html>
`;

router.get("/submissions", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.send(HTML);
});

export default router;
