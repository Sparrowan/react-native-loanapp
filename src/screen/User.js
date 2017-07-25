import React from 'react';
import { StackNavigator} from 'react-navigation';
import Home from '../screen/Home'
import {UserSetting} from '../screen/user/UserSetting'
import LoanApply from '../screen/loan/LoanApply'
import {RegisterProtocol} from '../screen/webView/WebView'
import avatar from '../screen/identity/Avatar'
import Relation from '../screen/identity/Relation'
import Personal from '../screen/identity/PersonalInformation'
import UserBankCards from '../screen/user/UserBankCards'
export default  SimpleApp = StackNavigator({
    LoanApply:{
        screen:LoanApply
    },
    Home:{
      screen:Home
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
    },
    BankCards:{
        screen:UserBankCards
    }
},{
    headerMode:'none'
});
