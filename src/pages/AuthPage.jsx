import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [showPass, setShowPass] = useState(false);

	const { register, login, user } = useAuthContext();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const credentials = {
			email: data.get("email"),
			password: data.get("password"),
			displayName: data.get("displayName"),
			photoURL: data.get("photoURL"),
		};
		if (isLogin) {
			login(credentials);
		} else {
			register(credentials);
		}
	};

	if (user) {
		return <Navigate replace to="/" />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{isLogin ? "Sign in" : "Sign up"}
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						{!isLogin ? (
							<>
								<TextField
									margin="normal"
									required
									fullWidth
									id="name"
									label="Name"
									name="displayName"
									autoFocus
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="photo"
									label="Photo"
									name="photoURL"
								/>
							</>
						) : null}

						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPass ? "text" : "password"}
							id="password"
							autoComplete="current-password"
						/>

						<FormControlLabel
							control={
								<Checkbox
									onChange={(e) => setShowPass(e.target.checked)}
									checked={showPass}
									color="primary"
								/>
							}
							label="Show password"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{isLogin ? "Sign in" : "Sign up"}
						</Button>
						<Grid container>
							<Grid item xs>
								{isLogin ? (
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								) : null}
							</Grid>
							<Grid item>
								<Link
									onClick={() => setIsLogin(!isLogin)}
									href="#"
									variant="body2"
								>
									{isLogin
										? "Don't have an account? Sign Up"
										: "Already have an account? Sign in"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
