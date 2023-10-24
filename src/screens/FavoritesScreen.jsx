import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/store'
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CartItem from '../components/CartItem';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesCard from '../components/FavoritesCard';

const FavoritesScreen = ({ navigation }) => {
    const { Favorites,
        addToFavoritesList,
        deleteFromFavoriteList,
    } = useStore(state => state)
    const tabBarHeight = useBottomTabBarHeight();
    const ToggleFavourite = (favourite, type, id) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoritesList(type, id);
    }

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <HeaderBar title="Favoritos" />
                    <View style={styles.ItemContainer}>

                        {
                            Favorites.length == 0
                                ? <EmptyListAnimation title='Sin favoritos' />
                                : (<View style={styles.ListItemContainer}>
                                    {
                                        Favorites.map((data) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.push('Details',
                                                            {
                                                                index: data.index,
                                                                id: data.id,
                                                                type: data.type,

                                                            });
                                                    }}
                                                    key={data.id}>
                                                    <FavoritesCard
                                                        id={data.id}
                                                        name={data.name}
                                                        type={data.type}
                                                        average_rating={data.average_rating}
                                                        imagelink_portrait={data.imagelink_portrait}
                                                        special_ingredients={data.special_ingredients}
                                                        il={data.imagelink_square}
                                                        roasted={data.roasted}
                                                        ingredients={data.ingredients}
                                                        description={data.description}
                                                        rating_count={data.rating_count}
                                                        favourite={data.favourite}
                                                        ToggleFavourite={ToggleFavourite}

                                                    ></FavoritesCard>

                                                </TouchableOpacity>)
                                        })
                                    }
                                </View>)
                        }
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default FavoritesScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between'

    },
    ItemContainer: {
        flex: 1,

    },
    ListItemContainer: {
        flex: 1,
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    }

})