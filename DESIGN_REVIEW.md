# HomeScan 2.8.0 save-integrity update

Items are now persisted to their room at item-save time and during room autosave. Documents provide direct camera photo, enhanced document scan, and file/PDF selection.

# HomeScan 2.7.0: the household app

## Product structure

HomeScan is a local household record for homeowners and landlords. Properties
contain rooms; rooms contain photographed items. Each item can hold its
identity, useful documents and information links. The scanner is one capture
method, alongside taking or choosing a photo.

The five main destinations are Home, Rooms, Memories, Search and More. Email
is reachable from Home and More to avoid crowding the phone navigation. The room
workspace separates scanning from checking. Item details are split into Item,
Manuals & care, and Documents. Photo evidence comes before confirmation.

## Complete record workflow

1. Choose or create a property, then name a room.
2. Scan, or create an item with a photo. Missing detections have a usable fallback.
3. Inspect the photographed object. Confirm, edit, remove/undo or merge duplicate
   entries. The chosen duplicate photo stays; quantities are not blindly summed.
4. Photograph the product label; automatically extract brand/model/serial.
   Compare filled values with the photo; existing owner edits are protected.
5. Access manual and care searches using the current exact-model values. Save
   links or attach the actual PDF/receipt/warranty document.
6. Record purchase/warranty/care dates and notes. Due care notes appear on Home.
7. Save the room. Reopening and saving updates that same record. Interrupted
   work is kept as a draft and can be resumed.
8. Search records, download a photo report, or make a complete restorable backup.


## Guided item capture (2.7.0)

Owner testing found the previous item editor too dense and the Scan an item path
unsuitable for ordinary phone use. The old primary flow could start the roughly
150 MB CLIP reader before the user had reached the product-label step. The earlier
verification notes also recorded click/focus problems after broader inference in
a software-rendered browser. That is not proof of the reported phone freeze, but
it is a credible risk factor and the default flow no longer depends on it.

The Item tab is now a three-step wizard: Item, Product details, Review. Step 1
captures one photo and uses the lighter existing COCO-SSD household detector for
a quick suggestion. The user must confirm or choose the item name. Step 2 makes
the product-label photograph the primary action and automatically starts the
existing Tesseract label reader. Brand, model and serial remain editable and are
never treated as verified solely because OCR returned text. Fridge/freezer copy
explicitly explains common label locations. Step 3 gives one compact review before
saving. Manuals, care and documents remain separate tabs rather than blocking the
core capture flow.

Reader tasks are escapable. A slow label read can be stopped, the user can move
to Review without waiting, and Save item cancels any outstanding reader instead
of disabling the final action. Label images are resized to 1600 px rather than
2000 px before OCR to reduce phone memory pressure. Item edits are also written to
a separate IndexedDB recovery record while a room is being edited; this record is
removed after a successful item save or an intentional discard. It is not added
to exported household backups and does not change the backup schema.

The packaged focused CLIP reader is retained for compatibility/history but is not
invoked by the 2.7.0 primary item-entry UI. No claim is made that the lighter
detector can identify every object. Manual item selection remains the guaranteed
fallback.

## Storage and migration

IndexedDB stores the household document and its photographs/documents locally.
Writes are ordered and wait for transaction completion before reporting success.
Older localStorage room records are imported on first opening; their original
storage is left intact. A backup includes drafts and all item content. Restore
merges safely: identical records are skipped, changed conflicting records are
kept as additional copies. The app is cached for offline record access.

Browser storage is device/browser/site-specific, not an unconditional permanent
vault. Persistent storage can be requested; browser policy decides. Exported
backups provide recovery independently of that browser. No cloud sync, accounts
or paid services were introduced, preserving the original zero-cost constraint.

## Information boundaries

Manual lookup is an external search generated from the entered brand and model.
Official portals include Bosch Ireland, Samsung UK and LG UK. Saved links and
local PDFs provide repeat access. Source pages:

- https://www.bosch-home.ie/customer-service/instruction-manuals/
- https://www.samsung.com/uk/support/user-manuals-and-guide/
- https://www.lg.com/uk/support/product-support/manuals-software/

Links were checked 12 October 2026. A search result or portal does not prove a
manual matches an appliance; match its model. The app does not invent product
specifications, verify warranty cover, or supply
unsupported maintenance instructions. Care dates are in-app notes, not push
notifications. Local photos/records are not sent to an AI chat API.

