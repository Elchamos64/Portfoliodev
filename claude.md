# Portfolio Website Project

## Project Overview
Build a modern, responsive portfolio website to showcase projects, skills, and experience using Next.js, Tailwind CSS, and MongoDB.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB (with Mongoose ODM)
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Initial Setup

### 1. Create Next.js Project
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd portfolio
```

### 2. Install Dependencies
```bash
npm install mongoose
npm install -D @types/mongoose
```

### 3. Environment Variables
Create `.env.local` file:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## Project Structure
```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── projects/
│   │   ├── page.tsx         # Projects list
│   │   └── [id]/
│   │       └── page.tsx     # Individual project
│   ├── contact/
│   │   └── page.tsx         # Contact page
│   └── api/
│       ├── projects/
│       │   ├── route.ts     # GET all, POST new
│       │   └── [id]/
│       │       └── route.ts # GET, PUT, DELETE by ID
│       └── contact/
│           └── route.ts     # POST contact form
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── Hero.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── mongodb.ts           # MongoDB connection
│   └── models/
│       ├── Project.ts       # Project model
│       └── Contact.ts       # Contact form submissions
├── public/
│   └── images/              # Project images
└── types/
    └── index.ts             # TypeScript types
```

## Database Models

### Project Model
```typescript
// lib/models/Project.ts
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  imageUrl: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
```

### Contact Model
```typescript
// lib/models/Contact.ts
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
```

## Key Features to Implement

### 1. Home Page
- Hero section with introduction
- Featured projects showcase
- Skills/technologies section
- Call-to-action to view projects or contact

### 2. Projects Page
- Grid layout of all projects
- Filter by technology
- Search functionality
- Click to view project details

### 3. Individual Project Page
- Full project description
- Technologies used
- Screenshots/images
- Links to GitHub and live demo
- Related projects

### 4. About Page
- Professional bio
- Education and experience
- Skills and expertise
- Downloadable resume option

### 5. Contact Page
- Contact form (name, email, message)
- Social media links
- Email and other contact methods
- Form validation and submission to database

### 6. Admin Features (Optional)
- Protected admin route
- CRUD operations for projects
- View contact form submissions

## MongoDB Connection Utility

```typescript
// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
```

## Styling Guidelines

### Color Scheme (Customize as needed)
- Primary: Tailwind blue (blue-600)
- Secondary: Tailwind gray (gray-800)
- Accent: Tailwind teal (teal-500)
- Background: white/gray-50
- Dark mode support

### Components Style
- Use Tailwind's responsive utilities (sm:, md:, lg:, xl:)
- Implement smooth transitions and hover effects
- Card-based layouts for projects
- Clean, modern typography

## API Routes Example

### GET /api/projects
Returns all projects, optionally filtered and sorted

### GET /api/projects/[id]
Returns a single project by ID

### POST /api/projects
Creates a new project (consider authentication)

### POST /api/contact
Saves contact form submission to database

## Development Steps

1. **Setup Project Structure**
   - Create all necessary folders and base files
   - Set up MongoDB connection utility
   - Create database models

2. **Build Core Components**
   - Navbar with navigation links
   - Footer with social links
   - Reusable ProjectCard component
   - ContactForm component

3. **Implement Pages**
   - Home page with hero and featured projects
   - Projects listing page
   - Individual project detail page
   - About page
   - Contact page

4. **Create API Routes**
   - Projects CRUD endpoints
   - Contact form endpoint
   - Add error handling and validation

5. **Add Interactivity**
   - Project filtering and search
   - Form validation
   - Loading states
   - Error handling

6. **Polish & Optimize**
   - Responsive design testing
   - Image optimization (Next.js Image component)
   - SEO metadata
   - Performance optimization

## Sample Data for Testing

```json
{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce solution with cart and checkout",
  "longDescription": "A comprehensive e-commerce platform built with Next.js...",
  "technologies": ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
  "githubUrl": "https://github.com/yourusername/ecommerce",
  "liveUrl": "https://ecommerce.example.com",
  "imageUrl": "/images/ecommerce.png",
  "featured": true,
  "order": 1
}
```

## Next Steps After Setup

1. Install and run the project locally
2. Connect to MongoDB (local or Atlas)
3. Create seed data for projects
4. Customize colors and branding
5. Add your actual projects and content
6. Implement admin dashboard (optional)
7. Deploy to Vercel
8. Connect custom domain (optional)

## Useful Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Additional Considerations

- **Authentication**: Add NextAuth.js for admin features
- **Image Uploads**: Use Cloudinary or AWS S3 for project images
- **Analytics**: Add Google Analytics or Vercel Analytics
- **SEO**: Implement proper meta tags and sitemap
- **Dark Mode**: Add theme toggle functionality
- **Animations**: Consider Framer Motion for smooth animations
- **Testing**: Add Jest and React Testing Library

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
