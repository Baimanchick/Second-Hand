import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

function EditProductPage() {
	const { oneProduct, getOneProduct, editProduct } = useProductContext();
	const { id } = useParams();
	const navigate = useNavigate();
	const [formValue, setFormValue] = useState({
		title: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	useEffect(() => {
		getOneProduct(id);
	}, []);

	useEffect(() => {
		if (oneProduct) {
			setFormValue(oneProduct);
		}
	}, [oneProduct]);

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

		editProduct(id, formValue);

		setFormValue({
			title: "",
			description: "",
			price: "",
			category: "",
			image: "",
		});
		navigate(-1);
	}
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>Edit Product</h1>
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
				<TextField
					value={formValue.category}
					onChange={(e) => handleChange(e)}
					name="category"
					label="Category"
					variant="outlined"
				/>
				<TextField
					value={formValue.image}
					onChange={(e) => handleChange(e)}
					name="image"
					label="Image"
					variant="outlined"
				/>
				<Button type="submit" variant="contained">
					Save
				</Button>
			</form>
		</div>
	);
}

export default EditProductPage;
