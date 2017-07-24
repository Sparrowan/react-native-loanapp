import React,{Component} from 'react'
import {View,StyleSheet} from 'react-native'
import { NavBar,} from '../../component/index'
class UserBankCards extends Component{
    render(){
        return <View style={{flex:1,background:'#fafafa'}}>
            <NavBar
                title={'银行卡列表'}
            />
        </View>
    }
}
export {
    UserBankCards
}