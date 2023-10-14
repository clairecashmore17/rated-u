const db = require("./connection");
const { User, Major, University } = require("../models");

db.once("open", async () => {
  await Major.deleteMany();
  const major = await Major.insertMany([
    {
      major_name: "Computer Engineering",
      description:
        "The design and development of systems based on computers and complex digital logic devices",
    },
    {
      major_name: "Electrical Engineering",
      description:
        "Design, develop, test, and supervise the manufacture of electrical equipment, such as electric motors, radar and navigation systems, communications systems, or power generation equipment.",
    },
    {
      major_name: "Cyber Security",
      description:
        "Collective methods, technologies, and processes to help protect the confidentiality, integrity, and availability of computer systems, networks and data, against cyber-attacks or unauthorized access.",
    },
  ]);

  console.log("Majors seeded");

  await University.deleteMany();

  const university = await University.insertMany([
    {
      university_name: "The George Washington University",
      university_image: "GWU image_url placeholder",
    },
    {
      university_name: "Virginia Tech",
      university_image: "v-tech image placeholder",
    },
    {
      university_name: "George Mason University",
      university_image: "GMU image_url placeholder",
    },
  ]);
  console.log("University seeded");
  process.exit();
});
