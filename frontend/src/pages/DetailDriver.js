import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image } from 'react-native';
import { tomain, goToChatPage, askForJoinIn, cleandata, tohistory, makedecide} from '../redux/actions/core';
import { Container, Header, Left, Text, Body, Text as NBText,Right, Button, Icon, Title, Content, List, ListItem} from 'native-base';
import Moment from 'moment';
import styles from "./Styles/LaunchScreenStyles";
import { Col, Row, Grid } from 'react-native-easy-grid';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel : ''
        };
    }

    toHistory (e) {
        console.log('to history!!')
        this.props.cleanData();
        this.props.toHistoryPage(this.props.token);
        e.preventDefault();
    }

    toChatPage (chatterID, firstName, lastName) {
        console.log('go to chat page');
        this.props.toChat(chatterID, firstName, lastName);
    }

    decide (dec, ride_id, application_id) {
        console.log('decide now');
        this.props.toDecide(this.props.token, dec, ride_id, application_id);
    }

    showTel(e){
        if (this.props.item.showNumber){
            this.setState({tel:this.props.item.driver.number});
        } else{
            this.setState({tel:'Driver does not want to show it'});
        }
    }


    componentWillMount(e){
        this.showTel(e);
    }

    render() {
        return (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={(e) => this.toHistory(e)}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>Details</Title>
              </Body>
              <Right>

              </Right>
            </Header>

            <Content>
                <List>
                    <ListItem>
                        <Text>Pick Up Location: {this.props.item.pickUpLoc.formattedAddress}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Pick Up Range: {this.props.item.pickUpLoc.range}KM</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Drop Off Location: {this.props.item.dropOffLoc.formattedAddress}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Drop Off Range: {this.props.item.dropOffLoc.range}KM</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Departure Time from: {Moment(this.props.item.departDate.from).format('lll')} to: {Moment(this.props.item.departDate.to).format('lll')} </Text>
                    </ListItem>
                    <ListItem>
                        <Text>Available Seats: {this.props.item.totalSeats-this.props.item.occupiedSeats}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Total Seats: {this.props.item.totalSeats}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Price: {this.props.item.price}</Text>
                    </ListItem>
                </List>
                <Text style = {{marginTop: 10, fontSize: 20, color: 'blue', fontWeight: 'bold', textAlign:'center', lineHeight: 50}}> The list of applicants</Text>
              <List
                dataArray={this.props.item.applications}
                renderRow={data =>
                  <ListItem avatar>
                    <Left>
                        <Button transparent onPress={() => this.toChatPage(data.userID._id, data.userID.firstName, data.userID.lastName)}>
                            <Icon name="chatbubbles"  />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{`Name: ${data.userID.firstName} ${data.userID.lastName}`}</Text>
                        <Text>{`Rate: ${data.userID.score}`}</Text>
                    </Body>
                    <Right>

                    {data.accepted === null &&
                        <View style={{flexDirection: 'row', padding: 6 , justifyContent: 'space-between'}}>
                            <Button onPress={() => this.decide(true, this.props.item._id, data._id)}>
                                <Text>Y</Text>
                            </Button>
                            <Button onPress={() => this.decide(false, this.props.item._id, data._id)}>
                                <Text>N</Text>
                            </Button>
                        </View>
                    }

                    {data.accepted === true &&
                        <View style={{flexDirection: 'row', padding: 6 , justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 13}}> Approved </Text>
                        </View>
                    }
                    {data.accepted === false &&
                        <View style={{flexDirection: 'row', padding: 6 , justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 13}}> Rejected </Text>
                        </View>
                    }

                    </Right>

                  </ListItem>}
              />
            </Content>
          </Container>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        item: state.core.item,
        token: state.auth.authentication_token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toHistoryPage: (token) => {dispatch(tohistory(token))},
        cleanData: () => {dispatch(cleandata())},
        toChat: (chatterID, firstName, lastName) => {dispatch(goToChatPage(chatterID, firstName, lastName)); },
        toDecide: (token, dec, ride_id, application_id) => {dispatch(makedecide(token, dec, ride_id, application_id)); },
        askJoin: (token, item) => {dispatch(askForJoinIn(token, item)); }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
