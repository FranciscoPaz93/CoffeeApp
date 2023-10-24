import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

const PaymentFooter = ({
    price,
    buttonHandler,
    buttonTitle
}) => {

    return (
        <View style={styles.priceFooter}>
            <View style={styles.PriceConatiner}>
                <Text style={styles.PriceTitle}>Precio</Text>
                <Text style={styles.PriceText}  >
                    {price.currency} <Text style={styles.Price}>{parseFloat(price.price).toFixed(2).toString()} </Text>
                </Text>
            </View>
            <TouchableOpacity style={styles.PayButton} onPress={buttonHandler}>
                <Text style={styles.ButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>

        </View >
    )
}

export default PaymentFooter

const styles = StyleSheet.create({
    priceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
        paddingHorizontal: SPACING.space_20,
    },
    PriceConatiner: {
        alignItems: 'center',
        width: 100
    },
    PriceTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryLightGreyHex,
    },
    PriceText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex,
    },
    Price: {
        color: COLORS.primaryWhiteHex
    },
    PayButton: {
        flex: 1,
        backgroundColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: BORDERRADIUS.radius_20
    },
    ButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    }
})