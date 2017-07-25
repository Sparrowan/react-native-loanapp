import {observable, action,reaction,runInAction} from 'mobx'
import {login,getValidateCode,getUserCertStatus,getUserBindBankCard} from '../service/user/user.base.service'
import app from '../common/HttpTools'

class User{
    @observable cert = {}
    @observable cardList = []
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
    async getUserCert(){
        const result = await getUserCertStatus();
        if(result.result){
            runInAction(()=>{
                this.cert = result.result;
            })
            return false
        }else if(result.needLogin){
            return true
        }
    }
    async getBankCards(){
        const res = await getUserBindBankCard();
        if(res.result){
            app.test(res.result)
            runInAction(()=>{
                this.cardList = res.result;
            })
        }
    }
}
export default new User()