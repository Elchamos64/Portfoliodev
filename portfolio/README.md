# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Project Showcase**: Display your projects with filtering and search capabilities
- **Contact Form**: Integrated contact form that saves submissions to MongoDB
- **Dark Mode Support**: Built-in dark mode styling
- **SEO Friendly**: Optimized for search engines
- **API Routes**: RESTful API for managing projects and contact submissions

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
   - Update `.env.local` with your MongoDB connection string
   - For local MongoDB: `mongodb://localhost:27017/portfolio`
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── projects/        # Project endpoints
│   │   └── contact/         # Contact form endpoint
│   ├── about/               # About page
│   ├── projects/            # Projects pages
│   ├── contact/             # Contact page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── Hero.tsx
│   └── ContactForm.tsx
├── lib/                     # Utilities
│   ├── mongodb.ts           # Database connection
│   └── models/              # Mongoose models
│       ├── Project.ts
│       └── Contact.ts
├── public/                  # Static files
│   └── images/              # Project images
└── types/                   # TypeScript types
    └── index.ts
```

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
  - Query params: `?featured=true` to get only featured projects
- `GET /api/projects/[id]` - Get a single project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/[id]` - Update a project
- `DELETE /api/projects/[id]` - Delete a project

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)

## Seeding Sample Data

To quickly get started with sample projects, run the seed script:

```bash
node scripts/seed.js
```

This will populate your database with 3 sample projects.

## Adding Projects

You can add projects by making a POST request to `/api/projects` with the following structure:

```json
{
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://project-demo.com",
  "imageUrl": "/images/project.png",
  "featured": true,
  "order": 1
}
```

## Customization

1. **Update Personal Information**:
   - Edit `components/Footer.tsx` to add your contact details
   - Edit `app/about/page.tsx` to add your bio, education, and experience
   - Edit `app/contact/page.tsx` to update contact information

2. **Change Color Scheme**:
   - Modify Tailwind classes in components
   - Update `tailwind.config.ts` for custom colors

3. **Add Your Logo**:
   - Replace "Portfolio" text in `components/Navbar.tsx` with your logo

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXT_PUBLIC_URL`: Your production URL
4. Deploy

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Security Note

- The `.env.local` file is in `.gitignore` to keep your credentials safe
- Never commit your MongoDB credentials to version control
- Consider adding authentication for admin routes in production

## Next Steps

1. Connect to MongoDB and test the application
2. Add your own projects via the API
3. Customize the design and content
4. Add admin dashboard for managing projects (optional)
5. Deploy to production
6. Add analytics (Google Analytics, Vercel Analytics)
7. Consider adding NextAuth.js for authentication

## Troubleshooting

- **MongoDB Connection Issues**: Make sure MongoDB is running locally or check your Atlas connection string
- **Build Errors**: Run `pnpm build` to check for TypeScript or build errors
- **Missing Dependencies**: Run `pnpm install` to ensure all packages are installed

## License

This project is open source and available under the MIT License.
