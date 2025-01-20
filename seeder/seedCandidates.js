import Candidate from "../models/Candidate.js";
import { faker } from "@faker-js/faker";

export const seedCandidates = async (candidateUsers) => {
  try {
    console.log("Seeding Candidate Profiles...");
    await Candidate.deleteMany({});
    const createdCandidates = [];
    for (const user of candidateUsers) {
      const uname = faker.person.fullName();
      const createdCandidate = await Candidate.create({
        userId: user._id,
        fullName: uname,
        image: `https://placehold.co/800x800/eeeeee/31343c/webp?text=${uname}`,
        jobTitle: faker.person.jobTitle(),
        phone: faker.phone.number(),
        email: user.email,
        website: faker.internet.url(),
        currentSalary: `$${faker.finance.amount(40000, 90000, 0)}`,
        expectedSalary: `$${faker.finance.amount(50000, 100000, 0)}`,
        experience: `${faker.number.int({ min: 1, max: 10 })} years`,
        age: faker.number.int({ min: 22, max: 55 }).toString(),
        education: faker.helpers.arrayElement([
          "Bachelor's in Computer Science",
          "Master's in Business Administration",
          "Diploma in IT",
        ]),
        languages: faker.helpers.arrayElements(
          ["English", "Spanish", "French", "German"],
          2
        ),
        categories: faker.helpers.arrayElements(
          ["Technology", "Banking", "Retail"],
          2
        ),
        allowInSearch: faker.datatype.boolean(),
        description: faker.lorem.paragraph(),
      });
      // Update the user with the candidate profile reference
      user.profile = createdCandidate._id;
      await user.save();
      createdCandidates.push(createdCandidate);
    }

    console.log("Candidate Profiles seeded!");
    return createdCandidates;
  } catch (error) {
    console.error("Error seeding Candidate Profiles:", error);
    throw error;
  }
};
