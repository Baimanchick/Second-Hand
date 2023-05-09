import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useProductContext } from "../contexts/ProductContext";

function AddProductPage() {
	const { addProduct } = useProductContext();
	const [formValue, setFormValue] = useState({
		title: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	function handleChange(e) {
		const obj = {
			...formValue,
			[e.target.name]: e.target.value,
		};
		setFormValue(obj);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (
			!formValue.title.trim() ||
			!formValue.description.trim() ||
			!formValue.price.trim() ||
			!formValue.category.trim() ||
			!formValue.image.trim()
		) {
			alert("Заполните все поля");
			return;
		}

		addProduct(formValue);

		setFormValue({
			title: "",
			description: "",
			price: "",
			category: "",
			image: "",
		});
	}
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>Add Product</h1>
			<form
				onSubmit={(e) => handleSubmit(e)}
				style={{
					maxWidth: "500px",
					margin: "0 auto",
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<TextField
					value={formValue.title}
					onChange={(e) => handleChange(e)}
					name="title"
					label="Title"
					variant="outlined"
				/>
				<TextField
					value={formValue.description}
					onChange={(e) => handleChange(e)}
					name="description"
					label="Description"
					variant="outlined"
				/>
				<TextField
					value={formValue.price}
					onChange={(e) => handleChange(e)}
					name="price"
					label="Price"
					variant="outlined"
				/>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Category</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={formValue.category}
						label="Category"
						name="category"
						onChange={(e) => handleChange(e)}
					>
						<MenuItem value={"men's clothing"}>Men</MenuItem>
						<MenuItem value={"women's clothing"}>Women</MenuItem>
						<MenuItem value={"jewelery"}>Jewelery</MenuItem>
						<MenuItem value={"electronics"}>Electronics</MenuItem>
					</Select>
				</FormControl>
				<TextField
					value={formValue.image}
					onChange={(e) => handleChange(e)}
					name="image"
					label="Image"
					variant="outlined"
				/>
				<Button type="submit" variant="contained">
					Add
				</Button>
			</form>
		</div>
	);
}

export default AddProductPage;
