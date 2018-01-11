export const verify = (code, email) => {
	return (dispatch) => {
        console.log('start verify');
        console.log(code, email);

        fetch('https://rideshare-carpool.herokuapp.com/users/verify', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                email: email
            })
        }).then((response) => {
            console.log(response);

            response.json().then(data => {
                switch (data.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        alert("registered successfully")
                        dispatch({
                        	type: 'VERIFY_SUCCESS',
                        });
                        break;
                    case 6: // wrong verification code
                    	console.log('wrong verification code!!');
                    	dispatch({
                        	type: 'VERIFY_WRONG_CODE',
                        });
                        break;
                    default:
                        console.log(data.code);
                        console.log('network error');
                        dispatch({
                            type: 'NETWORK_ERROR'
                        }); 

                }
            })
        });
    };
};

export const goBack = () => {
    return {
        type: 'GO_SIGNIN'
    };
};

export const register = (email, password, firstName, lastName, mobileNumber, PayPalLink) => {
	return (dispatch) => {
        console.log('start register')
        console.log(email, password, firstName, lastName, mobileNumber, PayPalLink)

        fetch('https://rideshare-carpool.herokuapp.com/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName, 
                lastName: lastName, 
                number: mobileNumber,
                paypal: PayPalLink
            })
        }).then((response) => {

            response.json().then(data => {
                console.log(data)
                switch (data.code) {
                    case 0: //no_error
                        console.log('SUCCESS!!');
                        console.log(data);
                        dispatch({
                        	type: 'REGISTER_SUCCESS',
                        	email: email
                        });
                        break;
                    case 28: // 'user_existed '
                        console.log('user_existed');                                                                               
                        dispatch({
                            type: 'USER_EXISTED'
                        }); 
                        break; 
                    default:
                        console.log('network error');
                        dispatch({
                            type: 'NETWORK_ERROR'
                        }); 

                }
            })
        });
    };
};

export const cleanError = () => {
    return {
        type: 'CLEAN_ERROR'
    };
};




