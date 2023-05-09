import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

function MainLayout() {
	return (
		<div>
			<Navbar />
			<Container maxWidth="lg" sx={{ marginTop: "50px" }}>
				<Outlet />
			</Container>
		</div>
	);
}

export default MainLayout;
