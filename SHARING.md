# Link previews

Shared links use real 1200 × 630 browser captures of their own pages. No artwork, labels or decorative frames are added to the captures. Each page has explicit Open Graph and Twitter metadata; `src/data/social-previews.json` maps its slug to a content-hashed JPEG under `public/images/social/`. The `home` key belongs to the portfolio homepage.

`src/lib/social-preview.ts` requires a registered preview and throws when a slug is missing. New projects therefore need both their content entry and a matching manifest record. This project includes its own metadata, assets and import script; it has no runtime dependency on sibling projects.

To update the captures:

1. Add a manifest record for any new slug first, following the existing structure and supplying its real page title as `alt`. The importer iterates existing manifest records; it does not discover new pages.
2. Capture the actual pages in the browser at 1200 × 630. Put all registered captures in one directory, named `portfolio-social-<slug>.png`; use `portfolio-social-home.png` for the homepage.
3. From this project directory, run `node scripts/import-social-captures.cjs <capture-directory>`. The script imports the captures as JPEGs and updates their hashed filenames in the manifest. It does not compose new artwork.
4. Run `npm run build`, then `npm run test:seo` to check the generated HTML and image references.

`npm run build` only runs Next.js; it does not generate replacement artwork or recapture pages. Keep the imported JPEGs and manifest in this repository when publishing.

Social platforms must be able to reach the deployed public URL, such as `https://ibrahim-eng.dev/projects/your-slug`. They cannot crawl `localhost` or `127.0.0.1` on this computer. After deployment, a platform may need to rescrape an already shared URL because it caches previews. A new image filename helps distinguish changed captures, but does not force old messages to refresh. These local changes have not been deployed.
