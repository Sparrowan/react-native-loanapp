import {Dimensions} from 'react-native'
const BaseUrl = 'http://test.cashpp.com/rest'
const CLIENTWIDTH = Dimensions.get('window').width
const CLIENTHEIGHT = Dimensions.get('window').height
const CommonPageStyle = {
    flex: 1,
    backgroundColor: "#f3f3f3"
}
export {
    BaseUrl,CLIENTHEIGHT,CLIENTWIDTH,CommonPageStyle
}