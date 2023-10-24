import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import GradientBGIcon from './GradientBGIcon'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons'

const ImageBackgroundInfo = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    roasted,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    BackHandler,
    ToggleFavourite,
}) => {
    return (
        <View>
            <ImageBackground
                source={imagelink_portrait}
                style={styles.ItemBackgroundImage}>
                {
                    EnableBackHandler ? (
                        <View style={styles.ImageHeaderBarContainerWithBack}>
                            <TouchableOpacity onPress={() => BackHandler()} >
                                <GradientBGIcon
                                    name="left"
                                    color={COLORS.primaryLightGreyHex}
                                    size={FONTSIZE.size_16} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => ToggleFavourite(favourite, type, id)}>
                                <GradientBGIcon
                                    name="like"
                                    color={
                                        favourite ?
                                            COLORS.primaryRedHex :
                                            COLORS.primaryLightGreyHex}
                                    size={FONTSIZE.size_16} />
                            </TouchableOpacity>
                        </View>
                    ) : (<View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity onPress={() => ToggleFavourite(favourite, type, id)}>
                            <GradientBGIcon
                                name="like"
                                color={
                                    favourite ?
                                        COLORS.primaryRedHex :
                                        COLORS.primaryLightGreyHex}
                                size={FONTSIZE.size_16} />
                        </TouchableOpacity>
                    </View>)
                }
                <View style={styles.ImageInfoOuterContainer}>
                    <View style={styles.ImageInfoInnerContainer}>
                        <View style={styles.InfoContainerRow}>
                            <View>
                                <Text style={styles.ItemTitleText}>{name}</Text>
                                <Text style={styles.ItemSubTitleText}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.ItemPropertiesContainer}>
                                <View
                                    style={styles.ProperFirst}>
                                    <CustomIcons
                                        size={type == 'Bean' ? FONTSIZE.size_16 : FONTSIZE.size_20}
                                        name={type == 'Bean' ? 'bean' : 'beans'}
                                        color={COLORS.primaryOrangeHex} />
                                    <Text
                                        style={[styles.PropertyTextFirst, {
                                            marginTop: type == 'Bean' ? SPACING.space_2 + SPACING.space_4 : 0
                                        }]}>
                                        {type}
                                    </Text>
                                </View>
                                <View
                                    style={styles.ProperFirst}>
                                    <CustomIcons
                                        name={type == 'Bean' ? 'location' : 'drop'}
                                        size={FONTSIZE.size_16}
                                        color={COLORS.primaryOrangeHex} />
                                    <Text
                                        style={styles.PropertyTextLast}>
                                        {ingredients}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.InfoContainerRow}>
                            <View style={styles.RatingConatiner}>
                                <CustomIcons
                                    name="star"
                                    size={FONTSIZE.size_20}
                                    color={COLORS.primaryOrangeHex} />
                                <Text style={styles.RatingText}>{average_rating}</Text>
                                <Text style={styles.CountText}>({ratings_count})</Text>

                            </View>
                            <View style={styles.RoastedContainer}>
                                <Text style={styles.RoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

export default ImageBackgroundInfo

const styles = StyleSheet.create({
    ItemBackgroundImage: {
        aspectRatio: 20 / 25,
        width: '100%',
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithoutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: SPACING.space_20 * 2,
        borderTopRightRadius: SPACING.space_20 * 2,
        padding: SPACING.space_30,
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15,
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex,
    },
    ItemSubTitleText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20
    },
    ProperFirst: {
        height: 55,
        width: 55,
        borderRadius: SPACING.space_20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    PropertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    },
    RatingConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_10
    },
    RatingText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    },
    CountText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    },
    RoastedContainer: {
        height: 55,
        width: 55 * 2 + SPACING.space_20,
        borderRadius: SPACING.space_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    RoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    },
    PropertyTextLast: {
        fontFamily: FONTFAMILY.poppins_semibold,
        marginTop: SPACING.space_2 + SPACING.space_4,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    }


})