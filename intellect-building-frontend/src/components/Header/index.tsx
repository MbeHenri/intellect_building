import React, { useCallback } from "react";
import CartBox from "../Cart/box";

import logo from "../../assets/images/logo.png";
import logo_2 from "../../assets/images/logo-2.png";
import useSite from "../../providers/Site/hooks";
import { useScrolling } from "../../utils/hooks";
import Top from "../Top";
import { Link } from "react-router-dom";

interface Props {
  currentPage?: "home" | "product" | "blog";
}

const Header: React.FC<Props> = ({ currentPage }) => {
  const site = useSite();
  const { isScrolling } = useScrolling();

  const openMenu = useCallback(() => {
    document.body.classList.add("mobile-menu-visible");
  }, []);

  const closeMenu = useCallback(() => {
    document.body.classList.remove("mobile-menu-visible");
  }, []);

  return (
    <>
      <Top />
      <header
        className={
          "main-header header-style-three" +
          (isScrolling ? " fixed-header" : "")
        }
      >
        {/* <!-- Header Upper --> */}
        <div className="header-upper">
          <div className="auto-container">
            <div className="clearfix">
              <div className="pull-left logo-box">
                <div className="logo">
                  <a href="index-2.html">
                    <img src={logo_2} alt="Logo" title="" />
                  </a>
                </div>
              </div>

              <div className="pull-right upper-right d-none d-md-block">
                <div className="info-outer clearfix">
                  {/* <!--Info Box--> */}
                  <div className="upper-column info-box">
                    <div className="icon-box">
                      <span className="flaticon-24-hours-2"></span>
                    </div>
                    <ul>
                      <li>
                        <span>{site.location},</span> <br /> {site.city},
                        {site.country}
                      </li>
                    </ul>
                  </div>

                  {/* <!--Info Box--> */}
                  <div className="upper-column info-box">
                    <div className="icon-box">
                      <span className="flaticon-call"></span>
                    </div>
                    <ul>
                      <li>
                        <span>{site.phone} </span> <br />
                        {site.email}
                      </li>
                    </ul>
                  </div>

                  {/* <!--Info Box--> */}
                  <div className="upper-column info-box">
                    <ul className="social-icon-two">
                      <li>
                        <a href="/">
                          <span className="fa fa-facebook-f"></span>
                        </a>
                      </li>
                      <li>
                        <a href={site.linkLinkedIn}>
                          <span className="fa fa-linkedin"></span>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <span className="fa fa-twitter"></span>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <span className="fa fa-pinterest-p"></span>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <span className="fa fa-google-plus"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--End Header Upper--> */}

        {/* <!--Header Lower--> */}
        <div className="header-lower">
          <div className="auto-container">
            <div className="inner-container clearfix">
              <div className="nav-outer clearfix">
                {/* <!--Mobile Navigation Toggler--> */}
                <div className="mobile-nav-toggler" onClick={openMenu}>
                  <span className="icon flaticon-menu"></span>
                </div>

                {/* <!-- Main Menu --> */}
                <nav className="main-menu navbar-expand-md">
                  <div className="navbar-header">
                    {/* <!-- Toggle Button -->  */}
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>

                  <div
                    className="navbar-collapse collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li
                        className={
                          currentPage && currentPage === "home" ? "current" : ""
                        }
                      >
                        <Link to="/">Home</Link>
                      </li>
                      <li
                        className={
                          currentPage && currentPage === "product"
                            ? "current"
                            : ""
                        }
                      >
                        <Link to="/training">Trainings</Link>
                      </li>
                      <li
                        className={
                          currentPage && currentPage === "blog" ? "current" : ""
                        }
                      >
                        <Link to="/blog">Blog</Link>
                      </li>
                    </ul>
                  </div>
                </nav>

                {/* <!-- Main Menu End--> */}
                <div className="outer-box clearfix">
                  <CartBox />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--End Header Lower--> */}

        {/* <!-- Sticky Header  --> */}
        <div className="sticky-header">
          <div className="auto-container clearfix">
            {/* <!--Logo--> */}
            <div className="logo pull-left">
              <a href="index-2.html" title="">
                <img src={logo} alt="Logo" title="" />
              </a>
            </div>
            {/* <!--Right Col--> */}
            <div className="pull-right">
              {/* <!-- Main Menu --> */}
              <nav className="main-menu">
                <div
                  className="navbar-collapse collapse clearfix"
                  id="navbarSupportedContent"
                >
                  <ul className="navigation clearfix">
                    <li className="current">
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/training">Trainings</Link>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <div className="outer-box clearfix">
                <CartBox />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Sticky Menu --> */}

        {/*  <!-- Mobile Menu  --> */}
        <div className="mobile-menu">
          <div className="menu-backdrop" onClick={closeMenu}></div>
          <div className="close-btn" onClick={closeMenu}>
            <span className="icon flaticon-multiply"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="/">
                <img src={logo_2} alt="Logo" title="" />
              </Link>
            </div>
            <div className="menu-outer">
              <div
                className="navbar-collapse collapse clearfix"
                id="navbarSupportedContent"
              >
                <ul className="navigation clearfix">
                  <li>
                    <Link to="/" onClick={closeMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/training" onClick={closeMenu}>
                      Trainings
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" onClick={closeMenu}>
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* <!-- End Mobile Menu --> */}
      </header>
    </>
  );
};

export default Header;
