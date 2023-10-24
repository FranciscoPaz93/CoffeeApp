import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'

const EmptyListAnimation = ({ title }) => {
    return (
        <View style={styles.EmptyCartContainer}>
            <LottieView
                style={styles.LootieStyle}
                source={require('../lottie/coffeecup.json')} autoPlay loop />
            <Text style={styles.LootieText}>{title}</Text>
        </View>
    )
}

export default EmptyListAnimation

const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LootieStyle: {
        width: 300,
        height: 300
    },
    LootieText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex

    }
})