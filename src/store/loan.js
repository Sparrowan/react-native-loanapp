import {observable, action,reaction,runInAction} from 'mobx'
import {getLoanStatus,getLoanRecords,loanApproveNext} from '../service/home/home.service'
import app from '../common/HttpTools'
class Loan{
    @observable loan = {
        steps:[],
        activeStepIndex:0
    }
    @observable curCard = null;
    @observable loanRecords = []
    async getLoanStatus(end){
        const res = await getLoanStatus();
        if(res.result){
            runInAction(()=>{
                this.loan = res.result;
                this.curCard = {
                    quota: res.result.amount,
                    tier: res.result.tier,
                    name:this.chooseCardName(res.result.tier)
                };
            })
            if(end){
                end()
            }
        }
        return {
            loan:this.loan,
            curCard:this.curCard
        }
    }
    async getLoanRecords(end){
        const res = await getLoanRecords();
        if(res.result){
            runInAction(()=>{
                this.loanRecords = res.result;
            })
            if(end){
                end()
            }
        }
    }
    async goNextStep(){
        const res = await loanApproveNext();
        if(res){
            return true
        }
        return false;
    }
    chooseCardName(tier) {
    let name = ''
    switch (tier){
        case 'GOLD':name = '金卡'
            break;
        case 'DIAMOND':name = '钻石卡'
            break;
        case 'PLATINUM':name = '铂金卡'
            break;
    }
    return name;
}

}
export default new Loan()