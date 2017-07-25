import {observable, action,reaction,runInAction} from 'mobx'
import {login,getValidateCode,getUserCertStatus,getUserBindBankCard,changeBindCard,addNewBankCard} from '../service/user/user.base.service'
import app from '../common/HttpTools'
class User{
    @observable cert = { //验证信息

    }
    @observable cardInfo = { //卡信息和个人信息
        cardList:[],
        userInfo:{},
        activity:null
    }
    @observable newCard = { //新绑定的银行卡
        bankCode: '',
        bankCard: '',
        reservePhoneNumber: ''
    }
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
                this.cardInfo = res.result;
            })
        }
    }
    async bindCard(){
        const res = await changeBindCard({type:'loan',cardId:this.cardInfo.activity});
        if(res.msg === 'ok'){
          return true
        }
        return false
    }
    async addCard(){
        const res = await addNewBankCard(this.newCard.toJs());
        if(res.msg === 'ok'){
            return true
        }
        return false
    }
}
export default new User()