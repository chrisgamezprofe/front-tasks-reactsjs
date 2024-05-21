import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Container,
  Divider,
  MenuItem,
  Menu,
  Card,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Header,
  Table,
  Rating,
} from "semantic-ui-react";
const Layout = () => {
  const [activeItem, setActiveItem] = useState();

  const handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  return (
    <>
      <Menu>
        <Link to="/">
          <MenuItem
            name="Home"
            active={activeItem === "Home"}
            onClick={() => setActiveItem("Home")}
          >
            Inicio
          </MenuItem>
        </Link>
        <Link to="/new">
          <MenuItem name="new" active={activeItem === "new"}>
            Nueva Tarea
          </MenuItem>
        </Link>
        <Link to="/docs">
          <MenuItem
            name="Docs"
            active={activeItem === "Docs"}
            onClick={() => setActiveItem("Docs")}
          >
            Docs
          </MenuItem>
        </Link>
      </Menu>

      <Outlet />
    </>
  );
};

export default Layout;
