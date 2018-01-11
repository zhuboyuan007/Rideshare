import React from "react";
import { connect } from 'react-redux';
import { ScrollView, Text, Image, View } from "react-native";
import { Icon, Button, Text as NBText } from "native-base";
import { Images, Colors  } from "../Themes";

// Styles
import styles from "./Styles/LaunchScreenStyles";

//reducers
import { launchLogin, onRegister } from '../redux/actions/auth';

class Launch extends React.Component {

    gotoLogin (e){
        console.log('going to login page')
        this.props.launchLogin();
        e.preventDefault();
    }
    userRegister (e) {
        console.log('try to Register')
        this.props.onRegister();
        e.preventDefault();
    }


	render() {
		return (
            <ScrollView style={styles.container}>
                <View style={styles.centered}>
                    <Image source={Images.fastcar} style={styles.logo} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>
                        RideShare
                        
                    </Text>
                </View >
                <View style={styles.loginRow}>
                    <Button 
                        light
                        style={styles.loginButton} 
                        onPress={(e) => this.gotoLogin(e)}
                        >
                        <NBText style={styles.loginText}>Login</NBText>
                    </Button>
                    <Button 
                        light
                        style={styles.signUpButton} 
                        onPress={(e) => this.userRegister(e)}
                    >
                        <NBText style={styles.loginText} >Register</NBText>
                    </Button>
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
        onRegister: () => {dispatch(onRegister()); },
        launchLogin: () => {dispatch(launchLogin()); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Launch);