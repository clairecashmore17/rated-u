const db = require("./connection");
const { User, Major, University, upvoteSchema } = require("../models");

db.once("open", async () => {
  await Major.deleteMany();
  const majors = await Major.insertMany([
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
      university_image: "GWU_img.png",
      majors: [majors[0]._id, majors[1]._id],
      upvotes: [{ username: "ClaireCashmore" }, { username: "johndoe" }],
    },
    {
      university_name: "Virginia Tech",
      university_image: "VTECH_img.jpg",
      majors: [majors[1]._id, majors[2]._id],
      upvotes: [
        { username: "ClaireCashmore" },
        { username: "johndoe" },
        { username: "janesmith" },
      ],
    },
    {
      university_name: "George Mason University",
      university_image: "GMU_img.jpg",
      majors: [majors[0]._id, majors[2]._id],
    },
  ]);
  console.log("University seeded");

  // await User.deleteMany();

  // await User.create({
  //   username: "pam",
  //   email: "pamela@gwu.edu",
  //   password: "password12345",
  // });

  // await User.create({
  //   username: "holty",

  //   email: "eholt@vt.edu",
  //   password: "password12345",
  // });
  // await User.create({
  //   username: "user3",
  //   email: "user3@vt.edu",
  //   password: "password12345",
  // });
  // await User.create({
  //   username: "user4",
  //   email: "user4@gmu.edu",
  //   password: "password12345",
  // });

  // await User.create({
  //   username: "johnny",
  //   email: "john@gwu.edu",
  //   password: "password12345",
  // });
  // console.log("users seeded");

  process.exit();
});
