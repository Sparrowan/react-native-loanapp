import React,{Component} from 'react'
import {inject} from '../store/index'
import {StyleSheet,Text} from 'react-native'
import {Button} from 'antd-mobile'
@inject('user')
class VCode extends Component{
    constructor(props){
        super(props)
        this.state = {
            value:this.props.defaultValue||'获取验证码',
            countDown:this.props.countDown||60, //倒计时,单位秒,number
            disabled:false
        }
        this.timer = null
        this._onClick = this._onClick.bind(this)
        this._startTimer = this._startTimer.bind(this)
    }
    render(){
        const {style,textStyle} = this.props
        return <Button style={[styles.vcode,style]} disabled={this.state.disabled}  onClick={this._onClick}><Text style={textStyle}>{this.state.value}</Text></Button>

    }
    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }
    _onClick(){
        this.props.onSend(this._startTimer)
    }
    _startTimer(){
        this.setState({
            disabled:true
        })
        this.timer = setInterval(()=>{
            let countDown = this.state.countDown
            if(countDown<=0){
                this.setState({
                    countDown:this.props.countDown||60,
                    value:this.props.defaultValue||'获取验证码',
                    disabled:false
                })
                clearInterval(this.timer)
            }else {
                this.setState({
                    value:countDown,
                    countDown:countDown-1
                })
            }
        },1000)
    }
}
export {
    VCode
}
const styles = StyleSheet.create({
    vcode:{
        width:124,
        paddingHorizontal:10,
        paddingVertical:5,
        alignItems:'center',
        justifyContent:'center'
    }
})