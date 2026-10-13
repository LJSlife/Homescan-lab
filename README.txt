HomeScan 3.0.1 — deployment-safe clarity reset

This build deliberately removes the unreliable scan/OCR item flow.

WHAT THE USER SEES
- Room screen: Items + one clear + Add Item button.
- Add Item: one scrolling form. No Item setup / Manuals & care / Documents tab bar.
- Item name is the only required field.
- Brand, model, serial, category, quantity and photos are optional.
- Label photo is a reference photo only. HomeScan does not pretend to read it in this build.
- One clear Save item button.

DEPLOYMENT
Replace the files in the existing GitHub Pages HomeScan folder with the contents of this package. Do not upload the ZIP itself as a site file.

This build uses new physical UI filenames (app-3.0.1.js and styles-3.0.1.css), unregisters old service workers and clears old caches so the previous wizard cannot be reused accidentally.

After deployment, opening reset.html once is a belt-and-braces cache reset. It redirects back to the app automatically.

VERIFY
The footer must say: HomeScan · 3.0.1
If the top of Add Item shows the old three tabs, the deployed site is still serving older files.
