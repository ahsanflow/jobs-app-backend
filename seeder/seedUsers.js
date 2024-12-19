import User from "../models/User.js";
import { faker } from "@faker-js/faker";

export const seedUsers = async (count = 2) => {
  try {
    console.log("Seeding Users...");
    await User.deleteMany({});

    // const users = [];
    // for (let i = 0; i < count; i++) {
    //   const name = faker.person.fullName();
    //   const email = faker.internet.email();
    //   const password = "password123"; // Or use bcrypt to hash this
    //   users.push({ name, email, password });
    // }
    const users = [
      {
        name: "developer",
        email: "admin@admin.com",
        password: "admin123",
        role: "admin",
      },
    ];
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded!");
    return createdUsers; // Return users for relationships
  } catch (error) {
    console.error("Error seeding Users:", error);
    throw error;
  }
};
