/**
 * Chat Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Firebase, FirebaseRef } from '@constants/';

/**
  * Get Chats
  */
export function getChats() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Firebase.Promise((resolve) => {
    const ref = FirebaseRef.child('chats');

    return ref.on('value', (snapshot) => {
      const chats = snapshot.val() || {};

      return resolve(dispatch({
        type: 'CHATS_REPLACE',
        data: chats,
      }));
    });
  });
}
