import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("changeme123", 12);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteTitle: "My Site",
      siteDescription: "Welcome to my site",
      heroTitle: "Welcome",
      heroSubtitle: "Discover amazing content",
      theme: JSON.stringify({
        primaryColor: "#3B82F6",
        primaryColorHover: "#2563EB",
        fontFamily: "Inter, system-ui, sans-serif",
        borderRadius: "8px",
        buttonStyle: "filled",
        bgStyle: "white",
      }),
      socialLinks: "[]",
      footerText: `© ${new Date().getFullYear()} My Site. All rights reserved.`,
    },
  });

  console.log("Seed complete.");
  console.log("Default admin: admin@example.com / changeme123");
  console.log("IMPORTANT: Change the admin password after first login!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
