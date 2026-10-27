// Independent homepage selections. Video order chosen by Ibrahim.
export type FeaturedWriting={slug:string;title:string;excerpt?:string;cover?:string;quote?:string;kind?:string};
export type FeaturedVideo={slug:string;title:string;thumbnail?:string;width:number;height:number};
export const featuredWritings:FeaturedWriting[]=[
  {
    "slug": "i-feel-and-i-am-not",
    "quote": "هەست بە تەنیای دەکەم و تەنیا نیم",
    "kind": "Poetry",
    "title": "هەست دەکەم و نیم",
    "excerpt": "هەست بە تەنیای دەکەم و تەنیا نیم هەست بە خەمۆکی دەکەم و خەمۆک نیم هەست دەکەم و هەویش نیم هەست بە تەنیای دەکەم و تەنیا نیم هەست بە خەمۆکی دەکەم و…",
    "cover": "/images/writings/i-feel-and-i-am-not.jpg"
  },
  {
    "slug": "nali-the-beloveds-hair",
    "quote": "ماهی من تەنها مەهێکە سەد نوجوومی مەحو کرد",
    "kind": "Literary analysis",
    "title": "تا لە من ئەو زوڵفە ڕێی بۆسە و کەناری گرتووە",
    "excerpt": "وێنەسازیی عەشق لە شیعری نالی لێکدانەوەی چەند بەیتێک لە دیوانی نالی تێبینی ئەم بەرهەمە کراوە بە گۆرانی لەلایەن عەدنان کەریمەوە…",
    "cover": "/images/writings/nali-the-beloveds-hair.png"
  },
  {
    "slug": "zero-and-existence",
    "quote": "ئەگەر سفر «هیچ» بێت، چۆن ئەو هەموو شتە لەسەری بنیاد نراوە؟",
    "kind": "Philosophy",
    "title": "سفر: ئەو چەمکەی کە بوونی هەیە و ئەو ژمارەیە کە بوونی نییە",
    "excerpt": "با سەرەتا بزانین یەکەم کەس کێ بوو سفری دۆزیەوە. سومەرییەکان لە مێزۆپۆتامیا (عێراقی ئێستا) پێش نزیکەی ٥٠٠٠ ساڵ یەکەم کەس بوون کە بیرۆکەی سفری وەک…",
    "cover": "/images/writings/zero-and-existence.jpg"
  }
];
export const featuredVideos:FeaturedVideo[]=[
  {slug:"tecno-ai-10",title:"TECNO AI 10",thumbnail:"/images/videos/tecno-ai-10.jpg",width:2160,height:3840},
  {slug:"tecno-ai-3",title:"TECNO AI 3",thumbnail:"/images/videos/tecno-ai-3.jpg",width:1350,height:1080},
  {slug:"tecno-ai-4",title:"TECNO AI 4",thumbnail:"/images/videos/tecno-ai-4.jpg",width:1350,height:1080},
  {slug:"tecno-ai-5",title:"TECNO AI 5",thumbnail:"/images/videos/tecno-ai-5.jpg",width:2160,height:3840},
];
