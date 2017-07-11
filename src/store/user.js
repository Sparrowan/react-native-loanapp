import {observable, action,reaction,runInAction} from 'mobx'
import {login,getValidateCode} from '../service/user/user.base.service'
class User{
    async userLogin(data,callback){
        const result = await login(data);
        if(result.msg === 'ok'){ //登录成功
            if(callback){
                callback()
            }
        }
    }
    async userGetVCode(params,callback){
        const result = await getValidateCode(params);
        if(result.msg === 'ok'){ //获取短信验证码成功
            if(callback){
                callback()
            }
        }
    }
}
export default new User()