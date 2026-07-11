# Train

A installable PWA training tracker for your weekly push/pull/legs + running/climbing plan.

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `train`) and upload all files in this folder to the root of the repo (`index.html`, `manifest.json`, `sw.js`, `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
4. Wait a minute, then your app will be live at `https://<your-username>.github.io/<repo-name>/`.

## Install on your phone

**iPhone (Safari):**
1. Open the GitHub Pages link in Safari.
2. Tap the Share icon → **Add to Home Screen** → Add.

**Android (Chrome):**
1. Open the link in Chrome.
2. Tap the ⋮ menu → **Add to Home screen** (or you may get an automatic "Install app" prompt).

Once installed, it opens full-screen like a native app and works offline — your workout data is saved locally on your phone via the browser's storage, so it stays even without a connection. Note that local storage is per-browser, so if you reinstall or switch browsers your history won't carry over.

## Updating the plan later

All exercises live in the `DAYS` object near the top of the `<script>` tag in `index.html`. Edit the `focus`, `note`, or `phases`/`exercises` arrays for any day, re-upload to GitHub, and the service worker will pick up the new version next time the app opens (may take one extra reload to bust the cache).

## Auto-deload weeks

Tap **Program** in the header to see your current training week and whether it's a deload week. Every 4th week (weeks 4, 8, 12…) automatically cuts the set count on your "Main" exercises by about 40%, with a reminder to ease off load ~20% too — shown as a banner at the top and reflected directly in each exercise's set/rep display. You can:
- Set/reset the program start date (defaults to whenever you first opened the app)
- Shift which week counts as deload by 1-3 weeks, if you want it to land differently

## Progressive overload hints

Once you've logged a session (sets/reps/weight/RPE) for an exercise, the app remembers it. Next time that exercise comes up, you'll see a small hint under it — e.g. "Last: 3×15 — hit top of range at ~2 RIR. Add load or difficulty this session." The logic: if you hit the top of the target rep range at RPE 8 or below (roughly 2 RIR or easier), it suggests progressing; if you're below the range, it suggests building reps first. This only works well if you log consistently — an exercise you've never logged won't show a hint.

## Set / rest timer

Every exercise card has a **⏱ Timer** button. Tap it to set:
- **Sets** — defaults to whatever's in that exercise's target (e.g. "3×12" → 3)
- **Work time** — auto-fills for timed holds (like L-sits or dead hangs) based on the seconds in the exercise description; defaults to 0 for rep-based lifts, which switches the timer to a "tap when done" mode instead of counting down work
- **Rest time** — defaults to 60s, editable

Once started it counts down with a beep + vibration at each transition (work → rest → next set), and a longer signal when all sets are complete. You can pause, skip a phase, or stop entirely. If you close the timer modal while it's running, a small pill appears at the bottom of the screen showing the live countdown — tap it to reopen.

**Two honest limitations:** vibration doesn't work on iOS Safari (Apple restriction, not fixable from here), and if your phone's screen locks, the timer pauses like any web page does — it's not a true background timer with push notifications. Keep the screen on during a timed set, or just use it as a rest timer between sets where a few seconds of drift doesn't matter.

## Adding your own exercises

Every section (Warm-up, Main, Prehab/Rehab, Cool-down, Run) has a **+ Add exercise** button at the bottom. Give it a name, an optional target (e.g. "3×10" or "2×20s"), and pick which fields to log — Sets, Reps, Weight, Hold (for timed holds), RPE. Notes and the ⏱ Timer come included automatically, same as every built-in exercise, and the timer auto-detects a sensible work time if you tick "Hold."

Custom exercises are tagged "custom" and show a **Remove exercise** button when expanded. They're saved to that specific day + section and stick around across visits (stored locally on your phone, same as your logged sessions). They also get progression hints once you've logged them at least once, exactly like the built-in exercises.

## Progress charts

Tucked inside History — tap **📈 Progress** at the top — is a chart screen. Pick any exercise you've logged at least twice from the dropdown and you'll get a simple trend line (weight if you logged it, otherwise reps), plus a quick summary: first, last, best, and net change. Anything you haven't logged numeric data for won't show up in the list — it's built entirely from your session history, so the more consistently you log, the more useful it gets.

## Backup: export & import

At the bottom of the Progress screen: **Export data** downloads a JSON file with your full session history, custom exercises, and program settings — save it somewhere safe (Files app, cloud drive, email it to yourself, whatever). **Import data** reads that file back in, which is the way to carry your history over after a reinstall, a new phone, or clearing browser data. Importing merges nothing — it replaces sessions/custom exercises/program settings wholesale with what's in the file, so use a recent export.

## Stopwatch mode

Inside the same ⏱ Timer modal, at the top of the setup screen, there's a Countdown/Stopwatch toggle. Stopwatch counts up freely with no preset time — useful when you don't know how long a hold will last (dead hangs, planks, L-sits pushed to failure). Tap **Lap** to record each set's split without stopping the clock, **Pause** if you need to, and **Stop** when you're done. If the exercise has a Hold field, a **"Use last split as hold time"** button appears at the end and fills it in for you — for splits over 60 seconds (the Hold dropdown's max), it adds the time to Notes instead since the dropdown can't represent it.
