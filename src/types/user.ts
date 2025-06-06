// types/User.ts



export interface WorkExperience {
  _id: string;
  schoolName: string;
  role: string;
  period: string; // Dates are typically received as ISO strings from backend
  description: string;
}

export interface Child {
  name: string;
  _id: string;
  age: number;
  grade: string;
  school: string;
  subjects: string[];
  createdAt?: string;  // ISO string from the backend
  updatedAt?: string;
}


export interface ImageData {
  data: string; // Base64 or binary-to-string encoded
  contentType: string;
}

export interface reviews {
  _id: string;
  parent: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CertificateFile {
  _id: string,
  certName: string;
  schoolName: string;
  year: string;
  data: string; // Base64 or binary-to-string encoded
  contentType: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  googleId?: string;
  role: 'tutor' | 'parent';

  phone?: string;
  location?: string;
  bio?: string;
  about?: string;
  subjects: string[];
  profileImage?: ImageData;
  certificates?: CertificateFile[];
  workExperiences?: WorkExperience[];
  children?: Child[];
  availableDays?: string[];
  parentReviews?: reviews[];
  

  createdAt: string;
  updatedAt: string;
}


