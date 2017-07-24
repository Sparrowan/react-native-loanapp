import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import { StyleSheet, View,Text} from 'react-native';
import {IRefreshScrollView,ICard} from '../../component/index'
import {Steps} from 'antd-mobile'
const Step = Steps.Step
@observer
    @inject('loan')
class LoanStatus extends Component{
    componentDidMount(){
        this.props.loan.getLoanStatus()
    }
    render(){
        // const {status,curCard}  = this.props.loan
        // const {steps,activeStepIndex} = status
        // let content = []
        // if(false){
        //     const stepsArr = steps.slice();
        //     for(let i = 0;i<stepsArr.length;i++){
        //         let step = stepsArr.find((s)=>s.index === i)
        //         content.push(
        //             <Step key={step.title} status={i} title={<View style={{flex:1,justifyContent:'center',alignItems:'space-between'}}>
        //                 <Text style={styles.bold}>{step.title}</Text>
        //                 <Text style={styles.bold}>{step.time}</Text>
        //             </View>} description={step.content}>
        //             </Step>
        //         )
        //     }
        // }

        return <View style={{flex:1,backgroundColor:'#fff'}}>
            {/*<IRefreshScrollView*/}
                {/*style={{flex:1}}*/}
                {/*onRefresh={(end) => this.props.loan.getLoanStatus(end)}*/}
            {/*>*/}
                {/*<ICard cardInfo={curCard}/>*/}
                {/*<Steps current={activeStepIndex}>*/}
                    {/*{content}*/}
                {/*</Steps>*/}
            {/*</IRefreshScrollView>*/}
        </View>
    }
}
const  styles = StyleSheet.create({
    bold:{
        fontSize:14,
        fontWeight:'bold'
    }
})
export {
    LoanStatus
}