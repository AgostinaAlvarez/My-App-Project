/*
User data 

id
username
name
lastname
avatar (string)
email
password (Encriptada)
description


Messages data

id
text
senderId
time

Y lo que necesito para iniciar sesion es el nomnbre de usuario y la password.
A su vez quiero saber como hago para utilizar el "inciar sesion o registrarse con google"

*/

export const friends_data = [
  {
    username: "juanperez",
    name: "Juan",
    last_name: "Perez",
    avatar: "https://placeimg.com/100/100/people",
    last_message: {
      id: "4",
      text: "¡Claro! Hablamos luego.",
      sender: "me",
      time: "10:33",
    },
    messages: [
      {
        id: "4",
        text: "¡Claro! Hablamos luego.",
        sender: "me",
        time: "10:33",
      },
      {
        id: "3",
        text: "Estoy bien, gracias. ¿Nos vemos más tarde?",
        sender: "other",
        time: "10:32",
      },
      {
        id: "2",
        text: "¡Hola! Todo bien, ¿y tú?",
        sender: "me",
        time: "10:31",
      },
      {
        id: "1",
        text: "¡Hola! ¿Cómo estás?",
        sender: "other",
        time: "10:30",
      },
    ],
  },
  {
    username: "maria.lopez",
    name: "Maria",
    last_name: "Lopez",
    avatar: "https://placeimg.com/100/100/people",
    last_message: {
      id: "2",
      text: "¡Hola! Todo bien, ¿y túu?",
      sender: "other",
      time: "10:31",
    },
    messages: [
      {
        id: "2",
        text: "¡Hola! Todo bien, ¿y túu?",
        sender: "other",
        time: "10:31",
      },
      {
        id: "1",
        text: "Hola Maria, como estás?",
        sender: "me",
        time: "10:30",
      },
    ],
  },
  {
    username: "carlossanchez",
    name: "Carlos",
    last_name: "Sanchez",
    avatar: "https://placeimg.com/100/100/people",
    last_message: null,
    messages: [],
  },
  {
    username: "anagomez",
    name: "Ana",
    last_name: "Gomez",
    avatar: "https://placeimg.com/100/100/people",
    last_message: {
      id: "3",
      text: "Todo bien, ¿y tú?",
      sender: "other",
      time: "10:32",
    },
    messages: [
      {
        id: "3",
        text: "Todo bien, ¿y tú?",
        sender: "other",
        time: "10:32",
      },
      {
        id: "2",
        text: "¡Hola! ",
        sender: "other",
        time: "10:31",
      },
      {
        id: "1",
        text: "Hola Ana, como estás?",
        sender: "me",
        time: "10:30",
      },
    ],
  },
  {
    username: "luisramirez123",
    name: "Luis",
    last_name: "Ramirez",
    avatar: "https://placeimg.com/100/100/people",
    last_message: {
      id: "1",
      text: "Hola Luis",
      sender: "me",
      time: "10:30",
    },
    messages: [
      {
        id: "1",
        text: "Hola Luis",
        sender: "me",
        time: "10:30",
      },
    ],
  },
];

export const users_data = [
  {
    username: "juanperez",
    name: "Juan",
    last_name: "Perez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "maria.lopez",
    name: "Maria",
    last_name: "Lopez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "carlossanchez",
    name: "Carlos",
    last_name: "Sanchez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "anagomez",
    name: "Ana",
    last_name: "Gomez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "luisramirez123",
    name: "Luis",
    last_name: "Ramirez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "paola_martinez",
    name: "Paola",
    last_name: "Martinez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "david-alvarez",
    name: "David",
    last_name: "Alvarez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "sofia_lopez98",
    name: "Sofia",
    last_name: "Lopez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "pedro123",
    name: "Pedro",
    last_name: "Diaz",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "jorge_santos",
    name: "Jorge",
    last_name: "Santos",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "lauramorales",
    name: "Laura",
    last_name: "Morales",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "felipefernandez",
    name: "Felipe",
    last_name: "Fernandez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "carlaramoss",
    name: "Carla",
    last_name: "Ramos",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "marco_hernandez",
    name: "Marco",
    last_name: "Hernandez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "elenamartin",
    name: "Elena",
    last_name: "Martin",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "sergioperez",
    name: "Sergio",
    last_name: "Perez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "carolinasanchez",
    name: "Carolina",
    last_name: "Sanchez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "esteban_moreno",
    name: "Esteban",
    last_name: "Moreno",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "rosagarcia1990",
    name: "Rosa",
    last_name: "Garcia",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "victor.romero",
    name: "Victor",
    last_name: "Romero",
    avatar: "https://placeimg.com/100/100/people",
  },
];

export const users = [
  {
    username: "juanperez",
    name: "Juan",
    last_name: "Perez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "maria.lopez",
    name: "Maria",
    last_name: "Lopez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "carlossanchez",
    name: "Carlos",
    last_name: "Sanchez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "anagomez",
    name: "Ana",
    last_name: "Gomez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "luisramirez123",
    name: "Luis",
    last_name: "Ramirez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "paola_martinez",
    name: "Paola",
    last_name: "Martinez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "david-alvarez",
    name: "David",
    last_name: "Alvarez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "sofia_lopez98",
    name: "Sofia",
    last_name: "Lopez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "pedro123",
    name: "Pedro",
    last_name: "Diaz",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "jorge_santos",
    name: "Jorge",
    last_name: "Santos",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "lauramorales",
    name: "Laura",
    last_name: "Morales",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "felipefernandez",
    name: "Felipe",
    last_name: "Fernandez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "carlaramoss",
    name: "Carla",
    last_name: "Ramos",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "marco_hernandez",
    name: "Marco",
    last_name: "Hernandez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "elenamartin",
    name: "Elena",
    last_name: "Martin",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "sergioperez",
    name: "Sergio",
    last_name: "Perez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "carolinasanchez",
    name: "Carolina",
    last_name: "Sanchez",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "esteban_moreno",
    name: "Esteban",
    last_name: "Moreno",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "rosagarcia1990",
    name: "Rosa",
    last_name: "Garcia",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    username: "victor.romero",
    name: "Victor",
    last_name: "Romero",
    avatar: "https://placeimg.com/100/100/people",
  },
];
