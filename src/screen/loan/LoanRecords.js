import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import { StyleSheet, View,Text} from 'react-native';
import {IRefreshListView,LoanRecordItem} from '../../component/index'
class LoanRecords extends Component{
    componentDidMount(){
        this.props.loan.getLoanRecords()
    }
    render(){
        const {loanRecords} = this.props.loan
        const arr = loanRecords.slice()
        return <View style={{flex:1,backgroundColor:'#fafafa'}}>
            {arr.map((item)=>{
                return <LoanRecordItem key={item.refId} record={item} onClick={this._gotoLoanProtocol.bind(this)}/>
            })}
        </View>
    }
    _gotoLoanProtocol(loanId){
        //this.props.navigation.navigate()
    }
}
export default inject('loan')(observer(LoanRecords))