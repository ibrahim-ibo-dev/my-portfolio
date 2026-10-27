import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const main=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const workspace=path.dirname(main);
await fs.copyFile(path.join(main,'src/components/redesign/AuroraBackground.tsx'),path.join(main,'src/components/brand/AuroraBackground.tsx'));
await fs.copyFile(path.join(main,'src/components/redesign/background.css'),path.join(main,'src/components/brand/background.css'));
for(const name of ['words-site','motion-site','archive-site','lab-site']){
  const site=path.join(workspace,name);
  for(const file of ['BrandFrame.tsx','brand.css','AuroraBackground.tsx','background.css'])await fs.copyFile(path.join(main,'src/components/brand',file),path.join(site,'src/components/brand',file));
}
console.log('Shared brand copied into all four standalone projects. No sibling imports are required.');
