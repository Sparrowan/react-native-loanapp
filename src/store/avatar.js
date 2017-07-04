import {observable, action,reaction,runInAction} from 'mobx'
import validator from 'validator'
class Avatar{
    form = {
        name:{
            hasError:false,
            value:'',
            rules:[
                {pattern:(val)=>val.trim().length>0,errMsg:'请输入您的姓名'}
            ]
        },
        idCard:{
            hasError:false,
            value:'',
            rules:[
                {pattern:(val)=>val.trim().length>0,errMsg:'请输入您的身份证'}
            ]
        }
    }
    init(){
        return this
    }
}
export default new Avatar()