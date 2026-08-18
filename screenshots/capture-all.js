/**
 * Sovereign OS Screenshot + EPK PDF Capture Script
 * Captures 21+ screenshots of every page AND generates EPK PDFs.
 * Usage: node capture-all.js
 */

const { chromium } = require('/opt/homebrew/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:4200';
const OUT = __dirname;

const pages = [
  { path: '/', name: '01-dashboard' },
  { path: '/chat', name: '02-ai-chat' },
  { path: '/search', name: '03-search' },
  { path: '/agent', name: '04-ai-agent' },
  { path: '/models', name: '05-models' },
  { path: '/creative', name: '06-creative' },
  { path: '/companion', name: '07-life-companion' },
  { path: '/store', name: '08-app-store' },
  { path: '/workflows', name: '09-workflows' },
  { path: '/fleet', name: '10-fleet' },
  { path: '/security', name: '11-security' },
  { path: '/knowledge', name: '12-knowledge' },
  { path: '/environment', name: '13-environment' },
  { path: '/network', name: '14-network' },
  { path: '/clients', name: '15-clients' },
  { path: '/audit', name: '16-audit' },
  { path: '/files', name: '17-files' },
  { path: '/passwords', name: '18-passwords' },
  { path: '/media', name: '19-media' },
  { path: '/photos', name: '20-photos' },
  { path: '/pdf', name: '21-pdf-tools' },
  { path: '/printer', name: '22-printer-doctor' },
  { path: '/apps', name: '23-app-gallery' },
  { path: '/settings', name: '24-settings' },
  { path: '/setup', name: '25-setup-wizard' },
  { path: '/cloud', name: '26-cloud' },
];

// EPK data
const epkDir = path.join(OUT, 'epk');
fs.mkdirSync(epkDir, { recursive: true });

const artists = [
  {
    name: 'The Manteis Project',
    slug: 'the-manteis-project',
    genre: 'Ambient / Quantum Architecture',
    tagline: 'Ambient architecture from the intersection of data, frequency, and presence. Four transmissions mapping the terrain between void and signal.',
    location: 'Seattle, WA',
    founded: '2024',
    releases: '4 (MR-001, MR-003, MR-004, MR-005)',
    bio: 'The Manteis Project is the ambient architecture arm of Manteis Recordings — a solo exploration of sound as structural blueprint. Where most ambient music creates atmosphere, The Manteis Project builds rooms you can stand in. Four releases chart a progression from foundational drone (The Source, 20 tracks of generative architecture) through quantum geometry (Continuous, Foundations) to the atmospheric precision of Violet Cirrus. Each release treats frequency as a building material — not decoration, not mood, but load-bearing structure. The work draws from the lineage of Brian Eno, Stars of the Lid, and Steve Roach, but rejects the genre\'s passivity. This is not background music. This is foundation music.',
    tracks: [
      { title: 'Violet Cirrus', bpm: '70', duration: '8:42', desc: 'Layered drone with upper-harmonic shimmer. Contemplative sequences, scientific visualization, architectural reveals.' },
      { title: 'Continuous', bpm: '60', duration: '12:15', desc: 'Long-form generative ambient. Time-lapse, slow cinema, extended meditation.' },
      { title: 'The Source', bpm: '50', duration: '20:00', desc: '20-track generative suite. Installation work, long-form media.' },
    ],
    spotify: 'open.spotify.com/artist/4xG6n3c2dQF0w7oK9aT2b1',
    web: 'manteisrecordings.com/epk/the-manteis-project',
    cover: 'https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--FC2DBF8D-FB8A-457A-A09BC6B80DB637D9--0--204081--TMPVC2024.jpg?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=e244a193c54510e890199c87000a67f7',
  },
  {
    name: 'Red Shift Mantra',
    slug: 'red-shift-mantra',
    genre: 'Electronic / Synthwave',
    tagline: 'Cosmic pressure encoded as sound. Two transmissions mapping the distance between atomic vibration and the void between stars.',
    location: 'Seattle, WA',
    founded: '2024',
    releases: '2 (MR-002, MR-006)',
    bio: 'Red Shift Mantra is the cosmic metaphor made audible — the red shift of distant light stretched low, the mantra as vibration that reshapes consciousness through repetition. Two albums map this terrain: Phoneme (9 tracks of granular synth architecture) and Deep Field Image (7 tracks inspired by the Hubble Deep Field observation). The sound occupies the space between synthwave\'s pulse and ambient\'s expanse. It is not retro-futurism. It is cosmic realism — the sound of a universe that is mostly empty, punctuated by the violence of creation.',
    tracks: [
      { title: 'Obsidian', bpm: '120', duration: '5:38', desc: 'Driving synthwave with granular texture. Night driving, tech reveals, high-stakes montage.' },
      { title: 'Ajna', bpm: '90', duration: '7:22', desc: 'Hypnotic synth architecture, drone to pulse. Meditation sequences, consciousness expansion.' },
      { title: 'Kobayashi Maru', bpm: '110', duration: '4:51', desc: 'Tension-laden electronic. Cliffhangers, training sequences, impossible-choice narratives.' },
    ],
    spotify: 'open.spotify.com/artist/1nJCr1MCkLBA1ZqD7j7GDF',
    web: 'manteisrecordings.com/epk/red-shift-mantra',
    cover: 'https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--B50F8F5E-E067-4818-9623A82F3A7A736F--0--3466001--RSMPhonemecoverhex01.jpg?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=f277fdd4d427a0a50189eef4500238f0',
  },
  {
    name: 'Thesan Musique',
    slug: 'thesan-musique',
    genre: 'Deep Dance / Techno / DnB',
    tagline: 'Bass is architecture. The kick drum is the heartbeat of a world that has forgotten how to dance. Ataraxia: tranquility through rhythm.',
    location: 'Seattle, WA',
    founded: '2025',
    releases: '1 (MR-008)',
    bio: 'Thesan Musique is the dance floor architecture arm of Manteis Recordings. Where The Manteis Project builds rooms for contemplation, Thesan Musique builds rooms for movement — warehouses, basements, the liminal spaces where bass frequencies become physical. The debut album Ataraxia (9 tracks) strips everything to frequency. Techno removes the unnecessary. DnB accelerates what was already infinite. Thesan — from the Etruscan goddess of dawn, transformation, and the threshold between states.',
    tracks: [
      { title: 'Ataraxia', bpm: '130', duration: '6:45', desc: 'Peak-time techno, warehouse energy, euphoric breakdown. Sweat and dark rooms.' },
      { title: 'Warehouse Bass', bpm: '174', duration: '5:12', desc: 'DnB with sub-bass pressure. Chase scenes, kinetic montage.' },
      { title: 'Tranquility', bpm: '120', duration: '8:30', desc: 'Ambient techno comedown. After-hours, contemplative transitions.' },
    ],
    spotify: 'open.spotify.com/artist/34IoM42BGoMQ7VoeeZSWlh',
    web: 'manteisrecordings.com/epk/thesan-musique',
    cover: 'https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--FBBB7903-2157-4A84-A56DA75B9E52AACD--0--2039169--Thesan.png?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=2a7f23e9e0800f490cfe41ca6c3d2bc4',
  },
  {
    name: 'Brindavan Gardens',
    slug: 'brindavan-gardens',
    genre: 'Spiritual / Shoegaze / Dream',
    tagline: 'Devotional reverb. Sound as spiritual practice — the sacred made audible through drones, mantras, and the resonance of contemplation.',
    location: 'Seattle, WA',
    founded: '2025',
    releases: '1 (MR-007)',
    bio: 'Brindavan Gardens is the spiritual sound practice of Manteis Recordings. Named after the gardens of Vrindavan — where devotion meets the earth — the project treats sound as a spiritual technology, not entertainment. The debut album Upekṣā (5 tracks) takes its name from the Buddhist concept of equanimity — the non-reactive awareness that holds all experience without grasping or pushing away. Where shoegaze wraps distortion around melody, Brindavan Gardens wraps silence around resonance. The spaces between the sounds are as intentional as the sounds themselves.',
    tracks: [
      { title: 'Upekṣā', bpm: '60', duration: '10:15', desc: 'Sustained devotional drone with bell resonance. Spiritual sequences, nature documentary.' },
      { title: 'Mantra', bpm: '70', duration: '7:38', desc: 'Vocal drone with harmonic overtone singing. Ritual sequences, pilgrimage, transcendence.' },
      { title: 'Equanimity', bpm: '50', duration: '12:00', desc: 'Long-form ambient with nature field recordings. Meditation guidance, emotional stillness.' },
    ],
    spotify: 'open.spotify.com/artist/1oPtOn5okI3nLDvWWGgd3F',
    web: 'manteisrecordings.com/epk/brindavan-gardens',
    cover: 'https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--ED237CDF-A4C2-49FD-95453D10913EE6BE--0--2605763--BrindavanGardens.png?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=1b42e2bbe8687dc3ec70320a30d8ccdd',
  },
  {
    name: 'Bethany Pritchett',
    slug: 'bethany-pritchett',
    genre: 'Alternative / Vocal / Synthesist',
    tagline: 'Voice, synthesizer, and the words that hold them together. Music made in a small room in Seattle with one window and one microphone.',
    location: 'Seattle, WA',
    founded: '2025',
    releases: '1 (MR-009)',
    bio: 'Bethany Pritchett makes music in a small room in Seattle — voice, synthesizer, and the words that hold them together. No studio polish. No band. Just one person writing honestly and arranging sound around it. Her debut album, Good Morning, Good Fortune Elephant, is five songs recorded at home with one window and one microphone. The result is intimate in the literal sense — music that records the interior of a person, not the performance of one. The work exists at the intersection of alternative songwriting and ambient sensibility.',
    tracks: [
      { title: 'Good Morning, Good Fortune Elephant', bpm: '85', duration: '4:22', desc: 'Intimate vocal-led alternative with synth texture. Character moments, quiet intimacy.' },
      { title: 'Window', bpm: '75', duration: '3:48', desc: 'Minimal synth-pop with breath-room vocal. Vulnerability, morning light.' },
      { title: 'Elephant', bpm: '80', duration: '5:15', desc: 'Building alternative with layered vocal harmonies. Emotional crescendo, character transformation.' },
    ],
    spotify: 'open.spotify.com/artist/0hpTO28w4Qjc3xA9oKKQGk',
    web: 'manteisrecordings.com/epk/bethany-pritchett',
    cover: 'https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--F3FF13CD-BE7B-4015-9DB06C8AA806E798--0--174274--GMGFE.JPG?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=1782847f528536d24e582566ee2d12d4',
  },
];

function generateEPKHtml(artist) {
  const tracksHtml = artist.tracks.map(t => `
    <div class="track">
      <div class="track-header">
        <span class="track-title">${t.title}</span>
        <span class="track-meta">${t.bpm} BPM · ${t.duration}</span>
      </div>
      <div class="track-desc">${t.desc}</div>
    </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
    background: #000000;
    color: #FDFCDC;
    font-size: 11px;
    line-height: 1.5;
    padding: 32px;
    width: 8.5in;
    min-height: 11in;
  }
  .container { display: flex; gap: 24px; }
  .left { flex: 1; }
  .right { width: 200px; flex-shrink: 0; }
  .cover-art { width: 200px; height: 200px; object-fit: cover; margin-bottom: 12px; border-radius: 2px; }
  .label {
    font-family: 'SF Mono', 'Menlo', 'Courier New', monospace;
    font-size: 8px; text-transform: uppercase; letter-spacing: 0.2em;
    color: #FF5500; margin-bottom: 2px;
  }
  .artist-name {
    font-size: 32px; font-weight: 800; letter-spacing: -0.02em;
    color: #FDFCDC; margin-bottom: 4px; line-height: 1.1;
  }
  .genre {
    font-family: 'SF Mono', 'Menlo', monospace; font-size: 9px;
    text-transform: uppercase; letter-spacing: 0.15em;
    color: rgba(253,252,220,0.5); margin-bottom: 16px;
  }
  .tagline {
    font-size: 11px; font-style: italic; color: rgba(253,252,220,0.7);
    margin-bottom: 16px; border-left: 2px solid #FF5500; padding-left: 10px;
  }
  .section-label {
    font-family: 'SF Mono', 'Menlo', monospace; font-size: 8px;
    text-transform: uppercase; letter-spacing: 0.2em;
    color: #FF5500; margin-bottom: 6px; margin-top: 14px;
  }
  .bio { font-size: 10px; color: rgba(253,252,220,0.75); line-height: 1.55; margin-bottom: 12px; }
  .track { margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid rgba(253,252,220,0.08); }
  .track:last-child { border-bottom: none; }
  .track-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .track-title { font-weight: 600; font-size: 10px; color: #FDFCDC; }
  .track-meta { font-family: 'SF Mono', monospace; font-size: 8px; color: rgba(253,252,220,0.4); }
  .track-desc { font-size: 9px; color: rgba(253,252,220,0.5); line-height: 1.4; }
  .info-row { display: flex; justify-content: space-between; font-size: 9px; margin-bottom: 3px; }
  .info-label { font-family: 'SF Mono', monospace; color: rgba(253,252,220,0.4); text-transform: uppercase; letter-spacing: 0.1em; font-size: 7px; }
  .info-value { color: rgba(253,252,220,0.7); }
  .links { font-size: 8px; color: rgba(253,252,220,0.5); line-height: 1.6; font-family: 'SF Mono', monospace; word-break: break-all; }
  .footer {
    margin-top: 24px; border-top: 1px solid rgba(253,252,220,0.1); padding-top: 8px;
    display: flex; justify-content: space-between;
    font-family: 'SF Mono', monospace; font-size: 7px;
    text-transform: uppercase; letter-spacing: 0.15em; color: rgba(253,252,220,0.3);
  }
</style>
</head>
<body>
  <div class="container">
    <div class="left">
      <div class="label">// MANTEIS RECORDINGS · ELECTRONIC PRESS KIT</div>
      <div class="artist-name">${artist.name}</div>
      <div class="genre">${artist.genre} · ${artist.location} · EST. ${artist.founded}</div>
      <div class="tagline">${artist.tagline}</div>
      <div class="section-label">// BIOGRAPHY</div>
      <div class="bio">${artist.bio}</div>
      <div class="section-label">// KEY TRACKS FOR SYNC PLACEMENT</div>
      ${tracksHtml}
    </div>
    <div class="right">
      <img class="cover-art" src="${artist.cover}" alt="Cover Art" />
      <div class="section-label">// DETAILS</div>
      <div class="info-row"><span class="info-label">Label</span><span class="info-value">Manteis Rec.</span></div>
      <div class="info-row"><span class="info-label">Releases</span><span class="info-value">${artist.releases}</span></div>
      <div class="info-row"><span class="info-label">Location</span><span class="info-value">${artist.location}</span></div>
      <div class="info-row"><span class="info-label">Founded</span><span class="info-value">${artist.founded}</span></div>
      <div class="section-label">// STREAMING</div>
      <div class="links">
        Spotify: ${artist.spotify}<br/>
        Bandcamp: manteisrecordings.bandcamp.com<br/>
        SoundCloud: soundcloud.com/rhettelliot<br/>
        Web: ${artist.web}
      </div>
      <div class="section-label">// CONTACT</div>
      <div class="links">
        Booking: manteisrecordings@mac.com<br/>
        Press: manteisrecordings@mac.com
      </div>
    </div>
  </div>
  <div class="footer">
    <span>Manteis Recordings · Seattle, WA</span>
    <span>manteisrecordings.com</span>
  </div>
</body>
</html>`;
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  let screenshotSuccess = 0;
  let screenshotFailed = [];
  let pdfSuccess = 0;
  let pdfFailed = [];

  // === SCREENSHOTS ===
  console.log('\n=== CAPTURING SCREENSHOTS ===\n');
  const page = await context.newPage();

  for (const p of pages) {
    const url = `${BASE}${p.path}`;
    const filename = path.join(OUT, `${p.name}.png`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`✅ ${p.name}.png`);
      screenshotSuccess++;
    } catch (err) {
      console.log(`❌ ${p.name} — ${err.message.slice(0, 80)}`);
      screenshotFailed.push(p.name);
    }
  }

  // === EPK PDFs ===
  console.log('\n=== GENERATING EPK PDFs ===\n');
  const pdfPage = await browser.newPage();

  for (const artist of artists) {
    const html = generateEPKHtml(artist);
    const htmlPath = path.join(epkDir, `epk-${artist.slug}.html`);
    const pdfPath = path.join(epkDir, `epk-${artist.slug}.pdf`);

    fs.writeFileSync(htmlPath, html);

    try {
      await pdfPage.setContent(html, { waitUntil: 'networkidle', timeout: 15000 });
      await pdfPage.waitForTimeout(1000);
      await pdfPage.pdf({
        path: pdfPath,
        format: 'Letter',
        printBackground: true,
        margin: { top: '0.4in', bottom: '0.4in', left: '0.4in', right: '0.4in' },
      });
      console.log(`✅ epk-${artist.slug}.pdf`);
      pdfSuccess++;
    } catch (err) {
      console.log(`❌ epk-${artist.slug} — ${err.message.slice(0, 80)}`);
      pdfFailed.push(artist.slug);
    }
  }

  await browser.close();

  console.log(`\n=== FINAL RESULTS ===`);
  console.log(`Screenshots: ${screenshotSuccess}/${pages.length} captured${screenshotFailed.length ? ` (FAILED: ${screenshotFailed.join(', ')})` : ''}`);
  console.log(`EPK PDFs:    ${pdfSuccess}/${artists.length} generated${pdfFailed.length ? ` (FAILED: ${pdfFailed.join(', ')})` : ''}`);
})();