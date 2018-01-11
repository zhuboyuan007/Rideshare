import React, { Component } from "react";
import { connect } from 'react-redux';
import { ScrollView,Text, View } from "react-native";
import { Container,Form, Label, Input, Item, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem} from 'native-base';


//reducers
import { toprofilepage, submitinfochange } from '../redux/actions/core';

class Modify extends Component {
    constructor (props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            mobileNumber:'',
            paypalLink:''
        };
    }

    toProfile (e) {
        console.log('to profile page!')
        this.props.toProfilePage(this.props.token);
        e.preventDefault();
    }

    changeInfo(e){
        console.log('submit changes');
        if (!this.props.token || !this.state.firstName || !this.state.lastName || !this.state.mobileNumber || !this.state.paypalLink){
          alert('please fill in all blanks')
        }
        else{
          this.props.changeInfo(this.props.token, this.state.firstName,this.state.lastName,this.state.mobileNumber,this.state.paypalLink);
        }

    }

    focusNextField(id) {
        this.inputs[id].focus();
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
                <Title>Modify Info</Title>
              </Body>
              <Right>
              </Right>
            </Header>

            <Content>
                <ScrollView>


                  <Form>
                    <Item floatingLabel>
                        <Label>First Name</Label>
                        <Input
                            value={this.state.firstName}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="words"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ firstName: text })}
                            underlineColorAndroid="transparent"
                            onSubmitEditing={() => {
                                this.focusNextField('four');
                              }}
                            ref={ input => {
                            this.inputs['three'] = input;
                            }}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Last Name</Label>
                        <Input
                            value={this.state.email}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="words"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ lastName: text })}
                            underlineColorAndroid="transparent"
                            onSubmitEditing={() => {
                                this.focusNextField('five');
                              }}
                            ref={ input => {
                            this.inputs['four'] = input;
                            }}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Mobile Number</Label>
                        <Input
                            value={this.state.mobileNumber}
                            blurOnSubmit={ false }
                            keyboardType="numeric"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ mobileNumber: text })}
                            underlineColorAndroid="transparent"
                            onSubmitEditing={() => {
                                this.focusNextField('six');
                              }}
                            ref={ input => {
                            this.inputs['five'] = input;
                            }}
                        />
                    </Item>                    
                    <Item floatingLabel>
                        <Label>PayPal link</Label>
                        <Input
                            value={this.state.paypalLink} 
                            blurOnSubmit={ false }
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ paypalLink: text })}
                            underlineColorAndroid="transparent"
                            onSubmitEditing={(e) => this.changeInfo(e)}
                            ref={ input => {
                                this.inputs['six'] = input;
                            }}
                        />
                    </Item>
                </Form>

                    <Button 
                        style={{ marginRight: 60, marginLeft: 60, marginTop: 20, flex: 1, justifyContent: "center" }} 
                        full
                        onPress={(e) => this.changeInfo(e)}>
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
        changeInfo: (token, firstName, lastName, mobileNumber, paypalLink) => { dispatch(submitinfochange(token, firstName, lastName, mobileNumber, paypalLink)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modify);