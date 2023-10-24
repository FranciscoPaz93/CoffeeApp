import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons'

const CartItem = ({
    id,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    prices,
    type,
    incrementCartItemHandler,
    decrementCartItemHandler }) => {
    return (
        <View>
            {
                prices.length == 1 ? (
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                        style={styles.CartItemSingleLinearGradient}>
                        <View>
                            <Image source={imagelink_square} style={styles.CartItemSingleImage} />
                        </View>
                        <View style={styles.CartItemSinlgeInfoContainer}>
                            <View>
                                <Text style={styles.CartItemTitle}>{name}</Text>
                                <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.CartItemSingleSizeValueConatainer}>

                                <View style={styles.SizeBox}>
                                    <Text style={[styles.SizeText, {
                                        fontSize: type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                                    }]}>{prices[0].size}</Text>
                                </View>
                                <Text style={styles.SizeCurrency}>
                                    {prices[0].currency}
                                    <Text style={styles.SizePrice}>
                                        {parseFloat(prices[0].price).toFixed(2).toString()}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.CartItemSingleSizeValueConatainer}>
                                <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                                    decrementCartItemHandler(id, prices[0].size)
                                }}>
                                    <CustomIcons name='minus' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}><Text style={styles.QuantityText} >{prices[0].quantity}</Text></View>
                                <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                                    incrementCartItemHandler(id, prices[0].size)
                                }}>
                                    <CustomIcons name='add' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>) : (<LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                        style={styles.CartItemLinearGradient}>
                        <View style={styles.CartItemRow}>
                            <Image source={imagelink_square} style={styles.CartItemImage} />
                            <View style={styles.CartItemInfo}>

                                <View>
                                    <Text style={styles.CartItemTitle}>{type}</Text>
                                    <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                                </View>
                                <View style={styles.CartItemRoastedConatiner}>
                                    <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                                </View>
                            </View>
                        </View>
                        {
                            prices.map((data, index) => {
                                return (<View
                                    key={index.toString()}
                                    style={styles.CartItemSizeRow}
                                >
                                    <View style={styles.CartItemSizeValueConatiner}>
                                        <View style={styles.SizeBox}>
                                            <Text style={[styles.SizeText, {
                                                fontSize: type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                                            }]}>{data.size}
                                            </Text>
                                        </View>
                                        <Text style={styles.SizeCurrency}>
                                            {data.currency}
                                            <Text style={styles.SizePrice}>
                                                {parseFloat(data.price).toFixed(2).toString()}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={styles.CartItemSizeValueConatiner}>
                                        <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                                            decrementCartItemHandler(id, data.size)
                                        }}>
                                            <CustomIcons name='minus' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                        </TouchableOpacity>
                                        <View style={styles.CartItemQuantityContainer}><Text style={styles.QuantityText} >{data.quantity}</Text></View>
                                        <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                                            incrementCartItemHandler(id, data.size)
                                        }}>
                                            <CustomIcons name='add' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                        </TouchableOpacity>
                                    </View>
                                </View>)
                            })
                        }
                    </LinearGradient>)
            }
        </View >
    )
}


const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25
    },
    CartItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_12,
        flex: 1,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_8,
        justifyContent: 'space-between',
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    CartItemRoastedConatiner: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSizeRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.space_20,
        alignItems: 'center'
    },
    CartItemSizeValueConatiner: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    SizePrice: {
        color: COLORS.primaryWhiteHex
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        paddingVertical: SPACING.space_4,
        borderRadius: BORDERRADIUS.radius_10,
        width: 80,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: COLORS.primaryOrangeHex,
    },
    QuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20
    },
    CartItemSinlgeInfoContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'stretch',
    },
    CartItemSingleSizeValueConatainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})
export default CartItem