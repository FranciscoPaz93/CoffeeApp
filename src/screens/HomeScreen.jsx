import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcons from '../components/CustomIcons'

const getCategoriesFromData = (data) => {
    let temp = {}
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] === undefined) {
            temp[data[i].name] = 1
        } else {
            temp[data[i].name]++
        }
    }
    let categories = Object.keys(temp)
    categories.unshift('All')
    return categories
}

const getCoffeeList = (data, category) => {
    if (category === 'All') {
        return data
    } else {
        let coffeeList = data.filter((item) => item.name === category)
        return coffeeList
    }
}

const HomeScreen = () => {
    const CoffeeList = useStore(state => state.CoffeeList);
    const BeanList = useStore(state => state.BeansList);
    const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const [sortedCoffee, setSortedCoffee] = useState(
        getCoffeeList(CoffeeList, categoryIndex.category)
    );
    const tabBarHeight = useBottomTabBarHeight();

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar
                backgroundColor={COLORS.primaryBlackHex}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.ScrollViewFlex
                }
            >
                <HeaderBar title='' />
                <Text style={styles.ScreenTitle}>
                    Busca el mejor {'\n'}café para ti
                </Text>
                <View style={styles.InputConatinerComponent} >
                    <TouchableOpacity>
                        <CustomIcons name='search'
                            style={styles.inputIcon}
                            color={searchText.length > 0 ?
                                COLORS.primaryOrangeHex :
                                COLORS.primaryLightGreyHex
                            }
                            size={FONTSIZE.size_20} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Buscar tu café'
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.TextInputStyle}
                    />
                </View>
            </ScrollView >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.CategoryContainerStyle}
            >
                {categories.map((item, index) => (
                    <View
                        key={index.toString()}
                        style={styles.CategoryContainer}
                    >
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={[styles.CategoryTextActive,
                            categoryIndex.index == index ? {} : {}
                            ]}>{item}</Text>
                            {categoryIndex.index == index ? <View style={styles.ActiveCategory} /> : <></>}
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View >
    )
}


export default HomeScreen
const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
    InputConatinerComponent: {
        flexDirection: 'row',
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
    },
    inputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    TextInputStyle: {
        flex: 1,
        color: COLORS.primaryWhiteHex,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
    },
    CategoryContainerStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,

    },
    CategoryContainer: {
        paddingHorizontal: SPACING.space_15,

    },

})