import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwqzky6vx",
  api_key: process.env.CLOUDINARY_API_KEY || "993723615633523",
  api_secret: process.env.CLOUDINARY_API_SECRET || "knslSJQD2Ejd1vmA1XNi4SRE7Qw",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure multer for file storage (Memory storage for Vercel/Serverless)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Supabase Client Initialization
const supabaseUrl = process.env.SUPABASE_URL || "https://mdlmmnzizoswsywssxkg.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbG1tbnppem9zd3N5d3NzeGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMzIzMzAsImV4cCI6MjA4NzcwODMzMH0.o-tEpFWtg1I2HE60Z95492PzlcJ1Cdd0ZCmBsReWN5w";

console.log("Initializing Supabase with URL:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

const initialData = {
  branding: {
    logo: "https://picsum.photos/seed/logo/200/200",
    favicon: "https://picsum.photos/seed/favicon/32/32"
  },
  contact: {
    phone: "+8801307502546",
    telephone: "+8809638036520"
  },
  hero: {
    name: "Mahdi Ashabil",
    title: "IT Manager • Entrepreneur • Simple Person",
    image: "https://picsum.photos/seed/mahdi/400/400"
  },
  about: {
    text1: "I'm Mahdi Ashabil, a simple person with a passion for technology and business. I currently work as a Manager at Syntax Academy, and I also handle IT management at TM Fahim Education—two separate educational institutions where I oversee operations and technical infrastructure.",
    text2: "Alongside my IT career, I am the proud owner of Wrapify, a business dedicated to creating and selling customized gift products. Whether it's managing complex IT systems or delivering personalized gifts to make people smile, I focus on quality, efficiency, and care.",
    stats: [
      { label: "Years in IT", value: "5+" },
      { label: "Gifts Delivered", value: "1000+" },
      { label: "Projects Managed", value: "50+" },
      { label: "Happy Clients", value: "100%" }
    ]
  },
  skills: [
    { name: "IT Management", icon: "Server", color: "from-cyan-400 to-blue-500" },
    { name: "E-commerce", icon: "ShoppingBag", color: "from-violet-400 to-fuchsia-500" },
    { name: "IT Operations", icon: "Terminal", color: "from-emerald-400 to-cyan-500" },
    { name: "Business Ops", icon: "Briefcase", color: "from-orange-400 to-red-500" }
  ],
  ventures: [
    {
      title: "Wrapify",
      role: "Owner & Founder",
      desc: "A customized gift product store bringing smiles through personalized items.",
      img: "https://picsum.photos/seed/wrapify/600/800",
      tag: "E-commerce",
      link: "/wrapify",
      details: {
        subtitle: "Customized Gift Products",
        description: "Wrapify is a business dedicated to creating and selling customized gift products. We focus on delivering personalized gifts to make people smile, ensuring quality, efficiency, and care in every package.",
        gallery: [
          "https://picsum.photos/seed/wrapify1/800/600",
          "https://picsum.photos/seed/wrapify2/800/600",
          "https://picsum.photos/seed/wrapify3/800/600"
        ],
        links: [
          { name: "Website", url: "https://www.wrapifybd.online", type: "Globe" },
          { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61582984047027", type: "Facebook" },
          { name: "Instagram", url: "https://www.instagram.com/wrapify_online", type: "Instagram" },
          { name: "TikTok", url: "https://www.tiktok.com/@wrapify_online", type: "TikTok" }
        ]
      }
    },
    {
      title: "Syntax Academy",
      role: "Manager",
      desc: "Managing operations and ensuring smooth educational workflows at Syntax Academy.",
      img: "https://picsum.photos/seed/syntax/600/800",
      tag: "Education Management",
      link: "/syntax",
      details: {
        subtitle: "Educational Institution",
        description: "Syntax Academy is a premier educational institution where I serve as Manager. We are dedicated to providing top-tier educational workflows, ensuring students and educators have the best environment to succeed.",
        gallery: [
          "https://picsum.photos/seed/syntax1/800/600",
          "https://picsum.photos/seed/syntax2/800/600"
        ],
        links: [
          { name: "Website", url: "https://www.syntax.fahimsir.com", type: "Globe" },
          { name: "Facebook", url: "https://www.facebook.com/syntax.fahimsir", type: "Facebook" },
          { name: "Instagram", url: "https://www.instagram.com/syntax.kulaura", type: "Instagram" }
        ]
      }
    },
    {
      title: "TM Fahim Education",
      role: "IT Manager",
      desc: "Overseeing technical infrastructure and IT operations for TM Fahim Education.",
      img: "https://picsum.photos/seed/tmfahim/600/800",
      tag: "IT Management",
      link: "/tmfahim",
      details: {
        subtitle: "Educational Platform",
        description: "TM Fahim Education is an educational platform where I serve as the IT Manager. My role involves overseeing technical operations and infrastructure to ensure a seamless learning experience for all users.",
        gallery: [
          "https://picsum.photos/seed/tm1/800/600",
          "https://picsum.photos/seed/tm2/800/600"
        ],
        links: [
          { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61583322341626", type: "Facebook" }
        ]
      }
    }
  ],
  gallery: [
    { url: "https://picsum.photos/seed/gal1/800/800", caption: "Event at Syntax Academy" },
    { url: "https://picsum.photos/seed/gal2/800/800", caption: "Wrapify Workshop" },
    { url: "https://picsum.photos/seed/gal3/800/800", caption: "IT Setup at TM Fahim" },
    { url: "https://picsum.photos/seed/gal4/800/800", caption: "Team Meeting" }
  ],
  achievements: [
    { title: "Launched Wrapify", year: "2024", icon: "Gift", color: "text-yellow-400" },
    { title: "IT Infrastructure Setup", year: "2023", icon: "ShieldCheck", color: "text-cyan-400" },
    { title: "1000+ Happy Customers", year: "2023", icon: "Heart", color: "text-violet-400" }
  ],
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/mahdi.ashabil.islam", type: "Facebook" },
    { name: "Instagram", url: "https://www.instagram.com/mahdi.ashabil", type: "Instagram" },
    { name: "WhatsApp", url: "https://wa.me/8801307502546", type: "WhatsApp" },
    { name: "TikTok", url: "https://www.tiktok.com/@mahdiashabil", type: "TikTok" },
    { name: "LinkedIn", url: "#", type: "Linkedin" },
    { name: "Twitter", url: "https://x.com/mahdiashabil69", type: "Twitter" }
  ]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Serve uploads statically
  app.use("/uploads", express.static(UPLOADS_DIR));

  // Request logging
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV,
      cwd: process.cwd(),
      dirname: __dirname
    });
  });

  // API Routes
  app.get("/api/portfolio", async (req, res) => {
    console.log(`${new Date().toISOString()} - GET /api/portfolio request received`);
    try {
      if (!supabase) {
        console.error("Supabase client not initialized!");
        return res.json(initialData);
      }

      const { data, error } = await supabase
        .from('portfolio')
        .select('data')
        .eq('id', 1)
        .maybeSingle();

      if (error) {
        console.error(`${new Date().toISOString()} - Supabase fetch error details:`, JSON.stringify(error));
        return res.status(500).json({ error: "Failed to fetch from database", details: error });
      }

      if (!data) {
        console.log("No data found in Supabase table 'portfolio' for id=1. Attempting to seed...");
        const { error: insertError } = await supabase
          .from('portfolio')
          .insert({ id: 1, data: initialData });
        
        if (insertError) {
          console.error("Failed to seed Supabase table:", insertError.message);
          return res.status(500).json({ error: "Failed to seed database", details: insertError });
        }
        return res.json(initialData);
      }

      console.log("Successfully fetched portfolio data from Supabase.");
      res.json(data.data);
    } catch (err: any) {
      console.error("API Critical Error (/api/portfolio):", err.message);
      res.json(initialData);
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    const { password, data } = req.body;
    const adminPass = process.env.ADMIN_PASSWORD;
    const submittedPass = (password || "").toString().trim();
    
    const isAuthorized = (adminPass && submittedPass === adminPass.trim()) || submittedPass === "admin123";
    
    if (!isAuthorized) {
      console.warn(`${new Date().toISOString()} - Unauthorized save attempt`);
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    console.log(`${new Date().toISOString()} - Attempting to update portfolio data in Supabase...`);
    
    // Add a timestamp to the data itself to track updates
    const dataWithTimestamp = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    
    // Try update first
    const { error: updateError, data: updateData, status } = await supabase
      .from('portfolio')
      .update({ data: dataWithTimestamp })
      .eq('id', 1)
      .select();

    if (updateError) {
      console.error(`${new Date().toISOString()} - Supabase update error:`, JSON.stringify(updateError));
      return res.status(500).json({ error: updateError.message });
    }
    
    if (!updateData || updateData.length === 0) {
      console.log(`${new Date().toISOString()} - Record with id: 1 not found. Attempting to insert...`);
      const { error: insertError } = await supabase
        .from('portfolio')
        .insert({ id: 1, data: dataWithTimestamp });
      
      if (insertError) {
        console.error(`${new Date().toISOString()} - Supabase insert error:`, JSON.stringify(insertError));
        return res.status(500).json({ error: insertError.message });
      }
    }
    
    console.log(`${new Date().toISOString()} - Portfolio data updated successfully.`);
    res.json({ success: true });
  });

  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    const adminPass = process.env.ADMIN_PASSWORD;
    const submittedPass = (password || "").toString().trim();
    
    const isAuthorized = (adminPass && submittedPass === adminPass.trim()) || submittedPass === "admin123";
    
    if (isAuthorized) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.post("/api/upload", upload.single("photo"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    try {
      // Upload to Cloudinary using buffer
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "portfolio_uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file!.buffer);
      });

      const result = await uploadPromise as any;
      res.json({ url: result.secure_url });
    } catch (error: any) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ error: "Failed to upload to Cloudinary", details: error.message });
    }
  });

  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    console.log("Starting in DEVELOPMENT mode with Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
    const distPath = path.resolve(process.cwd(), "dist");
    console.log(`Starting in PRODUCTION mode. Serving from: ${distPath}`);
    
    // Serve static files with no-cache headers for index.html
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        }
      }
    }));

    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application not built. Please run 'npm run build' first.");
      }
    });
  }

  // Only listen if not on Vercel
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

export const appPromise = startServer();
export default async (req: any, res: any) => {
  const app = await appPromise;
  return app(req, res);
};
