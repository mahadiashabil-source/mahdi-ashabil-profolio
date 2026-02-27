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

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    console.log("Fetching portfolio data...");
    try {
      const res = await fetch('/api/portfolio');
      console.log("Fetch response status:", res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const text = await res.text();
      console.log("Fetch response text length:", text.length);
      try {
        const json = JSON.parse(text);
        console.log("Portfolio data loaded successfully");
        setData(json);
      } catch (e) {
        console.error("Failed to parse portfolio JSON", e);
      }
    } catch (err) {
      console.error("Failed to fetch portfolio data", err);
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
