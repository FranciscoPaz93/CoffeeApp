import { StyleSheet, Text, View, StatusBar, ScrollView, Touchable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({ navigation, route }) => {
    const ItemofIndex = useStore(state =>
        route.params.type == 'Coffee' ? state.CoffeeList : state.BeansList
    )[route.params.index];

    const [fullDescription, setFullDescription] = useState(false);
    const [price, setPrice] = useState(ItemofIndex.prices[0]);
    const addToCart = useStore(state => state.addToCart);
    const calculateCartPrice = useStore(state => state.calculateCartPrice);
    const BackHandler = () => {
        navigation.goBack();
    }
    const AddToCartHandler = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        price }
    ) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices: [{ ...price, quantity: 1 }]
        });
        calculateCartPrice();
        navigation.navigate('Cart');
    };

    const addToFavouriteList = useStore(state => state.addToFavoritesList);
    const removeFromFavouriteList = useStore(state => state.deleteFromFavoriteList);

    const ToggleFavourite = (favourite, type, id) => {
        favourite ? removeFromFavouriteList(type, id) : addToFavouriteList(type, id);
    }

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                contentContainerStyle={styles.ScrollViewFlex}
                showsVerticalScrollIndicator={false}
            >
                <ImageBackgroundInfo
                    EnableBackHandler={true}
                    imagelink_portrait={ItemofIndex.imagelink_portrait}
                    type={ItemofIndex.type}
                    id={ItemofIndex.id}
                    favourite={ItemofIndex.favourite}
                    name={ItemofIndex.name}
                    roasted={ItemofIndex.roasted}
                    special_ingredient={ItemofIndex.special_ingredient}
                    ingredients={ItemofIndex.ingredients}
                    average_rating={ItemofIndex.average_rating}
                    ratings_count={ItemofIndex.ratings_count}
                    BackHandler={BackHandler}
                    ToggleFavourite={ToggleFavourite}
                />
                <View style={styles.FooterInfoArea}>
                    <Text style={styles.InfoTitle}>Descripción</Text>
                    {fullDescription ?
                        <TouchableWithoutFeedback onPress={() => {
                            setFullDescription(prev => !prev);
                        }}>
                            <Text style={styles.DescriptionText}>{ItemofIndex.description}</Text>

                        </TouchableWithoutFeedback>
                        : <TouchableWithoutFeedback onPress={() => {
                            setFullDescription(prev => !prev);
                        }}>
                            <Text numberOfLines={3} style={styles.DescriptionText}>{ItemofIndex.description}</Text>
                        </TouchableWithoutFeedback>
                    }
                    <Text style={styles.InfoTitle}>Tamaño</Text>
                    <View style={styles.SizeOuterContainer}>
                        {
                            ItemofIndex.prices.map(data => {
                                return (
                                    <TouchableOpacity
                                        key={data.size}
                                        onPress={() => {
                                            setPrice(data);

                                        }}
                                        style={[styles.SizeBox,
                                        {
                                            borderColor:
                                                data.size == price.size
                                                    ? COLORS.primaryOrangeHex
                                                    : COLORS.primaryDarkGreyHex,
                                        }
                                        ]}>
                                        <Text style={[styles.SizeText,
                                        {
                                            fontSize:
                                                ItemofIndex.type == "bean"
                                                    ? FONTSIZE.size_14
                                                    : FONTSIZE.size_16,
                                            color:
                                                data.size == price.size
                                                    ? COLORS.primaryOrangeHex
                                                    : COLORS.primaryLightGreyHex,
                                        },
                                        ]}>
                                            {data.size}
                                        </Text>
                                    </TouchableOpacity>)
                            })
                        }
                    </View>
                </View>
                <PaymentFooter buttonTitle='Agregar' price={price}
                    buttonHandler={() => {
                        AddToCartHandler({
                            id: ItemofIndex.id,
                            index: ItemofIndex.index,
                            name: ItemofIndex.name,
                            roasted: ItemofIndex.roasted,
                            imagelink_square: ItemofIndex.imagelink_square,
                            special_ingredient: ItemofIndex.special_ingredient,
                            type: ItemofIndex.type,
                            price: price

                        });
                    }} />
            </ScrollView>
        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex
    },
    ScrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    FooterInfoArea: {
        padding: SPACING.space_20,

    },
    InfoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_10
    },
    DescriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_15

    },
    SizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,

    },
    SizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_24 * 2,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,

    }

})