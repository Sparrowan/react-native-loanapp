import {observable, action,reaction,runInAction} from 'mobx'
import {getLoanStatus} from '../service/home/home.service'
class Loan{
    @observable status = {}
    @observable curCard = {}
    async getLoanStatus(end){
        const res = await getLoanStatus();
        if(res.result){
            runInAction(()=>{
                this.status = res.result;
                this.curCard = {
                    quota: res.result.amount,
                    tier: res.result.tier,
                    name:this.chooseCardName(res.result.tier)
                };
                if(end){
                    end()
                }
            })
        }
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