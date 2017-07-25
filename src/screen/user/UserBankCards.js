import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import {View,StyleSheet} from 'react-native'
import { NavBar,} from '../../component/index'
import {List,Radio} from 'antd-mobile'
const RadioItem = Radio.RadioItem;
class UserBankCards extends Component{
    componentDidMount(){
        this.props.user.getBankCards()
    }
    render(){
        const {cardList} = this.props.user
        const {goBack} = this.props.navigation;
        return <View style={{flex:1,backgroundColor:'#fafafa'}}>
            <NavBar
                leftIcon="angle-left"
            leftIconSize={18}
            leftPress={() => goBack()}
            title={'我的银行卡'}
            />
            <List renderHeader={() => '银行卡列表'}>

            </List>
        </View>
    }
    _onChange(){

    }
}
export default inject('user')(observer(UserBankCards))