// Run this script to seed the database with sample projects
// Usage: node scripts/seed.js

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with cart and checkout',
    longDescription: 'A comprehensive e-commerce platform built with Next.js, featuring product listings, shopping cart functionality, secure checkout process, and admin dashboard for managing products and orders.',
    technologies: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://ecommerce.example.com',
    imageUrl: '/images/ecommerce.png',
    featured: true,
    order: 1
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task tracking application',
    longDescription: 'A modern task management application that helps teams collaborate effectively. Features include task creation, assignment, due dates, priority levels, and real-time updates.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    githubUrl: 'https://github.com/yourusername/taskmanager',
    liveUrl: 'https://tasks.example.com',
    imageUrl: '/images/taskmanager.png',
    featured: true,
    order: 2
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather information and forecasts',
    longDescription: 'An interactive weather dashboard that provides current weather conditions, hourly and weekly forecasts, and weather alerts. Built with modern web technologies and third-party weather APIs.',
    technologies: ['TypeScript', 'Next.js', 'Chart.js', 'OpenWeather API'],
    githubUrl: 'https://github.com/yourusername/weather',
    liveUrl: 'https://weather.example.com',
    imageUrl: '/images/weather.png',
    featured: false,
    order: 3
  }
];

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

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

    // Clear existing projects
    console.log('Clearing existing projects...');
    await Project.deleteMany({});

    // Insert sample projects
    console.log('Inserting sample projects...');
    await Project.insertMany(sampleProjects);

    console.log(`Successfully seeded ${sampleProjects.length} projects!`);
    console.log('\nSample projects:');
    sampleProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} ${project.featured ? '(Featured)' : ''}`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
