import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons'

const BGIcon = ({ name, color, size, BGColor }) => {
    return (
        <View style={[styles.IconBG, { backgroundColor: BGColor }]}>
            <CustomIcons
                name={name}
                color={color}
                size={size}
            />
        </View>
    )
}

export default BGIcon

const styles = StyleSheet.create({
    IconBG: {
        height: SPACING.space_30,
        width: SPACING.space_30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDERRADIUS.radius_8,
    }
})