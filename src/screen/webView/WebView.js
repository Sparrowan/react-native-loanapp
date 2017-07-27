import React,{Component} from 'react'
import { StyleSheet, View,WebView} from 'react-native';
import {NavBar} from '../../component/index'
class RegisterProtocol extends Component {
    render() {
        const {goBack,} = this.props.navigation
        return (
            <View style={[styles.container]}>
                <NavBar
                    title='注册协议'
                    leftIcon='angle-left'
                    leftPress={()=>goBack()}
                />
                <WebView
                 style={styles.webView}
                 source={{url:'http://test.cashpp.com/index.html#/protocol/register'}}
                />
            </View>
        );
    }
}
class MoreProducts extends Component {
    render() {
        const {goBack,} = this.props.navigation
        return (
            <View style={[styles.container]}>
                <NavBar
                    title='更多相关产品'
                    leftIcon='angle-left'
                    leftPress={()=>goBack()}
                />
                <WebView
                    style={styles.webView}
                    source={{url:'http://test.cashpp.com/index.html#/user/lead'}}
                />
            </View>
        );
    }
}
class LoanProtocol extends Component {

    render() {
        const {goBack,state} = this.props.navigation
        const id = state.params.loanId;
        return (
            <View style={[styles.container]}>
                <NavBar
                    title='更多相关产品'
                    leftIcon='angle-left'
                    leftPress={()=>goBack()}
                />
                <WebView
                    style={styles.webView}
                    source={{url:`http://test.cashpp.com/index.html#/protocol/loan/${id}`}}
                />
            </View>
        );
    }
}
export  {
    RegisterProtocol,MoreProducts,LoanProtocol
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
