require('dotenv').config();
const mongoose = require('mongoose');
const { Course } = require('./models');

const courses = [
  ['☕', 'Java Full Stack', 'Core Java, Spring Boot, React and databases with capstone projects.'],
  ['🐍', 'Python Full Stack', 'Python, Django, APIs, front-end basics and deployment.'],
  ['🧪', 'Software Testing', 'Manual and automation testing with Selenium and CI tools.'],
  ['📊', 'Data Science & Analytics', 'Statistics, SQL, Power BI, machine learning fundamentals.'],
  ['☁️', 'Cloud & DevOps', 'AWS, Docker, Kubernetes, Jenkins and infrastructure basics.'],
  ['🎨', 'UI/UX & Web Design', 'Design thinking, Figma, HTML, CSS and responsive layouts.']
].map(([icon, title, description], order) => ({ icon, title, description, order }));

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Course.deleteMany({});
  await Course.insertMany(courses);
  console.log(`Seeded ${courses.length} courses`);
  await mongoose.disconnect();
})().catch(e => { console.error(e.message); process.exit(1); });
