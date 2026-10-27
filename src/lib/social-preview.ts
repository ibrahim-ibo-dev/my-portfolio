import previews from "@/data/social-previews.json";
type Preview={image:string;width:number;height:number;type:string;alt:string};
export function socialPreview(slug:string){
  const entry=(previews as Record<string,Preview>)[slug];
  if(!entry)throw new Error(`Missing social preview for ${slug}. Add its page capture to social-previews.json.`);
  return {url:entry.image,width:entry.width,height:entry.height,type:entry.type,alt:entry.alt};
}
