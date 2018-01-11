import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import { Button, Text as NBText, Contant, Form, Item, Input, Label } from "native-base";
import { goBack,verify, cleanError } from '../redux/actions/register';
import { Hoshi } from 'react-native-textinput-effects';
import { logout} from '../redux/actions/auth';

import Styles from './Styles/VerifyScreenStyles';

class Secured extends Component {
    constructor (props) {
        super(props);
        this.state = {
            code: ''
        };
    }

    userGoBack(e) {
        this.props.GoBack();
        e.preventDefault();
    }

    verify(e) {
        this.props.Verify(this.state.code ,this.props.email); 
        e.preventDefault();
    }
    

    componentDidUpdate (prevProps) {
      if (this.props.sysAlert != '' && this.props.errorFlag) {
        alert(this.props.sysAlert);
        console.log('should clean');
        this.props.cleanErrorStatus();
      };
    };


    render() {
        return (
            <ScrollView style={[Styles.container]}>
                <View style={Styles.section}>
                    <Text style={[Styles.title]}>
                        Verification
                    </Text>
                </View >
                <View style={Styles.form}>
                    <View style={Styles.textRow}>
                    <Text style={Styles.paraText}>
                    We've sent a verification code to your email address.
                    Please check your inbox and enter the code below.
                    </Text>
                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label>Code</Label>
                            <Input
                                value={this.state.email}
                                blurOnSubmit={ false }
                                keyboardType='numeric'
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => this.setState({ code: text })}
                                underlineColorAndroid="transparent"
                            />
                        </Item>
                    </Form>
                    <View style={[Styles.loginRow]}>
                        <Button 
                            style={Styles.loginButton} 
                            onPress={(e) => this.verify(e)}>
                            <NBText style={Styles.loginText}>Verify</NBText>
                        </Button>
                        <Button 
                            style={Styles.loginButton} 
                            onPress={(e) => this.userGoBack(e)}>
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
        flag: state.register.navi_register,
        email: state.register.email,
        sysAlert: state.register.sysAlert,
        errorFlag: state.register.errorFlag
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        Verify: (code, email) => { dispatch(verify(code ,email)); },
        onLogout: () => { dispatch(logout()); },
        GoBack: () => { dispatch(goBack()); },
        cleanErrorStatus: () => {dispatch(cleanError()); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Secured);