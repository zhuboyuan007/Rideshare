import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View,Text, Keyboard} from 'react-native';
import { topost, getresult, cleandata, tochatlist, tohistory, toprofilepage, checkchat, toHelp, getuserinfo} from '../redux/actions/core';
import { logout } from '../redux/actions/auth';
import { Kaede } from 'react-native-textinput-effects';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import {Container,Header,Title,Content,Button,Footer,FooterTab,Text as NBText,Body,Left,Right,Icon,Badge,Form, Item, Input, Label } from "native-base";
import Styles from "./Styles/SecuredScreenStyles";


import Locator from "./Locator";


class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pick_up_location:'459 hazel street, waterloo, ON',
            drop_off_location:'27 King\'s College Circle Toronto, Ontario M5S 1A1 Canada',
            departDate:'',
            showFooter: true
        };
    }

    postRideshare (e) {
        console.log('Pressed!!')
        this.props.toPostPage();
        e.preventDefault();
    }

    searchRideshare (e) {
        console.log('Pressed!!')
        if (!this.state.departDate || !this.state.pick_up_location || !this.state.drop_off_location){
            alert("please input all the needed infomation to search");
        }
        else{
            this.props.cleanData();
            this.state.departDate = Moment(this.state.departDate).format();
            this.props.toResultPage(this.props.token, this.state.pick_up_location, this.state.drop_off_location,this.state.departDate);
        }
         e.preventDefault();
    }

    logoutAndBackToLoginPage(e){
        console.log('try to log out');
        this.props.logout();

    }

    toChatList (e) {
        console.log('to chat list!!')
        this.props.cleanData();
        this.props.toChatList(this.props.token);
        e.preventDefault();
    }

    toProfile (e) {
        console.log('to profile page!')
        this.props.toProfilePage(this.props.token);
        e.preventDefault();
    }

    toHistory (e) {
        console.log('to history!!')
        this.props.cleanData();
        this.props.toHistoryPage(this.props.token);
        e.preventDefault();
    }
    toHelp (e) {
        console.log('to help page!')
        this.props.toHelpPage(this.props.token);
        e.preventDefault();
    }


    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
        this.props.getuserinfo(this.props.token);
        this.props.checkchat(this.props.token);
    }

    componentDidMount() {
        this.round = setInterval(()=> {this.props.checkchat(this.props.token)}, 2500);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        clearInterval(this.round);
    }

    _keyboardDidShow () {
        this.setState({showFooter: false});
    }

    _keyboardDidHide () {
        this.setState({showFooter: true});
    }

    render() {
        return (
               <Container>
                    <Header>
                    <Left>
                        <Button transparent onPress={(e) => this.logoutAndBackToLoginPage(e)}>
                        <Icon name="log-out" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>RideShare</Title>
                    </Body>
                    <Right>

                    </Right>
                    </Header>

                    <View style={Styles.container}>
                        <Locator />

                    <View style={Styles.serachBox}>
                    <View 
                        keyboardShouldPersistTaps="never"
                        style={Styles.form}>
                        <Form>
                            <Item>
                                <Icon active name='ios-search' />
                                <Input placeholder="Pick up"
                                    value={this.state.pick_up_location} 
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(text) => this.setState({ pick_up_location: text })}
                                    underlineColorAndroid="transparent"
                                />
                            </Item>
                            <Item last>
                                <Icon active name='ios-search' />
                                <Input placeholder="Drop off"
                                    value={this.state.drop_off_location} 
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(text) => this.setState({ drop_off_location: text })}
                                    underlineColorAndroid="transparent"
                                />
                            </Item>
                        </Form>
                        <DatePicker
                            style={{width: 320, marginTop: 4}}
                            date={this.state.departDate}

                            mode="datetime"
                            placeholder="Departure time"
                            format='YYYY-MM-DD HH:mm'
                            minDate="2017-11-01"
                            maxDate="2018-11-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                  },
                                  dateInput: {
                                    marginLeft: 36
                                  }
                                }}
                            onDateChange={(date) => {this.setState({departDate: date})}}
                          />
                        <View style={[Styles.loginRow]}>
                            <Button 
                                style={Styles.loginButton} 
                                onPress={(e) => this.searchRideshare(e)}>
                                <NBText style={Styles.loginText}>Search</NBText>
                            </Button>
                            <Button 
                                style={Styles.loginButton} 
                                onPress={(e) => this.postRideshare(e)}>
                                <NBText style={Styles.loginText}>Post</NBText>
                            </Button>
                        </View>
                    </View>
                    </View>
                    </View>
               
                {this.state.showFooter &&
                    <Footer >   
                      <FooterTab>
                        <Button onPress={(e) => this.toHistory(e)}>
                          <Icon name="paper"/>
                          <NBText>History</NBText>
                        </Button>
                        <Button onPress={(e) => this.toProfile(e)}>
                          <Icon name="person"/>
                          <NBText>Profile</NBText>
                        </Button>
                        <Button  badge vertical onPress={(e) => this.toChatList(e)}>
                          <Badge ><Text style={{ color: 'white' }}> {this.props.chatbubble}</Text></Badge>
                          <Icon  name="chatbubbles"/>
                          <NBText>Chat</NBText>
                        </Button>
                        <Button onPress={(e) => this.toHelp(e)}>
                          <Icon  name="help-circle"/>
                          <NBText>Help</NBText>
                        </Button>
                      </FooterTab>
                    </Footer>
                }
              </Container>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.authentication_token,
        chatbubble: state.core.chatbubble,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toPostPage: () => { dispatch(topost()); },
        toProfilePage: (token) => { dispatch(toprofilepage(token)); },
        cleanData: () => {dispatch(cleandata())},
        checkchat: (token) => {dispatch(checkchat(token));},
        logout: () => {dispatch(logout())},
        toChatList: (token) => {dispatch(tochatlist(token))},
        toHistoryPage: (token) => {dispatch(tohistory(token))},
        toHelpPage: (token) => {dispatch(toHelp(token))},
        getuserinfo: (token) => {dispatch(getuserinfo(token))},
        toResultPage: (token, pick_up_location,drop_off_location,departDate) => { dispatch(getresult(token, pick_up_location,drop_off_location,departDate)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);