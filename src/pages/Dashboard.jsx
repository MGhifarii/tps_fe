import React, { useState, useEffect } from 'react';
import style from "../Style/dashboard.module.css";
import axios from "axios";
import ListTps from "../components/ListTps/ListTps";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const navigate = useNavigate();
    const [tps, setTps] = useState(true);

    useEffect(() => {
        checkIsLogin();
      }, []);

    const handleClick = async () => {
        try {
            setLocalStorage("token", "");
            axios.defaults.headers.common["Authorization"] = "";
            navigate("/admin");
          } catch (error) {
            console.log(error);
          }
    };

    const checkIsLogin = async () => {
        try {
            const res = await axios.get("/users/token",{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
            if (res.status !== 200){
                navigate("/admin");
            }
          } catch (error) {
            navigate("/admin");
          }
      }

  return (
    <div className={style.dashboard_container}>
        <div className={style.top}>
            <div className={style.maps_button}>
                <a href="/" ><FontAwesomeIcon icon={faArrowLeft} /> Lihat Peta</a>
            </div>
            <div className={style.logout_button}>
                <button className={style.logout} onClick={event => handleClick(event)}>
                    Logout
                </button>
            </div>
        </div>
        <div className={style.main_container}>
            <div className={style.data_container}>
                <div className={style.navbar}>
                    <button className={style.nav_button} onClick={() => {setTps(true)}}>
                        Daftar TPS Kota Bandung
                    </button>
                </div>
                {tps ? <ListTps/> : null}
            </div>
        </div>
    </div>
  )
}

export default Dashboard