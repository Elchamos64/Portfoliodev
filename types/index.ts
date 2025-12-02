export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  read: boolean;
}
