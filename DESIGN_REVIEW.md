# HomeScan 2.0: the household app

## Product structure

HomeScan is a local household record for homeowners and landlords. Properties
contain rooms; rooms contain photographed items. Each item can hold its
identity, useful documents and information links. The scanner is one capture
method, alongside taking or choosing a photo.

The four main destinations are Home, Rooms, Find an item and More. The room
workspace separates scanning from checking. Item details are split into Item,
Manuals & care, and Documents. Photo evidence comes before confirmation.

## Complete record workflow

1. Choose or create a property, then name a room.
2. Scan, or create an item with a photo. Missing detections have a usable fallback.
3. Inspect the photographed object. Confirm, edit, remove/undo or merge duplicate
   entries. The chosen duplicate photo stays; quantities are not blindly summed.
4. Record brand/model/serial details and photograph the label when useful.
5. Access manual and care searches using the current exact-model values. Save
   links or attach the actual PDF/receipt/warranty document.
6. Record purchase/warranty/care dates and notes. Due care notes appear on Home.
7. Save the room. Reopening and saving updates that same record. Interrupted
   work is kept as a draft and can be resumed.
8. Search records, download a photo report, or make a complete restorable backup.

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
specifications, read labels automatically, verify warranty cover, or supply
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

A larger future service can add automatic label extraction, authenticated manual
retrieval, cross-device sync and notifications. They are not claimed as features
of this local build. They need their own source, privacy, cost and reliability
work rather than cosmetic placeholders.
