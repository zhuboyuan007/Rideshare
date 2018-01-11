import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image, Keyboard, LayoutAnimation, KeyboardAvoidingView } from 'react-native';
import { logout} from '../redux/actions/auth';
import { register, cleanError} from '../redux/actions/register';

import { Button, Text as NBText, Contant, Form, Item, Input, Label } from "native-base";
import { Images, Metrics } from "../Themes";
import Styles from "./Styles/RegisterScreenStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            mobileNumber:'',
            PayPalLink:'PayPal.Me/'
        };
    }

    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }

    userRegister(e) {
        this.props.onRegister(this.state.email, this.state.password, this.state.firstName, this.state.lastName, this.state.mobileNumber, this.state.PayPalLink);
        e.preventDefault();
    }

    componentDidUpdate (prevProps) {
      if (this.props.sysAlert != '' && this.props.errorFlag) {
        alert(this.props.sysAlert);
        console.log('should clean');
        this.props.cleanErrorStatus();
        console.log(this.refs)
      }
    }

    render() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ justifyContent: "center" }}
                style={[Styles.container]}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollOffset = {50}
                scrollEnabled={true}
                keyboardShouldPersistTaps="never"
            >
            <View style={Styles.section}>
                <Text style={[Styles.title]}>
                    Sign Up  
                </Text>
            </View >
            <View style={Styles.form}>
                <Form>
                    <Item floatingLabel>
                        <Label>email</Label>
                        <Input
                            value={this.state.email}
                            blurOnSubmit={ false }
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ email: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            value={this.state.password}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            onChangeText={(text) => this.setState({ password: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>First Name</Label>
                        <Input
                            value={this.state.firstName}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            autoCapitalize="words"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ firstName: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Last Name</Label>
                        <Input
                            value={this.state.lastName}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            autoCapitalize="words"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ lastName: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Mobile Number</Label>
                        <Input
                            value={this.state.mobileNumber} 
                            blurOnSubmit={ true }
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ mobileNumber: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>PayPal Link</Label>
                        <Input
                            value={this.state.PayPalLink} 
                            blurOnSubmit={ false }
                            keyboardType="default"
                            autoCapitalize="words"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ PayPalLink: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                </Form>
                <View style={[Styles.loginRow]}>
                    <Button 
                        style={Styles.loginButton} 
                        onPress={(e) => this.userRegister(e)}>
                        <NBText style={Styles.loginText}>Register</NBText>
                    </Button>
                    <Button 
                        style={Styles.loginButton}
                        onPress={(e) => this.userLogout(e)}>
                        
                        <NBText style={Styles.loginText}>Cancel</NBText>
                    </Button>
                </View>
            </View>
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        sysAlert: state.register.sysAlert,
        errorFlag: state.register.errorFlag
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); },
        onRegister: (email, password, firstName, lastName, mobileNumber, PayPalLink) => { dispatch(register(email, password, firstName, lastName, mobileNumber, PayPalLink)); },
        cleanErrorStatus: () => {dispatch(cleanError()); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);