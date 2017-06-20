import React from 'react';
import { StackNavigator} from 'react-navigation';
import Home from '../screen/Home'
import {UserRegister} from './user/UserRegister'
export default  SimpleApp = StackNavigator({
    Home: {
        screen: Home
    },
    UserRegister: {
        screen: UserRegister
    },
}, {
    headerMode: 'none',
    mode: 'modal'
})