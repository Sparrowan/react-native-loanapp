import {observable, action,reaction,runInAction} from 'mobx'
import {login,getValidateCode,getUserCertStatus} from '../service/user/user.base.service'
import {Toast} from 'antd-mobile'
import App from '../common/HttpTools'
class User{
    @observable cert = {}
    async userLogin(data,callback){
        const result = await login(data);
        if(result.msg === 'ok'){ //登录成功
            App.setLoginToken(result.token)
            if(callback){
                callback()
            }
        }else {
            Toast.info(result.msg)
        }
    }
    async userGetVCode(params,callback){
        const result = await getValidateCode(params);
        if(result.msg === 'ok'){ //获取短信验证码成功
            if(callback){
                callback()
            }
        }else {
            Toast.info(result.msg,1)
        }
    }
    async getUserCert(){
        const result = await getUserCertStatus();
        if(result.data){
            runInAction(()=>{
                this.cert = result.data;
            })
        }
    }
}
export default new User()