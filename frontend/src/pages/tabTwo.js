//driver all
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image } from 'react-native';
import { showDetailInfoDriver} from '../redux/actions/core';
import { tomain } from '../redux/actions/core';
import Moment from 'moment';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  ListItem,
  List,
  Text,
  Subtitle
} from "native-base";

class Result extends Component {
    constructor(props) {
        super(props);
    }

    showDetailDriver(item){
        console.log(item);
        this.props.detail(item);
    }

    render() {
      return (
        
          <Container>
             <Content padder>
              <List
                dataArray={this.props.data_array}
                renderRow={data =>
                  <ListItem avatar onPress={ () => this.showDetailDriver(data) }>
                    <Left>

                    </Left>
                    <Body>
                      <Text>{`${Moment(data.departDate.from).format('lll')} `}</Text>
                      <Text numberOfLines={2} note>{`From: ${data.pickUpLoc.formattedAddress}`}</Text>
                      <Text numberOfLines={2} note>{`To: ${data.dropOffLoc.formattedAddress}`}</Text>
                      
                    </Body>
                  </ListItem>}
              />
            </Content>

          </Container>
      );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        data_array : state.core.alldriver
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        detail: (item) => {dispatch(showDetailInfoDriver(item))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);