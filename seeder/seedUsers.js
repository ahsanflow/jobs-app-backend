import User from "../models/User.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const seedUsers = async (count = 10) => {
  try {
    console.log("Seeding Users...");
    await User.deleteMany({});

    const users = [];
    const password = await bcrypt.hash("password123", 10);
    users.push({
      name: "developer",
      email: "admin@admin.com",
      password: password,
      role: "admin",
    });
    users.push({
      name: "Pr1me",
      email: "company@company.com",
      password: password,
      role: "employer",
    });
    for (let i = 0; i < count; i++) {
      const password = await bcrypt.hash("password123", i);
      const role = faker.helpers.arrayElement(["employer", "candidate"]);
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password,
        role,
      });
    }

    // Insert users into the database
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded!");
    return createdUsers;
  } catch (error) {
    console.error("Error seeding Users:", error);
    throw error;
  }
};
