import {get,post} from '../../common/HttpTools'
const getCardList =  function(timeout){
    return get({
        url:'/loan/apply/start',
        timeout
    })
}
const applyLoan = function (data) {
    return post({
        url:'/loan/apply/applied',
        data:data
    })
}
const getLoanStatus = function () {
    return get({
        url:'/loan/apply/status'
    })
}
export {
    getCardList,applyLoan,getLoanStatus
}