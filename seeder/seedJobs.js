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
          "Full Time",
          "Part Time",
          "Freelance",
        ]),
        salary: {
          min: faker.number.int({ min: 20000, max: 50000 }),
          max: faker.number.int({ min: 60000, max: 120000 }),
        },
        careerLevel: faker.helpers.arrayElement([
          "Entry Level",
          "Mid Level",
          "Senior Level",
        ]),
        experience: faker.helpers.arrayElement([
          "Fresh",
          "1-2 years",
          "3-5 years",
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
