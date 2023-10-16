import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon'
import ProfilePic from './ProfilePic'



const HeaderBar = ({ title, }) => {
    return (
        <View style={styles.HeaderContainer}>
            <GradientBGIcon name='menu' color={COLORS.primaryWhiteHex} size={FONTSIZE.fontsize_20} />
            <Text style={styles.HeaderText}>{title}</Text>
            <ProfilePic />
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.fontsize_20,
        color: COLORS.primaryWhiteHex
    },
})