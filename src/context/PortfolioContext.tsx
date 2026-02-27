import React, { createContext, useContext, useState, useEffect } from 'react';

interface PortfolioData {
  hero: {
    name: string;
    title: string;
    image: string;
  };
  about: {
    text1: string;
    text2: string;
    stats: Array<{ label: string; value: string }>;
  };
  skills: Array<{ name: string; icon: string; color: string }>;
  ventures: Array<{
    title: string;
    role: string;
    desc: string;
    img: string;
    tag: string;
    link: string;
    details: {
      subtitle: string;
      description: string;
      links: Array<{ name: string; url: string; type: string }>;
    };
  }>;
  achievements: Array<{ title: string; year: string; icon: string; color: string }>;
  socials: Array<{ name: string; url: string; type: string }>;
}

interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const initialData: PortfolioData = {
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

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    console.log("Fetching portfolio data...");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch('/api/portfolio', { 
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server did not return JSON. Check if the API route is working.");
      }

      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      clearTimeout(timeoutId);
      const msg = err.name === 'AbortError' ? "Connection timed out" : err.message;
      console.error("Portfolio fetch error:", msg);
      setError(msg);
      // Fallback to initialData so the site at least loads
      if (!data) setData(initialData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, refresh: fetchData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within a PortfolioProvider");
  return context;
};
