import React, { Component } from "react";
import { connect } from 'react-redux';
import { ScrollView,Text, View } from "react-native";
import { Container,Form, Label, Input, Item, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem} from 'native-base';


//reducers
import { toprofilepage, driverapply} from '../redux/actions/core';

class Driver extends Component {
    constructor (props) {
        super(props);
        this.state = {
            driversLicense: '',
            vehiclePlate: '',
        };
    }

    toProfile (e) {
        console.log('to profile page!')
        this.props.toProfilePage(this.props.token);
        e.preventDefault();
    }

    driverPermission(e){
        console.log('change password');
        if (!this.props.token || !this.state.driversLicense || !this.state.vehiclePlate){
          alert('please fill in all blanks');
        }
        else{
            this.props.applyDriver(this.props.token, this.state.driversLicense, this.state.vehiclePlate)
        };
    }

    render() {
        return (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={(e) => this.toProfile(e)}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>Driver Info</Title>
              </Body>
              <Right>
              </Right>
            </Header>

            <Content>
                <ScrollView>
                  <Form>
                    <Item floatingLabel>
                        <Label>Driver License</Label>
                        <Input
                            value={this.state.driversLicense}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ driversLicense: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Vehicle Plate</Label>
                        <Input
                            value={this.state.vehiclePlate}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ vehiclePlate: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>                  
                </Form>

                    <Button 
                        style={{ marginRight: 60, marginLeft: 60, marginTop: 20, flex: 1, justifyContent: "center" }} 
                        full
                        onPress={(e) => this.driverPermission(e)}>
                        <Text>Submit</Text>
                    </Button>

                </ScrollView>
            </Content>
          </Container>
        );

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.authentication_token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toProfilePage: (token) => { dispatch(toprofilepage(token)); },
        applyDriver: (token, driversLicense, vehiclePlate) => { dispatch(driverapply(token, driversLicense, vehiclePlate)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Driver);