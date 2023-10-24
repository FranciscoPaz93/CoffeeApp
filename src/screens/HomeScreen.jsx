import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput, FlatList, Dimensions, ToastAndroid } from 'react-native'
import React, { useState, useRef } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcons from '../components/CustomIcons'
import CoffeeCard from '../components/CoffeeCard'
import PaymentFooter from '../components/PaymentFooter'


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

const HomeScreen = ({ navigation }) => {
    const CoffeeList = useStore(state => state.CoffeeList);
    const BeanList = useStore(state => state.BeansList);
    const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
    const [searchText, setSearchText] = useState('');
    const addToCart = useStore(state => state.addToCart);
    const calculateCartPrice = useStore(state => state.calculateCartPrice);
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const [sortedCoffee, setSortedCoffee] = useState(
        getCoffeeList(CoffeeList, categoryIndex.category)
    );
    const tabBarHeight = useBottomTabBarHeight();
    const ListRef = useRef(< FlatList />);

    const searchCoffee = (search) => {
        if (search != '') {
            ListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        }
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedCoffee([...CoffeeList.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()))
        ]);
    }

    const resetCoffee = () => {
        ListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        setSearchText('');
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedCoffee([...CoffeeList]);
    }
    const AddToCartCardHandler = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices }
    ) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices
        });
        calculateCartPrice();
        ToastAndroid.showWithGravity(`${name} esta Agregado`, ToastAndroid.SHORT, ToastAndroid.CENTER)
    };

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

                    <CustomIcons name='search'
                        style={styles.inputIcon}
                        color={searchText.length > 0 ?
                            COLORS.primaryOrangeHex :
                            COLORS.primaryLightGreyHex
                        }
                        size={FONTSIZE.size_20} />

                    <TextInput
                        placeholder='Buscar tu café'
                        value={searchText}
                        onChangeText={(text) => {
                            setSearchText(text)
                            searchCoffee(text)
                        }}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.TextInputStyle}
                    />
                    {searchText.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => resetCoffee()}
                        >
                            <CustomIcons
                                name='close'
                                size={FONTSIZE.size_16}
                                color={COLORS.primaryLightGreyHex}
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>) :
                        <></>}
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[styles.CategoryScrollViewStyle]}
                >
                    {categories.map((item, index) => (
                        <View
                            key={index.toString()}
                            style={styles.CategoryScrollViewContainer}
                        >
                            <TouchableOpacity onPress={() => {
                                setSearchText('')
                                ListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
                                setCategoryIndex({ index, category: categories[index] })
                                setSortedCoffee([...getCoffeeList(CoffeeList, categories[index])])

                            }
                            } style={styles.CategoryScrollItem}>
                                <Text style={[styles.CategoryText,
                                categoryIndex.index == index ? { color: COLORS.primaryOrangeHex } : {}
                                ]}>{item}</Text>
                                {categoryIndex.index == index ? <View style={styles.ActiveCategory} /> : <></>}
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <FlatList
                    horizontal
                    ref={ListRef}
                    ListEmptyComponent={
                        <View style={styles.EmptyListContainer}>
                            <Text style={styles.CategoryText}>No hay resultados</Text>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    data={sortedCoffee}
                    contentContainerStyle={[styles.FlatListContainer]}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return <TouchableOpacity onPress={() => {
                            navigation.push('Details', {
                                index: item.index,
                                type: item.type,
                                id: item.id
                            })
                        }}>
                            <CoffeeCard
                                id={item.id}
                                name={item.name}
                                index={item.index}
                                type={item.type}
                                rosted={item.rosted}
                                imagelink_square={item.imagelink_square}
                                special_ingredient={item.special_ingredient}
                                average_rating={item.average_rating}
                                price={item.prices[2]}
                                buttonPressHandler={AddToCartCardHandler}
                            />
                        </TouchableOpacity>
                    }}
                />
                <Text style={styles.coffeeBeansTitle}>Cafe en Grano</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BeanList}
                    contentContainerStyle={[styles.FlatListContainer, , { marginBottom: tabBarHeight }]}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return <TouchableOpacity onPress={() => {
                            navigation.push('Details', {
                                index: item.index,
                                type: item.type,
                                id: item.id
                            })
                        }}>
                            <CoffeeCard
                                id={item.id}
                                name={item.name}
                                index={item.index}
                                type={item.type}
                                rosted={item.rosted}
                                imagelink_square={item.imagelink_square}
                                special_ingredient={item.special_ingredient}
                                average_rating={item.average_rating}
                                price={item.prices[0]}
                                buttonPressHandler={AddToCartCardHandler}
                            />
                        </TouchableOpacity>
                    }}
                />

            </ScrollView >
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
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,

    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    CategoryScrollItem: {
        alignItems: 'center',
    },
    CategoryText: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    FlatListContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
    coffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryLightGreyHex,
    },
    inputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    }


})