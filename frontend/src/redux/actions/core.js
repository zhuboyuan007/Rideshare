export const driverapply = (token, driversLicense, vehiclePlate) => {
    return (dispatch) => {
        console.log('driver apply');
        console.log(token, driversLicense, vehiclePlate);

        fetch('https://rideshare-carpool.herokuapp.com/users/apply_for_driver_permission', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },

            body: JSON.stringify({
                driversLicense: driversLicense,
                vehiclePlate: vehiclePlate
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        alert('SUCCEEDED!');
                        fetch('https://rideshare-carpool.herokuapp.com/users/info', {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'x-access-token': token
                            }
                        }).then((response) => {
                            response.json().then(data_got => {
                                console.log(data_got);
                                switch (data_got.code) {
                                    case 0: //no_error
                                        console.log('to profile page!!');

                                        dispatch({
                                            type: 'TOPROFILE',
                                            item: data_got.data
                                        });
                                        break;
                                    default:
                                        console.log('exist an error');
                                        alert("server error!!");

                                }
                            });
                        });
                        break;
                    default:
                        console.log('OCCUR an error');
                        alert("error");
                }
            });
        });
        
    }
};

export const changepassword = (token, old_password, new_password) => {
    return (dispatch) => {
        console.log('change password');
        console.log(token, old_password, new_password);

        fetch('https://rideshare-carpool.herokuapp.com/users/change_password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },

            body: JSON.stringify({
                old_pass: old_password,
                new_pass: new_password
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        alert('PASSWORD UPDATED!');
                        fetch('https://rideshare-carpool.herokuapp.com/users/info', {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'x-access-token': token
                            }
                        }).then((response) => {
                            response.json().then(data_got => {
                                console.log(data_got);
                                switch (data_got.code) {
                                    case 0: //no_error
                                        console.log('to profile page!!');

                                        dispatch({
                                            type: 'TOPROFILE',
                                            item: data_got.data
                                        });
                                        break;
                                    default:
                                        console.log('exist an error');
                                        alert("server error!!");

                                }
                            });
                        });
                        break;
                    case 3:
                        alert('THE OLD PASSWORD IS WRONG!!');
                        break;
                    default:
                        console.log('OCCUR an error');
                        alert("error");
                }
            });
        });
        
    }
};

export const submitinfochange = (token, firstName, lastName, mobileNumber, paypalLink) => {
    return (dispatch) => {
        console.log('submit info change');
        console.log(token, firstName, lastName, mobileNumber, paypalLink);

        fetch('https://rideshare-carpool.herokuapp.com/users/edit_profile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },

            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                number: mobileNumber,
                paypal: paypalLink
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        alert('USER INFO UPDATED!');
                        fetch('https://rideshare-carpool.herokuapp.com/users/info', {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'x-access-token': token
                            }
                        }).then((response) => {
                            response.json().then(data_got => {
                                console.log(data_got);
                                switch (data_got.code) {
                                    case 0: //no_error
                                        console.log('to profile page!!');

                                        dispatch({
                                            type: 'TOPROFILE',
                                            item: data_got.data
                                        });
                                        break;
                                    default:
                                        console.log('exist an error');
                                        alert("server error!!");

                                }
                            });
                        });
                        break;
                    default:
                        console.log('OCCUR an error');
                        alert("error");
                }
            });
        });
        
    }
};

export const getuserinfo = (token) => {
    return (dispatch) => {
        console.log('get user info');
        console.log(token);

        fetch('https://rideshare-carpool.herokuapp.com/users/info', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        dispatch({
                            type: 'SAVEUSERID',
                            id: data_got.data._id,
                            userFirstName: data_got.data.firstName,
                            userLastName: data_got.data.lastName,
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("server error!!");
                }
            });
        });
    }
}

export const gethistorychat = (token, chatterID) => {
    return (dispatch) => {
        console.log('get history chat');
        console.log(token, chatterID);

        fetch('https://rideshare-carpool.herokuapp.com/chat/get_history', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                user: chatterID,
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        dispatch({
                            type: 'CLEANCHATHISTORY',
                        });
                        dispatch({
                            type: 'SAVECHATHISTORY',
                            messages: data_got.data,
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("server error!!");
                }
            });
        });
        
    }
}
export const sendmessage = (token, chatterID, message) => {
    return (dispatch) => {
        console.log('send messages');
        console.log(token, chatterID, message);

        fetch('https://rideshare-carpool.herokuapp.com/chat/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                to: chatterID,
                text: message[0].text,
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('sent');
                        dispatch({
                            type: 'SHOWSENTMESSAGE',
                            item: message
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("server error!!");
                }
            });
        });
        
    }
}

