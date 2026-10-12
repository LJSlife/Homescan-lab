HomeScan 2.1 — Your home, remembered

INSTALL ON YOUR EXISTING GITHUB PAGES SITE
Extract this ZIP. Upload these ELEVEN app files into the repository folder that
currently contains your HomeScan index.html. Replace matching files:
index.html, styles.css, core.js, app.js, detection.js, labels.js, experience.js, sw.js,
manifest.webmanifest, icon-192.png, icon-512.png.
Refresh your existing website. The footer should show HomeScan · 2.1.
If an old page remains, close HomeScan and reopen the website in Safari.
No build command, account, paid service or server is needed.

Existing HomeScan room records on the SAME site address and browser are
imported automatically. Old storage is left intact during that migration.
Use the same GitHub Pages address to keep access to those old records.

START USING YOUR HOUSEHOLD RECORD
Home: start a room, continue a draft, or see care notes that are due.
Rooms: choose a property and open its room records.
Find an item: search by room, item, brand, model, serial number or notes.
More: manage properties, find manufacturer portals, download a complete
backup, restore a backup, and download a photo report.

IN A ROOM
Use Scan room for camera suggestions, or add your own item with a photo.
Use Check items to inspect each photograph and correct names/quantities.
Open Details & information for the full item record:
  Item — photo, name, quantity, brand, model, serial and product-label photo.
  Manuals & care — exact-model lookup, saved links, warranty and care dates.
  Documents — receipts, PDFs, warranty documents and useful notes.
Use Same item as when two entries describe one physical object. It retains
the chosen entry's photo and uses the larger quantity rather than adding both.
Remove can be undone. Save room updates the existing room when it was reopened.
A draft is also kept on this device so an interrupted room can be continued.

MANUALS AND INFORMATION
Photograph the product label: HomeScan automatically reads the brand, model
and serial number into empty fields. Check the result against the label photo,
especially similar characters such as 0/O or 1/I. Existing details you entered
are preserved; differing readings are offered for you to choose. Read label again
retries a stored photo. Poor or ambiguous readings can be corrected by hand.

Find the manual opens
an external search using those details. Official Bosch, Samsung and LG portals
are also provided. Save a matching manual or manufacturer-support link for
future access, or attach a downloaded PDF to keep it with the item.
Lookups are external searches, not automatically verified matches. Compare
the model number. The room detector suggests item categories; the separate label reader extracts
printed details. Neither guarantees that every reading is correct.

KEEPING A COPY
Download complete backup includes properties, rooms, photos, label photos,
documents, notes, dates and the current draft. Restore from a backup imports it
without overwriting changed existing records. Identical records are not duplicated.
Download a photo report gives you an HTML document containing room records
and item photos. Open it in a browser; its Print / Save as PDF control uses
that browser's printing options. Reports are for reading/sharing; backups are
for restoring the app. Documents are retained in backups, not embedded in reports.

PRIVACY AND AVAILABILITY
Records are stored in this browser on this device using IndexedDB. There is
no cloud sync or account. Clearing website data or losing the phone can remove
records: keep a complete backup elsewhere. Persistent-storage permission is
available in More but is controlled by your browser and is not a backup.
The app and saved records can reopen offline after a successful first load.
Camera recognition and label reading need internet-loaded libraries/models.
Label reading runs on this device; the photo is not uploaded for reading.
First-time label reading can take longer while the reading engine downloads. Your own
photo capture and local documents provide the fallback. External links need
internet. Room photos and records are not uploaded to an application server.

The scanner suggests broad categories and can be wrong or miss things. The
photograph is the evidence to check. Care dates appear inside HomeScan; this
version does not send scheduled phone notifications. Warranty dates are the
ones you enter from your documents, not verified cover.

CHECKS.txt records verification. DESIGN_REVIEW.md describes this build's
structure, source boundaries and remaining technical limits.

LOOK AND FEEL
A violet-and-ink home screen, warm accents, illustrated motion and photo-led
room cards provide a livelier starting point. Buttons respond to taps; newly
found items and saved records have soft sound cues. Toggle sound in the header,
or use More to adjust sound and animation. Animation follows your device
settings by default, including reduced motion. Browser sound permissions apply.
