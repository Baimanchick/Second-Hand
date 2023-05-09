import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Pagination,
	Select,
	TextField,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../utils/consts";

function ProductsList() {
	const { products, getProducts, pageTotalCount } = useProductContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [inputVal, setInputVal] = useState(
		searchParams.get("title_like") || ""
	);
	const [category, setCategory] = useState(
		searchParams.get("category") || "all"
	);
	const [page, setPage] = useState(+searchParams.get("_page") || 1);

	useEffect(() => {
		getProducts();
	}, [searchParams]);

	const [firstMount, setFirstMount] = useState(true);

	useEffect(() => {
		if (firstMount) {
			setFirstMount(false);
			return;
		}
		if (category === "all") {
			setSearchParams({
				title_like: inputVal,
				_limit: LIMIT,
				_page: 1,
			});
		} else {
			setSearchParams({
				title_like: inputVal,
				category: category,
				_limit: LIMIT,
				_page: 1,
			});
		}
		setPage(1);
	}, [inputVal, category]);

	useEffect(() => {
		if (category === "all") {
			setSearchParams({
				title_like: inputVal,
				_limit: LIMIT,
				_page: page,
			});
		} else {
			setSearchParams({
				title_like: inputVal,
				category: category,
				_limit: LIMIT,
				_page: page,
			});
		}
	}, [page]);

	useEffect(() => {
		if (pageTotalCount < page) {
			setPage(pageTotalCount);
		}
	}, [pageTotalCount]);

	return (
		<div>
			{/* search start */}
			<Box
				sx={{
					maxWidth: 300,
					margin: "20px auto",
					display: "flex",
					gap: "30px",
				}}
			>
				<TextField
					onChange={(e) => setInputVal(e.target.value)}
					value={inputVal}
					label="Search..."
					variant="outlined"
				/>
				{/* Search end */}
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Category</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={category}
						label="Category"
						onChange={(e) => setCategory(e.target.value)}
					>
						<MenuItem value={"all"}>All</MenuItem>
						<MenuItem value={"men's clothing"}>Men</MenuItem>
						<MenuItem value={"women's clothing"}>Women</MenuItem>
						<MenuItem value={"jewelery"}>Jewelery</MenuItem>
						<MenuItem value={"electronics"}>Electronics</MenuItem>
					</Select>
				</FormControl>
			</Box>

			<Grid container spacing={2}>
				{products.map((item) => {
					return <ProductCard key={item.id} item={item} />;
				})}
			</Grid>
			<Box sx={{ maxWidth: "max-content", margin: "20px auto" }}>
				<Pagination
					onChange={(e, p) => setPage(p)}
					page={page}
					count={pageTotalCount}
					color="primary"
				/>
			</Box>
		</div>
	);
}

export default ProductsList;
