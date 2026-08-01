import mongoose from "mongoose";

import { connectDatabase } from "../config/database.js";
import { UserModel } from "../modules/user/model/user.model.js";
import { hashPassword } from "../common/utils/password.js";
import { UserRole } from "../modules/user/model/user.model.js";

const seedAdmin = async () => {
  await connectDatabase();

  const existingAdmin = await UserModel.findOne({
    email: "admin@workflowpro.com",
  });

  if (existingAdmin) {
    console.log("Admin already exists");

    process.exit(0);
  }

  const password = await hashPassword("Admin@123");

  await UserModel.create({
    name: "Super Admin",
    email: "admin@workflowpro.com",
    password,
    designation: "Administrator",
    department: "Management",
    role: UserRole.ADMIN,
    isActive: true,
    emailVerified: true,
  });

  console.log("✅ Admin Created");

  await mongoose.disconnect();

  process.exit(0);
};

seedAdmin();