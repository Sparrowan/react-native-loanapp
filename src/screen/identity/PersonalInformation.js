import React from 'react';
import { Image, View ,StyleSheet,Text,} from 'react-native';
import {NavBar,IFormItem,createForm} from '../../component/index'
import {Button,Toast} from 'antd-mobile'
class PersonalInformation extends React.Component{
    componentDidMount(){
        this.props.personal.getUserDetail()
    }
    render(){
        const {goBack} = this.props.navigation
        const {getFormFieldProps,formValidate} = this.props.form
        return <View style={{flex:1,backgroundColor:'#f3f3f3'}}>
            <NavBar
                title='个人信息'
                leftIcon='angle-left'
                leftPress={()=>goBack()}
            />
            <Text style={styles.title}>{"居住信息"}</Text>
            <IFormItem
                type={{name:'picker',pickerProps:{title:'现居城市'}}}
                formFiled={getFormFieldProps('city')}
            />
            <IFormItem
                type={{formItemStyle:{padding:0},name:'input',inputProps:{title:'详细地址',placeholder:'请输入您的详细地址'}}}
                formFiled={getFormFieldProps('liveAddress')}
            />
            <IFormItem
                type={{name:'picker',pickerProps:{title:'居住时长',cols:1}}}
                formFiled={getFormFieldProps('liveTime')}
            />
            <Text style={styles.title}>{"学历职业信息"}</Text>
            <IFormItem
                type={{name:'picker',pickerProps:{title:'最高学历',cols:1}}}
                formFiled={getFormFieldProps('education')}
            />
            <IFormItem
                type={{name:'picker',pickerProps:{title:'职业',cols:1}}}
                formFiled={getFormFieldProps('career')}
            />
            <IFormItem
                type={{name:'picker',pickerProps:{title:'月收入',cols:1}}}
                formFiled={getFormFieldProps('incomeMonth')}
            />
            <Text style={styles.title}>{"其他"}</Text>
            <IFormItem
                type={{name:'picker',pickerProps:{title:'婚姻状况',cols:1}}}
                formFiled={getFormFieldProps('marriage')}
            />
            <IFormItem
                type={{formItemStyle:{padding:0},name:'input',inputProps:{title:'QQ',type:'number',placeholder:'请输入您的QQ'},icon:{name:'qq'}}}
                formFiled={getFormFieldProps('QQ')}
            />
            <View style={{marginTop:40}}>
                <Button onClick={()=>Toast.info('ok')} disabled={!formValidate}>提交</Button>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: "#666"
    },
})
export default createForm('personal')(PersonalInformation)