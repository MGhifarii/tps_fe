import React, {Component} from 'react';
import Logo from "../../icons/Logo_putih.png";
import style from "../Header/header.module.css";

import { FaSignOutAlt, FaEdit,FaPlusSquare} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {

    return (
        <>
            <header>
            {/* <div>
                <div className={style.header}>
                    <img href="/" className={style.logo} src={Logo} alt="Logo"/>
                    <ul>
                    <li><a href="/admin">Admin</a></li>
                    <li><a href="/">Home</a></li>
                    <li className={style.dropdown}>
                        <a href='/geo' className={style.dropbtn}>Peta</a>
                        <div className={style.dropdowncontent}>
                            <a href="">Poligon</a>
                            <a href="#">Marker</a>
                        </div>
                    </li>
                </ul>   
                </div>
                
            </div> */}
            <div className={style.header}>
                <div className='col' href="/">
                    <img className={style.logo} src={Logo} alt="Logo"/>
                </div>
                <div className='col '>
                <ul className='d-flex'>
                    <li><a href="/admin">Admin</a></li>
                    <li><a href="/">Home</a></li>
                    <li className={style.dropdown}>
                        <a href='/geo' className={style.dropbtn}>Peta</a>
                        <div className={style.dropdowncontent}>
                            <a href="">Poligon</a>
                            <a href="#">Marker</a>
                        </div>
                    </li>
                </ul>   
                </div>
            </div>
        </header>
            {/* <nav class="navbar navbar-light bg-dark ">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1 text-light">Nara Shop</span>
                    <li class="nav-item">
                        <a class="nav-link">logout</a>
                    </li>
                </div>
            </nav> */}
        </>
      )
}

export default Header