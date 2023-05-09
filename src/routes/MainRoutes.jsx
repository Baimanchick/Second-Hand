import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import SuccessPage from "../pages/SuccessPage";
import AuthPage from "../pages/AuthPage";

function MainRoutes() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/add" element={<AddProductPage />} />
				<Route path="/edit/:id" element={<EditProductPage />} />
				<Route path="/details/:id" element={<ProductDetailsPage />} />
				<Route path="/cart" element={<CartPage />} />
			</Route>

			<Route path="/auth" element={<AuthPage />} />
			<Route path="/success" element={<SuccessPage />} />
		</Routes>
	);
}

export default MainRoutes;
