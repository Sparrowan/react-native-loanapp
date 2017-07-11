import {observable, action} from 'mobx'
import {Modal} from 'antd-mobile'
const alert = Modal.alert;
class App {
    @observable barStyle = 'light-content'
    @action
    updateBarStyle = style => {
        this.barStyle = style
    }
    //全局显示提示框
    //title:标题,string
    //desc:描述信息,string或reactdom
    //buttons:按钮数组 {text:"",onPress:,style:}
    showModal(title,desc,buttons){
        alert(title,desc,buttons)
    }
}

export default new App()