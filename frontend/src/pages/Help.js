import React, { Component } from 'react';
import { Scrollview,View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Card, CardItem, Content, Header, Left, Body, Right, Button, Icon, Text, Title, H1, H2, H3 } from 'native-base';

import { tomain} from '../redux/actions/core';

class Help extends Component {

    backToMain (e) {
        console.log('gonna go back to main');
        this.props.goBackToMain();
        e.preventDefault();
    }

    render() {
        return (
            <Container>
                  <Header>
                       <Left>
                             <Button transparent 
                             onPress={(e) => this.backToMain(e)}>
                            <Icon name="arrow-back" />
                            </Button>
                        </Left>
                         <Body>
                        <Title>Help!</Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                <Content padder>
                
                        <Card>
                             <CardItem header>
                                <Text style={{fontWeight: 'bold'}}>
                                Account and Payment Options
                                </Text>
                            </CardItem> 
                            <CardItem>   
                                 <Text style={{fontWeight: 'bold'}}>
                                 Can't sign in:
                                 </Text>
                            </CardItem> 
                             <CardItem>
                                <Left>                          
                                <Text>Register first using the register button at launch screen 
                                  then verify your account using the code mailed to the email 
                                  id provided by you at the time of registration.
                                  and sign in to your account.
                                </Text>    
                                </Left>    
                            </CardItem>
                            <CardItem>
                                <Text style={{fontWeight: 'bold'}}>
                                Can't find a ride:
                                </Text>
                            </CardItem>    
                            <CardItem>
                                <Left>
                                     <Text>Please enter the drop location,pick up location,date and time of your prefered ride
                                  after you sign in to your account and you will be able to see all available rides for 
                                  that route.
                                  If you can't find any then rides are mostly not available for that route at that time.
                                </Text>
                                </Left>         
                            </CardItem>
                            <CardItem>
                                <Text style={{fontWeight: 'bold'}}>
                                Updating account settings:
                                </Text>
                            </CardItem>
                            <CardItem>
                                <Text>To update your name, email, phone number, and password:

                                        1. Select "Profile" from the menu below in your user account home page.
                                        2. Select "Modify User information" option for changing personal information
                                           like First name,last name,mobile number and paypal link.
                                        3. Select "Change Password" for changing the password.
                                </Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{fontWeight: 'bold'}}>
                                How do I pay:
                                </Text>
                            </CardItem>
                            <CardItem>
                                <Text>You can provide  a paypal link at the time of registration.
                                      Later on that link can also be modified from Profile->Modify User information->
                                      Paypal link
                                </Text>
                            </CardItem>          
                         </Card> 
                            
                </Content >
            </Container>
        );
    }
}
//make this component available to the app
const mapStateToProps = (state) => {
    return {
     
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        goBackToMain: () => {dispatch(tomain())},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Help);
