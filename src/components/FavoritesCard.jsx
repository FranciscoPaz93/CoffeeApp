import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from './ImageBackgroundInfo'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

const FavoritesCard = ({
    id,
    name,
    type,
    average_rating,
    il,
    imagelink_portrait,
    roasted,
    ingredients,
    description,
    rating_count,
    special_ingredients,
    favourite,
    ToggleFavourite
}) => {
    return (
        <View style={styles.CardContainer}>
            <ImageBackgroundInfo
                EnableBackHandler={false}
                imagelink_portrait={imagelink_portrait}
                type={type}
                id={id}
                favourite={favourite}
                name={name}
                roasted={roasted}
                special_ingredient={special_ingredients}
                ingredients={ingredients}
                average_rating={average_rating}
                ratings_count={rating_count}
                ToggleFavourite={ToggleFavourite}
            />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={[
                    COLORS.primaryGreyHex,
                    COLORS.primaryBlackHex,
                ]}
                style={styles.LinearGradientContainer}
            >
                <Text style={styles.DescriptionTitle}>Descripción</Text>
                <Text style={styles.DescriptionText}>{description}</Text>
            </LinearGradient>
        </View >
    )
}

export default FavoritesCard

const styles = StyleSheet.create({
    CardContainer: {
        borderRadius: BORDERRADIUS.borderRadius_25,
        overflow: 'hidden',
    },
    LinearGradientContainer: {
        gap: SPACING.space_10,
        padding: SPACING.space_20,

    },
    DescriptionTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,

    },
    DescriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    }
})