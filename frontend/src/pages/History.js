import React from "react";
import { connect } from 'react-redux';
import { ScrollView, View } from "react-native";
import { Container, ScrollableTab, Tabs, Tab, Text, Header, Left, Body, Right, Button, Icon, Segment,Title, Content, List, ListItem} from 'native-base';
import { Images, Colors  } from "../Themes";
import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import TabThree from "./tabThree";
import TabFour from "./tabFour";
// Styles
import styles from "./Styles/HistoryStyles";

//reducers
import { launchLogin, onRegister} from '../redux/actions/auth';
import { tochatlist,tomain, cleandata, tohistory} from '../redux/actions/core';

class Launch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        seg: 1
      };
    }

    backToMain (e) {
        console.log('gonna go back to main');
        this.props.goBackToMain();
        e.preventDefault();
    }

    toHistory (e) {
        console.log('to history!!')
        this.props.cleanData();
        this.props.toHistoryPage(this.props.token);
        e.preventDefault();
    }

    render() {
        return (
            <Container style={styles.container} >
              <Header hasTabs>
                <Left>
                  <Button transparent onPress={(e) => this.backToMain(e)}>
                    <Icon name="arrow-back" />
                  </Button>
                </Left>
                <Body>
                  <Segment>
                    <Button
                      first
                      active={this.state.seg === 1 ? true : false}
                      onPress={() => this.setState({ seg: 1 })}
                    >
                      <Text style={styles.text}>Driver</Text>
                    </Button>
                    <Button
                      second
                      active={this.state.seg === 2 ? true : false}
                      onPress={() => this.setState({ seg: 2 })}
                    >
                      <Text style={styles.text}>Rider</Text>
                    </Button>
                  </Segment>
                </Body>
                <Right>
                  <Button transparent onPress={(e) => this.toHistory(e)}>
                    <Icon name="refresh" />
                  </Button>
                </Right>
              </Header>

             
                {this.state.seg === 1 &&
                  <Tabs>
                    <Tab heading="Unprocessed">
                      <TabOne />
                    </Tab>
                    <Tab heading="All">
                      <TabTwo />
                    </Tab>
                  </Tabs>}
                {this.state.seg === 2 &&
                  <Tabs>
                    <Tab heading="Unprocessed">
                      <TabThree />
                    </Tab>
                    <Tab heading="All">
                      <TabFour />
                    </Tab>
                  </Tabs>}

            </Container>
        );

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.authentication_token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goBackToMain: () => {dispatch(tomain())},
        toHistoryPage: (token) => {dispatch(tohistory(token))},
        cleanData: () => {dispatch(cleandata())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Launch);