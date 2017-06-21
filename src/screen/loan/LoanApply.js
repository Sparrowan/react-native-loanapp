import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import { StyleSheet, Image, View,AppRegistry,Animated,Dimensions,Text,Easing} from 'react-native';
import { Button,Popup,Picker} from 'antd-mobile';
import {IRefreshScrollView,ICard,NavBar,PopupContent} from '../../component/index'
@inject('home')
@observer
class LoanApply extends Component {
    // static LoanApplyPopup = LoanApplyPopup
    constructor(props){
        super(props)
        this.state = {
            scrollY:new Animated.Value(0),
        }
        this._showApplyPopup = this._showApplyPopup.bind(this)
    }
    componentDidMount(){
        this.props.home.init()
    }
    render() {
        const {home,navigation}  = this.props
        const {navigate} = navigation
        return (
            <View style={[styles.container]}>
                <NavBar
                    title='快速借款'
                    rightIcon='user-o'
                    rightIconSize={18}
                    rightPress={()=>navigate('UserProfile')}
                />
                <IRefreshScrollView
                    style={styles.cardList}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    onRefresh={(end) => home.init(end)}
                >

                    {
                        home.cardList.slice().length>0&&home.cardList.slice().map((card,i)=>{
                            return <ICard cardInfo={card} key={i} />
                        })
                    }
                </IRefreshScrollView>

                <Button style={styles.applyBtn} onClick={this._showApplyPopup}><Text style={{fontSize:12,color:'#fff'}}>立即拿钱</Text></Button>
            </View>
        );
    }
    _renderFixedHeader(){

    }
    _showApplyPopup(){
        Popup.show(<PopupContent {...this.props}/>,{
            animationType:'slide-up'
        })
    }
}
export default LoanApply
AppRegistry.registerComponent('loanApply',()=>LoanApply)
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