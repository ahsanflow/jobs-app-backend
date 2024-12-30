import CompanyProfile from "../models/CompanyProfile.js";
import { faker } from "@faker-js/faker";

export const seedCompanyProfiles = async (count = 5) => {
  try {
    console.log("Seeding Company Profiles...");
    await CompanyProfile.deleteMany({}); // Clear existing data

    const companyProfiles = [];
    for (let i = 0; i < count; i++) {
      const cname = faker.company.name();
      companyProfiles.push({
        logo: `https://placehold.co/250x250/eeeeee/31343c/webp?text=${cname}`,
        cover: `https://placehold.co/800x300/eeeeee/31343c/webp?text=${cname} Cover`,
        companyName: cname,
        email: faker.internet.email(),
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
        aboutCompany: faker.company.catchPhrase(),
        socialLinks: {
          facebook: `https://www.facebook.com/${faker.internet.username()}`,
          twitter: `https://www.twitter.com/${faker.internet.username()}`,
          linkedin: `https://www.linkedin.com/in/${faker.internet.username()}`,
          instagram: `https://www.instagram.com/${faker.internet.username()}`,
        },
      });
    }

    // Insert the generated data into the database
    const insertedCompanies = await CompanyProfile.insertMany(companyProfiles);
    console.log("Company Profiles seeded!");
    return insertedCompanies;
  } catch (error) {
    console.error("Error seeding Company Profiles:", error);
    throw error;
  }
};
