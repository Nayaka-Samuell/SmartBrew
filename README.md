# Smart Brewer & Co. ☕🤖

Smart Brewer & Co. adalah aplikasi pintar berbasis **Machine Learning** yang memberikan rekomendasi resep seduhan V60 yang dipersonalisasi untuk setiap pengguna. 

Proyek ini dibangun menggunakan arsitektur **Multi-Agent (Herdr / Pi TUI)** di mana pengembangan Front-end dan Back-end didelegasikan secara terpisah kepada AI Agent spesialis.

## 🚀 Tech Stack

**Frontend:**
- [Next.js 14](https://nextjs.org/) (App Router)
- [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) (Animasi UI)
- [Zustand](https://github.com/pmndrs/zustand) & [Axios](https://axios-http.com/)

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) (Python)
- [SQLite](https://www.sqlite.org/) & [SQLAlchemy](https://www.sqlalchemy.org/) (Database & ORM)
- [Scikit-Learn](https://scikit-learn.org/) (Machine Learning Engine)

---

## 🛠️ Cara Menjalankan (Local Development)

Proyek ini terbagi menjadi dua folder utama: `frontend/` dan `backend/`.

### 1. Menjalankan Backend (FastAPI)
Buka terminal dan navigasikan ke folder `backend`:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
API akan berjalan di `http://localhost:8000`.

### 2. Menjalankan Frontend (Next.js)
Buka terminal baru dan navigasikan ke folder `frontend`:
```bash
cd frontend
npm install
npm run dev
```
Aplikasi web akan berjalan di `http://localhost:3000`.

---

## 🛡️ Arsitektur Keamanan & Database
- Semua Environment Variables (`.env`, `.env.local`) **diabaikan (ignored)** dari Git demi keamanan *secret keys*.
- Database riwayat resep menggunakan SQLite (`sql_app.db`) dan disimpan secara lokal (juga tidak diunggah ke repository).

## 🤖 Multi-Agent Workspace
Proyek ini dirancang agar dapat dikembangkan menggunakan agen AI (seperti **Pi / Earendil**). Terdapat script khusus (`spawn_crew_pane.bat`) untuk menginisialisasi lingkungan *split-pane* yang mendelegasikan tugas ke *Backend Crew* dan *Frontend Crew* secara simultan di dalam environment terminal.
