HomeScan 2.6.2 — Your home, remembered

INSTALL ON YOUR EXISTING GITHUB PAGES SITE
Extract this ZIP. Upload these TWENTY app files into the repository folder that
currently contains your HomeScan index.html. Replace matching files:
index.html, styles.css, core.js, app.js, detection.js, labels.js, experience.js, memories.js, catalog.js, focused.js, focused-worker.js, voice.js, email.js, email-config.js, sw.js,
manifest.webmanifest, icon-192.png, icon-512.png, email-owner.html, privacy.html.
Refresh your existing website. The footer should show HomeScan · 2.6.2.
If an old page remains, close HomeScan and reopen the website in Safari.
Home records need no build command, paid service or server. The optional Email
section needs your Gmail account and one-time Google Web OAuth setup; read
EMAIL_SETUP.txt. Gmail is not activated by uploading this ZIP alone.

Existing HomeScan room records on the SAME site address and browser are
imported automatically. Old storage is left intact during that migration.
Use the same GitHub Pages address to keep access to those old records.

START USING YOUR HOUSEHOLD RECORD
Home: start a room, continue a draft, or see care notes that are due.
Rooms: choose a property and open its room records.
Search: search by room, item, brand, model, serial number or notes.
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

EASIER ENTRY IN 2.4
Choose room/item names from recorded values or common household choices.
Choose a brand and models previously recorded for that brand. Something else
lets you enter a custom value. Search also offers recorded item names.
Use details from a product already recorded copies its name, brand, model and
information links; photos, serial numbers, receipts and dates remain separate.
Prompts guide you towards an item name, photo and optional label scan.
Sound now includes ordinary taps and selections, with automatic resume after
an audio interruption. Mute still applies to every cue.

FAMILY MEMORIES
Open Memories to add several original photos/videos together. Choose an album
or occasion, enter the date, people and a caption. Those details apply to the
selected batch; open any moment to edit it individually. Dates and people are
entered by you, not inferred from faces or the photo. Original files are stored
without resizing; up to 100 MB each and 250 MB per import batch. Available
browser storage may be lower. Keep the originals in your phone's Photos app.

Search memories by caption, title, album, person, date or filename. The main
Search search also finds memories. Select one or more moments and tap
Share selected. The phone's share menu offers available compatible apps, then
you choose the recipient/audience. HomeScan does not post automatically or
verify delivery. Some apps accept fewer files or formats; download originals
as a fallback. HEIC/MOV and other formats may not preview in every browser.

Back up memories downloads a .hsm file containing original media and metadata.
Restore memories verifies its media checksums before importing anything.
Existing memories are kept; identical records are skipped and changed records
are retained as copies. Remove selected has an immediate Undo action.

For household records there are TWO backups: the existing home-records JSON and the new memories
.hsm file. Keep both outside this browser. Family memories stay on this device;
there is no cloud backup, family-account access or cross-device synchronisation
in this build. Clearing website data can remove them. This local app must not
be used as your only copy of important memories.

EXPANDED ITEM TYPES AND VOICE (2.4)
Choose a category such as Jewellery, Electronics, Clothes & footwear, Bedding,
Beauty, Car & tools, School/university/work or Travel/sport/recreation. Saved
custom categories are also offered. Item types include rings, necklaces,
bracelets and earrings. Categories are retained in saved records and backups
and can be searched in Search.

Scan an item opens the phone camera for one close-up photo and requests a
broader item suggestion. Photograph one item clearly against a simple background.
For an existing photo, tap Identify this item. The app asks whether the proposed
type is right; confirm it, choose another suggestion, select from the dropdown
or type your own name. Suggestions do not overwrite a name without selection.
Stop reading cancels the reader. It suggests types, not gold purity, authenticity,
monetary value, model details or a guaranteed identification of every object.

The broader reader downloads a roughly 150 MB quantised CLIP model plus browser
runtime on first use. Use Wi-Fi. Image reading runs on device; photos are not
sent to a vision server. The browser may cache model files, but successful
offline recognition is not guaranteed. Low-memory devices may need the manual
choices. This focused reader is separate from the existing live room detector;
that room detector retains its narrower object classes.

Tap Speak beside a name, search or notes field. Allow microphone access if
requested, speak briefly, check the transcript and tap Use these words. English
(Ireland) is requested. Existing text is replaced only when you apply the
transcript. If you typed while listening, replacement asks for confirmation.
Stop/close cancels listening. Some browsers do not offer speech recognition;
the app directs you to your phone keyboard microphone instead. Your browser
may use an online speech service. Check spoken model/serial details carefully.

Choose a category first to narrow the item dropdown to relevant types.

EMAIL (2.6.2)
Open email from Home or More. Filtered inbox summaries, original-email links,
searchable saved attachments/backups, recipient dropdowns, account-specific
local drafts and voice-assisted composing are included. Each send requires
review. The Gmail connection needs one-time Google registration; see
EMAIL_SETUP.txt for activation, limits and checks. Summaries select key
sentences on this device, not AI-generated interpretations. Email attachments
have their own backup; household/memories backups do not include them.

GMAIL ACTIVATION FLOW (2.6.2)
Ordinary users see a simple Connect Gmail flow with no developer fields.
If app registration is absent, the screen clearly says activation is pending.
The app owner uses email-owner.html once to register the app with Google and
create the public email-config.js connection file. Upload that configuration
centrally to GitHub; no individual user enters it. After real registration,
Connect Gmail opens Google consent and then loads inbox summaries automatically.
Google sign-in loading/retry, denied access and disconnected states are explained.
After a successful connection, Email remembers that the account should be resumed.
On a later visit it asks Google for a fresh short-lived token using the existing
grant without storing a token in HomeScan. If Google cannot restore the session
without interaction, the screen falls back to a Reconnect Gmail button. Explicit
Disconnect disables automatic resume. How to connect offers plain user help.
privacy.html describes this build's data handling and the remaining public-launch
requirements.
The connection file now contains the public Google Web client ID supplied by
Liam on 13 October 2026. This does not itself prove successful Gmail access.
Confirm authorised origin, test users, consent scopes and Gmail/People APIs in
the same Google project. Public verification and real mailbox tests remain pending.
