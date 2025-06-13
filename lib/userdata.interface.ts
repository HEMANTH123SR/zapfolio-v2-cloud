export interface UserData {
  userId: string;
  publicIdentifier: string;
  profileFsd?: string;
  identifier?: string;
  firstName?: string;
  lastName?: string;
  headline?: string;
  industry?: string;
  industryUrn?: string;
  summary?: string;
  followers?: number;
  connections?: number;
  image?: string;
  location?: {
    address?: string;
    countryCode?: string;
  };
  jobExperience?: JobExperience[];
  education?: Education[];
  skills?: string[];
  languages?: Language[];
  projects?: Project[];
  researchPapers?: ResearchPaper[];
  socialMedia?: SocialMedia;
  freelanceServices?: FreelanceService[];
  clients?: Client[];
  articles?: Article[];
  resumeUrl?: string;
  gallery?: GalleryItem[];
  certifications?: Certification[];
  awards?: Award[];
  hobbies?: string[];
  testimonials?: Testimonial[];
  portfolioSettings?: PortfolioSettings;
  contactInfo?: ContactInfo;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobExperience {
  company?: {
    name?: string;
    identifier?: string;
    liUrl?: string;
    imageUrl?: string;
  };
  employmentType?: string;
  positions?: Position[];
}

interface Position {
  function?: string;
  location?: string;
  tenure?: {
    start?: {
      month?: number;
      year?: number;
    };
    end?: {
      month?: number;
      year?: number;
    };
  };
  description?: string;
  skills?: string[];
}

interface Education {
  company?: {
    name?: string;
    identifier?: string;
    liUrl?: string;
    imageUrl?: string;
  };
  subject?: string;
  tenure?: {
    start?: {
      month?: number;
      year?: number;
    };
    end?: {
      month?: number;
      year?: number;
    };
  };
  courseDescription?: string;
}

interface Language {
  language?: string;
  proficiency?: string;
}

interface Project {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  technologies?: string[];
  startDate?: {
    month?: number;
    year?: number;
  };
  endDate?: {
    month?: number;
    year?: number;
  };
  ongoing?: boolean;
  collaborators?: string[];
  highlights?: string[];
}

interface ResearchPaper {
  title?: string;
  abstract?: string;
  authors?: string[];
  publicationDate?: {
    month?: number;
    year?: number;
  };
  journal?: string;
  doi?: string;
  url?: string;
  citations?: number;
  keywords?: string[];
}

interface SocialMedia {
  x?: string;
  github?: string;
  medium?: string;
  dribbble?: string;
  behance?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  other?: {
    platform?: string;
    url?: string;
  }[];
}

interface FreelanceService {
  title?: string;
  description?: string;
  category?: string;
  pricing?: {
    amount?: number;
    currency?: string;
    model?: string;
  };
  skills?: string[];
  availability?: string;
  url?: string;
}

interface Client {
  name?: string;
  logoUrl?: string;
  industry?: string;
  workDescription?: string;
  testimonial?: {
    text?: string;
    author?: string;
    position?: string;
  };
  startDate?: {
    month?: number;
    year?: number;
  };
  endDate?: {
    month?: number;
    year?: number;
  };
  ongoing?: boolean;
  website?: string;
}

interface Article {
  title?: string;
  summary?: string;
  url?: string;
  publishDate?: {
    month?: number;
    year?: number;
  };
  platform?: string;
  imageUrl?: string;
  tags?: string[];
}

interface GalleryItem {
  title?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  date?: {
    month?: number;
    year?: number;
  };
}

interface Certification {
  name?: string;
  issuer?: string;
  issueDate?: {
    month?: number;
    year?: number;
  };
  expiryDate?: {
    month?: number;
    year?: number;
  };
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  imageUrl?: string;
}

interface Award {
  title?: string;
  issuer?: string;
  date?: {
    month?: number;
    year?: number;
  };
  description?: string;
  imageUrl?: string;
}

interface Testimonial {
  text?: string;
  author?: {
    name?: string;
    position?: string;
    company?: string;
    imageUrl?: string;
  };
  date?: {
    month?: number;
    year?: number;
  };
  relationship?: string;
}

interface PortfolioSettings {
  theme?: string;
  layout?: string;
  accentColor?: string;
  fontSize?: string;
  customCss?: string;
  customDomain?: string;
  visibility?: {
    projects?: boolean;
    experience?: boolean;
    education?: boolean;
    skills?: boolean;
    testimonials?: boolean;
    services?: boolean;
    articles?: boolean;
    contactForm?: boolean;
  };
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  preferredContactMethod?: string;
  availabilityHours?: string;
}
