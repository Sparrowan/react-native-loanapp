import {get,post} from '../../common/HttpTools'
const getCardList =  function(timeout){
    return get({
        url:'/rest/loan/apply/start',
        timeout
    })
}
const applyLoan = function (data) {
    return post({
        url:'/rest/loan/apply/applied',
        data:data
    })
}
export {
    getCardList,applyLoan
}