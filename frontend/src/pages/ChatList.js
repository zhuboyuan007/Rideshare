import React from "react";
import { connect } from 'react-redux';
import { ScrollView,Text, View } from "react-native";
import { Container, Header, Badge, Left, Body, Right, Button, Icon, Title, Content, List, ListItem} from 'native-base';
import Moment from 'moment';
import { Images, Colors  } from "../Themes";

// Styles
import styles from "./Styles/LaunchScreenStyles";

//reducers
import { tomain, goToChatPage, getchatdetail } from '../redux/actions/core';

class Launch extends React.Component {
    backToMain (e) {
        console.log('gonna go back to main')
        this.props.goBackToMain();
        e.preventDefault();
    }

    toChatPage (chatterID, firstName, lastName) {
        console.log('go to chat page');
        this.props.toChat(chatterID, firstName, lastName);
    }

    componentDidMount() {
        this.round = setInterval(()=> {this.props.getChatDetail(this.props.token)}, 2500);
    }

    componentWillUnmount () {
        clearInterval(this.round);
    }
    
  	render() {
        return (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={(e) => this.backToMain(e)}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>ChatList</Title>
              </Body>
              <Right>
              </Right>
            </Header>

             <Content padder>
              <List
                dataArray={this.props.data_array}
                renderRow={data =>
                  <ListItem avatar onPress={ () => this.toChatPage(data.user._id, data.user.firstName, data.user.lastName)}>
                    <Left>
                          <Badge ><Text style={{ color: 'white' }}> {data.unread}</Text></Badge>
                    </Left>
                    <Body>
                      <Text style={{fontSize:20, fontWeight: 'bold'}}>{`${data.user.firstName} ${data.user.lastName}`}</Text>
                      <Text style={{fontSize:14}}>{`Last message: ${data.messages.text}`}</Text>
                    </Body>
                    <Right>
                      <Text>{`${Moment(data.createdAt).format('lll')} `}</Text>
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
        token: state.auth.authentication_token,
        data_array: state.core.chatdata,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChatDetail: (token) => {dispatch(getchatdetail(token));},
        goBackToMain: () => {dispatch(tomain()); },
        toChat: (chatterID, firstName, lastName) => {dispatch(goToChatPage(chatterID, firstName, lastName)); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Launch);