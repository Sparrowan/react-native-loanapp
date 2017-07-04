import React from 'react';
import { StackNavigator} from 'react-navigation';
import {UserSetting} from '../screen/user/UserSetting'
import LoanApply from '../screen/loan/LoanApply'
import User from '../screen/User'
import {RegisterProtocol} from '../screen/webView/WebView'
import avatar from '../screen/identity/Avatar'
import Relation from '../screen/identity/Relation'
import Personal from '../screen/identity/PersonalInformation'
export default  SimpleApp = StackNavigator({
    LoanApply:{
        screen:LoanApply
    },
    User:{
      screen:User
    },
    UserSetting:{
      screen:UserSetting
    },
    RegisterProtocol:{
        screen:RegisterProtocol
    },
    avatar:{
        screen:avatar
    },
    Relation:{
        screen:Relation
    },
    Personal:{
        screen:Personal
    }
},{
    headerMode:'none'
});
