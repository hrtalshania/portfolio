# Project screenshots — how to add them

Each project's case-study page (`projects/index.html?id=<slug>`) shows a
"Screenshots" gallery when the project has images listed in `js/data.js`.

## Folder structure

```
assets/projects/
  arenahub/            <- one folder per project slug (see js/data.js)
    1.jpg
    2.jpg
  algo-trade/
    1.jpg
  blazing-auth/...
  cab-booking/...
  bridge-messaging/...
  ayurbeat/...
  student-management/...
  capacitor-mobile-app/...
```

Slugs (folder names must match exactly):
`arenahub`, `algo-trade`, `blazingauth`, `cab-booking`, `bridge-messaging`,
`ayurbeat`, `student-management`, `capacitor-mobile-app`

## Two steps to add screenshots

1. Drop your images into the project's folder. Any number, any reasonable
   format (jpg/png/webp), named however you like (`1.jpg`, `2.jpg`, `login.png`, ...).
2. Open `js/data.js`, find that project, and list the filenames:

```js
gallery: ["1.jpg", "2.jpg", "login.png"],
```

- Empty array (`gallery: []`) = the Screenshots section is hidden.
- No limit on the number of images; they render in the order listed.
- Layout: the first 2 images show large, the next 3 small, and anything
  beyond 5 collapses into a "+N more" tile (the lightbox shows everything).
- First image in the list is also a good candidate for the future card
  thumbnail, so put the best one first.

## Tips

- Landscape ~16:10 crops look best (thumbnails are cropped to 16:10).
- Compress large screenshots before committing (e.g. 1280–1600px wide is plenty).
- The gallery is wired with a lightbox: visitors click a thumbnail to view it
  full size, with prev/next and keyboard arrows. Nothing else to set up.
