interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const user: User = [
  {
    id: 1,
    firstName: "Mike",
    lastName: "Olowo",
  },
  {
    id: 2,
    firstName: "Kunle",
    lastName: "Olaolu",
  },
  {
    id: 3,
    firstName: "Segun",
    lastName: "Adisa",
  },
  {
    id: 4,
    firstName: "Akande",
    lastName: "Tunji",
  },
  {
    id: 5,
    firstName: "Ponle",
    lastName: "Alex",
  },
];

// module.exports = user;

export default user;
