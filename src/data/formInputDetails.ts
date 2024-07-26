export const inputDetails = [
  {
    subTitle: "Personal Information",
    data: [
      {
        name: "firstName",
        title: "First Name",
      },
      {
        name: "middleName",
        required: false,
        title: "Middle Name",
      },
      {
        name: "lastName",
        title: "Last Name",
      },
      {
        name: "age",
        type: "number",
        title: "Age",
      },
    ],
  },
  {
    subTitle: "Contact Details",
    data: [
      {
        name: "phone",
        type: "tel",
        title: "Phone Number",
      },
      {
        name: "email",
        title: "Email Id",
      },
    ],
  },
  {
    subTitle: "Educational History",
    data: [
      {
        name: "institution",
        title: "Institution/University",
      },
      {
        name: "degree",
        title: "Degree",
      },
      {
        name: "score",
        type: "number",
        title: "Score",
      },
      {
        name: "startDate",
        type: "date",
        title: "Start Date",
      },
    ],
  },
];

export const jobInputFields = [
  {
    name: "yearsOfExperience",
    type: "number",
    title: "Years Of Experience",
  },
];
