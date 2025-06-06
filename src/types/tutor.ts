// types/Tutor.ts


export interface WorkExperience {
  schoolName: string;
  role: string;
  startDate: string; // Dates are typically received as ISO strings from backend
  endDate: string;
  description: string;
}

export interface ImageData {
  data: string; // Base64 or binary-to-string encoded
  contentType: string;
}

export interface CertificateFile {
  certName: string;
  schoolName: string;
  year: string;
  data: string; // Base64 or binary-to-string encoded
  contentType: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  parent: {
    fullName: string;
  };
}

export interface Tutor {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  googleId?: string;
  role: 'tutor';

  phone?: string;
  location?: string;
  bio?: string;
  subjects: string[];
  profileImage?: ImageData;
  certificates?: CertificateFile[];
  workExperiences?: WorkExperience[];
  availableDays?: string[];
  reviews?: Review[];

  createdAt: string;
  updatedAt: string;
}