## Quality process applied

The build was checked through complete user journeys, not just individual
buttons. Automated tests cover data integrity and failure cases. Browser tests
cover photographs, documents, room saving, drafts, backup/restore, search,
manual links, migration, offline access and phone-sized layouts. The camera
pipeline was exercised with real canvas/video frames and controlled detection
outputs. Visual review identified and corrected narrow-screen overflow and the
long unstructured item form. Backup restore was corrected to avoid duplicating
records when only an update timestamp differed.

## Technical limits to retain in product decisions

The current COCO-SSD model recognises broad categories; it does not identify
make/model/serial, guarantee completeness, or reliably establish identity across
long camera pans. Actual-photo review, manual capture and explicit duplicate
merging make the record usable without assuming detector outputs are facts.
Recognition quality still needs a representative real-room benchmark. The
browser tests do not constitute a physical iPhone/Safari hardware trial.

A larger future service can add authenticated manual
retrieval, cross-device sync and notifications. They are not claimed as features
of this local build. They need their own source, privacy, cost and reliability
work rather than cosmetic placeholders.


## Owner feedback applied

The audience is ordinary homeowners and landlords. No engineering dashboard,
confidence percentages or statistical panels are needed in the household flow.
Photographs must make confirmation meaningful. Label reading must reduce typing,
and useful information must remain accessible from an item record.

The owner also asked for flair, animation and sound. This build adds a richer
violet/ink and warm-accent palette, an animated home illustration, photo-led
room cards, responsive taps, entry transitions and brief capture/save sounds.
Sound has an always-visible control. Motion follows device settings by default
and can be reduced explicitly. Scan decoration appears only during scanning.

## Automatic label reading

Tesseract reads label photos locally in the browser. Field parsing retains
punctuation and leading zeros; ambiguous candidates are left for review.
Existing values and edits made during reading are protected. A differing label
value is offered as a choice. Model/serial text with easily confused characters
is flagged for checking. Raw read text and the original photo stay with the
item and its backup. Poor photos, unfamiliar formats and ambiguous print remain
real limitations; this is not a guarantee of correct identity.

Validation uses the real browser OCR engine with generated Samsung, LG, Bosch
and Sony test labels, plus blank and ambiguous-character cases. These tests
exercise extraction, preservation, storage and failure behaviour. Physical
phone photographs and Safari memory/performance still need device validation.


## Easier entry and sound correction (2.6.1)

The owner's feedback was that sound was heard only at its toggle and that
existing data should be offered in dropdowns. Ordinary button/selection cues
are now wired into the UI. Tone playback waits for audio readiness and resumes
suspended or interrupted contexts, including after returning to the page.

Native selectors offer saved/common room and item names, saved/known brands,
and recorded models filtered by brand (or item name when brand is absent).
Custom values remain possible. An explicit product selector reuses shareable
model details and information links, protecting the physical item's photo,
serial, documents and dates. Conflicting existing product details require a
choice before replacement. Contextual prompts explain the next useful action.


## Family memories (2.6.1)

A fifth main destination adds everyday photos/videos and occasion albums. Home
has a direct entry; shared search includes home records and memories. Metadata
entry uses saved/common occasions and optional free text. Selection supports
one or many media files. Opening a moment allows preview and individual edits.

Original media Blobs are stored separately from home records in IndexedDB.
Sharing prepares Files synchronously from loaded Blobs and calls Web Share
from the click gesture, preserving transient activation. canShare checks the
whole payload; unavailable sharing offers original downloads. OS share targets
and recipient selection belong to the phone, not a hardcoded platform list.

The .hsm backup stores a manifest followed by original bytes. Restore checks
lengths, types, file sizes and SHA-256 hashes before a single atomic import.
Identical records are skipped; changed ID conflicts receive new IDs. Home JSON
backups remain backwards compatible and separate, with clear copy explaining
that both are needed. No family login, cloud backup or shared family workspace
is claimed. The local app is a useful capture/search/share implementation,
not the sole long-term vault for irreplaceable family media.

Browser testing validates media persistence and byte-for-byte backup recovery,
search, editing, playback, sharing payloads and fallbacks. The native share menu
is simulated in tests; recipient delivery and physical iPhone behaviour remain
external validation. File-format playback depends on device/browser support.


