import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  personalInfo as localPersonalInfo,
  aboutMe as localAboutMe,
  skillsData as localSkillsData,
  projectsData as localProjectsData,
  experienceData as localExperienceData,
  educationData as localEducationData,
  certificationsData as localCertificationsData,
  servicesData as localServicesData,
  testimonialsData as localTestimonialsData,
  type Project,
  type Experience,
  type Education,
  type Certification,
  type Service,
  type Testimonial
} from '../data/portfolioData';

export interface PortfolioData {
  personalInfo: typeof localPersonalInfo;
  aboutMe: typeof localAboutMe;
  skillsData: typeof localSkillsData;
  projectsData: Project[];
  experienceData: Experience[];
  educationData: Education[];
  certificationsData: Certification[];
  servicesData: Service[];
  testimonialsData: Testimonial[];
}

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  error: string | null;
  submitContact: (formData: { name: string; email: string; subject: string; message: string }) => Promise<boolean>;
}

const DEFAULT_PORTFOLIO: PortfolioData = {
  personalInfo: localPersonalInfo,
  aboutMe: localAboutMe,
  skillsData: localSkillsData,
  projectsData: localProjectsData,
  experienceData: localExperienceData,
  educationData: localEducationData,
  certificationsData: localCertificationsData,
  servicesData: localServicesData,
  testimonialsData: localTestimonialsData
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err: any) {
        console.warn('Backend connection failed, using local static fallback data. Error:', err.message || err);
        setError(err.message || 'Failed to fetch from backend');
        // Keep default local data
        setData(DEFAULT_PORTFOLIO);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const submitContact = async (formData: { name: string; email: string; subject: string; message: string }): Promise<boolean> => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return response.ok;
    } catch (err) {
      console.error('Failed to submit contact message to backend:', err);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, error, submitContact }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
