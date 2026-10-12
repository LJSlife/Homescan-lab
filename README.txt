HomeScan Lab v1.2 — room scan correction update

INSTALL ON YOUR EXISTING GITHUB PAGES SITE
1. Extract this ZIP in Files on your phone, or on your laptop.
2. Upload ALL six app files to the same GitHub repository folder that currently
   contains index.html. Replace index.html and sw.js. Include detection.js,
   manifest.webmanifest, icon-192.png and icon-512.png.
3. Wait for GitHub Pages to finish deploying. Open your existing site in Safari
   and refresh. The header must show v1.2 before you test.
Your existing saved rooms stay on the same browser/device and site address.
Opening the HTML directly from Files will not give it HTTPS camera access.

TEST THE KITCHEN AGAIN
Use Balanced (65%). Start with Clear current scan, then scan slowly.
Objects need three separate qualifying frames within an eight-frame window.
The two-frame toilet/book detections from the earlier example would not be
added under this rule. Three or more wrong detections can still pass it.
If oven and microwave detections strongly overlap, or the label alternates
while the same region is tracked, they become one entry needing confirmation.
Tap the Oven choice, or Choose / correct label and enter Oven. The name stays Oven on that entry
when the detector switches labels again. Confirm other accurate entries.
Remove incorrect items with x; a removed entry stays rejected for this scan.
Use + and - to correct quantities. Save the room when it is checked.
Clear current scan resets detections, corrections and rejected entries for
the current room. It does not delete saved rooms.

WHAT THIS VERSION CAN AND CANNOT DO
This is a browser prototype using the same COCO-SSD detector as v1.1.
The model has not been trained on your correction; correction is stored with
the inventory entry and saved room. Model score is not a guarantee of accuracy.
Spatial matching is short-term bounding-box overlap, not 3D room mapping.
Two separately tracked objects seen together can get separate entries.
After a long pan or leaving/re-entering a view, compatible returning objects
are conservatively linked to existing entries and marked for confirmation.
This avoids automatically counting every revisit as another object, but can
undercount similar items that are never seen together. Check names/quantities.
Distinct oven and microwave appliances viewed separately may need manual
separation using Add item. Label correction on a returning entry also requires
checking identity. No claim of guaranteed physical identity is made.
Old saved rooms remain readable and unverified items are marked for review.
Live camera and inference speed must still be checked on the actual iPhone.
Vision libraries/model are fetched from third parties; full offline scanning
is not promised. No room footage is uploaded by this app.

DEVELOPER REFERENCE
https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd
