import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../utils/consts";
import { notify } from "../components/Toastify";

const cartContext = createContext();

export function useCartContext() {
	return useContext(cartContext);
}

const initState = {
	cart: {
		products: [],
		totalPrice: 0,
	},
	cartLength: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.cart:
			return { ...state, cart: action.payload };
		case ACTIONS.cartLength:
			return { ...state, cartLength: action.payload };
		default:
			return state;
	}
}

function getDataFromLS() {
	let data = JSON.parse(localStorage.getItem("cart"));
	if (!data) {
		data = {
			products: [],
			totalPrice: 0,
		};
	}
	return data;
}

function CartContext({ children }) {
	const [state, dispatch] = useReducer(reducer, initState);

	function getCart() {
		const data = getDataFromLS();
		const quantity = data.products.reduce((acc, item) => acc + item.count, 0);

		dispatch({
			type: ACTIONS.cartLength,
			payload: quantity,
		});
		dispatch({
			type: ACTIONS.cart,
			payload: data,
		});
	}

	function addProductToCart(product) {
		const data = getDataFromLS();
		data.products.push({ ...product, count: 1, subPrice: +product.price });

		data.totalPrice = data.products.reduce(
			(acc, item) => acc + item.subPrice,
			0
		);

		localStorage.setItem("cart", JSON.stringify(data));
		getCart();
		notify("Successfully added to cart");
	}

	function deleteProductFromCart(id) {
		const data = getDataFromLS();
		data.products = data.products.filter((item) => item.id !== id);

		data.totalPrice = data.products.reduce(
			(acc, item) => acc + item.subPrice,
			0
		);

		localStorage.setItem("cart", JSON.stringify(data));
		getCart();
		notify("Successfully removed from cart");
	}

	function isAlreadyInCart(id) {
		const data = getDataFromLS();

		const isInCart = data.products.some((item) => item.id === id);
		return isInCart;
	}

	function plusCount(id) {
		const data = getDataFromLS();
		data.products = data.products.map((item) => {
			if (item.id === id) {
				item.count += 1;
				item.subPrice += +item.price;
			}
			return item;
		});

		data.totalPrice = data.products.reduce(
			(acc, item) => acc + item.subPrice,
			0
		);

		localStorage.setItem("cart", JSON.stringify(data));
		getCart();
	}

	function minusCount(id) {
		const data = getDataFromLS();
		data.products = data.products.map((item) => {
			if (item.id === id) {
				item.count -= 1;
				item.subPrice -= +item.price;
			}
			return item;
		});

		data.totalPrice = data.products.reduce(
			(acc, item) => acc + item.subPrice,
			0
		);

		localStorage.setItem("cart", JSON.stringify(data));
		getCart();
	}

	function clearCart() {
		localStorage.removeItem("cart");
		getCart();
	}

	const value = {
		cart: state.cart,
		cartLength: state.cartLength,
		getCart,
		addProductToCart,
		deleteProductFromCart,
		isAlreadyInCart,
		plusCount,
		minusCount,
		clearCart,
	};
	return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}
export default CartContext;
