import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import { View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import App from '../../common/HttpTools'
import {List,Button} from 'antd-mobile'
import Icon from 'react-native-vector-icons/FontAwesome'
const Item = List.Item
class LoanRepaymentNow extends Component{
    componentDidMount(){
        this.props.loan.getRepaymentInfo()
    }
    render(){
        const {repaymentInfo} = this.props.loan;
        if(!repaymentInfo){
            return <View style={{flex:1,backgroundColor:'#fafafa'}}>
                
            </View>
        }else {
            const {dueAmount,dueDate,overdueFee,defaultCardNo,leftDays} = repaymentInfo
            let grace = {
                dayMoney:leftDays>=-7&&leftDays<=-1?overdueFee/(Math.abs(leftDays)):overdueFee/(Math.abs(leftDays)-7+3.5)*3.5, //宽限费用
                amount:leftDays>=-7&&leftDays<=-1?overdueFee:(overdueFee/(Math.abs(leftDays)-7+3.5)*3.5).toFixed(0)
            }
            let overdue = {
                dayMoney:Math.abs(overdueFee/(3.5+Math.abs(leftDays)-7)).toFixed(0), //逾期费用
                amount:((Math.abs(overdueFee/(3.5+Math.abs(leftDays)-7)))*(Math.abs(leftDays)-7)).toFixed(0)
            }
            const infoMessage = {
                grace:(leftDays>=-7&&leftDays<=-1?`您处于宽限期第${Math.abs(leftDays)}天，宽限期每天费用是${grace.dayMoney}元，您有7天的宽限期，宽限期结束后进入逾期状态。`:`您需要结清的宽限期费用，您的借款已处于逾期状态。`),
                overdue:`您处于逾期第${Math.abs(leftDays)-7}天，逾期每天费用是${overdue.dayMoney}元`
            }
            return <View style={{flex:1,backgroundColor:'#fafafa'}}>
                <View style={styles.dueDate}>
                    <View style={[styles.dueDateLabel,{}]}>
                        <Text>到期时间</Text>
                        <Text>{dueDate}</Text>
                    </View>
                </View>
                <List>
                    <Item extra={(dueAmount+parseFloat(overdueFee)+'元')}>应还金额</Item>
                    <Item extra={dueAmount+'元'} thumb={<TouchableOpacity onPress={()=>this._showModal('到期金额','您在到期日应还的金额')}>
                        <Icon name="apple" size={12}/>
                    </TouchableOpacity>}>到期金额</Item>
                    {leftDays>=-7&&leftDays<=-1&&<Item extra={grace.amount+'元'} thumb={<TouchableOpacity onPress={()=>this._showModal('宽限费用',infoMessage.grace)}>
                        <Icon name="apple" size={12}/>
                    </TouchableOpacity>}>宽限费用</Item>}
                    {leftDays<-7&&<Item extra={overdue.amount+'元'} thumb={<TouchableOpacity onPress={()=>this._showModal('逾期费用',infoMessage.overdue)}>
                        <Icon name="apple" size={12}/>
                    </TouchableOpacity>}>逾期费用</Item>}
                </List>
                <View style={styles.edge}></View>
                <List>
                    <Item extra={defaultCardNo+'(换卡还款)'} arrow="horizontal" onClick={()=>this.props.navigation.navigate('BankCards')}>还款银行卡</Item>
                </List>
                <View style={styles.edge}></View>
                <List>
                    <Item arrow="horizontal" onClick={()=>this._showModal('支付宝还款',<Text>
                            极速花支付宝账号：<Text style={{color:'#0398ff'}}>service@cashpp.cn</Text>
                        ☆☆注意：请备注好您的姓名和电话，并截图发给小花~
                        花花收到款后24小时之内会更改您的状态，您可再次申请借款。
                    </Text>)}>其他还款方式</Item>
                </List>
                <Button  style={{margin:10}} type="primary"  onClick={()=>this._showRepayModal()}>确认还款</Button>
            </View>
        }
    }
    _showModal(title,desc){
        App.alert(title,desc)
    }
    _showRepayModal(){

    }
}
const styles = StyleSheet.create({
    dueDate:{
        width:rnScreen.width,
        paddingVertical:20,
        alignItems:'center',
        justifyContent:'center'
    },
    dueDateLabel:{
        width:100,
        height:100,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
    },
    dueDateText:{
        textAlign:'center',
        color:'#fff',
        fontSize:18
    },
    edge:{
        width:rnScreen.width,
        height:10,
        backgroundColor:'#aaa'
    }
})
export default inject('loan')(observer(LoanRepaymentNow))