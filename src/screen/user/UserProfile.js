import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import NavBar from '../../component/NavBar'
import Item from '../../component/Item'
import {inject} from '../../store/index'
import {observer} from 'mobx-react'
import App from '../../common/HttpTools'
import {CLIENTWIDTH} from '../../common/GlobalConfig'
//FontAwesome
class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            isLogin:false
        }
    }
    componentWillMount(){
        App.isLogin().then((res)=>{
            this.setState({
                isLogin:res
            })
        })
    }
    componentDidMount(){
        this.props.user.getUserCert()
    }
    render(){
        const {navigate} = this.props.navigation
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="账户信息"
                />
                {!this.state.isLogin? <Image
                    style={{width: CLIENTWIDTH, height: 230, alignItems: 'center', backgroundColor: 'transparent'}}
                    source={require('../../resource/img_my_head.png')}
                >
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={styles.avatarContainer}>
                            <Image
                                style={{width: 80, height: 80}}
                                source={require('../../resource/img_default_avatar.png')}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.loginContainer}
                            onPress={()=>navigate('UserRegister')}
                        >
                            <Text style={{color: 'white'}}>点击登录</Text>
                        </TouchableOpacity>
                    </View>
                </Image>:
                    <ScrollView>
                    <Item name="头像" avatar={2} first={true} onPress={()=>navigate('avatar')}/>
                    <Item name="用户名" disable={true} subName="岳生煜"/>
                    <Text style={styles.title}>{"账号绑定"}</Text>
                    <Item name="手机"  icon="mobile" subName="135****0418"/>
                    <Text style={styles.title}>{"安全设置"}</Text>
                    <Item name="个人信息" subName="未认证" subNameColor={'red'} onPress={()=>navigate('Personal')}/>
                    <Item name="手机认证" subName="未认证"/>
                    <Item name="紧急联系人" subName="未认证" onPress={()=>navigate('Relation')}/>
                    <Item name="立即拿钱" onPress={()=>navigate('LoanApply',{from:'UserProfile'})}/>
                    <Item name="注册" onPress={()=>navigate('UserRegister')}/>
                </ScrollView>

                }
            </View>
        )
    }
}
export default inject('user')(observer(UserProfile))
const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: "#666"
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    loginContainer: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2
    },

})
