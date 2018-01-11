import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Button } from 'react-native';
import { tomain, postinfo} from '../redux/actions/core';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Hoshi } from 'react-native-textinput-effects';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

const radio_props = [
        {label: 'show my Tel No.  ', button_value: '1' },
        {label: 'don\'t show it', button_value: '0' }
    ];



class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            button_value: '1',
            date_from:'',
            date_to:'',
            pick_up_location:'459 hazel street, waterloo, ON',
            pick_up_range:'3',
            drop_off_location:'27 King\'s College Circle Toronto, Ontario M5S 1A1 Canada',
            drop_off_range:'3',
            seat:'4',
            price:'40',
        };
    }


    toMain (e) {
        console.log('Pressed!!');
        this.props.backToMain();
        e.preventDefault();
    }

    toPost (e) {
        console.log('Pressed!!');
        this.state.date_from = Moment(this.state.date_from).format();
        this.state.date_to = Moment(this.state.date_to).format();
        this.props.PostRideshare(this.props.token, this.state.date_from ,this.state.date_to, this.state.pick_up_location, this.state.pick_up_range, this.state.drop_off_location, this.state.drop_off_range, this.state.seat, this.state.price, this.state.button_value);
        e.preventDefault();
    }



    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <DatePicker
                    style={{width: 320}}
                    date={this.state.date_from}
                    mode="datetime"
                    placeholder="select departure time: from "
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
                    onDateChange={(date) => {this.setState({date_from: date})}}
                  />

                <DatePicker
                    style={{width: 320}}
                    date={this.state.date_to}
                    mode="datetime"
                    placeholder="select departure time: to "
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
                    onDateChange={(date) => {this.setState({date_to: date})}}
                  />
                <Hoshi
                  label={'Pick Up Location'}
                  borderColor={'#b76c94'}
                  autoCorrect={false}
                  value={this.state.pick_up_location} 
                  autoCapitalize='none'
                  onChangeText={(text) => this.setState({ pick_up_location: text })}
                  />
                <Hoshi
                  label={'Pick Up Range (KM)'}
                  borderColor={'#b76c94'}
                  autoCorrect={false}
                  value={this.state.pick_up_range} 
                  autoCapitalize='none'
                  onChangeText={(text) => this.setState({ pick_up_range: text })}
                  />
                <Hoshi
                  label={'Drop Off Location'}
                  borderColor={'#b76c94'}
                  autoCorrect={false}
                  value={this.state.drop_off_location} 
                  autoCapitalize='none'
                  onChangeText={(text) => this.setState({ drop_off_location: text })}
                  />
                <Hoshi
                  label={'Drop Off Range (KM)'}
                  borderColor={'#b76c94'}
                  autoCorrect={false}
                  value={this.state.drop_off_range} 
                  autoCapitalize='none'
                  onChangeText={(text) => this.setState({ drop_off_range: text })}
                  />
                <Hoshi
                  label={'Available Seats'}
                  borderColor={'#b76c94'}
                  autoCorrect={false}
                  value={this.state.seat} 
                  autoCapitalize='none'
                  onChangeText={(text) => this.setState({ seat: text })}
                  />
                <Hoshi
                  label={'Price Per Seat (CAD)'}
                  borderColor={'#b76c94'}
                  autoCorrect={false}
                  value={this.state.price} 
                  autoCapitalize='none'
                  onChangeText={(text) => this.setState({ price: text })}
                  />
                <View style={{margin: 10, justifyContent: 'center'}}>

                    <RadioForm
                      radio_props={radio_props}
                      initial={0}
                      formHorizontal={true}
                      buttonColor={'#b76c94'}
                      labelColor={'#778899'}
                      onPress={(value) => {this.setState({button_value:value})}}
                    />
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
                    <Button onPress={(e) => this.toPost(e)} title=" Post "/>
                    <Button onPress={(e) => this.toMain(e)} title=" Back "/>
                </View>

            </ScrollView>
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
        backToMain: () => { dispatch(tomain()); },
        PostRideshare: (token, date_from ,date_to, pick_up_location, pick_up_range, drop_off_location, drop_off_range, seat, price, button_value) => { dispatch(postinfo(token, date_from ,date_to, pick_up_location, pick_up_range, drop_off_location, drop_off_range, seat, price, button_value)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);