export const getmessage = (token, chatterID) => {
    return (dispatch) => {
        console.log('get');
        console.log(token, chatterID);

        fetch('https://rideshare-carpool.herokuapp.com/chat/check_conv', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                user: chatterID,
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('sent');
                        dispatch({
                            type: 'SHOWSENTMESSAGE',
                            item: data_got.data
                        });

                        break;
                    default:
                        console.log('exist an error');
                        console.log(data_got.data);
                        alert("server error!!");
                }
            });
        });
        
    }
}

export const toprofilepage = (token) => {
    return (dispatch) => {
        console.log('profile page');
        console.log(token);

        fetch('https://rideshare-carpool.herokuapp.com/users/info', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('to profile page!!');

                        dispatch({
                            type: 'TOPROFILE',
                            item: data_got.data
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("server error!!");

                }
            });
        });
    }
}

export const makedecide = (token, decide, ride_id, application_id) => {
    return (dispatch) => {
        console.log('makedecide');
        console.log(token, decide, ride_id, application_id);

        fetch('https://rideshare-carpool.herokuapp.com/rides/respond_to_ride', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },

            body: JSON.stringify({
                ride: ride_id,
                application: application_id,
                accept: decide
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        if (decide === true){
                            alert('Approved!');
                        }
                        else{
                            alert('Rejected!');
                        }
                        break;
                    case 21:
                        alert('There is not enough seats!');
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");
                }
            });
        }).then( ()=> {
                dispatch({
                    type: 'CLEANDRIVERORDER'
                });
        }).then( ()=> {
                fetch('https://rideshare-carpool.herokuapp.com/rides/get_unprocessed_orders', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'x-access-token': token
                    }
                }).then((response) => {
                    response.json().then(data_got => {
                        console.log(data_got.data);
                        switch (data_got.code) {
                            case 0: //no_error
                                console.log('got driver unprocessed!!');

                                dispatch({
                                    type: 'DRIVERUNPROCESSED',
                                    array: data_got.data
                                });
                                break;
                            default:
                                console.log('exist an error');
                                alert("error");
                        }
                    });
                }).then( ()=> {
                    fetch('https://rideshare-carpool.herokuapp.com/rides/get_offering_orders', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'x-access-token': token
                        }
                    }).then((response) => {
                        response.json().then(data_got => {
                            switch (data_got.code) {
                                case 0: //no_error
                                    console.log('got driver all orders!!');
                                    console.log(data_got.data);
                                    dispatch({
                                        type: 'DRIVERALL',
                                        array: data_got.data
                                    });
                                    break;
                                default:
                                    console.log('exist an error');
                                    alert("error");
                            }
                        });
                    }).then( ()=> {
                        dispatch({
                        type: 'TOHISTORY'
                        });
                    }); 
                });
        });
    }
};


export const tohistory = (token) => {
    return (dispatch) => {
        console.log('ask for history');
        console.log(token);

        fetch('https://rideshare-carpool.herokuapp.com/rides/get_unprocessed_orders', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got.data);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('got driver unprocessed!!');

                        dispatch({
                            type: 'DRIVERUNPROCESSED',
                            array: data_got.data
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");
                }
            });
        });

        fetch('https://rideshare-carpool.herokuapp.com/rides/get_offering_orders', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('got driver all orders!!');
                        console.log(data_got.data);
                        dispatch({
                            type: 'DRIVERALL',
                            array: data_got.data
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");
                }
            });
        });

        fetch('https://rideshare-carpool.herokuapp.com/rides/get_applied_orders', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('got passenger all orders!!');
                        console.log(data_got.data);
                        dispatch({
                            type: 'PASSENGERALL',
                            array: data_got.data
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");
                }
            });
        });

        fetch('https://rideshare-carpool.herokuapp.com/rides/get_pending_applications', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('got passenger unprocessed!!');
                        console.log(data_got.data);
                        dispatch({
                            type: 'PASSENGERUNPROCESSED',
                            array: data_got.data
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");
                }
            });
        });

        dispatch({
            type: 'TOHISTORY'
        });
    }
};

export const tochatlist = (token) => {
    return (dispatch) => {
        fetch('https://rideshare-carpool.herokuapp.com/chat/chat_list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                console.log('loading');
                console.log(data_got);

                switch (data_got.code) {
                    case 0: //no_error
                        console.log(data_got.data);
                        dispatch({
                            type: 'TOCHATLIST',
                            chat_user_data: data_got.data
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");
                }
            });
        });
    }
};

export const getchatdetail = (token) => {
    return (dispatch) => {
        fetch('https://rideshare-carpool.herokuapp.com/chat/chat_list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                console.log('loading');
                console.log(data_got);

                switch (data_got.code) {
                    case 0: //no_error
                        console.log(data_got.data);
                        dispatch({
                            type: 'GETDETAILCHAT',
                            chat_user_data: data_got.data
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");
                }
            });
        });
    }
};

