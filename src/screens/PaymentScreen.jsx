import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from '../components/GradientBGIcon'
import PaymentMethod from '../components/PaymentMethod'

const PaymentList = [
    {
        name: 'Wallet',
        icon: 'icon',
        isIcon: true
    },
    {
        name: 'Google Pay',
        icon: require('../assets/app_images/gpay.png'),
        isIcon: false
    },
    {
        name: 'Apple Pay',
        icon: require('../assets/app_images/applepay.png'),
        isIcon: false
    },
    {
        name: 'Amazon Pay',
        icon: require('../assets/app_images/amazonpay.png'),
        isIcon: false
    }
]

const PaymentScreen = () => {
    const [paymentMode, setPaymentMode] = useState('Credit Card')
    return (
        <View style={styles.ScreenConatiner}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity>
                        <GradientBGIcon name="left" size={24} color={COLORS.primaryLightGreyHex} />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}>Metodos de Pago</Text>
                    <View style={styles.EmptyView}>

                    </View>
                </View>
                <View style={styles.PaymentOptionsContainer}>
                    {
                        PaymentList.map((data) => {
                            return (

                                <TouchableOpacity
                                    onPress={() => setPaymentMode(data.name)}
                                    key={data.name}>
                                    <PaymentMethod
                                        paymentMode={paymentMode}
                                        name={data.name}
                                        icon={data.icon}
                                        isIcon={data.isIcon}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    ScreenConatiner: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    HeaderContainer: {
        paddingHorizontal: SPACING.space_24,
        paddingVertical: SPACING.space_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    HeaderText: {
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_semibold
    },
    EmptyView: {
        height: SPACING.space_36,
        width: SPACING.space_36
    },
    PaymentPrice: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex
    },

})