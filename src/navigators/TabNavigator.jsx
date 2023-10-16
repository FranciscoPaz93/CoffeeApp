import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DetailsScreen, HomeScreen, OrderHistoryScreen, CartScreen, FavoritesScreen } from '../screens'
import CustomIcons from '../components/CustomIcons'
import React from 'react'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'

const Tab = createBottomTabNavigator()
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarBackground: () => (
                    <BlurView overlayColor='' blurAmount={15} style={styles.blurStyle} />
                ),
            }}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomIcons
                            name='home'
                            size={30}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomIcons
                            name='cart'
                            size={30}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomIcons
                            name='like'
                            size={30}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='OrderHistory'
                component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomIcons
                            name='bell'
                            size={30}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    )
                }}
            />
        </Tab.Navigator>

    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: COLORS.primaryBlackRGBA,
        height: 80,
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent'
    },
    blurStyle: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    }
})