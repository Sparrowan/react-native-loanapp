import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {AppRegistry,StyleSheet,View,Image,Animated,Text} from 'react-native'
@observer
class Card extends Component {
    render() {
        const { cardInfo} = this.props
        return (
            <View style={[styles.card,styles.shadow]}>
                {this._renderImage()}
                    <View style={styles.quota}>
                        <Text style={styles.quotaTitle}>
                           ¥{cardInfo ? cardInfo.quota : ''}
                        </Text>
                        <Text style={{paddingTop:10,paddingLeft:5}}>(当前可用额度)</Text>
                    </View>
                    <View style={styles.name}>
                        <Text style={{fontSize:16}}>
                            {cardInfo ? cardInfo.name : ''}
                        </Text>
                    </View>
            </View>
        );
    }
    _renderImage(){
        let img = ''
        switch (this.props.cardInfo.tier){
            case 'GOLD':img = <Image source={require('../resource/card/card_gold.jpg')} style={styles.img}/>
                break;
            case 'DIAMOND':img = <Image source={require('../resource/card/card_diamond.jpg')} style={styles.img}/>
                break;
            case 'PLATINUM':img = <Image source={require('../resource/card/card_platinum.jpg')} style={styles.img}/>
                break;
        }
        return img;
    }
}

export default Card;
AppRegistry.registerComponent('card',()=>Card)
const styles = StyleSheet.create({
    card: {
        position:'relative',
        margin: 10,
        borderRadius: 8,
    },
    shadow: {
        elevation: 16,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: {
            height: 8,
        },
    },
    img:{
        height: 175,
        width: 356,
        borderRadius: 8,
    },
    quota:{
        position:'absolute',
        top:70,
        right:40,
        backgroundColor: 'transparent',
        flexDirection:'row',
    },
    quotaTitle:{
        fontSize:24,
        fontWeight:"bold"
    },
    name:{
        position:'absolute',
        top:100,
        right:40,
        backgroundColor: 'transparent',
        marginTop:10
    },
})