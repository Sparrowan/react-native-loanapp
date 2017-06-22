import React,{Component,PropTypes} from 'react';
import { Button, Image, View ,StyleSheet,Text} from 'react-native';
import {Picker,InputItem,Toast} from 'antd-mobile'
import {NavBar,Item,IPickerItem,VCode} from '../component/index'
import Icon from 'react-native-vector-icons/FontAwesome'
class IFormItem extends Component{
    static propTypes = {
        type:PropTypes.object, //类型,目前有picker,input,vcode
        formFiled:PropTypes.object, //表单域,
    }
    render(){
        const {type,formFiled} = this.props
        let content = ''
        switch (type.name){
            case 'input':
                    content = <View style={[styles.formItem,type.formItemStyle]}>
                        <View style={{flex:1,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                            {type.icon?<Icon name={type.icon.name||'phone'} size={type.icon.size||18} color={type.icon.color||'#4da6f0'}/>:<Text>{type.inputProps.title}</Text>}
                        </View>
                        <View style={{marginLeft:5,flex:3}}>
                            <InputItem
                                {...type.inputProps}
                                error={formFiled.error}
                                onErrorClick={formFiled.onErrorClick}
                                onChange={formFiled.onChange}
                                value={formFiled.value}
                            />
                        </View>
                    </View>
                break;
            case 'picker':
                content =  <View style={[{height:45},type.formItemStyle]}>
                    <Picker
                        {...type.pickerProps}
                        data={formFiled.data}
                        value={formFiled.value}
                        onChange={formFiled.onChange}
                    >
                        <IPickerItem>{type.pickerProps.title}</IPickerItem>
                    </Picker>
                </View>
                break;
            case 'vcode':
                content = <View style={[styles.formItem,type.formItemStyle]}>
                    <View style={{flex:1,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                        {type.icon?<Icon name={type.icon.name||'phone'} size={type.icon.size||18} color={type.icon.color||'#4da6f0'}/>:<Text>{type.inputProps.title}</Text>}
                    </View>
                    <View style={{marginLeft:5,flex:2}}>
                        <InputItem
                            {...type.inputProps}
                            error={formFiled.error}
                            onErrorClick={formFiled.onErrorClick}
                            onChange={formFiled.onChange}
                            value={formFiled.value}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <VCode style={styles.vcode} textStyle={{fontSize:18,color:'#fff'}} {...type.vCodeProps}/>
                    </View>
                </View>
        }
        return content
    }
}
const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: "#666"
    },
    formItem:{
        borderTopWidth:1,
        borderTopColor: "#f5f5f5",
        padding:10,
        height:45,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    vcode:{
        position:'absolute',
        right:20,
        top:0,
        backgroundColor:'#4da6f0'
    },
})
//必须传入一个一下类型的form
const defaultForm = {
    demo:{
        hasError:false,
        value:'',
        rules:[{pattern:(val)=>val.length>3,errMsg:'字符串长度大于三'}]
    },
}
const createForm = function (form) {
    return function (WrapperComponent) {
        class Form extends Component{
            constructor(props){
                super(props)
                this.state = {
                    form:form||defaultForm,
                    formValidate:false
                }
            }
            _getFormFieldHasError(fieldName){
                return {}.hasOwnProperty.call(this.state.form,fieldName)?(this.state.form[fieldName].hasError===undefined?true:this.state.form[fieldName].hasError):true
            }
            _getFormFieldValue(fieldName){
                return {}.hasOwnProperty.call(this.state.form,fieldName)?(this.state.form[fieldName].value===undefined?'':this.state.form[fieldName].value):''
            }
            _getFormFieldData(fieldName){
                return {}.hasOwnProperty.call(this.state.form,fieldName)?(this.state.form[fieldName].data===undefined?{}:this.state.form[fieldName].data):{}
            }
            _onFormFieldChange(fieldName,val){
                const form = this.state.form
                let newField = {...form[fieldName],hasError:false,value:val,err:''}
                let formValidate = true
                for (let rule of form[fieldName].rules){
                    if(!rule.pattern(val)){
                        newField.hasError = true
                        newField.err = rule.errMsg
                        break;
                    }
                }
                let newForm = {
                    ...form,
                    [fieldName]:newField
                }
                for(let name in newForm){
                    if(newForm[name].hasError){
                        formValidate = false
                        break;
                    }else if(!newForm[name].value){
                        formValidate = false
                        break;
                    }else if(Array.isArray(newForm[name].value)&&newForm[name].value.length===0){
                        formValidate = false
                        break;
                    }
                }
                this.setState({
                    form:newForm,
                    formValidate
                })
            }
            _onErrorClick(fieldName){
                const field = this.state.form[fieldName]
                if(field.hasError){
                    Toast.info(field.err)
                }
            }
            _getFormFieldProps(fieldName){
                return {
                    data:this._getFormFieldData(fieldName),
                    error:this._getFormFieldHasError(fieldName),
                    value:this._getFormFieldValue(fieldName),
                    onChange:this._onFormFieldChange.bind(this,fieldName),
                    onErrorClick:this._onErrorClick.bind(this,fieldName)
                }
            }
            render(){
                const form = this.state.form
                const formProps = {
                    ...{form},
                    getFormFieldProps:this._getFormFieldProps.bind(this),
                    formValidate:this.state.formValidate
                }
                return <WrapperComponent {...this.props} form={formProps}/>
            }
        }
        return Form
    }
}
export {
    IFormItem,createForm
}
