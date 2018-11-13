import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { List } from "antd-mobile-rn";
import { PublicStyles } from '../../utils/publicStyleModule';
import Avatar from "../../components/public/avatar";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";

const Item = List.Item

@connect(
    ({ app: { user: {
        login,
        userInfo,
    }}}) => ({
        login,
        userInfo,
    }),
)
export default class UserIndex extends Component {
    goOrderList(){
        this.props.navigation.navigate('OrderList')
    }
    render() {
        return <View style={PublicStyles.ViewMax}>
            {
                this.top()
            }
            {
                this.mid()
            }
            {
                this.bot()
            }
        </View>;
    }

    top() {
        const { login, userInfo, navigation } = this.props;
        const { nickname, avatar } = userInfo || {}
        return (
            <TouchableOpacity
                style={[PublicStyles.rowBetweenCenter, styles.topWarp]}
                activeOpacity={.8}
                onPress={() => {
                    navigation.navigate(login ? "UserInfo" : "UserLogin")
                }}
            >
                <View style={PublicStyles.rowCenter}>
                    <Avatar
                        avatar={avatar}
                        size={60}
                        otherStyle={{
                            marginRight: 15,
                        }}
                    />
                    <Text style={[PublicStyles.boldTitle, { fontSize: 20 }]}>
                        {
                            login ? nickname : "点击登录"
                        }
                    </Text>
                </View>
                <View style={PublicStyles.rowCenter}>
                    <Text style={PublicStyles.descFour9}>设置</Text>
                    <EntypoIcon
                        name="chevron-small-right"
                        size={24}
                        color="#CCCCCC"
                    />
                </View>
            </TouchableOpacity>
        )
    }

    mid() {
        const orderList = [
            {
                img: require('../../images/user/state_new.png'),
                title: '待付款',
                link:()=>{
                    this.props.navigation.navigate('OrderList',{state_type:'state_new'})
                }
            }, {
                img: require('../../images/user/state_pay.png'),
                title: '待发货',
                link:()=>{
                    this.props.navigation.navigate('OrderList',{state_type:'state_pay'})
                }
            }, {
                img: require('../../images/user/state_send.png'),
                title: '已完成',
                link:()=>{
                    this.props.navigation.navigate('OrderList',{state_type:'state_success'})
                }
            }, {
                img: require('../../images/user/state_unevaluate.png'),
                title: '待评价',
                link:()=>{
                    this.props.navigation.navigate('EvaluateList')
                }
            }, {
                img: require('../../images/user/state_refund.png'),
                title: '退款售后',
                link:()=>{
                    this.props.navigation.navigate('RefundList')
                }
            }
        ]
        return (
            <View style={{ marginVertical: 10 }}>
                <List>
                    <Item extra={(<Text style={PublicStyles.descFour9}>全部订单</Text>)} arrow="horizontal" onClick={() => {
                        this.goOrderList()
                    }}>
                        <Text style={PublicStyles.boldTitle}>我的订单</Text>
                    </Item>
                </List>
                <View style={styles.midList}>
                    {
                        orderList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.midItem}
                                onPress={() => {
                                    item.link()
                                }}
                            >
                                <Image style={styles.midImg} source={item.img} />
                                <Text style={PublicStyles.descTwo6}>{item.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    bot() {
        const botList = [
            {
                img: require('../../images/user/address.png'),
                title: '地址管理',
                path: () => {
                    this.props.navigation.navigate('UserAddressList')
                }
            }, {
                img: require('../../images/user/collect.png'),
                title: '商品收藏',
                path: () => {
                }
            }
        ]
        return (
            <List>
                {
                    botList.map((item, index) => (
                        <Item
                            key={index}
                            // thumb={item.img}
                            arrow="horizontal"
                            onClick={() => {
                                item.path()
                            }}
                        >
                            <View style={PublicStyles.rowCenter}>
                                <Image style={styles.botImg} source={item.img} />
                                <Text style={PublicStyles.title}>{item.title}</Text>
                            </View>
                        </Item>
                    ))
                }
            </List>
        )
    }
}

const styles = StyleSheet.create({
    topWarp: {
        height: 100,
        paddingHorizontal: 15,
        backgroundColor: '#fff'
    },
    midList: {
        flexDirection: 'row',
        alignItems: "center",
        height: 75,
        backgroundColor: '#fff'
    },
    midItem: {
        flex: 1,
        alignItems: "center"
    },
    midImg: {
        width: 22,
        height: 22,
        marginBottom: 9
    },
    botImg: {
        width: 22,
        height: 22,
        marginRight: 10
    },
});
