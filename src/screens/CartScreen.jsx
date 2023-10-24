import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({ navigation, route }) => {
    const {
        CartList,
        CartPrice,
        decrementCartItem,
        incrementCartItem,
        AddOrderHistoryFromCart,
        calculateCartPrice }
        = useStore(state => state);
    const tabBarHeight = useBottomTabBarHeight();
    const buttonHandler = () => {
        navigation.push('Payment')
    }

    const incrementCartItemHandler = (id, size) => {
        incrementCartItem(id, size)
        calculateCartPrice()
    }
    const decrementCartItemHandler = (id, size) => {
        decrementCartItem(id, size)
        calculateCartPrice()
    }

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <HeaderBar title="Carrito"></HeaderBar>
                    <View style={styles.ItemContainer}>

                        {
                            CartList.length == 0
                                ? <EmptyListAnimation title='Carrito Vacio' />
                                : (<View style={styles.ListItemContainer}>
                                    {
                                        CartList.map((data) => {
                                            return (
                                                <TouchableOpacity
                                                    key={data.id}
                                                    onPress={() => {
                                                        navigation.push('Details',
                                                            {
                                                                index: data.index,
                                                                id: data.id,
                                                                type: data.type,

                                                            });
                                                    }}>
                                                    <CartItem
                                                        id={data.id}
                                                        name={data.name}
                                                        roasted={data.roasted}
                                                        imagelink_square={data.imagelink_square}
                                                        special_ingredient={data.special_ingredient}
                                                        prices={data.prices}
                                                        type={data.type}
                                                        incrementCartItemHandler={incrementCartItemHandler}
                                                        decrementCartItemHandler={decrementCartItemHandler}
                                                    />
                                                </TouchableOpacity>)
                                        })
                                    }
                                </View>)
                        }
                    </View>
                    {CartList.length != 0 ?
                        <PaymentFooter
                            buttonTitle='Pagar'
                            buttonHandler={buttonHandler}
                            price={{ price: CartPrice, currency: '$' }} /> : <></>}

                </View>
            </ScrollView>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between'

    },
    ItemContainer: {
        flex: 1,

    },
    ListItemContainer: {
        flex: 1,
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    }

})