/**
 * List Tabs Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { connect } from 'react-redux';

// The component we're mapping to
import ChatTabsRender from './ChatView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  conversation: state.chat.conversation || {},
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatTabsRender);
