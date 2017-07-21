import React from 'react';
import { Button, Image, View,Text,StyleSheet} from 'react-native';
import { ImagePicker } from 'expo';
import {NavBar} from '../../component/index'
import store from '../../store/index'
import {IFormItem,createForm} from '../../component/IFormItem'
class Avatar extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;
        const {goBack,navigate} = this.props.navigation
        const {getFormFieldProps,formValidate} = this.props.form
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="身份认证"
                    leftIcon="angle-left"
                    leftPress={()=>goBack()}
                />
                <Text style={styles.title}>{"居住信息"}</Text>
                <IFormItem
                    type={{formItemStyle:{padding:0},name:'input',inputProps:{title:'姓名',placeholder:'请输入您的姓名'}}}
                    formFiled={getFormFieldProps('name')}
                />
                <IFormItem
                    type={{formItemStyle:{padding:0},name:'input',inputProps:{title:'身份证',placeholder:'请输入您的身份证'}}}
                    formFiled={getFormFieldProps('idCard')}
                />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        title="Pick an image from camera roll"
                        onPress={this._pickImage}
                    />
                    {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
            </View>
        );
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
}
const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: "#666"
    },
})
export default createForm('personal')(Avatar)