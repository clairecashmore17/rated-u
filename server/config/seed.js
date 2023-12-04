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
    {
      major_name: "Nursing",
      description:
        "Nursing students are equipped with the skills needed to assess clinical scenarios, navigate patient interactions and work successfully in a variety of health care settings.",
    },
    {
      major_name: "Software Engineering",
      description:
        "Software engineer role includes analyzing and modifying existing software as well as designing, constructing and testing end-user applications that meet user needs.",
    },
    {
      major_name: "Mechanical Engineering",
      description:
        "Mechanical engineers design power-producing machines, such as electric generators, internal combustion engines, and steam and gas turbines, as well as power-using machines, such as refrigeration and air-conditioning systems.",
    },
    {
      major_name: "Civil Engineering",
      description:
        "Civil engineers plan, design, and supervise the construction and maintenance of building and infrastructure projects. These projects may include facilities, bridges, roads, tunnels, and water and sewage systems.",
    },
  ]);

  console.log("Majors seeded");

  await University.deleteMany();

  const university = await University.insertMany([
    {
      university_name: "The George Washington University",
      university_image: "GWU_img.png",
      description:
        "The George Washington University (GW or GWU) is a private federally chartered research university in Washington, D.C. Chartered in 1821 by the United States Congress, GW is one of six universities in the United States with a congressional charter.",
      majors: [
        majors[0]._id,
        majors[1]._id,
        majors[2]._id,
        majors[3]._id,
        majors[4]._id,
        majors[5]._id,
        majors[6]._id,
      ],
      comments: [
        {
          commentText: "I love this school!",
          username: "Jsmith",
          createdAt: Date.now(),
        },
        {
          commentText: "I hate this school!",
          username: "pamNj",
          createdAt: Date.now(),
        },
        {
          commentText: "I don't really have an opinion about this school.",
          username: "mscott",
          createdAt: Date.now(),
        },
      ],
      upvotes: [
        {
          username: "Omart",
        },
        {
          username: "gtownGal122",
        },
        { username: "pamNj" },
      ],
    },
    {
      university_name: "Virginia Tech",
      university_image: "VTECH_img.jpg",
      description:
        "As the commonwealth's most comprehensive university and a leading research institution, Virginia Tech offers about 280 undergraduate and graduate degree programs to more than 38,000 undergraduate, graduate, and professional students across the commonwealth and manages a research portfolio of more than $556 million.",
      majors: [
        majors[0]._id,
        majors[1]._id,
        majors[2]._id,
        majors[4]._id,
        majors[5]._id,
        majors[6]._id,
      ],
      comments: [
        {
          commentText: "I love this school!",
          username: "office_menace",
          createdAt: Date.now(),
        },
        {
          commentText: "I hate this school!",
          username: "gtownGal122",
          createdAt: Date.now(),
        },
        {
          commentText: "I don't really have an opinion about this school.",
          username: "Omart",
          createdAt: Date.now(),
        },
      ],
    },
    {
      university_name: "George Mason University",
      university_image: "GMU_img.jpg",
      description:
        "George Mason University is Virginia's largest public research university. Located near Washington, D.C., Mason enrolls nearly 40,000 students from 130 countries and all 50 states.",
      majors: [
        majors[0]._id,
        majors[1]._id,
        majors[2]._id,
        majors[3]._id,
        majors[4]._id,
        majors[5]._id,
        majors[6]._id,
      ],
      comments: [
        {
          commentText: "I love this school!",
          username: "pamNj",
          createdAt: Date.now(),
        },
        {
          commentText: "I hate this school!",
          username: "gtownGal122",
          createdAt: Date.now(),
        },
        {
          commentText: "I don't really have an opinion about this school.",
          username: "JSmith",
          createdAt: Date.now(),
        },
      ],
      upvotes: [
        {
          username: "Omart",
        },
        { username: "pamNj" },
      ],
    },
    {
      university_name: "Georgetown University",
      university_image: "Georgetown_img.jpg",
      description:
        "Established in 1789, Georgetown is the nation's oldest Catholic and Jesuit university. Drawing upon the 450-year-old legacy of Jesuit education, we provide students with a world-class learning experience focused on educating the whole person through exposure to different faiths, cultures and beliefs.",
      majors: [
        majors[0]._id,
        majors[1]._id,
        majors[2]._id,
        majors[3]._id,
        majors[4]._id,
        majors[5]._id,
      ],
      comments: [
        {
          commentText: "I love this school!",
          username: "mscott",
          createdAt: Date.now(),
        },
        {
          commentText: "I hate this school!",
          username: "pamNj",
          createdAt: Date.now(),
        },
        {
          commentText: "I don't really have an opinion about this school.",
          username: "Omart",
          createdAt: Date.now(),
        },
      ],
      upvotes: [
        {
          username: "Omart",
        },
        {
          username: "mscott",
        },
        { username: "JSmith" },
        { username: "pamNj" },
      ],
    },
    {
      university_name: "University of Maryland",
      university_image: "UniOfMaryland_img.jpg",
      description:
        "The University of Maryland, College Park (University of Maryland, UMD, or simply Maryland) is a public land-grant resesarch university in College Park, Maryland. Founded in 1856, UMD is the flagship institution of the University System of Maryland.",
      majors: [
        majors[0]._id,
        majors[1]._id,
        majors[2]._id,
        majors[3]._id,
        majors[4]._id,
        majors[5]._id,
        majors[6]._id,
      ],
      comments: [
        {
          commentText: "I love this school!",
          username: "Omart",
          createdAt: Date.now(),
        },
        {
          commentText: "I hate this school!",
          username: "office_menace",
          createdAt: Date.now(),
        },
        {
          commentText: "I don't really have an opinion about this school.",
          username: "gtownGal122",
          createdAt: Date.now(),
        },
      ],
      upvotes: [
        {
          username: "office_menace",
        },
        { username: "JSmith" },
      ],
    },
    {
      university_name: "Marymount University",
      university_image: "Marymount_img.jpg",
      description:
        "Founded in 1950 by the Religious of the Sacred Heart of Mary (RSHM), Marymount University is an independent, co-educational Catholic university offering bachelor's, master's, and doctoral degrees in a wide range of disciplines.",
      majors: [majors[3]._id],
      comments: [
        {
          commentText: "I love this school!",
          username: "Jsmith",
          createdAt: Date.now(),
        },
        {
          commentText: "I hate this school!",
          username: "pamNj",
          createdAt: Date.now(),
        },
        {
          commentText: "I don't really have an opinion about this school.",
          username: "mscott",
          createdAt: Date.now(),
        },
      ],
      upvotes: [
        {
          username: "gtownGal122",
        },
        {
          username: "mscott",
        },
        {
          username: "office_menace",
        },
      ],
    },
    {
      university_name: "Trinity Washington University",
      university_image: "Trinity_img.jpg",
      description:
        "Trinity Washington University is a small private university located on an urban campus in Washington, District of Columbia. It has a total undergraduate enrollment of 1,444, and admissions are selective, with an acceptance rate of 96%.",
      majors: [majors[0]._id, majors[2]._id],
      comments: [
        {
          commentText: "I love this school!",
          username: "Jsmith",
          createdAt: Date.now(),
        },
        {
          commentText: "I hate this school!",
          username: "pamNj",
          createdAt: Date.now(),
        },
        {
          commentText: "I don't really have an opinion about this school.",
          username: "mscott",
          createdAt: Date.now(),
        },
      ],
      upvotes: [
        {
          username: "gtownGal122",
        },
        {
          username: "mscott",
        },
      ],
    },
  ]);
  console.log("University seeded");

  await User.deleteMany();

  await User.create({
    first_name: "Pamela",
    last_name: "Jenkins",
    username: "pamNj",
    email: "pamela@marymount.edu",
    password: "password",
    university: university[5]._id,
    major: majors[3]._id,
    upvotes: [
      "656d2eda70ce782599cec493",

      "656d2eda70ce782599cec488",

      "656d2eda70ce782599cec499",
    ],
  });

  await User.create({
    first_name: "John",
    last_name: "Smith",
    username: "JSmith",
    email: "john.smith@gwu.edu",
    password: "password",
    university: university[0]._id,
    major: majors[0]._id,
    upvotes: [university[0]._id, , university[1]._id],
  });
  await User.create({
    first_name: "Jim",
    last_name: "Halpert",
    username: "office_menace",
    email: "jim.halpert@vt.edu",
    password: "password",
    university: university[2]._id,
    major: majors[2]._id,
    upvotes: [university[1]._id, university[2]._id],
  });
  await User.create({
    first_name: "Michael",
    last_name: "Scott",
    username: "mscott",
    email: "michael.scott@gmu.edu",
    password: "password",
    university: university[1]._id,
    major: majors[1]._id,
    upvotes: [university[2]._id, university[3]._id],
  });
  await User.create({
    first_name: "Jenna",
    last_name: "Johnson",
    username: "gtownGal122",
    email: "jenna.johnson@georgetown.edu",
    password: "password",
    university: university[3]._id,
    major: majors[4]._id,
    upvotes: [university[0]._id, university[4]._id],
  });
  await User.create({
    first_name: "Oscar",
    last_name: "Martinez",
    username: "Omart",
    email: "oscar.martinez@gwu.edu",
    password: "password",
    university: university[4]._id,
    major: majors[5]._id,
    upvotes: [university[5]._id, university[6]._id],
  });
  console.log("users removed");

  process.exit();
});
