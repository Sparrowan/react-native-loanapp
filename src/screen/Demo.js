import React,{Component} from 'react'
import {inject} from '../store/'
import { StyleSheet, Text, View,AppRegistry,Image,Animated,Dimensions} from 'react-native';
import { Constants,BlurView,LinearGradient} from 'expo';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGES = [
    {
        title: 'A treat for your tastebuds',
        backgroundColor: '#9E00FF',
        gradient: ['#F44336', '#FFEB3B'],
        image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?fit=crop&w=600&h=600'
    },
    {
        title: 'Made from fresh ingredients',
        backgroundColor: '#FFBB00',
        gradient: ['#2196F3', '#FFEB3B'],
        image: 'https://images.unsplash.com/photo-1444952483853-7c36e902e722?fit=crop&w=600&h=600'
    },
    {
        title: 'The pizza you\'ll never forget',
        backgroundColor: '#5925FF',
        gradient: ['#E91E63', '#FFEB3B'],
        image: 'https://images.unsplash.com/photo-1449785227466-10687c63e194?fit=crop&w=600&h=600'
    },
]
class CardList extends Component {
    state = {
        scroll: new Animated.Value(0),
    };
    render() {
        const position = Animated.divide(this.state.scroll, PAGE_WIDTH);
        const backgroundColor = position.interpolate({
            inputRange: PAGES.map((_, i) => i),
            outputRange: PAGES.map(p => p.backgroundColor),
        });

        console.log(PAGE_WIDTH)

        return (
            <View style={styles.container}>
                {PAGES.map((page, i) => (
                    <Animated.Image
                        key={i}
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                opacity: position.interpolate({
                                    inputRange: PAGES.map((_, i) => i),
                                    outputRange: PAGES.map((page, inputIndex) => inputIndex === i ? 1 : 0)
                                }),
                            }
                        ]}
                        source={{ uri: page.image }}
                    />
                ))}
                <BlurView
                    intensity={50}
                    style={StyleSheet.absoluteFill}
                />
                <Animated.View style={[ StyleSheet.absoluteFill, { backgroundColor, opacity: 0.3 } ]} />
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [ { nativeEvent: { contentOffset: { x: this.state.scroll } } } ],
                    )}
                >
                    {PAGES.map((page, i) => (
                        <View style={styles.page} key={i}>
                            <LinearGradient
                                colors={page.gradient}
                                style={[ styles.card, styles.shadow ]}
                            >
                                <Text style={styles.title}>{page.title}</Text>
                            </LinearGradient>
                            <Animated.View style={[ styles.frame, styles.shadow, { transform: [{ translateX: Animated.multiply(Animated.add(position, -i), -100) }] } ]}>
                                <Animated.Image
                                    source={{ uri: page.image }}
                                    style={styles.photo}
                                />
                            </Animated.View>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
        );
    }
}
export default CardList
AppRegistry.registerComponent('card-list',()=>CardList)
const styles = StyleSheet.create({
    test:{
      position:'absolute',
      top:0,
      right:0
    },
    container: {
        flex: 1,
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
    title: {
        fontSize: PAGE_WIDTH / 12,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'transparent'
    },
    page: {
        width: PAGE_WIDTH,
        paddingTop: Constants.statusBarHeight + 48,
    },
    card: {
        position: 'absolute',
        margin: 48,
        left: 24,
        bottom: 72,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 140,
    },
    frame: {
        position: 'absolute',
        left: 0,
        bottom: 24,
        borderRadius: 8,
        height: 160,
        width: 160,
        margin: 24,
    },
    photo: {
        flex: 1,
        borderRadius: 8,
    },
});
