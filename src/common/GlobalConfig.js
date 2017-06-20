import {Dimensions} from 'react-native'
import {Constants} from 'expo'
const BaseUrl = 'http://test.cashpp.com'
const ClientWidth = Dimensions.get('window').width
const CommonPageStyle = {
    flex: 1,
    backgroundColor: "#f3f3f3"
}
export {
    BaseUrl,ClientWidth,CommonPageStyle
}