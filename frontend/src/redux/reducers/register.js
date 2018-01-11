const defaultState = {
    password: '',
    email: '',
    errorFlag: false,
    sysAlert: '',
    firstName:'',
    lastName:'',
    mobileNumber:'',
    navi_register:'registerPage'
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'VERIFY_SUCCESS':
          return {...state, navi_register: 'registerPage'};
        case 'VERIFY_WRONG_CODE':
          return {...state, errorFlag: true,  
                      sysAlert: 'wrong verification code!!'};
        case 'GO_SIGNIN':
          return {...state, navi_register: 'registerPage'};
        case 'CLEAN_ERROR':
          return { ...state, errorFlag: false, sysAlert:''};
        case 'REGISTER_SUCCESS' :
          return { ...state, errorFlag: false, 
                      email: action.email, password: '', 
                      navi_register: 'verifyPage'
                    }; 

        case 'USER_EXISTED':
          return { ...state, errorFlag: true, 
                      email: '', password: '', 
                      sysAlert: 'user existed'
                    };                                                                                                                                                                                                                                     
        case 'NETWORK_ERROR':
          return { ...state, errorFlag: true, 
                      sysAlert: 'NETWORK ERROR'
                    };                                                                                                                                                                      
        default:
            return state;
    }
}
