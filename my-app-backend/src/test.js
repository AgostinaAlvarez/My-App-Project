/*
Obtener todas las conversaciones:
[
  {
    "_id": "6734e672e5cca0ad2646c1da",
    "participants": [
      {
        "_id": "6734e2ba2477ec2c9e96a3e6",
        "username": "agosalvarez",
        "name": "agos",
        "lastname": "alvarez",
        "avatar": ""
      },
      {
        "_id": "6734e2d62477ec2c9e96a3ea",
        "username": "johndoe",
        "name": "john",
        "lastname": "doe",
        "avatar": ""
      }
    ],
    "messages": [
      {
        "_id": "6734e672e5cca0ad2646c1d7",
        "sender": {
          "_id": "6734e2ba2477ec2c9e96a3e6",
          "username": "agosalvarez",
          "name": "agos",
          "lastname": "alvarez",
          "avatar": ""
        },
        "receiver": "6734e2d62477ec2c9e96a3ea",
        "content": "hola john",
        "isRead": false,
        "createdAt": "2024-11-13T17:48:34.907Z",
        "__v": 0
      },
      {
        "_id": "6734e689e5cca0ad2646c1e3",
        "sender": {
          "_id": "6734e2ba2477ec2c9e96a3e6",
          "username": "agosalvarez",
          "name": "agos",
          "lastname": "alvarez",
          "avatar": ""
        },
        "receiver": "6734e2d62477ec2c9e96a3ea",
        "content": "como estas?",
        "isRead": false,
        "createdAt": "2024-11-13T17:48:57.174Z",
        "__v": 0
      }
    ],
    "lastMessage": {
      "_id": "6734e689e5cca0ad2646c1e3",
      "sender": "6734e2ba2477ec2c9e96a3e6",
      "receiver": "6734e2d62477ec2c9e96a3ea",
      "content": "como estas?",
      "isRead": false,
      "createdAt": "2024-11-13T17:48:57.174Z",
      "__v": 0
    },
    "conversation_type": "request",
    "updatedAt": "2024-11-13T17:48:57.177Z",
    "createdAt": "2024-11-13T17:48:34.913Z",
    "__v": 1
  }
]

Respuesta de un mensaje en una conversacion nueva
{
  "newMessage": {
    "sender": "6734e2ba2477ec2c9e96a3e6",
    "receiver": "6734e2d62477ec2c9e96a3ea",
    "content": "hola john",
    "isRead": false,
    "_id": "6734e672e5cca0ad2646c1d7",
    "createdAt": "2024-11-13T17:48:34.907Z",
    "__v": 0
  },
  "conversationCreated": true,
  "conversation": {
    "_id": "6734e672e5cca0ad2646c1da",
    "participants": [
      {
        "_id": "6734e2ba2477ec2c9e96a3e6",
        "username": "agosalvarez",
        "name": "agos",
        "lastname": "alvarez",
        "avatar": ""
      },
      {
        "_id": "6734e2d62477ec2c9e96a3ea",
        "username": "johndoe",
        "name": "john",
        "lastname": "doe",
        "avatar": ""
      }
    ],
    "messages": [
      {
        "_id": "6734e672e5cca0ad2646c1d7",
        "sender": {
          "_id": "6734e2ba2477ec2c9e96a3e6",
          "username": "agosalvarez",
          "name": "agos",
          "lastname": "alvarez",
          "avatar": ""
        },
        "receiver": "6734e2d62477ec2c9e96a3ea",
        "content": "hola john",
        "isRead": false,
        "createdAt": "2024-11-13T17:48:34.907Z",
        "__v": 0
      }
    ],
    "lastMessage": {
      "_id": "6734e672e5cca0ad2646c1d7",
      "sender": "6734e2ba2477ec2c9e96a3e6",
      "receiver": "6734e2d62477ec2c9e96a3ea",
      "content": "hola john",
      "isRead": false,
      "createdAt": "2024-11-13T17:48:34.907Z",
      "__v": 0
    },
    "conversation_type": "request",
    "updatedAt": "2024-11-13T17:48:34.913Z",
    "createdAt": "2024-11-13T17:48:34.913Z",
    "__v": 0
  }
}


Respuesta a una conversacion ya existente:

{
  "newMessage": {
    "sender": "6734e2ba2477ec2c9e96a3e6",
    "receiver": "6734e2d62477ec2c9e96a3ea",
    "content": "como estas?",
    "isRead": false,
    "_id": "6734e689e5cca0ad2646c1e3",
    "createdAt": "2024-11-13T17:48:57.174Z",
    "__v": 0
  },
  "conversationCreated": false,
  "conversation": {
    "_id": "6734e672e5cca0ad2646c1da"
  }
}


*/
