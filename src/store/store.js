import { create } from 'zustand'
import { produce } from 'immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CoffeeData from '../data/CoffeeData'
import BeansData from '../data/BeansData'

export const useStore = create(
    persist((set, get) => ({
        CoffeeList: CoffeeData,
        BeansList: BeansData,
        CartPrice: 0,
        Favorites: [],
        CartList: [],
        OrderHistory: [],
        addToCart: (cartItem) => set(produce((state) => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
                if (state.CartList[i].id == cartItem.id) {
                    found = true;
                    let size = false;
                    for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        if (state.CartList[i].prices[j].size == cartItem.prices[0].size) {
                            size = true;
                            state.CartList[i].prices[j].quantity++;

                            break;
                        }
                    }
                    if (size == false) {

                        state.CartList[i].prices.push(cartItem.prices[0]);

                    }
                    state.CartList[i].prices.sort((a, b) => {
                        if (a.size > b.size) {
                            return 1;
                        }
                        if (a.size < b.size) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                }
            }
            if (found === false) {

                state.CartList.push(cartItem);
            }
            console.log(state.CartList.length);
        })),
        calculateCartPrice: () => set(produce((state) => {

            let totalPrice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
                let tempPrice = 0;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                    tempPrice += tempPrice + parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity;
                }
                state.CartList[i].itemPrice = tempPrice;
                totalPrice += tempPrice;
            }
            state.CartPrice = totalPrice;

        })),
        addToFavoritesList: (type, id) => set(produce((state) => {
            if (type == "Coffee") {
                for (let i = 0; i < state.CoffeeList.length; i++) {
                    if (state.CoffeeList[i].id == id) {
                        if (state.CoffeeList[i].favourite == false) {
                            state.CoffeeList[i].favourite = true;
                            state.Favorites.unshift(state.CoffeeList[i]);
                        }
                        break;
                    }
                }
            } else if (type == "Bean") {
                for (let i = 0; i < state.BeansList.length; i++) {
                    if (state.BeansList[i].id == id) {
                        if (state.BeansList[i].favourite == false) {
                            state.BeansList[i].favourite = true;
                            state.Favorites.unshift(state.BeansList[i]);
                        }
                        break;
                    }
                }
            }
        })),
        deleteFromFavoriteList: (type, id) => set(produce((state) => {
            if (type == "Coffee") {
                for (let i = 0; i < state.CoffeeList.length; i++) {
                    if (state.CoffeeList[i].id == id) {
                        if (state.CoffeeList[i].favourite == true) {
                            state.CoffeeList[i].favourite = false;
                            for (let j = 0; j < state.Favorites.length; j++) {
                                if (state.Favorites[j].id == id) {
                                    state.Favorites.splice(j, 1);
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            } else if (type == "Bean") {
                for (let i = 0; i < state.BeansList.length; i++) {
                    if (state.CoffeeList[i].id == id) {
                        if (state.BeansList[i] == true) {
                            state.BeansList[i].favourite = false;
                        }
                        break;
                    }

                }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.Favorites.length; i++) {
                if (state.Favorites[i].id == id) {
                    spliceIndex = i;
                    break;
                }
            }
            state.Favorites.splice(spliceIndex, 1);
        })),
        incrementCartItem: (id, size) => set(produce((state) => {
            for (let i = 0; i < state.CartList.length; i++) {
                if (state.CartList[i].id == id) {
                    for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        if (state.CartList[i].prices[j].size == size) {
                            state.CartList[i].prices[j].quantity++;
                            break;
                        }
                    }
                    break;
                }
            }
        })),
        decrementCartItem: (id, size) => set(produce((state) => {
            for (let i = 0; i < state.CartList.length; i++) {
                if (state.CartList[i].id == id) {
                    for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        if (state.CartList[i].prices[j].size = size) {
                            if (state.CartList[i].prices.length > 1) {
                                if (state.CartList[i].prices[j].quantity > 1) {
                                    state.CartList[i].prices[j].quantity--;
                                } else {
                                    state.CartList[i].prices.splice(j, 1);
                                }
                            } else {
                                if (state.CartList[i].prices[j].quantity > 1) {
                                    state.CartList[i].prices[j].quantity--;
                                } else {
                                    state.CartList.splice(i, 1);
                                }
                            }
                        }
                        break;
                    }
                }
            }
        })),
        AddOrderHistoryFromCart: () => set(produce((state) => {
            let temp = state.CartList.reduce(
                (accumulator, currentValue) =>
                    accumulator + parseFloat(currentValue.itemPrice),
                0
            );
            let currentCartListTotalPrice = temp.toFixed(2).toString();
            if (state.OrderHistory.length > 0) {
                state.OrderHistory.unshift({
                    OrderDate: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
                    CartList: state.CartList,
                    CartListPrice: currentCartListTotalPrice
                });
            } else {
                state.OrderHistory.push({
                    OrderDate: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
                    CartList: state.CartList,
                    CartListPrice: currentCartListTotalPrice
                });
            }
            state.CartList = [];
        }))
    }), {
        name: 'coffee-app',
        storage: createJSONStorage(() => AsyncStorage),
    })
)