import mongoose from "mongoose";

import { connectDatabase } from "../config/database.js";
import { UserModel, UserRole } from "../modules/user/model/user.model.js";
import { hashPassword } from "../common/utils/password.js";

const seedUsers = async () => {
  try {
    await connectDatabase();

    const users = [
      {
        name: "Super Admin",
        email: "admin@workflowpro.com",
        password: "Admin@123",
        designation: "Administrator",
        department: "Management",
        role: UserRole.ADMIN,
      },
      {
        name: "Harsh Bisht",
        email: "harsh.bisht@gmail.com",
        password: "Password@123",
        designation: "Project Manager",
        department: "Management",
        role: UserRole.PROJECT_MANAGER,
      },
      {
        name: "Ayush Gupta",
        email: "ayush.gupta@gmail.com",
        password: "Password@123",
        designation: "Frontend Developer",
        department: "Engineering",
        role: UserRole.EMPLOYEE,
      },
      {
        name: "Akshat Pal",
        email: "akshat.pal@gmail.com",
        password: "Password@123",
        designation: "Senior Software Engineer",
        department: "Engineering",
        role: UserRole.EMPLOYEE,
      },
      {
        name: "Mohit Kumar",
        email: "mohit.kumar@gmail.com",
        password: "Password@123",
        designation: "Backend Developer",
        department: "Engineering",
        role: UserRole.EMPLOYEE,
      },
    ];

    for (const user of users) {
      const existingUser = await UserModel.findOne({
        email: user.email,
      });

      if (existingUser) {
        console.log(`⚠️ ${user.email} already exists`);
        continue;
      }

      const hashedPassword = await hashPassword(user.password);

      await UserModel.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        profilePic: "",
        designation: user.designation,
        department: user.department,
        manager: null,
        role: user.role,
        isActive: true,
        emailVerified: true,
        lastLogin: null,
      });

      console.log(`✅ Created ${user.email}`);
    }

    console.log("🎉 User seeding completed successfully.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error while seeding users:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

seedUsers();