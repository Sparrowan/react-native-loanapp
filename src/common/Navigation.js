import React from 'react';
import { StackNavigator} from 'react-navigation';
import {UserSetting} from '../screen/user/UserSetting'
import LoanApply from '../screen/loan/LoanApply'
import User from '../screen/User'
import {RegisterProtocol} from '../screen/webView/WebView'
import Avator from '../screen/identity/Avator'
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
    Avator:{
        screen:Avator
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
