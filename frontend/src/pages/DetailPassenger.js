import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Linking } from 'react-native';
import { tomain, goToChatPage, askForJoinIn, cleandata, tohistory, makedecide, topay} from '../redux/actions/core';
import { Container, Header, Left, Text, Body,Right, Button, Icon, Title, Content, List, ListItem} from 'native-base';
import Moment from 'moment';
import styles from "./Styles/LaunchScreenStyles";


class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel : '',
            flag_success: false
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

    call (e) {
        const url = "telprompt:"+this.state.tel;
        console.log(url);
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + url);
          } else {
            return Linking.openURL(url);
          }
        }).catch(err => console.error('An error occurred', err));

    }

    pay (e) {
        const url = "http://"+this.props.item.driver.payment.paypal+'/'+this.props.item.price;
        console.log(url);
        // this.props.toPay(this.props.item.driver.payment.paypal);
        // e.preventDefault();
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + url);
          } else {
            return Linking.openURL(url);
          }
        }).catch(err => console.error('An error occurred', err));

    }

    decide (dec, ride_id, application_id) {
        console.log('decide now');
        this.props.toDecide(this.props.token, dec, ride_id, application_id);
    }

    showTelAndButton(e){
        if (this.props.item.showNumber){
            this.setState({tel:this.props.item.driver.number});
        } else{
            this.setState({tel:'Driver does not want to show it'});
        }

        for (var i=0;i<this.props.item.applications.length;i++)
        {
            if (this.props.item.applications[i].accepted === true){
                this.setState({flag_success : true});
            };
        }
    }


    componentWillMount(e){
        this.showTelAndButton(e);
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
                <Button transparent onPress={() => this.toChatPage(this.props.item.driver._id ,this.props.item.driver.firstName,this.props.item.driver.lastName)}>
                  <Icon name="chatbubbles"  />
                </Button>
              </Right>
            </Header>

            <Content>
                <List>
                    <ListItem>
                        <Text>Driver: {this.props.item.driver.firstName} {this.props.item.driver.lastName}</Text>
                    </ListItem>
                    <ListItem onPress={(e) => this.call(e)}>
                        <Text>Tel Number: {this.state.tel}</Text>
                    </ListItem>
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
                    

                    {this.state.flag_success === true &&
                        <Button 
                            style={{ marginTop: 10, alignItems:'center', justifyContent: "center" }} 
                            full
                            onPress={(e) => this.pay(e)}>
                            <Text style={{fontSize: 20}}>pay</Text>
                        </Button>
                    }


                <Text style = {{marginTop: 10, fontSize: 20, color: 'blue', fontWeight: 'bold', textAlign:'center', lineHeight: 50}}> Application History</Text>
              <List
                dataArray={this.props.item.applications}
                renderRow={data =>
                  <ListItem >
                    <Body>
                      <Text>{`Number of the needed seats: ${data.seatsReserved}`}</Text>
                    </Body>
                    <Right>

                    {data.accepted === null &&
                        <View style={{flexDirection: 'row', padding: 6 , justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 13}}> Pending </Text>
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
        toChat: (chatterID, firstName, lastName) => {dispatch(goToChatPage(chatterID, firstName, lastName)); },
        cleanData: () => {dispatch(cleandata())},
        toPay: (link) => {dispatch(topay(link));},
        toDecide: (token, dec, ride_id, application_id) => {dispatch(makedecide(token, dec, ride_id, application_id)); },
        askJoin: (token, item) => {dispatch(askForJoinIn(token, item)); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
