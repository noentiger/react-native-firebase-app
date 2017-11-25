/**
 * List Tabs Screen
 *  - Shows tabs, which contain receipe listings
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  View,
  ListView,
  ScrollView,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';

// Components
import { Text } from '@ui/';
import {
  List,
  ListItem,
} from '@components/ui/';
import Loading from '@components/general/Loading';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  // Tab Styles
  tabContainer: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: AppColors.brand.primary,
  },
  tabbarIndicator: {
    backgroundColor: '#FFF',
  },
  tabbarText: {
    color: '#FFF',
  },
});

/* Component ==================================================================== */
let loadingTimeout;
class ListTabs extends Component {
  static componentName = 'ChatTabs';

  static propTypes = {
    conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static defaultProps = {
    conversations: [],
  }

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      loading: true,
      visitedRoutes: [],
      conversations: dataSource.cloneWithRows(props.conversations),
    };
  }

  /**
    * Wait until any interactions are finished, before setting up tabs
    */
  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setTabs();
    });
  }

  componentWillUnmount = () => clearTimeout(loadingTimeout);

  /**
    * When meals are ready, populate tabs
    */
  setTabs = () => {
    this.setState({
      navigation: {
        index: 0,
        routes: [
          {
            key: '0',
            title: 'Messages',
          },
          {
            key: '1',
            title: 'Groups',
          },
        ],
      },
    }, () => {
      // Hack to prevent error showing
      loadingTimeout = setTimeout(() => {
        this.setState({ loading: false });
      }, 100);
    });
  }

  /**
    * On Change Tab
    */
  handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  }

  /**
    * Header Component
    */
  renderHeader = props => (
    <TabBar
      {...props}
      style={styles.tabbar}
      indicatorStyle={styles.tabbarIndicator}
      renderLabel={scene => (
        <Text style={[styles.tabbarText]}>{scene.route.title}</Text>
      )}
    />
  )

  renderRow = (data, sectionID) => (
    <ListItem
      containerStyle={
        { paddingTop: 15, paddingBottom: 15, borderTopWidth: 0, borderBottomWidth: 0 }
      }
      key={`list-row-${sectionID}`}
      onPress={Actions.chat}
      title={data.name}
      subtitle={data.lastMessage || null}
      avatar={data.avatar ? { uri: data.avatar } : null}
      roundAvatar
      hideChevron
      rightTitle={moment(data.updatedAt).fromNow()}
      rightTitleStyle={{ fontSize: 12, color: AppColors.textSecondary }}
      subtitleStyle={{ color: AppColors.textSecondary, fontWeight: '400' }}
      titleStyle={{ color: AppColors.textPrimary }}
    />
  )

  /**
    * Which component to show
    */
  renderScene = ({ route }) => {
    // For performance, only render if it's this route, or I've visited before
    if (
      parseInt(route.key, 0) !== parseInt(this.state.navigation.index, 0) &&
      this.state.visitedRoutes.indexOf(route.key) < 0
    ) {
      return null;
    }

    // And Add this index to visited routes
    if (this.state.visitedRoutes.indexOf(this.state.navigation.index) < 0) {
      this.state.visitedRoutes.push(route.key);
    }

    // Which component should be loaded?
    return (
      <View style={styles.tabContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={[AppStyles.container]}
        >
          <List
            containerStyle={{ marginTop: 0 }}
          >
            <ListView
              renderRow={this.renderRow}
              dataSource={this.state.conversations}
            />
          </List>
        </ScrollView>
      </View>
    );
  }

  render = () => {
    if (this.state.loading || !this.state.navigation) return <Loading />;

    return (
      <TabViewAnimated
        style={[styles.tabContainer]}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        navigationState={this.state.navigation}
        onRequestChangeTab={this.handleChangeTab}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default ListTabs;
