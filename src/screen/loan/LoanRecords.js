import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import { StyleSheet, Image, View,AppRegistry,Animated,Dimensions,Text,Easing} from 'react-native';
import { Button,Popup,Picker} from 'antd-mobile';
import {IRefreshScrollView,ICard,NavBar,PopupContent} from '../../component/index'
@inject('home')
@observer
class LoanRecords extends Component {
    // static LoanApplyPopup = LoanApplyPopup
    constructor(props){
        super(props)
        this.state = {
            scrollY:new Animated.Value(0),
        }
    }
    render() {
        return (
            <View style={[styles.container]}>
                <NavBar
                    title='借款记录'
                />
                <IRefreshScrollView
                    style={styles.cardList}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                >
                </IRefreshScrollView>

            </View>
        );
    }
    _renderFixedHeader(){

    }
}
export default LoanRecords
AppRegistry.registerComponent('LoanRecords',()=>LoanRecords)
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0398ff",
        paddingTop:30,
        height: 40,
        paddingHorizontal: 16
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardList:{
        flex:1,
        width:375,
    },
    applyBtn:{
        position:'absolute',
        left:Dimensions.get('window').width/2-23,
        bottom:0,
        width:58,
        height:58,
        borderRadius:29,
        paddingVertical:20,
        backgroundColor:'#0398ff',
        alignItems:'center',
        justifyContent:'center',
    },
});
