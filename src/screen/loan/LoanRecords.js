import React,{Component} from 'react'
import {observer} from 'mobx-react'
import { StyleSheet, View} from 'react-native';
import {NavBar,TabCell} from '../../component/index'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {LoanStatus} from './LoanStatus'

const titles = ['借款进度'];
const controllers = [
    {categoryId: 1, controller: LoanStatus},
]



@observer
class LoanRecords extends Component {
    render() {
        return (
            <View style={[styles.container]}>
                <NavBar
                    title='借款记录'
                />
                <ScrollableTabView
                    renderTabBar={() => <TabCell tabNames={titles}/>}
                    tabBarPosition='top'
                    scrollWithoutAnimation={false}
                >
                    {controllers.map((data, index) => {
                        let Component = data.controller;
                        return (
                            <Component
                                key={titles[index]}
                                tabLabel={titles[index]}
                                categoryId={data.categoryId}
                            />
                        )
                    })}
                </ScrollableTabView>

            </View>
        );
    }
}
export default LoanRecords
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
