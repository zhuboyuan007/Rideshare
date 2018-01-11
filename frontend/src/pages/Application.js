import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Main from './Secured';
import Post from './Post';
import Result from './Result';
import Register from './Register';
import Verify from './Verify';
import Detail from './Detail';
import DetailDriver from './DetailDriver';
import DetailPassenger from './DetailPassenger';
import Launch from './Launch';
import ChatList from './ChatList';
import Chat from './Chat';
import History from './History';
import Profile from './userProfile';
import Modify from './ModifyInfo';
import Password from './ChangePassword';
import Driver from './DriverInfo';
import Help from './Help';


class Application extends Component {
    render() {
        switch (this.props.navi_page){
            case 'launchPage':
                return <Launch />;
            case 'loginPage':
                return <Login />;
            case 'securedPage':
                switch (this.props.navi_core){
                    case 'main':
                        return <Main />;
                    case 'post':
                        return <Post />;
                    case 'result':
                        return <Result />;
                    case 'detail':
                        return <Detail />;
                    case 'chatlist':
                        return <ChatList />;
                    case 'chatpage':
                        return <Chat />;
                    case 'history':
                        return <History />;
                    case 'detaildriver':
                        return <DetailDriver />;
                    case 'detailpassenger':
                        return <DetailPassenger />;
                    case 'profile':
                        return <Profile />;
                    case 'modify':
                        return <Modify />;
                    case 'changepassword':
                        return <Password />;
                    case 'driverinfo':
                        return <Driver />;
                    case 'help':
                        return <Help />;
                }
            case 'registerPage':
                switch (this.props.navi_register){
                    case 'registerPage':
                        return <Register />;
                    case 'verifyPage':
                        return <Verify />;
                }
            default:
                return <Launch />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        navi_page: state.auth.navi_page,
        navi_register: state.register.navi_register,
        navi_core: state.core.navi_core
    };
}

export default connect(mapStateToProps)(Application);
