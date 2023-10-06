import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

const Navbar = () => {
	return (
		<div>
			<nav className="navbar" id="full-menu">
				<a href="/">
					<img className="navbar-logo" src="/logo.png" alt="logo" />
				</a>
				<div className="links">
					<div className="link-container">
						<Link className="link" to="">
							Home
						</Link>
					</div>
					<div className="link-container">
						<Link className="link" to="tasks">
							Tasks
						</Link>
					</div>
				</div>
			</nav>
			<nav className="navbar-mobile" id="burger-menu">
				<Menu right style="overflow: hidden;">
					<Link className="link" to="">
						Home
					</Link>
					<Link className="link" to="tasks">
						Tasks
					</Link>
				</Menu>
				<div className="links">
					<a href="/">
						<img className="navbar-logo-mobile" src="/logo.png" alt="logo" />
					</a>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;
