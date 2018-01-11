import React, { Component } from "react";
import { connect } from 'react-redux';
import { ScrollView,Text, View } from "react-native";
import { Container,Form, Label, Input, Item, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem} from 'native-base';


//reducers
import { toprofilepage, changepassword } from '../redux/actions/core';

class Password extends Component {
    constructor (props) {
        super(props);
        this.state = {
            old_password: '',
            new_password1: '',
            new_password2: ''
        };
    }

    toProfile (e) {
        console.log('to profile page!')
        this.props.toProfilePage(this.props.token);
        e.preventDefault();
    }

    changePassword(e){
        console.log('change password');
        if (!this.props.token || !this.state.old_password || !this.state.new_password1 || !this.state.new_password2){
          alert('please fill in all blanks');
        }
        else{
          if (this.state.new_password1 != this.state.new_password2){
            alert('the new passwords you inputed are not the same!');
          }
          else{
            this.props.changePassword(this.props.token, this.state.old_password, this.state.new_password2)
          }
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
                <Title>Modify Password</Title>
              </Body>
              <Right>
              </Right>
            </Header>

            <Content>
                <ScrollView>
                  <Form>
                    <Item floatingLabel>
                        <Label>Previous Password</Label>
                        <Input
                            value={this.state.password}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ old_password: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>New Password</Label>
                        <Input
                            value={this.state.password}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            onChangeText={(text) => this.setState({ new_password1: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>New Password Again</Label>
                        <Input
                            value={this.state.password}
                            blurOnSubmit={ false }
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            onChangeText={(text) => this.setState({ new_password2: text })}
                            underlineColorAndroid="transparent"
                        />
                    </Item>                    
                </Form>

                    <Button 
                        style={{ marginRight: 60, marginLeft: 60, marginTop: 20, flex: 1, justifyContent: "center" }} 
                        full
                        onPress={(e) => this.changePassword(e)}>
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
        changePassword: (token, old_password, new_password) => { dispatch(changepassword(token, old_password, new_password)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);