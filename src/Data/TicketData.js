import userImage from "../assets/alexander-hipp-iEEBWgY_6lA-unsplash.jpg";
import Screenshot from "../assets/photo-1566241440091-ec10de8db2e1.jpeg";

export const rowData = [
  {
    id: 1,
    priority: "High",
    ticket: "TK000001",
    project: "Project 1",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "Done",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",

    createdBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedTo: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    completedBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    retestTo: {
      name: "Jasper",
      date: "20 Jan,2025",
      image: userImage,
    },
    reportedBy: {
      name: "Jasper",
      date: "20 Jan,2025",
      image: userImage,
    },
    retestBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo, doloremque delectus sint atque consequatur consectetur? Tenetur modi ea non iste ipsum temporibus magnam, mollitia expedita minima porro rem, inventore tempora illo odio dicta?",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Syed",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "22 Jan",
      },
      {
        author: {
          name: "Kannan",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "25 Jan",
      },
    ],
  },
  {
    id: 2,
    priority: "Low",
    ticket: "TK000002",
    project: "Project 2",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "Assigned",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    createdBy: {
      name: "Kannan ",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedTo: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    reportedBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo, doloremque delectus sint atque consequatur consectetur? Tenetur modi ea non iste ipsum temporibus magnam, mollitia expedita minima porro rem, inventore tempora illo odio dicta?",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Kannan",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "20 Jan,2025",
      },
    ],
  },
  {
    id: 4,
    priority: "Low",
    ticket: "TK000003",
    project: "Project B",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "Assigned",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    createdBy: {
      name: "Kannan ",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedTo: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    reportedBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo, doloremque delectus sint atque consequatur consectetur? Tenetur modi ea non iste ipsum temporibus magnam, mollitia expedita minima porro rem, inventore tempora illo odio dicta?",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Kannan",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "20 Jan,2025",
      },
    ],
  },
  {
    id: 3,
    priority: "Medium",
    ticket: "TK000004",
    project: "Project c",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "Created",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    createdBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    reportedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    completedBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    retestTo: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },

    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Syed",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "20 Jan,2025",
      },
    ],
  },
  {
    id: 5,
    priority: "Medium",
    ticket: "TK000005",
    project: "Project A",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "Done",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    createdBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedTo: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    reportedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    completedBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    retestTo: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    retestBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },

    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Syed",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "20 Jan,2025",
      },
    ],
  },
  {
    id: 6,
    priority: "Medium",
    ticket: "TK000006",
    project: "Project D",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "ForRetest",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    createdBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    assignedTo: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    reportedBy: {
      name: "Kannan",
      date: "20 Jan,2025",
      image: userImage,
    },
    completedBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    retestTo: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },
    retestBy: {
      name: "Syed",
      date: "20 Jan,2025",
      image: userImage,
    },


    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Syed",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "20 Jan,2025",
      },
    ],
  },
];
