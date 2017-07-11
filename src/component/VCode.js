import React,{Component,PropTypes} from 'react'
import {inject} from '../store/index'
import {BaseUrl} from '../common/GlobalConfig'
import {StyleSheet,Text,Image,View} from 'react-native'
import {Button} from 'antd-mobile'
@inject('user')
class VCode extends Component{
    constructor(props){
        super(props)
        this.state = {
            value:this.props.defaultValue||'获取短信验证码',
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
                    value:this.props.defaultValue||'获取短信验证码',
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
class VCodeImg extends Component{
    static propTypes = {
        defaultValue:PropTypes.string,
        style:PropTypes.object,
        textStyle:PropTypes.object,
        onSend:PropTypes.func,
    }
    constructor(props){
        super(props);
        this.state = {
            value:this.props.defaultValue||'获取图片验证码',
            imgUrl:'',
            type:'text'
        }
        this._onClick = this._onClick.bind(this);
        this._getInternetImg = this._getInternetImg.bind(this)
    }
    render(){
        const {style={},textStyle={}} = this.props
        return this.state.type==='text'?<Button style={[styles.vcode,style]}   onClick={this._onClick}>
            <Text style={[styles.text,textStyle]}>{this.state.value}</Text>
        </Button>:<View style={[styles.imgCode,style]}>
            <Image source={{uri:this.state.imgUrl}} style={{width:150,height:40}} resizeMode={Image.resizeMode.contain}/>
            {/*<Text style={{position:'absolute',top:0,right:0}}>{this.state.imgUrl}</Text>*/}
        </View>

    }
    _onClick(){
        this.props.onSend(this._getInternetImg);
    }
    _getInternetImg(phone){
        this.setState({
            imgUrl:BaseUrl+ '/rest/user/public/verifyCode?phone=' + phone + '&time=' + Date.now(),
            type:'img'
        })
    }
}
export {
    VCode,VCodeImg
}
const styles = StyleSheet.create({
    vcode:{
        width:124,
        height:40,
        backgroundColor:'#4da6f0',
        paddingHorizontal:10,
        paddingVertical:5,
        alignItems:'center',
        justifyContent:'center'
    },
    imgCode:{
        width:150,
        height:40,
        paddingHorizontal:10,
        paddingVertical:5,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        flex:1
    }
})