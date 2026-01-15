export type EdgeStyle =
  | "vignette"
  | "soft-glow"
  | "cloud-blur"
  | "neon-top-glow"
  | "pastel-fade"
  | "confetti-light"
  | "none";

export type AnimationType = "float" | "glow" | "fade" | "none";
export type Intensity = "soft" | "medium" | "strong";
export type CardShape = "rounded" | "square" | "soft-rounded";

export interface Theme {
  id: string;
  name: string;
  backgroundImage: string;          // ALWAYS present (fallback)
  backgroundVideo?: string;         // OPTIONAL (elite only)
  signBackgroundImage?: string; 

  accentColor: string;
  card: {
    background?: string;
    border: string;
    shadow: string;
    shape: CardShape;
  };
  decoration: {
    edgeStyle: EdgeStyle;
    intensity: Intensity | "none";
  };
  animation?: {
    type: AnimationType;
    intensity: Intensity;
  };
  slideshow?: {
    frosted: boolean;
    autoplay: boolean;
  };
  titleColor?: string;
  textColor?: string;
}

const ELITE_VIDEO =
  "https://res.cloudinary.com/dil6r5jl2/video/upload/v1765908018/hbhbi_ffuto9.mp4";

export const themes: Theme[] = [
  /* =======================
     BASIC THEMES (UNCHANGED)
     ======================= */

  {
    id: "pastel-scrapbook",
    name: "Pastel Scrapbook",
    backgroundImage:
      "https://i.ibb.co/5XJCrrs0/5.png",
    accentColor: "#c994b9",
    card: {
      background: "#f7f6f4",
      border: "1px solid rgba(255, 199, 217, 0.7)",
      shadow: "0 16px 40px rgba(244, 114, 182, 0.25)",
      shape: "rounded"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#000000",
    textColor: "#000000"
  },
  {
    id: "vintage-polaroid",
    name: "Vintage Polaroid",
    backgroundImage:
      "https://i.ibb.co/tfNFXN0/6.png",
    accentColor: "#919191",
    card: {
      background: "#f7f6f4",
      border: "1px solid rgba(206, 184, 149, 0.8)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "fade",
      intensity: "medium"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#000000",
    textColor: "#000000"
    
  },
  {
    id: "neon-Jam",
    name: "Neon Jam",
    backgroundImage:
      "https://i.ibb.co/Mkp7Zd8m/7.png",
    accentColor: "#6f1f72",
    card: {
      background: "#170000",
      border: "1px solid rgba(255, 76, 245, 0.7)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "soft-rounded"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "glow",
      intensity: "strong"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "The-celebration-hour",
    name: "The Celebration Hour",
    backgroundImage:
      "https://i.ibb.co/WpdLbS1f/5.png",
    accentColor: "#f6c275",
    card: {
      background: "#efb86b",
      border: "1px solid rgba(255, 76, 245, 0.7)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "soft-rounded"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "glow",
      intensity: "strong"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },
  {
    id: "Christmas Eve",
    name: "Christmas Eve",
    backgroundImage: "https://i.ibb.co/zV7hQsyx/1.png",
    accentColor: "#606060",
    card: {
      background: "#191818",
      border: "1px solid rgba(215, 203, 184, 0.6)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "soft-rounded"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "fade",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "The-Upside-down",
    name: "The_Upside_down",
    backgroundImage: "https://i.ibb.co/zTMRwnJ7/2.png",
    accentColor: "#000000",
    card: {
      background: "#170000",
      border: "1px solid rgba(15, 23, 42, 0.65)",
      shadow:  "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "Dreamy-Soft-hues",
    name: "Dreamy Soft hues",
    backgroundImage: "https://i.ibb.co/spw298FY/9.png",
    accentColor: "#d1d9eb",
    card: {
      background: "#f7f6f4",
      border: "1px solid rgba(253, 199, 226, 0.8)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "rounded"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "float",
      intensity: "soft"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#0000000"
  },
  {
    id: "boho-bloom",
    name: "Boho Bloom",
    backgroundImage: "https://i.ibb.co/60FpZHPv/12.png",
    accentColor: "#694336",
    card: {
      background: "#70372a",
      border: "1px solid rgba(191, 140, 111, 0.75)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "rounded"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "fade",
      intensity: "medium"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "starry-celestial",
    name: "Starry Celestial",
    backgroundImage: "https://i.ibb.co/FLbbnvK0/16.png",
    accentColor: "#000000",
    card: {
      background: "#292929",
      border: "1px solid rgba(143, 198, 255, 0.8)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "soft-rounded"
    },
    decoration: {
      edgeStyle: "vignette",
      intensity: "strong"
    },
    animation: {
      type: "glow",
      intensity: "soft"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "tropical-fiesta",
    name: "Tropical Fiesta",
    backgroundImage: "https://i.ibb.co/ns9Rsk3b/13.png",
    accentColor: "#fed2c6",
    card: {
      background: "#d8d8d8",
      border: "1px solid rgba(255, 180, 112, 0.8)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "rounded"
    },
    decoration: {
      edgeStyle: "pastel-fade",
      intensity: "medium"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },
  {
    id: "Lantern-of-wishes",
    name: "Lanterns of Wishes",
    backgroundImage: "https://i.ibb.co/XZQzCvpj/8.png",
    accentColor: "#ee8a15",
    card: {
      background: "#081c31",
      border: "1px solid rgba(195, 54, 54, 0.75)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "rounded"
    },
    decoration: {
      edgeStyle: "soft-glow",
      intensity: "medium"
    },
    animation: {
      type: "fade",
      intensity: "medium"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "Coastal_whispers",
    name: "Coastal whispers",
    backgroundImage: "https://i.ibb.co/4wdQpv4T/6.png",
    accentColor: "#c1dce0",
    card: {
      background: "#e6e7e8",
      border: "1px solid rgba(255, 78, 78, 0.85)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "confetti-light",
      intensity: "medium"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },
  {
    id: "Purple-letters",
    name: "Purple letters",
    backgroundImage: "https://i.ibb.co/20hHyXnc/11.png",
    accentColor: "#9a527d",
    card: {
      background: "#9870ab",
      border: "1px solid rgba(167, 211, 255, 0.75)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "soft-rounded"
    },
    decoration: {
      edgeStyle: "cloud-blur",
      intensity: "soft"
    },
    animation: {
      type: "float",
      intensity: "soft"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },
  {
    id: "Retro_Echoes",
    name: "Retro Echoes",
    backgroundImage: "https://i.ibb.co/Mkf29dRy/4.png",
    accentColor: "#000000",
    card: {
      background: "#000000",
      border: "1px solid rgba(15, 23, 42, 0.9)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "soft-glow",
      intensity: "medium"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "Doodle-Diary",
    name: "Doodle Diary",
    backgroundImage: "https://i.ibb.co/GvqqRLnv/18.png",
    accentColor: "#fdd3e7",
    card: {
      background: "#dbedf8",
      border: "1px solid rgba(15, 23, 42, 0.9)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "soft-glow",
      intensity: "medium"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },
  {
    id: "Polaroid-days",
    name: "Polaroid days",
    backgroundImage: "https://i.ibb.co/YFvJ7fh6/14.png",
    accentColor: "#424243",
    card: {
      background: "#8c90a7",
      border: "1px solid rgba(15, 23, 42, 0.9)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "soft-glow",
      intensity: "medium"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },
  {
    id: "Shoreline-Echoes",
    name: "Shoreline Echoes",
    backgroundImage: "https://i.ibb.co/mCFk3CBF/15.png",
    accentColor: "#4b3f27",
    card: {
      background: "#f7f7f0",
      border: "1px solid rgba(15, 23, 42, 0.9)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "soft-glow",
      intensity: "medium"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },
  {
    id: "Burnout-Drifts",
    name: "Burnout Drifts",
    backgroundImage: "https://i.ibb.co/B5Lcz1Nf/17.png",
    accentColor: "#919191",
    card: {
      background: "#292929",
      border: "1px solid rgba(15, 23, 42, 0.9)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "soft-glow",
      intensity: "medium"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "The-Y2K-Crash",
    name: "The Y2K Crash",
    backgroundImage: "https://i.ibb.co/Rk2L5bFF/20.png",
    accentColor: "#cc6dc0",
    card: {
      background: "#f8ecd3",
      border: "1px solid rgba(15, 23, 42, 0.9)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "soft-glow",
      intensity: "medium"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },

  {
    id: "Rough-draft-scribbles",
    name: "Rough draft scribbles",
    backgroundImage: "https://i.ibb.co/zM7Ctvt/10.png",
    accentColor: "#d1d1d1",
    card: {
      background: "#e0dcd7",
      border: "1px solid rgba(164, 198, 249, 0.8)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "soft-rounded"
    },
    decoration: { edgeStyle: "vignette", intensity: "soft" },
    animation: { type: "glow", intensity: "soft" },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },
  {
    id: "coffee-day",
    name: "Coffe-Date",
    backgroundImage: "https://i.ibb.co/rRSVZNNr/hbhbi-3.png",
    accentColor: "#000000",
    card: {
      background: "#000000",
      border: "1px solid rgba(15, 23, 42, 0.65)",
      shadow:  "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "new-year-1",
    name: "New Year's Eve",
    backgroundImage: "https://i.ibb.co/jvgZ3j0Z/22.png",
    accentColor: "#f0d08c",
    card: {
      background: "#1a1a1a",
      border: "1px solid rgba(15, 23, 42, 0.65)",
      shadow:  "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "new-year-2",
    name: "New Year's Eve",
    backgroundImage: "https://i.ibb.co/SXfM6tfs/23.png",
    accentColor: "#d0d1d2",
    card: {
      background: "#000000",
      border: "1px solid rgba(15, 23, 42, 0.65)",
      shadow:  "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "new-year-3",
    name: "New Year's Eve",
    backgroundImage: "https://i.ibb.co/qML0JL8z/24.png",
    accentColor: "#000000",
    card: {
      background: "#000000",
      border: "1px solid rgba(15, 23, 42, 0.65)",
      shadow:  "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "gold-black",
    name: "Gold & Black",
    backgroundImage: "https://i.ibb.co/0VKsNWLq/25.png",
    accentColor: "#f0d08c",
    card: {
      background: "#1a1a1a",
      border: "1px solid rgba(15, 23, 42, 0.65)",
      shadow:  "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "square"
    },
    decoration: {
      edgeStyle: "none",
      intensity: "none"
    },
    animation: {
      type: "none",
      intensity: "soft"
    },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },


  /* =======================
     ELITE THEMES (FIXED)
     ======================= */

  {
    id: "elite-sakura-glowscape",
    name: "Sakura Glowscape",
    backgroundImage: "https://i.ibb.co/N6P4kP1X/Elite-templates-3.png",

    backgroundVideo: "https://res.cloudinary.com/dil6r5jl2/video/upload/v1766386142/Elite_templates_1_cat84p.mp4",
    signBackgroundImage: "https://i.ibb.co/qMSwrYsX/6.png",
    accentColor: "#f6d4d2",
    card: {
      background: "#f6d4d2",
      border: "1px solid rgba(212,175,55,0.6)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "rounded"
    },
    decoration: { edgeStyle: "soft-glow", intensity: "strong" },
    animation: { type: "glow", intensity: "strong" },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
    
  },

  {
    id: "elite-frosted-eve",
    name: "Frosted Eve",
    backgroundImage:"https://i.ibb.co/7NCjMfVv/Elite-templates-2.png",
    backgroundVideo: ELITE_VIDEO,
    signBackgroundImage: "https://i.ibb.co/6cwB4pNQ/hbhbi.png",

    accentColor: "#e1edf2",
    card: {
      background: "#e1edf2",
      border: "1px solid rgba(201,162,39,0.7)",   // ✅ FIXED
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "soft-rounded"
    },
    decoration: { edgeStyle: "neon-top-glow", intensity: "strong" },
    animation: { type: "glow", intensity: "strong" },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },

  {
    id: "elite-enchanted-lotusfal",
    name: "Enchanted Lotusfal",
    backgroundImage:"https://i.ibb.co/K13GVDB/Elite-templates-4.png",
    backgroundVideo: "https://res.cloudinary.com/dil6r5jl2/video/upload/v1766386137/Elite_templates_2_uhgqmz.mp4",
    signBackgroundImage: "https://i.ibb.co/KxwTR5fv/8.png",

    accentColor: "#ffc2c2",
    card: {
      background: "#ffc2c2",
      border: "1px solid rgba(182,164,255,0.6)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "soft-rounded"
    },
    decoration: { edgeStyle: "vignette", intensity: "strong" },
    animation: { type: "float", intensity: "medium" },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },

  {
    id: "elite-golden-luxe",
    name: "Golden Luxe",
    backgroundImage: "https://i.ibb.co/N2Bj8pqk/Elite-templates-5.png",
    backgroundVideo: "https://res.cloudinary.com/dil6r5jl2/video/upload/v1766386127/Elite_templates_3_itbahf.mp4",
    signBackgroundImage: "https://i.ibb.co/ytYhKSD/10.png",

    accentColor: "#000000",
    card: {
      background: "#000000",
      border: "1px solid rgba(216,207,196,0.7)",
      shadow: "0 24px 60px rgba(120,110,100,0.35)",
      shape: "square"
    },
    decoration: { edgeStyle: "none", intensity: "none" },
    animation: { type: "fade", intensity: "soft" },
    slideshow: {
      frosted: false ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#000000"
  },

  {
    id: "elite-cosmic-reverie",
    name: "Cosmic Reverie",
    backgroundImage:"https://i.ibb.co/WjRRmQb/Elite-templates-7.png",
    backgroundVideo: "https://res.cloudinary.com/dil6r5jl2/video/upload/v1766386121/Elite_templates_4_vl1pla.mp4",
    signBackgroundImage: "https://i.ibb.co/1tN70Fzh/12.png",
    
    accentColor: "#000000",
    card: {
      background: "#000000",
      border: "1px solid rgba(247,183,210,0.8)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "rounded"
    },
    decoration: { edgeStyle: "pastel-fade", intensity: "medium" },
    animation: { type: "float", intensity: "soft" },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  },
  {
    id: "elite-love-bloom",
    name: "Lovehaven",
    backgroundImage:"https://i.ibb.co/WwVfwwN/Elite-templates.png",
    backgroundVideo: "https://res.cloudinary.com/dil6r5jl2/video/upload/v1768240014/Elite_templates_5_czfncx.mp4",
    signBackgroundImage: "https://i.ibb.co/4gWGKPw9/Elite-templates-1.png",
    
    accentColor: "#aa1f4a",
    card: {
      background: "#000000",
      border: "1px solid rgba(247,183,210,0.8)",
      shadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
      shape: "rounded"
    },
    decoration: { edgeStyle: "pastel-fade", intensity: "medium" },
    animation: { type: "float", intensity: "soft" },
    slideshow: {
      frosted: true ,
      autoplay: true
    },
    titleColor: "#f7f6f4",
    textColor: "#f7f6f4"
  }
  
];

export function getThemeById(id: string): Theme {
  if (!id) return themes[0];

  const normalized = id
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-");

  return (
    themes.find((t) => {
      const tid = t.id.toLowerCase();
      const tname = t.name.toLowerCase().replace(/[_\s]+/g, "-");

      return tid === normalized || tname === normalized;
    }) ?? themes[0]
  );
}

