# Lakehouse Pro Prep

Interactive study tracker for the Databricks Certified Data Engineer Professional exam.

## What it includes

- Four-week, one-hour-per-day study plan
- Topic-by-topic Professional exam study modules
- Local browser progress tracking
- Original practice questions tied to official Databricks documentation
- Mobile-friendly static HTML, CSS, and JavaScript

## Run locally

From this folder:

```powershell
.\.venv\Scripts\python.exe -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://localhost:8000/
```

To test from a phone on the same Wi-Fi:

```powershell
.\.venv\Scripts\python.exe -m http.server 8000 --bind 0.0.0.0
```

Then open `http://YOUR_COMPUTER_IP:8000/` on the phone.
