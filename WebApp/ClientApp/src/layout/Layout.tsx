import { Fragment } from "react";
import Footer from "./Footer.component";
import Navbar from "./Navbar.component";
import { Settings } from "src/components";
import ModalPlaceholder from "./ModalPlaceholder.component";

import type { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => (
  <Fragment>
    <ModalPlaceholder />
    <Navbar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;
