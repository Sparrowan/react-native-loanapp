import {Toast} from 'antd-mobile'
class Form{
    form = {}
    formValidate = false
    getFormFieldHasError(fieldName){
        return {}.hasOwnProperty.call(this.form,fieldName)?(this.form[fieldName].hasError===undefined?true:this.form[fieldName].hasError):true
    }
    getFormFieldValue(fieldName){
        return {}.hasOwnProperty.call(this.form,fieldName)?(this.form[fieldName].value===undefined?'':this.form[fieldName].value):''
    }
    getFormFieldData(fieldName){
        return {}.hasOwnProperty.call(this.form,fieldName)?(this.form[fieldName].data===undefined?{}:this.form[fieldName].data):{}
    }
    onFormFieldChange(fieldName,val){
        const form = this.form
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
        this.form = newForm
        this.formValidate = formValidate
    }
    onErrorClick(fieldName){
        const field = this.form[fieldName]
        if(field.hasError){
            Toast.info(field.err)
        }
    }
}
export {
    Form
}