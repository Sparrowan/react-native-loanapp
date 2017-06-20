import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import { StyleSheet, Text, View,AppRegistry,Animated,ScrollView} from 'react-native';
import Item from '../../component/Item'
import NavBar from '../../component/NavBar'
import {IPickerItem} from '../../component/IPicker'
import {Picker} from 'antd-mobile'
import { district,findCityByIndex} from '../../common/ChinaCity'
@observer
@inject('identity')
class UserSetting extends Component{
    constructor(props){
        super(props)
        this.state = {
            pickerValue:[]
        }
    }
    componentDidMount(){
    }
    render(){
        const {navigate,state,goBack} = this.props.navigation
        return <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
            <NavBar
                title="设置"
                leftIcon="angle-left"
                leftPress={()=>goBack()}
                rightIcon='apple'
            />
            <ScrollView>
                <Item name="通用" first={true}/>
                <Item name="关于饿了么" first={true} />
                <Item.Button name="退出登录" first={true}/>
                <Item.Button name={findCityByIndex(this.state.pickerValue)} first={true}/>
                <Picker
                    data={district}
                    title="选择地区"
                    value={this.state.pickerValue}
                    onChange={v => this.setState({ pickerValue: v })}
                >
                    <IPickerItem>居住地址</IPickerItem>
                </Picker>
            </ScrollView>
        </View>
    }
}
export {UserSetting}
AppRegistry.registerComponent('identity',()=>UserSetting)
const styles = StyleSheet.create({

})