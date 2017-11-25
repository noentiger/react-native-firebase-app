/**
 * Chat Screen
 *  - Shows a conversation between users
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import moment from 'moment';
import { GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';

// Components
import { Text } from '@ui/';
import Loading from '@components/general/Loading';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/* Component ==================================================================== */
class ListTabs extends Component {
  static componentName = 'ChatView';

  static propTypes = {
    conversation: PropTypes.shape({
      messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    conversation: {
      messages: [],
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: props.conversation.messages,
    };
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render = () => {
    if (this.state.loading) return <Loading />;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default ListTabs;
