import { chromium } from 'playwright';
import { spawn } from 'child_process';
const FFMPEG = process.env.FFMPEG;
const mode = process.argv[2] || 'stills';
const fps = 30;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('console', m => console.log('console:', m.text()));
page.on('pageerror', e => console.log('pageerror:', e.message));
await page.goto('file://' + process.cwd() + '/promo.html#capture', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
console.log('fonts', await page.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family).join(',')));
if (mode === 'stills') {
  for (const t of process.argv.slice(3).map(Number)) {
    await page.evaluate(t => render(t), t);
    await page.screenshot({ path: `still_${t}.jpg`, quality: 70 });
  }
} else {
  const dur = await page.evaluate(() => DURATION);
  const n = dur * fps;
  const ff = spawn(FFMPEG, ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-i', 'music.wav', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', 'MasjidIA_promo.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    await page.evaluate(t => render(t), i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 90 === 0) console.log('frame', i, '/', n);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
}
await browser.close();
