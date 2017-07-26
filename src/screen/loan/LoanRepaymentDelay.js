import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import { View,} from 'react-native';
class LoanRepaymentDelay extends Component{
    componentDidMount(){

    }
    render(){
        return <View style={{flex:1,backgroundColor:'#aaa'}}>
        </View>
    }
}
export default inject('loan')(observer(LoanRepaymentDelay))