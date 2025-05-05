// Import's
import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product.js"

// Creating Shop context here
export const ShopContext = createContext(null);

// Function to get default cart product key value pairs like product id with added into cart
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

// Context provider
const ShopContextProvider = (props) => {
    // State's
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_Product] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

    useEffect(() => {
        fetch(`${API_URL}/allproducts`)
            .then((response) => response.json())
            .then((data) => setAll_Product(data))

        if (localStorage.getItem('auth-token')) {
            fetch(`${API_URL}/getcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, []);

    // Function to add a item in a cart by it's id
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch(`${API_URL}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        }
    }

    // Function to remove item from a cart by it's id
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch(`${API_URL}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        }
    }

    // Function to get total amount in cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                console.log(itemInfo);
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // Function to get total item's in cart 
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    // Context value to provide to consumer's
    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems }

    // Returning JSX here providing shop context value to all children component's
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

// Exporting ShopContextProvider component
export default ShopContextProvider;