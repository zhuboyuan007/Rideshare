import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Text } from 'react-native';
import { gobacktoresult, goToChatPage, askForJoinIn} from '../redux/actions/core';
import { Container, Header, Left, Body, Text as NBText,Right, Button, Icon, Title, Content, List, ListItem} from 'native-base';
import Moment from 'moment';
import Styles from "./Styles/LoginScreenStyles";


class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel : ''
        };
    }

    backToResult (e) {
        console.log('gonna go back')
        console.log(this.props.item)
        this.props.goBack();
        e.preventDefault();
    }

    toChatPage (chatterID, firstName, lastName) {
        console.log('go to chat page');
        this.props.toChat(chatterID, firstName, lastName);
    }

    showTel(e){
        if (this.props.item.showNumber){
            this.setState({tel:this.props.item.driver.number});
        } else{
            this.setState({tel:'Driver does not want to show it'});
        }
    }

    askForJoin(e){
        this.props.askJoin(this.props.token, this.props.item);
        e.preventDefault();
    }

    componentWillMount(e){
        this.showTel(e);
    }

    render() {
        return (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={(e) => this.backToResult(e)}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>Details</Title>
              </Body>
              <Right>
                <Button transparent active={this.state.tab3} onPress={() => this.toChatPage(this.props.item.driver._id, this.props.item.driver.firstName, this.props.item.driver.lastName)}>
                  <Icon active={this.state.tab3} name="chatbubbles"  />
                  <Text>Chat</Text>
                </Button>
              </Right>
            </Header>

            <Content>
                <List>
                    <ListItem >
                        <Text>Driver: {this.props.item.driver.firstName} {this.props.item.driver.lastName}</Text>
                    </ListItem>
                    <ListItem>
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
                        <Text>Available Seats: {this.props.item.totalSeats}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Price: {this.props.item.price}</Text>
                    </ListItem>
                </List>


                <Button 
                    style={{ marginTop: 10, flex: 1, justifyContent: "center" }} 
                    full
                    onPress={(e) => this.askForJoin(e)}>
                    <NBText style={Styles.loginText}>apply to join in</NBText>
                </Button>

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
        goBack: () => {dispatch(gobacktoresult()); },
        toChat: (chatterID, firstName, lastName) => {dispatch(goToChatPage(chatterID, firstName, lastName)); },
        askJoin: (token, item) => {dispatch(askForJoinIn(token, item)); }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
