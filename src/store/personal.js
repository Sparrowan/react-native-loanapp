import {observable, action,reaction,runInAction} from 'mobx'
import validator from 'validator'
import { district,findCityByIndex} from '../common/ChinaCity'
class Personal{
    form = {
        city:{
            hasError:false,
            data:district,
            value:[],
            rules:[]
        },
        liveAddress:{
            hasError:false,
            value:'',
            rules:[
                {pattern:(val)=>val.trim().length>0,errMsg:'请输入居住地址'}
            ]
        },
        marriage:{
            data:[{label:'已婚',value:'0'},{label:'未婚',value:'1'}],
            hasError:false,
            value:[],
            rules:[
                {pattern:(val)=>val.length>0,errMsg:'请选择婚姻状况'}
            ]
        },
        liveTime:{
            data:[{label:'3-6个月',value:'0'},{label:'1年',value:'1'}],
            hasError:false,
            value:[],
            rules:[
                {pattern:(val)=>val.length>0,errMsg:'请选择居住时间'}
            ]
        },
        education:{
            data:[{label:'本科',value:'0'},{label:'大专',value:'1'}],
            hasError:false,
            value:[],
            rules:[
                {pattern:(val)=>val.length>0,errMsg:'请选择教育背景'}
            ]
        },
        career:{
            data:[{label:'白领',value:'0'},{label:'学生',value:'1'}],
            hasError:false,
            value:[],
            rules:[
                {pattern:(val)=>val.length>0,errMsg:'请选择职业'}
            ]
        },
        incomeMonth:{
            data:[{label:'1000以下',value:'0'},{label:'2000-3000',value:'1'}],
            hasError:false,
            value:[],
            rules:[
                {pattern:(val)=>val.length>0,errMsg:'请选择月收入'}
            ]
        },
        QQ:{
            hasError:false,
            value:'',
            rules:[
                {pattern:(val)=>val.trim().length>0,errMsg:'请输入您的QQ'}
            ]
        }
    }
    init(){
        return this
    }
}
export default new Personal()