## Broader item capture and voice (2.6.1)

A grouped household taxonomy covers jewellery, clothing, personal-care items,
bedding, electronics, furniture, tools, travel/sport and more. Category is a
bounded string in the item schema, compatible with older records and preserved
in JSON backup/restore. User-defined category names remain possible. School,
faith and wellbeing contexts are owner-assigned, not inferred personal facts.

The focused close-up reader uses Transformers.js 2.17.2 and quantised
Xenova/clip-vit-base-patch32 inside a cancellable worker. It first selects broad
visual groups, then proposes types within the closest groups. The live COCO
room detector remains separate. The UI shows the source photo and requires
explicit acceptance or correction; relative model scores are not exposed as
accuracy probabilities. No claim is made about jewellery material, authenticity
or value. Worker termination cancels late results and frees its model memory.
Label reading and the broader reader do not intentionally run together.

Voice entry uses feature-detected SpeechRecognition/webkitSpeechRecognition.
Only a reviewed final transcript is applied; interim text cannot be selected.
Typed changes during recognition are protected by confirmation. Detached forms,
closing and backgrounding abort recognition. Permission/service failures offer
keyboard input. Browser speech services may require network and process audio
remotely; on-device dictation is not promised.

Physical iPhone performance and real microphone recognition remain device
validation requirements. Browser tests with controlled speech events verify
UI handling, not speech accuracy. The broader model is materially larger than
the original room model; this first download is explained in the product.

After saving item details, the room opens Check items. Room save controls are
placed outside the animated content so they stay reachable above navigation.
Saving shows progress and prevents duplicate actions until the write finishes.

## Email addition (2.7.0)

Email is a separate Gmail-connected area. Three familiar tasks: catch up on
Inbox, find Attachments, Write. Each summary has an envelope link to the original
thread. Default inbox filtering excludes Google Social/Spam/Trash but retains
receipts and promotions. Only foreground checks happen, 20 messages per page.
Summaries select key sentences locally and preserve short numeric amounts.

Google Identity Services requests read permission first, contacts and send
permission as used. Tokens remain in memory and API calls go directly to Google;
no server, secret or ChatGPT connector token is used. Client registration remains
an external setup prerequisite, honestly stated in the app and EMAIL_SETUP.txt.
Public launch requires Google's applicable verification, not just a client ID.

Email HTML never enters the live DOM. Resource tags are removed before entity
text decoding; no tracking pixels or executable attachment previews are loaded.
Original attachment bytes and per-account drafts/contacts use separate IndexedDB
storage. Attachment limits and backup integrity checks prevent unlimited local
imports and partial restores. Each account's local records remain independent.

Recipient fields use searchable dropdowns and also allow new addresses. Voice
entry follows the existing review-before-apply flow. Sending requires an explicit
message review and send tap. A locally persisted uncertain-delivery flag precedes
POST so loss of the response/reload cannot cause an automatic retry. Owner checks
Gmail Sent before clearing that flag. Client code cannot guarantee exactly-once
email delivery over a lost network; the UI states this rather than retrying.

This build's Email tests use simulated OAuth/API responses in a real browser;
Google registration, real mailbox access/delivery and iPhone link routing remain
unverified. Summaries are extractive; outgoing file attachments, merged multi-
mailbox inboxes, send-as aliases, background checking and cloud sync are absent.

## Consumer connection flow repair (2.7.0)

App-owner registration has moved to email-owner.html. Consumer screens never
ask for OAuth configuration and have explicit unregistered, preparing, ready,
connected, disconnected, denied and network-retry states. A public client ID is
configured centrally in email-config.js. Per-user local client-ID entry is no
longer used. Successful initial consent loads the inbox; sending still requires
review and an explicit send tap. The owner guide generates the connection file
but does not claim that its format check validates Google registration.

A real public client ID supplied by Liam is now present in email-config.js. Remote Google Cloud
access was unavailable, so app registration cannot honestly be marked complete.
The owner has supplied a Google Web client ID. Remaining Google project settings
and actual consent, original-link routing and delivery must be tested. Public launch
requires the applicable Google verification and accurate owner/support details.

## Connection configuration 2.7.0
The owner-supplied public Web client ID is configured centrally. Asset/cache
versions were advanced so the deployed app requests this configuration. Real
Gmail authentication and mailbox operations have not yet been verified.
