import React, { Component } from "react";
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { tomain, gethistorychat, sendmessage, tochatlist, cleandata, getmessage} from '../redux/actions/core';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Subtitle
} from "native-base";


class Chat extends Component {

  componentWillMount() {
    console.log(this.props.chatterID, this.props.chatterFirstName, this.props.chatterLastName, this.props.userID, this.props.userFirstName, this.props.userLastName);
    this.props.gethistorychat(this.props.token, this.props.chatterID);
  }

  componentDidMount() {
    this.round = setInterval(()=> {this.props.getmessage(this.props.token, this.props.chatterID)}, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.round);
  }

  toChatList (e) {
      console.log('to chat list!!')
      this.props.cleanData();
      this.props.toChatList(this.props.token);
      e.preventDefault();
  }


  onSend(message = []) {
      console.log('send a message');
      this.props.sendmessage(this.props.token, this.props.chatterID, message);
  }

  render() {
    return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={(e) => this.toChatList(e)}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>{this.props.chatterFirstName} {this.props.chatterLastName}</Title>
            </Body>
            <Right>

            </Right>
          </Header>

           <GiftedChat
            messages={this.props.chathistory}
            onSend={(message) => this.onSend(message)}
            user={{
              _id: this.props.userID,
              name: `${this.props.userFirstName} ${this.props.userLastName}`,
            }}
          />
        </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.authentication_token,
        userID : state.core.userID,
        userFirstName : state.core.userFirstName,
        userLastName : state.core.userLastName,
        chatterID : state.core.chatterID,
        chatterFirstName : state.core.chatterFirstName,
        chatterLastName : state.core.chatterLastName,
        chathistory: state.core.chathistory,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        detail: (item) => {dispatch(showDetailInfo(item))},
        goBackToMain: () => {dispatch(tomain()); },
        toChatList: (token) => {dispatch(tochatlist(token))},
        cleanData: () => {dispatch(cleandata())},
        getmessage: (token, chatterID) => {dispatch(getmessage(token, chatterID));},
        gethistorychat: (token, chatterID) => {dispatch(gethistorychat(token, chatterID));},
        sendmessage: (token, chatterID, message) => {dispatch(sendmessage(token, chatterID, message));},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);