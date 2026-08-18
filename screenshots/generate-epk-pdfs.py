#!/usr/bin/env python3
"""
Generate 5 EPK one-sheet PDFs for Manteis Recordings artists.
Uses weasyprint to convert styled HTML to PDF.
Each PDF is a single page: artist bio, key tracks, streaming links, contact.
"""

import os
import sys
import json

try:
    from weasyprint import HTML
except ImportError:
    print("weasyprint not available, trying import...")
    sys.exit(1)

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
os.makedirs(OUT_DIR, exist_ok=True)

# Artist data from releases.json and epk-one-sheets-content.md
artists = [
    {
        "name": "The Manteis Project",
        "slug": "the-manteis-project",
        "genre": "Ambient / Quantum Architecture",
        "tagline": "Ambient architecture from the intersection of data, frequency, and presence. Four transmissions mapping the terrain between void and signal.",
        "location": "Seattle, WA",
        "founded": "2024",
        "releases": "4 (MR-001, MR-003, MR-004, MR-005)",
        "bio": "The Manteis Project is the ambient architecture arm of Manteis Recordings — a solo exploration of sound as structural blueprint. Where most ambient music creates atmosphere, The Manteis Project builds rooms you can stand in. Four releases chart a progression from foundational drone (The Source, 20 tracks of generative architecture) through quantum geometry (Continuous, Foundations) to the atmospheric precision of Violet Cirrus. Each release treats frequency as a building material — not decoration, not mood, but load-bearing structure. The work draws from the lineage of Brian Eno, Stars of the Lid, and Steve Roach, but rejects the genre's passivity. This is not background music. This is foundation music.",
        "tracks": [
            {"title": "Violet Cirrus", "bpm": "70", "duration": "8:42", "desc": "Layered drone with upper-harmonic shimmer. Contemplative sequences, scientific visualization, architectural reveals."},
            {"title": "Continuous", "bpm": "60", "duration": "12:15", "desc": "Long-form generative ambient. Time-lapse, slow cinema, extended meditation."},
            {"title": "The Source", "bpm": "50", "duration": "20:00", "desc": "20-track generative suite. Installation work, long-form media."},
        ],
        "spotify": "https://open.spotify.com/artist/4xG6n3c2dQF0w7oK9aT2b1",
        "web": "manteisrecordings.com/epk/the-manteis-project",
        "cover": "https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--FC2DBF8D-FB8A-457A-A09BC6B80DB637D9--0--204081--TMPVC2024.jpg?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=e244a193c54510e890199c87000a67f7",
    },
    {
        "name": "Red Shift Mantra",
        "slug": "red-shift-mantra",
        "genre": "Electronic / Synthwave",
        "tagline": "Cosmic pressure encoded as sound. Two transmissions mapping the distance between atomic vibration and the void between stars.",
        "location": "Seattle, WA",
        "founded": "2024",
        "releases": "2 (MR-002, MR-006)",
        "bio": "Red Shift Mantra is the cosmic metaphor made audible — the red shift of distant light stretched low, the mantra as vibration that reshapes consciousness through repetition. Two albums map this terrain: Phoneme (9 tracks of granular synth architecture) and Deep Field Image (7 tracks inspired by the Hubble Deep Field observation). The sound occupies the space between synthwave's pulse and ambient's expanse. It is not retro-futurism. It is cosmic realism — the sound of a universe that is mostly empty, punctuated by the violence of creation.",
        "tracks": [
            {"title": "Obsidian", "bpm": "120", "duration": "5:38", "desc": "Driving synthwave with granular texture. Night driving, tech reveals, high-stakes montage."},
            {"title": "Ajna", "bpm": "90", "duration": "7:22", "desc": "Hypnotic synth architecture, drone to pulse. Meditation sequences, consciousness expansion."},
            {"title": "Kobayashi Maru", "bpm": "110", "duration": "4:51", "desc": "Tension-laden electronic. Cliffhangers, training sequences, impossible-choice narratives."},
        ],
        "spotify": "https://open.spotify.com/artist/1nJCr1MCkLBA1ZqD7j7GDF",
        "web": "manteisrecordings.com/epk/red-shift-mantra",
        "cover": "https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--B50F8F5E-E067-4818-9623A82F3A7A736F--0--3466001--RSMPhonemecoverhex01.jpg?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=f277fdd4d427a0a50189eef4500238f0",
    },
    {
        "name": "Thesan Musique",
        "slug": "thesan-musique",
        "genre": "Deep Dance / Techno / DnB",
        "tagline": "Bass is architecture. The kick drum is the heartbeat of a world that has forgotten how to dance. Ataraxia: tranquility through rhythm.",
        "location": "Seattle, WA",
        "founded": "2025",
        "releases": "1 (MR-008)",
        "bio": "Thesan Musique is the dance floor architecture arm of Manteis Recordings. Where The Manteis Project builds rooms for contemplation, Thesan Musique builds rooms for movement — warehouses, basements, the liminal spaces where bass frequencies become physical. The debut album Ataraxia (9 tracks) strips everything to frequency. Techno removes the unnecessary. DnB accelerates what was already infinite. Thesan — from the Etruscan goddess of dawn, transformation, and the threshold between states.",
        "tracks": [
            {"title": "Ataraxia", "bpm": "130", "duration": "6:45", "desc": "Peak-time techno, warehouse energy, euphoric breakdown. Sweat and dark rooms."},
            {"title": "Warehouse Bass", "bpm": "174", "duration": "5:12", "desc": "DnB with sub-bass pressure. Chase scenes, kinetic montage."},
            {"title": "Tranquility", "bpm": "120", "duration": "8:30", "desc": "Ambient techno comedown. After-hours, contemplative transitions."},
        ],
        "spotify": "https://open.spotify.com/artist/34IoM42BGoMQ7VoeeZSWlh",
        "web": "manteisrecordings.com/epk/thesan-musique",
        "cover": "https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--FBBB7903-2157-4A84-A56DA75B9E52AACD--0--2039169--Thesan.png?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=2a7f23e9e0800f490cfe41ca6c3d2bc4",
    },
    {
        "name": "Brindavan Gardens",
        "slug": "brindavan-gardens",
        "genre": "Spiritual / Shoegaze / Dream",
        "tagline": "Devotional reverb. Sound as spiritual practice — the sacred made audible through drones, mantras, and the resonance of contemplation.",
        "location": "Seattle, WA",
        "founded": "2025",
        "releases": "1 (MR-007)",
        "bio": "Brindavan Gardens is the spiritual sound practice of Manteis Recordings. Named after the gardens of Vrindavan — where devotion meets the earth — the project treats sound as a spiritual technology, not entertainment. The debut album Upekṣā (5 tracks) takes its name from the Buddhist concept of equanimity — the non-reactive awareness that holds all experience without grasping or pushing away. Where shoegaze wraps distortion around melody, Brindavan Gardens wraps silence around resonance. The spaces between the sounds are as intentional as the sounds themselves.",
        "tracks": [
            {"title": "Upekṣā", "bpm": "60", "duration": "10:15", "desc": "Sustained devotional drone with bell resonance. Spiritual sequences, nature documentary."},
            {"title": "Mantra", "bpm": "70", "duration": "7:38", "desc": "Vocal drone with harmonic overtone singing. Ritual sequences, pilgrimage, transcendence."},
            {"title": "Equanimity", "bpm": "50", "duration": "12:00", "desc": "Long-form ambient with nature field recordings. Meditation guidance, emotional stillness."},
        ],
        "spotify": "https://open.spotify.com/artist/1oPtOn5okI3nLDvWWGgd3F",
        "web": "manteisrecordings.com/epk/brindavan-gardens",
        "cover": "https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--ED237CDF-A4C2-49FD-95453D10913EE6BE--0--2605763--BrindavanGardens.png?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=1b42e2bbe8687dc3ec70320a30d8ccdd",
    },
    {
        "name": "Bethany Pritchett",
        "slug": "bethany-pritchett",
        "genre": "Alternative / Vocal / Synthesist",
        "tagline": "Voice, synthesizer, and the words that hold them together. Music made in a small room in Seattle with one window and one microphone.",
        "location": "Seattle, WA",
        "founded": "2025",
        "releases": "1 (MR-009)",
        "bio": "Bethany Pritchett makes music in a small room in Seattle — voice, synthesizer, and the words that hold them together. No studio polish. No band. Just one person writing honestly and arranging sound around it. Her debut album, Good Morning, Good Fortune Elephant, is five songs recorded at home with one window and one microphone. The result is intimate in the literal sense — music that records the interior of a person, not the performance of one. The work exists at the intersection of alternative songwriting and ambient sensibility.",
        "tracks": [
            {"title": "Good Morning, Good Fortune Elephant", "bpm": "85", "duration": "4:22", "desc": "Intimate vocal-led alternative with synth texture. Character moments, quiet intimacy."},
            {"title": "Window", "bpm": "75", "duration": "3:48", "desc": "Minimal synth-pop with breath-room vocal. Vulnerability, morning light."},
            {"title": "Elephant", "bpm": "80", "duration": "5:15", "desc": "Building alternative with layered vocal harmonies. Emotional crescendo, character transformation."},
        ],
        "spotify": "https://open.spotify.com/artist/0hpTO28w4Qjc3xA9oKKQGk",
        "web": "manteisrecordings.com/epk/bethany-pritchett",
        "cover": "https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F1942337--F3FF13CD-BE7B-4015-9DB06C8AA806E798--0--174274--GMGFE.JPG?fm=jpg&mark-y=568&mark-x=620&mark-w=180&q=75&w=800&mark=http%3A%2F%2Fgather.fandalism.com%2Fdistrokid-sticker-sm.png&s=1782847f528536d24e582566ee2d12d4",
    },
]

