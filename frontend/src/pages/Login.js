import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, TouchableOpacity, Image, Keyboard, LayoutAnimation } from 'react-native';
import { loginUser, cleanError, onRegister, logout } from '../redux/actions/auth';

import { Button, Text as NBText, Contant, Form, Item, Input, Label } from "native-base";
import { Images, Metrics } from "../Themes";
import Alert from './AlertModal';
import Styles from "./Styles/LoginScreenStyles";

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: 'uwzhuboyuan@gmail.com',
            password: '123',
        };   
        this.alert = false;
    }

    userLogin (e) {
        console.log('Pressed!!')
        this.props.onLogin(this.state.email, this.state.password);
        e.preventDefault();
    }
    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }

    userRegister (e) {
        console.log('try to Register')
        this.props.onRegister();
        e.preventDefault();
    }

    componentDidUpdate (prevProps) {
      if (this.props.sysAlert != '' && this.props.errorFlag) {
        alert(this.props.sysAlert);
        //this.alert = true;
        this.props.cleanErrorStatus();
      }
    }

    componentWillMount() {
		// Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
		// TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
		this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
    }
    componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
    }
    keyboardDidShow = e => {
		// Animation types easeInEaseOut/linear/spring
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		let newSize = Metrics.screenHeight - e.endCoordinates.height;
		this.setState({
			visibleHeight: newSize,
			topLogo: { width: 100, height: 70 },
        });
    };
    keyboardDidHide = e => {
		// Animation types easeInEaseOut/linear/spring
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({
			visibleHeight: Metrics.screenHeight,
			topLogo: { width: Metrics.screenWidth - 40 },
		});
    };
    
    handleChangeUsername = text => {
		this.setState({ email: text });
    };
    handleChangePassword = text => {
		this.setState({ password: text });
	};

    render() {
        // TODO add alert modal. Debug AlertModal.js
        return (
            <ScrollView
                contentContainerStyle={{ justifyContent: "center" }}
                style={[Styles.container, { height: this.state.visibleHeight }]}
                keyboardShouldPersistTaps="always"
            >
                <Image source={Images.fastcar} style={[Styles.anotherLogo, this.state.topLogo]} />


                <View style={Styles.form}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input
                                value={this.state.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={this.handleChangeUsername}
                                underlineColorAndroid="transparent"
                                returnKeyType="next"
                                //onSubmitEditing={() => this.password.focus()}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input
                                value={this.state.password}
                                ref= {password=>this.password = password}
                                keyboardType="default"
                                returnKeyType="go"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                onChangeText={this.handleChangePassword}
                                underlineColorAndroid="transparent"
                                onSubmitEditing={(e) => this.userLogin(e)}
                            />
                        </Item>
                    </Form>
                    <View style={[Styles.loginRow]}>
                        <Button 
                            style={Styles.loginButton}
                            onPress={(e) => this.userLogin(e)}>
                            <NBText style={Styles.loginText}>Sign In</NBText>
                        </Button>
                        <Button 
                            style={Styles.loginButton}
                            onPress={(e) => this.userLogout(e)}>
                            
                            <NBText style={Styles.loginText}>Cancel</NBText>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        sysAlert: state.auth.sysAlert,
        errorFlag: state.auth.errorFlag
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => { dispatch(loginUser(email, password)); },
        cleanErrorStatus: () => {dispatch(cleanError()); },
        onLogout: () => { dispatch(logout()); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);