import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API, LIMIT } from "../utils/consts";
import axios from "axios";

const productContext = createContext();

export function useProductContext() {
	return useContext(productContext);
}

const initState = {
	products: [],
	oneProduct: null,
	pageTotalCount: 1,
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.products:
			return { ...state, products: action.payload };
		case ACTIONS.oneProduct:
			return { ...state, oneProduct: action.payload };
		case ACTIONS.pageTotalCount: {
			return { ...state, pageTotalCount: action.payload };
		}
		default:
			return state;
	}
}

function ProductContext({ children }) {
	const [state, dispatch] = useReducer(reducer, initState);

	async function getProducts() {
		try {
			const res = await axios.get(
				`${API}${window.location.search || `?_limit=${LIMIT}`}`
			);
			const totalPages = Math.ceil(res.headers["x-total-count"] / LIMIT);

			dispatch({
				type: ACTIONS.pageTotalCount,
				payload: totalPages,
			});

			dispatch({
				type: ACTIONS.products,
				payload: res.data,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function getOneProduct(id) {
		try {
			const { data } = await axios.get(`${API}/${id}`);
			dispatch({
				type: ACTIONS.oneProduct,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function addProduct(newProduct) {
		try {
			await axios.post(API, newProduct);
			getProducts();
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteProduct(id) {
		try {
			await axios.delete(`${API}/${id}`);
			getProducts();
		} catch (error) {
			console.log(error);
		}
	}

	async function editProduct(id, prodEdit) {
		try {
			await axios.patch(`${API}/${id}`, prodEdit);
			getProducts();
		} catch (error) {
			console.log(error);
		}
	}

	const value = {
		products: state.products,
		oneProduct: state.oneProduct,
		pageTotalCount: state.pageTotalCount,
		getProducts,
		getOneProduct,
		addProduct,
		deleteProduct,
		editProduct,
	};
	return (
		<productContext.Provider value={value}>{children}</productContext.Provider>
	);
}

export default ProductContext;