def generate_html(artist):
    tracks_html = ""
    for t in artist["tracks"]:
        tracks_html += f"""
        <div class="track">
          <div class="track-header">
            <span class="track-title">{t['title']}</span>
            <span class="track-meta">{t['bpm']} BPM · {t['duration']}</span>
          </div>
          <div class="track-desc">{t['desc']}</div>
        </div>
        """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  @page {{
    size: letter;
    margin: 0.5in;
  }}
  * {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }}
  body {{
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    background: #000000;
    color: #FDFCDC;
    font-size: 10pt;
    line-height: 1.5;
  }}
  .container {{
    display: flex;
    gap: 24px;
    height: 100%;
  }}
  .left {{
    flex: 1;
  }}
  .right {{
    width: 200px;
    flex-shrink: 0;
  }}
  .cover-art {{
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 16px;
  }}
  .label {{
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #FF5500;
    margin-bottom: 2px;
  }}
  .artist-name {{
    font-size: 28pt;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #FDFCDC;
    margin-bottom: 4px;
    line-height: 1.1;
  }}
  .genre {{
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(253, 252, 220, 0.5);
    margin-bottom: 16px;
  }}
  .tagline {{
    font-size: 10pt;
    font-style: italic;
    color: rgba(253, 252, 220, 0.7);
    margin-bottom: 16px;
    border-left: 2px solid #FF5500;
    padding-left: 10px;
  }}
  .section-label {{
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #FF5500;
    margin-bottom: 6px;
    margin-top: 14px;
  }}
  .bio {{
    font-size: 9pt;
    color: rgba(253, 252, 220, 0.75);
    line-height: 1.55;
    margin-bottom: 12px;
  }}
  .track {{
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(253, 252, 220, 0.08);
  }}
  .track:last-child {{
    border-bottom: none;
  }}
  .track-header {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }}
  .track-title {{
    font-weight: 600;
    font-size: 9pt;
    color: #FDFCDC;
  }}
  .track-meta {{
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 7.5pt;
    color: rgba(253, 252, 220, 0.4);
  }}
  .track-desc {{
    font-size: 8pt;
    color: rgba(253, 252, 220, 0.5);
    line-height: 1.4;
  }}
  .info-row {{
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    margin-bottom: 3px;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
  }}
  .info-label {{
    color: rgba(253, 252, 220, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 7pt;
  }}
  .info-value {{
    color: rgba(253, 252, 220, 0.7);
  }}
  .links {{
    font-size: 7.5pt;
    color: rgba(253, 252, 220, 0.5);
    line-height: 1.6;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    word-break: break-all;
  }}
  .footer {{
    position: absolute;
    bottom: 0.3in;
    left: 0.5in;
    right: 0.5in;
    border-top: 1px solid rgba(253, 252, 220, 0.1);
    padding-top: 6px;
    display: flex;
    justify-content: space-between;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(253, 252, 220, 0.3);
  }}
</style>
</head>
<body>
  <div class="container">
    <div class="left">
      <div class="label">// MANTEIS RECORDINGS · EPK</div>
      <div class="artist-name">{artist['name']}</div>
      <div class="genre">{artist['genre']} · {artist['location']} · EST. {artist['founded']}</div>
      <div class="tagline">{artist['tagline']}</div>

      <div class="section-label">// BIOGRAPHY</div>
      <div class="bio">{artist['bio']}</div>

      <div class="section-label">// KEY TRACKS FOR SYNC PLACEMENT</div>
      {tracks_html}
    </div>
    <div class="right">
      <img class="cover-art" src="{artist['cover']}" alt="Cover Art" />
      <div class="section-label">// DETAILS</div>
      <div class="info-row"><span class="info-label">Label</span><span class="info-value">Manteis Rec.</span></div>
      <div class="info-row"><span class="info-label">Releases</span><span class="info-value">{artist['releases']}</span></div>
      <div class="info-row"><span class="info-label">Location</span><span class="info-value">{artist['location']}</span></div>
      <div class="info-row"><span class="info-label">Founded</span><span class="info-value">{artist['founded']}</span></div>

      <div class="section-label">// STREAMING</div>
      <div class="links">
        Spotify: {artist['spotify']}<br/>
        Bandcamp: manteisrecordings.bandcamp.com<br/>
        SoundCloud: soundcloud.com/rhettelliot<br/>
        Web: {artist['web']}
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
</html>"""


success = 0
failed = []

for artist in artists:
    html = generate_html(artist)
    html_path = os.path.join(OUT_DIR, f"epk-{artist['slug']}.html")
    pdf_path = os.path.join(OUT_DIR, f"epk-{artist['slug']}.pdf")

    # Save HTML
    with open(html_path, "w") as f:
        f.write(html)
    print(f"  HTML: {html_path}")

    # Generate PDF
    try:
        HTML(filename=html_path).write_pdf(pdf_path)
        print(f"  ✅ PDF:  {pdf_path}")
        success += 1
    except Exception as e:
        print(f"  ❌ PDF failed: {e}")
        failed.append(artist['slug'])

print(f"\n=== RESULTS: {success}/{len(artists)} PDFs generated ===")
if failed:
    print(f"FAILED: {', '.join(failed)}")