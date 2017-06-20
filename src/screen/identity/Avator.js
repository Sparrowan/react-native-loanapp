import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import {NavBar} from '../../component/index'
export default class ImagePickerExample extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;
        const {goBack,navigate} = this.props.navigation
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="身份认证"
                    leftIcon="angle-left"
                    leftPress={()=>goBack()}
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