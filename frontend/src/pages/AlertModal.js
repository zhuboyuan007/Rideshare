import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, NBText } from 'native-base';
import styles from "./Styles/AlertModalStyles";

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
        animationType: 'fade',
        modalVisible: true,
        transparent: false,
        };
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    
    setAnimationType(type) {
        this.setState({animationType: type});
    }
    
    toggleTransparent() {
        this.setState({transparent: !this.state.transparent});
    }
    
    render() {
        var modalBackgroundStyle = {
        backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        var innerContainerTransparentStyle = this.state.transparent
        ? {backgroundColor: '#fff', padding: 20}
        : null;
        var activeButtonStyle = {
        backgroundColor: '#ddd'
        };
    
        return (
        <View>
            <Modal
            animationType={this.state.animationType}
            transparent={this.state.transparent}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(false)}}
            >
            <View style={[styles.container, modalBackgroundStyle]}>
                <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                <Text>This modal was presented {this.state.animationType === 'none' ? 'without' : 'with'} animation.</Text>
                <Button
                    //onPress={this.setModalVisible.bind(this, false)}
                    //style={styles.modalButton}
                    >
                    <NBText >Close</NBText>
                </Button>
                </View>
            </View>
            </Modal>
        </View>
        );
    }
}
export default Alert;