import React from 'react';
import { StackNavigator} from 'react-navigation';
import Main from '../screen/User'
import {UserRegister} from '../screen/user/UserRegister'
export default  SimpleApp = StackNavigator({
    Main:{
        screen:Main
    },
    UserRegister: {
        screen: UserRegister
    },
}, {
    headerMode: 'none',
    mode: 'modal'
})
