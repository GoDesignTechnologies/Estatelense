# EstateLens

AI-powered real estate video analysis & marketing platform. Upload a property
walkthrough (file or YouTube link) and Gemini **actually watches the video** to
extract what's really on screen — visible rooms, finishes, and any on-screen
text (prices, captions, phone numbers) — then generates a full marketing pack:
portal listing, WhatsApp pitch, social caption, bilingual voiceover scripts, a
reel timeline anchored to real moments, thumbnail ideas, and a Veo b-roll prompt.

## How analysis works

- **Uploaded video** -> the file bytes are sent to Gemini (inline for small clips,
  the Gemini File API for larger ones), and analysed frame-by-frame.
- **YouTube link** -> the public URL is handed directly to Gemini, which watches
  the video (no scraping).
- **No video** -> it still writes copy from the details you type, and clearly
  labels the result as generated-from-details (not from footage).

If `GEMINI_API_KEY` is missing or a video can't be analysed, the app shows a clear
error instead of inventing fake content.

## Run locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` (or `.env.local`) file with your key:
   ```bash
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```
   Get a key at https://aistudio.google.com/apikey
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

To run a production build locally:
```bash
npm run build
npm start
```

## Deploying

This app is a single Node service: an Express server that both serves the built
frontend and runs the Gemini analysis. Real video uploads (File API processing +
Veo) can take from several seconds up to a couple of minutes per request.

### Recommended: a persistent Node host (Render / Railway / Fly.io)

These run a normal long-lived server, so there are **no request-timeout limits**
to fight - the right fit for video processing.

**Render (one click with the included `render.yaml`):**
1. Push this repo to GitHub.
2. In Render -> New -> Blueprint, point it at the repo.
3. Set `GEMINI_API_KEY` in the Environment tab.
4. Deploy. Build runs `npm run build`, start runs `npm start`.

**Railway / Fly.io / any container host:** a production `Dockerfile` is included.
Build command `npm run build`, start command `npm start`, and set the
`GEMINI_API_KEY` env var.

### Vercel / Netlify - important caveat

Vercel and Netlify run serverless functions with hard request-time limits
(typically 10-60 seconds). That's fine for short YouTube links, but **uploading a
real video will often exceed the limit and fail**, because Gemini needs time to
process the footage. If you want to use these platforms, prefer the YouTube-link
flow and keep clips short, or upgrade to a plan with a higher function timeout.
For the full upload experience, use one of the persistent hosts above.

## Notes

- Listings you create are stored in your browser (localStorage). The server also
  keeps a `db.json` cache where the filesystem is writable; on read-only hosts it
  falls back to a temp directory automatically.
- Models used: `gemini-3.5-flash` (analysis) and `veo-3.1-lite-generate-preview`
  (b-roll). If Veo is rate-limited, the app continues without blocking.
