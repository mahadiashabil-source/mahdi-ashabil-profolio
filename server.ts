import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db: any;
function initDb() {
  try {
    const dbPath = path.join(__dirname, "portfolio.db");
    console.log(`Initializing database at: ${dbPath}`);
    db = new Database(dbPath);
    // Initialize database
    db.exec(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id INTEGER PRIMARY KEY,
        data TEXT NOT NULL
      )
    `);
    
    // Seed data if empty
    const row = db.prepare("SELECT count(*) as count FROM portfolio").get() as { count: number };
    if (row.count === 0) {
      console.log("Seeding initial data...");
      db.prepare("INSERT INTO portfolio (id, data) VALUES (1, ?)").run(JSON.stringify(initialData));
    }
  } catch (err) {
    console.error("Database initialization failed:", err);
    db = null;
  }
}

const initialData = {
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
        links: [
          { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61583322341626", type: "Facebook" }
        ]
      }
    }
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

// Seed data if empty
// Moved inside initDb

async function startServer() {
  initDb();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logging
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
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
  app.get("/api/portfolio", (req, res) => {
    try {
      if (!db) {
        console.log("Database not initialized, returning initialData");
        return res.json(initialData);
      }
      const row = db.prepare("SELECT data FROM portfolio WHERE id = 1").get() as { data: string } | undefined;
      if (!row) {
        console.log("No data found in database, returning initialData");
        return res.json(initialData);
      }
      res.json(JSON.parse(row.data));
    } catch (err) {
      console.error("API Error (/api/portfolio):", err);
      res.json(initialData);
    }
  });

  app.post("/api/portfolio", (req, res) => {
    const { password, data } = req.body;
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    db.prepare("UPDATE portfolio SET data = ? WHERE id = 1").run(JSON.stringify(data));
    res.json({ success: true });
  });

  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    console.log(`Starting in PRODUCTION mode. Serving from: ${distPath}`);
    
    if (!fs.existsSync(distPath)) {
      console.error(`ERROR: dist folder NOT found at ${distPath}`);
    } else {
      console.log(`SUCCESS: dist folder found at ${distPath}`);
      if (fs.existsSync(path.join(distPath, "index.html"))) {
        console.log("SUCCESS: index.html found in dist");
      } else {
        console.error("ERROR: index.html NOT found in dist");
      }
    }

    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application not built. Please run 'npm run build' first.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
