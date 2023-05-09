import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { useCartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";

let pages = [
	{
		title: "Home",
		link: "/",
	},
];

const adminPages = [
	{
		title: "Add Product",
		link: "/add",
	},
];
const settings = ["Profile", "Account", "Dashboard"];

function Navbar() {
	const { cartLength, getCart } = useCartContext();
	const { user, logout, isAdmin } = useAuthContext();

	React.useEffect(() => {
		getCart();
	}, []);

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{isAdmin()
								? pages.concat(adminPages).map((page) => (
										<MenuItem key={page.title} onClick={handleCloseNavMenu}>
											<Typography
												component={Link}
												to={page.link}
												textAlign="center"
											>
												{page.title}
											</Typography>
										</MenuItem>
								  ))
								: pages.map((page) => (
										<MenuItem key={page.title} onClick={handleCloseNavMenu}>
											<Typography
												component={Link}
												to={page.link}
												textAlign="center"
											>
												{page.title}
											</Typography>
										</MenuItem>
								  ))}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{isAdmin()
							? pages.concat(adminPages).map((page) => (
									<Button
										key={page.title}
										component={Link}
										to={page.link}
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: "white", display: "block" }}
									>
										{page.title}
									</Button>
							  ))
							: pages.map((page) => (
									<Button
										key={page.title}
										component={Link}
										to={page.link}
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: "white", display: "block" }}
									>
										{page.title}
									</Button>
							  ))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<IconButton
							component={Link}
							to="/cart"
							size="large"
							color="inherit"
						>
							<Badge badgeContent={cartLength} color="error">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>

						{user ? (
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt={user.displayName} src={user.photoURL} />
								</IconButton>
							</Tooltip>
						) : (
							<Button component={Link} to="/auth" color="inherit">
								Login
							</Button>
						)}

						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
							<MenuItem
								onClick={() => {
									handleCloseUserMenu();
									logout();
								}}
							>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
