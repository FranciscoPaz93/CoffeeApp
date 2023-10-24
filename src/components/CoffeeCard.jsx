import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons'
import BGIcon from './BGIcon'

const CARD_WIDTH = Dimensions.get('window').width * 0.32

const CoffeeCard = ({ id,
    name,
    index,
    type,
    rosted,
    imagelink_square,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        >
            <ImageBackground source={imagelink_square}
                resizeMode='cover'
                style={styles.CardImageBG}>
                <View style={styles.CardRatingContainer}>
                    <CustomIcons
                        name={'star'}
                        color={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_18} />
                    <Text style={styles.CardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.CardTitle}>{name}</Text>
            <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                    $ <Text style={styles.CardPrice}>{price.price}</Text>
                </Text>
                <TouchableOpacity onPress={() => {
                    buttonPressHandler({
                        id,
                        index,
                        name,
                        rosted,
                        imagelink_square,
                        special_ingredient,
                        type,
                        prices: [{ ...price, quantity: 1 }]
                    })
                }}>
                    <BGIcon
                        color={COLORS.primaryWhiteHex}
                        name={'add'}
                        size={FONTSIZE.size_10}
                        BGColor={COLORS.primaryOrangeHex} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default CoffeeCard

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        gap: SPACING.space_10,

        position: 'absolute',
        paddingHorizontal: SPACING.space_15,
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,

    },
    CardRatingText: {
        fontFamily: FONTSIZE.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        lineHeight: 22,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },

    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryWhiteHex
    },


})