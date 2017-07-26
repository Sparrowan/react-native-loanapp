import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import { View,} from 'react-native';
import {Item} from '../../component/index'
class LoanRepaymentNow extends Component{
    componentDidMount(){
        this.props.loan.getRepaymentInfo()
    }
    render(){
        return <View style={{flex:1,backgroundColor:'#fafafa'}}>
        </View>
    }
}
export default inject('loan')(observer(LoanRepaymentNow))