export const checkchat = (token) => {
    return (dispatch) => {
        fetch('https://rideshare-carpool.herokuapp.com/chat/chat_list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then((response) => {
            response.json().then(data_got => {
                console.log('CHECK CHAT');

                switch (data_got.code) {
                    case 0: //no_error
                        console.log(data_got.unread);
                        dispatch({
                            type: 'CHECKCHAT',
                            chatbubble: data_got.unread,
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");
                }
            });
        });
    }
};


export const goToChatPage = (chatterID, firstName, lastName) => {
    return {
        type: 'TOCHATPAGE',
        chatterID: chatterID,
        chatterFirstName: firstName,
        chatterLastName: lastName,
    };
};

export const topost = () => {
    return {
        type: 'TOPOSTPAGE',
    };
};

export const cleandata = () => {
    return {
        type: 'CLEAN'
    };
};

export const gobacktoresult = () => {
    return {
        type: 'GOBACKTORESULT'
    };
};


export const showDetailInfo = (item) => {
    return (dispatch) => {
        console.log('begin to show');
        console.log(item);
        dispatch({
            type: 'TOSHOWDETAIL',
            item: item
        });
        
    }
};

export const showDetailInfoDriver = (item) => {
    return (dispatch) => {
        console.log('driver detail');
        console.log(item);
        dispatch({
            type: 'TOSHOWDETAILDRIVER',
            item: item
        });
        
    }
};

export const showDetailInfoPassenger = (item) => {
    return (dispatch) => {
        console.log('passenger detail');
        console.log(item);
        console.log(item.driver.payment.paypal);
        dispatch({
            type: 'TOSHOWDETAILPASSENGER',
            item: item
        });
        
    }
};

export const askForJoinIn = (token, item) => {
    return (dispatch) => {
        console.log('ask for join');
        console.log(item);
        console.log(token);

        fetch('https://rideshare-carpool.herokuapp.com/rides/apply_to_join', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },

            body: JSON.stringify({
                ride: item._id
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        alert("applied!")
                        dispatch({
                            type: 'TOMAIN',
                        });
                        break;
                    case 15:
                        alert('cannot join the rideshare posted by yourself');
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");

                }
            });
        });
        
    }
};


export const getresult = (token, pick_up_location,drop_off_location,departDate) => {
    return (dispatch) => {
        console.log('get result')
        console.log(token, pick_up_location,drop_off_location,departDate)
        var kijiji = true;
        var craigslist = false;

        fetch('https://rideshare-carpool.herokuapp.com/rides/search_ride', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },

            body: JSON.stringify({
                departDate: departDate,
                pickUpLoc: pick_up_location,
                dropOffLoc: drop_off_location,
                crawler: {kijiji: kijiji, craigslist: craigslist},
            })
        }).then((response) => {
            response.json().then(data_got => {
                console.log(data_got);
                switch (data_got.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        dispatch({
                            type: 'GETRESULT',
                            array: data_got.data,
                            external_data_array: data_got.external_data
                        });
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");

                }
            });
        });
    };
};

export const tomodifyinfo = () => {
    return {
        type: 'TOMODIFYINFO'
    };
};

export const todriverinfo = () => {
    return {
        type: 'TODRIVERINFO'
    };
};

export const toHelp = () => {
    return {
        type: 'TOHELPPAGE'
    };
};

export const tochangepassword = () => {
    return {
        type: 'CHANGEPASSWORD'
    };
};

export const tomain = () => {
    return {
        type: 'TOMAIN'
    };
};

export const postinfo = (token, date_from ,date_to, pick_up_location, pick_up_range, drop_off_location, drop_off_range, seat, price, button_value) => {
	return (dispatch) => {
        console.log('start post')
        console.log(token, date_from ,date_to, pick_up_location, pick_up_range, drop_off_location, drop_off_range, seat, price, button_value)
        console.log(date_from ,date_to)


        fetch('https://rideshare-carpool.herokuapp.com/rides/post_ride', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },

            body: JSON.stringify({
                departDate: {from: date_from, to: date_to},
                pickUpLoc: {address:pick_up_location,range: pick_up_range},
                dropOffLoc: {address:drop_off_location, range: drop_off_range},
                showNumber: button_value,
                totalSeats: seat,
                price: price
            })
        }).then((response) => {
            response.json().then(data => {
                console.log(data.code)
                switch (data.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        console.log(data);
                        alert("success");
                        dispatch({
                        	type: 'POST_SUCCESS',
                        });
                        break;
                    case 11:
                        alert("Have no permission to post a rideshare")
                        break;
                    default:
                        console.log('exist an error');
                        alert("error");

                }
            })
        });
    };
};