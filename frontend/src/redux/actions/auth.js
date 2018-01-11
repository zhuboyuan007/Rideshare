export const launchLogin = () =>{
    return {
        type: 'LAUNCHLOGIN'
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const cleanError = () => {
    return {
        type: 'CLEAN_ERROR'
    };
};

export const onRegister = () => {
    return {
       type: 'REGISTER'
    };
};

export const loginUser = (email, password) => {
    return (dispatch) => {
        // dispatch({
        //     type: 'LOAD_SPINNER'
        // });
        // console.log('spinner')

        fetch('https://rideshare-carpool.herokuapp.com/users/get_token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((response) => {
            console.log(response);

            response.json().then(data => {
                switch (data.code) {
                    case 1: //user_not_found
                        console.log('user_not_found!!');
                        dispatch({
                            type: 'LOGIN_USER_NOT_EXIST'
                        });
                        break;
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        console.log(data);
                        dispatch({
                            type: 'LOGIN_USER_SUCCESS',
                            email: email,
                            password: password,
                            authentication_token: data.token
                        });
                        break;
                    case 2: //user_not_verified
                        console.log('user_not_verified!!');
                        dispatch({
                            type: 'LOGIN_FAILED'
                        });
                        break;
                    case 3: //'wrong_password'
                        console.log('wrong_password');
                        dispatch({
                            type: 'WRONG_PASSWORD'
                        }); 
                        break;  
                    case 4: //'key_information_missing'
                        console.log('key_information_missing!!');
                        dispatch({
                            type: 'KEY_INFORMATION_MISSING'
                        });
                        break;
                    case 5: //'invalid_token'
                        console.log('invalid_token');                                                                               
                        dispatch({
                            type: 'INVALID_TOKEN'
                        });
                        break;
                    case 6: //'wrong_verification_code'
                        console.log('wrong_verification_code');                                                                               
                        dispatch({
                            type: 'WRONG_VERIFICATION_CODE'
                        });
                        break;
                    case 7: // 'no_token_provided'
                        console.log('no_token_provided');                                                                               
                        dispatch({
                            type: 'NO_TOKEN_PROVIDED'
                        }); 
                        break;
                    case 8: // ' file_not_found'
                        console.log('file_not_found');                                                                               
                        dispatch({
                            type: 'FILE_NOT_FOUND'
                        }); 
                        break;    
                    case 9: // ' upload_failed '
                        console.log('upload_failed');                                                                               
                        dispatch({
                            type: 'UPLOAD_FAILED'
                        });
                        break;
                    case 10: // ' bad_data '
                        console.log('bad_data');                                                                               
                        dispatch({
                            type: 'BAD_DATA'
                        });
                        break;
                    case 11: // ' no_permission '
                        console.log('no_permission');                                                                               
                        dispatch({
                            type: 'NO_PERMISSION'
                        });
                        break;
                    case 12: // ' unknown '
                        console.log('unknown');                                                                               
                        dispatch({
                            type: 'UNKNOWN'
                        });
                        break;
                    case 13: // ' ride_not_found '
                        console.log('ride_not_found');                                                                               
                        dispatch({
                            type: 'RIDE_NOT_FOUND'
                        });
                        break;
                    case 14: // ' save_failed '
                        console.log('save_failed');                                                                               
                        dispatch({
                            type: 'SAVE_FAILED'
                        });
                        break;
                    case 15: // 'join_your_own_ride '
                        console.log('join_your_own_ride');                                                                               
                        dispatch({
                            type: 'JOIN_RIDE'
                        }); 
                        break;
                    case 16: // 'edit_others_ride '
                        console.log('edit_others_ride');                                                                               
                        dispatch({
                            type: 'EDIT_OTHERS_RIDE'
                        }); 
                        break;
                    case 17: // 'application_not_existing '
                        console.log('application_not_existing');                                                                               
                        dispatch({
                            type: 'APPLICATION_DOES_NOT_EXIST'
                        }); 
                        break;
                    case 18: // 'application_already_responded '
                        console.log('application_already_responded');                                                                               
                        dispatch({
                            type: 'APPLICATION_RESPONDED_ALREADY'
                        }); 
                        break;
                    case 19: // 'db_error' '
                        console.log('db_error');                                                                               
                        dispatch({
                            type: 'DB_ERROR'
                        }); 
                        break;        
                    case 20: // 'clear_applications_before_editing '
                        console.log('clear_applications_before_editing');                                                                               
                        dispatch({
                            type: 'CLEAR_APPLICATION_BEFORE_EDITING'
                        });    
                        break;        
                    case 21: // 'not_enough_seats '
                        console.log('not_enough_seats');                                                                               
                        dispatch({
                            type: 'NOT_ENOUGH_SEATS'
                        }); 
                        break;        
                    case 22: // 'already_deleted '
                        console.log('already_deleted');                                                                               
                        dispatch({
                            type: 'ALREADY_DELETED'
                        }); 
                        break;        
                    case 23: // 'user_not_in_applications '
                        console.log('user_not_in_applications');                                                                               
                        dispatch({
                            type: 'USER_NOT_IN_APPLICATION'
                        }); 
                        break;
                     case 24: // 'cannot_edit_ride_within_1_hour'
                        console.log('');                                                                               
                        dispatch({
                            type: 'CANNOT_EDIT_RIDE_WITHIN_1_HOUR'
                        }); 
                        break;
                    case 25: // 'application_invalid '
                        console.log('application_invalid');                                                                               
                        dispatch({
                            type: 'APPLICATION_INVALID'
                        }); 
                        break;
                    case 26: // 'no_notifications '
                        console.log('no_notifications');                                                                               
                        dispatch({
                            type: 'NO_NOTIFICATIONS'
                        }); 
                        break;
                    case 27: // 'new_notifications '
                        console.log('new_notifications');                                                                               
                        dispatch({
                            type: 'NEW_NOTIFICATIONS'
                        }); 
                        break;
                    case 28: // 'user_existed '
                        console.log('user_existed');                                                                               
                        dispatch({
                            type: 'USER_EXISTED'
                        }); 
                        break;                   
                    default:
                        console.log('')
                        return state;

                }
            })
        });
    };
};

