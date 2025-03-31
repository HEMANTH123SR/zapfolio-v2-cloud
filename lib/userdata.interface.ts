export interface UserData {
  firstName?: string;
  lastName?: string;
  headline?: string;
  industry?: string;
  location?: {
    address?: string;
    countryCode?: string;
  };
  connections?: number;
  followers?: number;
  image?: string;
  summary?: string;
  jobExperience?: JobExperience[];
  education?: Education[];
  skills?: string[];
  languages?: Language[];
  updatedAt?: string;
}

interface JobExperience {
  company?: {
    name?: string;
    imageUrl?: string;
  };
  employmentType?: string;
  positions?: Position[];
}

interface Position {
  function?: string;
  tenure?: {
    start?: {
      month?: string;
      year?: string;
    };
    end?: {
      month?: string;
      year?: string;
    };
  };
  location?: string;
  description?: string;
  skills?: string[];
}

interface Education {
  company?: {
    name?: string;
    imageUrl?: string;
  };
  subject?: string;
  tenure?: {
    start?: {
      year?: string;
    };
    end?: {
      year?: string;
    };
  };
  courseDescription?: string;
}

interface Language {
  language?: string;
  proficiency?: string;
}
