import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import {  View,} from 'react-native';
import {IRefreshListView,LoanRecordItem,IRefreshScrollView} from '../../component/index'
class LoanRecords extends Component{
    componentDidMount(){
        this.props.loan.getLoanRecords()
    }
    render(){
        const {loanRecords} = this.props.loan
        const arr = loanRecords.slice()
        return <View style={{flex:1,backgroundColor:'#fafafa'}}>
            <IRefreshScrollView
                style={{flex:1}}
                onRefresh={(end) => this.props.loan.getLoanRecords(end)}
            >
                {arr.map((item,i)=>{
                    return <LoanRecordItem key={i} record={item} onClick={this._gotoLoanProtocol.bind(this)}/>
                })}
            </IRefreshScrollView>
        </View>
    }
    _gotoLoanProtocol(loanId){
        //this.props.navigation.navigate()
    }
}
export default inject('loan')(observer(LoanRecords))