/**
 * List Tabs Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { connect } from 'react-redux';

// The component we're mapping to
import ListTabsRender from './ListView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  conversations: state.chat.conversations || [],
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTabsRender);
