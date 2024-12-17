import CompanyProfile from "../models/CompanyProfile.js";
import { faker } from "@faker-js/faker";

export const seedCompanyProfiles = async (count = 5) => {
  try {
    console.log("Seeding Company Profiles...");
    await CompanyProfile.deleteMany({});

    const companyProfiles = [];
    for (let i = 0; i < count; i++) {
      companyProfiles.push({
        companyName: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        website: faker.internet.url(),
        estSince: faker.date.past(20),
        teamSize: faker.helpers.arrayElement(["1-10", "11-50", "51-200"]),
        categories: faker.helpers.arrayElements(
          ["Banking", "Retail", "Technology", "Sales", "Marketing"],
          2
        ),
        allowInSearch: faker.datatype.boolean(),
        about: faker.company.catchPhrase(),
        address: {
          country: faker.location.country(),
          city: faker.location.city(),
          fullAddress: faker.location.streetAddress(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        socialLinks: {
          facebook: "https://www.facebook.com/" + faker.string.uuid(),
          twitter: "https://www.twitter.com/" + faker.string.uuid(),
          linkedin: "https://www.linkedin.com/" + faker.string.uuid(),
          googlePlus: "https://www.googleplus.com/" + faker.string.uuid(),
        },
      });
    }

    // Insert into the database
    const insertedCompanies = await CompanyProfile.insertMany(companyProfiles);
    return insertedCompanies; // Explicitly return the created companies
    console.log("Company Profiles seeded!");
  } catch (error) {
    console.error("Error seeding Company Profiles:", error);
    throw error;
  }
};
