import Company from "../models/Company.js";
import { faker } from "@faker-js/faker";

export const seedCompanies = async (companyUsers) => {
  try {
    console.log("Seeding Company Profiles...");
    await Company.deleteMany({});
    const createdCompanies = [];

    for (const user of companyUsers) {
      const cname = faker.company.name();
      const createdCompany = await Company.create({
        userId: user._id,
        companyName: cname,
        logo: `https://placehold.co/250x250/eeeeee/31343c/webp?text=${cname}`,
        cover: `https://placehold.co/800x300/eeeeee/31343c/webp?text=${cname} Cover`,
        email: user.email,
        phone: faker.phone.number(),
        website: faker.internet.url(),
        estSince: faker.date.past(20),
        teamSize: faker.number.int({ min: 1, max: 500 }),
        city: faker.location.city(),
        country: faker.location.country(),
        industryType: faker.helpers.arrayElement([
          "Banking",
          "Retail",
          "Technology",
          "Sales",
          "Marketing",
        ]),
        allowInSearch: faker.datatype.boolean(),
        description: faker.company.catchPhrase(),
        socialLinks: {
          facebook: faker.internet.url(),
          twitter: faker.internet.url(),
          linkedin: faker.internet.url(),
          instagram: faker.internet.url(),
        },
      });
      // Update the user with the company profile reference
      user.profile = createdCompany._id;
      await user.save();
      createdCompanies.push(createdCompany);
    }

    console.log("Company Profiles seeded!");
    return createdCompanies;
  } catch (error) {
    console.error("Error seeding Company Profiles:", error);
    throw error;
  }
};
