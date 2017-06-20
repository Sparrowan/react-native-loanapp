import React,{Component} from 'react'
import { StyleSheet, Image, View,Animated,Dimensions,WebView} from 'react-native';
import {NavBar} from '../../component/index'
class RegisterProtocol extends Component {
    // static LoanApplyPopup = LoanApplyPopup
    constructor(props){
        super(props)
        this.state = {
            scrollY:new Animated.Value(0),
        }
    }
    render() {
        const {goBack,state} = this.props.navigation
        return (
            <View style={[styles.container]}>
                <NavBar
                    title='注册协议'
                    leftIcon='angle-left'
                    leftPress={()=>goBack()}
                />
                <WebView
                    style={styles.webView}
                 source={{url:'http://test.cashpp.com/protocol/register'}}
                />
            </View>
        );
    }
}
class PhoneValidate extends Component {
    // static LoanApplyPopup = LoanApplyPopup
    constructor(props){
        super(props)
        this.state = {
            scrollY:new Animated.Value(0),
        }
    }
    render() {
        const {goBack,state} = this.props.navigation
        return (
            <View style={[styles.container]}>
                <NavBar
                    title='手机认证'
                    leftIcon='angle-left'
                    leftPress={()=>goBack()}
                />
                <WebView
                    style={styles.webView}
                    source={{url:'http://test.cashpp.com/protocol/register'}}
                />
            </View>
        );
    }
}
export  {
    RegisterProtocol,PhoneValidate
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webView:{
        flex:1
    }
});
