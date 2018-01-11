import React, { Component } from "react";
import { connect } from 'react-redux';
import { ScrollView, View,FlatList, Image, Linking } from "react-native";
import { Container, ScrollableTab, Tabs, Tab, Text, Header, Left, Body, Right, Button, Icon, Segment,Title, Content, ListItem as LI, List as L} from 'native-base';
import { Images, Colors  } from "../Themes";
// Styles
import styles from "./Styles/ResultStyles";

//reducers
import { tomain, showDetailInfo} from '../redux/actions/core';

class Launch extends Component {
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

    showDetail(item){
        console.log(item);
        this.props.detail(item);
    }

    jump (data) {
        console.log(data);
        // this.props.toPay(this.props.item.driver.payment.paypal);
        // e.preventDefault();
        Linking.canOpenURL(data).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + data);
          } else {
            return Linking.openURL(data);
          }
        }).catch(err => console.error('An error occurred', err));

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
                      <Text style={styles.text}>This App</Text>
                    </Button>
                    <Button
                      second
                      active={this.state.seg === 2 ? true : false}
                      onPress={() => this.setState({ seg: 2 })}
                    >
                      <Text style={styles.text}>Outside</Text>
                    </Button>
                  </Segment>
                </Body>
                <Right>
                </Right>
              </Header>


                <Content padder>
                  {this.state.seg === 1 &&
                    <Content>
                       <Content padder>
                        <L
                          dataArray={this.props.data_array}
                          renderRow={data =>
                            <LI avatar onPress={ () => this.showDetail(data) }>
                              <Left>

                              </Left>
                              <Body>
                                <Text>{`Driver: ${data.driver.firstName} ${data.driver.lastName}`}</Text>
                                <Text note>{`price:${data.price}      seats available:${data.totalSeats-data.occupiedSeats}`}</Text>
                              </Body>
                              <Right>
                                <Text note>{`Rate:${data.driver.score}`}</Text>
                              </Right>
                            </LI>}
                        />
                      </Content>
                    </Content>
                  }
                  {this.state.seg === 2 &&
                    <Content>
                       <Content padder>
                        <L
                          dataArray={this.props.external_data_array}
                          renderRow={data =>
                            <LI avatar onPress={() => this.jump(data)}>
                              <Left>

                              </Left>
                              <Body>
                                <Text>{`${data}`}</Text>
                              </Body>
                              <Right>
                              </Right>
                            </LI>}
                        />
                      </Content>
                    </Content>
                  }
                </Content>


            </Container>
        );

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data_array : state.core.data,
        external_data_array : state.core.external_data,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goBackToMain: () => {dispatch(tomain())},
        detail: (item) => {dispatch(showDetailInfo(item))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Launch);