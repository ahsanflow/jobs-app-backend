import Jobs from "../models/Jobs.js";
import { faker } from "@faker-js/faker";
const skills = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "PHP",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Django",
  "Flask",
  "Laravel",
  "Spring Boot",
  "Ruby on Rails",
  "SQL",
  "MongoDB",
  "AWS",
  "Azure",
  "DevOps",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "SEO",
  "Marketing",
  "Project Management",
  "Scrum",
];
const getRandomDate = () => {
  const now = new Date(); // Current date and time
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3); // Set to 3 months earlier

  // Generate a random timestamp between the two dates
  const randomTimestamp =
    Math.random() * (now.getTime() - threeMonthsAgo.getTime()) +
    threeMonthsAgo.getTime();

  return new Date(randomTimestamp); // Return a random date object
};
export const seedJobs = async (companyIds, count = 10) => {
  try {
    console.log("Seeding Jobs...");
    await Jobs.deleteMany({});

    const data = [];
    for (let i = 0; i < count; i++) {
      const job = await Jobs.create({
        company: faker.helpers.arrayElement(companyIds), // Linking company
        title: faker.person.jobTitle(),
        description: faker.lorem.paragraph(),
        specialisms: faker.helpers.arrayElements(
          ["IT", "Healthcare", "Finance", "Marketing"],
          2
        ),
        skills: faker.helpers.arrayElements(
          skills,
          faker.number.int({ min: 3, max: 7 })
        ), // Select 3-7 random skills
        jobType: faker.helpers.arrayElement([
          "full-time",
          "part-time",
          "freelancer",
          "temporary",
        ]),
        salary: {
          min: faker.number.int({ min: 300, max: 3000, multipleOf: 100 }),
          max: faker.number.int({ min: 3000, max: 10000, multipleOf: 100 }),
        },
        careerLevel: faker.helpers.arrayElement([
          "Entry Level",
          "Mid Level",
          "Senior Level",
        ]),
        experience: faker.helpers.arrayElement([
          "Fresh",
          "1-year",
          "2-year",
          "3-year",
          "4-year",
        ]),
        industry: faker.helpers.arrayElement([
          "Technology",
          "Healthcare",
          "Education",
        ]),
        qualification: faker.helpers.arrayElement([
          "Bachelor's",
          "Master's",
          "PhD",
        ]),
        applicationDeadline: new Date(
          Date.now() +
            faker.number.int({ min: 10, max: 30 }) * 24 * 60 * 60 * 1000
        ), // Deadline in 10-30 days
        location: {
          country: faker.location.country(),
          city: faker.location.city(),
        },
        deadline: new Date(
          Date.now() +
            faker.number.int({ min: 7, max: 30 }) * 24 * 60 * 60 * 1000
        ),
        createdAt: getRandomDate(), // Assign a random date
      });
      data.push(job);
    }
    console.log("Jobs seeded!");
    return data;
  } catch (error) {
    console.error("Error seeding Jobs:", error);
    throw error;
  }
};
