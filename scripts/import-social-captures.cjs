// Import real browser captures without adding artwork, labels, frames or layout.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),source=process.argv[2]&&path.resolve(process.argv[2]);
if(!source)throw new Error('Pass the folder containing the real 1200x630 page screenshots.');
const packageName=require(path.join(root,'package.json')).name;
const prefix=packageName==='words-site'?'words':packageName==='motion-site'?'motion':'portfolio';
const manifestPath=path.join(root,'src/data/social-previews.json');
const previous=JSON.parse(fs.readFileSync(manifestPath,'utf8')),next={};
(async()=>{
  for(const [slug,entry] of Object.entries(previous)){
    const file=path.join(source,`${prefix}-social-${slug}.png`);
    const dimensions=await sharp(file).metadata();
    if(!dimensions.width||!dimensions.height||Math.abs(dimensions.width/dimensions.height-1200/630)>.04)throw new Error(`${file} must be a real 1200x630 capture; got ${dimensions.width}x${dimensions.height}.`);
    const buffer=await sharp(file).resize(1200,630,{fit:"cover"}).jpeg({quality:94,mozjpeg:true}).toBuffer();
    const hash=crypto.createHash('sha256').update(buffer).digest('hex').slice(0,10);
    const name=`${slug}-page-${hash}.jpg`;
    fs.writeFileSync(path.join(root,'public/images/social',name),buffer);
    next[slug]={image:`/images/social/${name}`,width:1200,height:630,type:'image/jpeg',alt:entry.alt};
  }
  fs.writeFileSync(manifestPath,JSON.stringify(next,null,2)+'\n');
  console.log(`Imported ${Object.keys(next).length} real ${prefix} page screenshots.`);
})().catch(error=>{console.error(error.message);process.exit(1);});
