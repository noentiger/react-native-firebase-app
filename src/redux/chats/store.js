/**
 * Chat Default Store
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
export default {
  conversations: [
    {
      name: 'Jim Collins',
      lastMessage: 'What do you think about..',
      updatedAt: 'Fri, 24 Nov 2017 22:22:23 +0000',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/arashmil/128.jpg',
    },
    {
      name: 'Sarah Franklin',
      lastMessage: 'Yepp',
      updatedAt: 'Fri, 24 Nov 2017 21:12:23 +0000',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
    },
  ],
  conversation: {
    messages: [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
        },
      },
    ],
  },
};
