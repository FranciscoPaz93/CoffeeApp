import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons'

const GradientBGIcon = ({ name, color, size }) => {
    return (
        <View style={styles.Container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.LinearGradientBG}>
                <CustomIcons name={name} color={color} size={size} />
            </LinearGradient>
        </View>
    )
}

export default GradientBGIcon

const styles = StyleSheet.create({
    Container: {
        borderWidth: 2,
        borderColor: COLORS.primaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: 'hidden'
    },
    LinearGradientBG: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
    }

})