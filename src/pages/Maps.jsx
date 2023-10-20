import style from "../Style/maps.module.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import Map from "../components/Maps/Map";
import Header from "../components/Header/Header";

  export default function Maps() {
    const navigate = useNavigate();
    const [tps, setTps] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [category, setCategory] = useState('');
    // const [batasAtas, setBatasAtas] = useState('');
    // const [batasBawah, setBatasBawah] = useState('');
    // const [isLogin, setIsLogin] = useState(false);
    const [value, setValue] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const handleClickLogin = () => {
        navigate('login');
      };
    const handleClickDashboard = () => {
        navigate('dashboard');
      };
    // const handleChange = event => {
    //     if (!event.target.value){
    //       setCategory('');
    //       getRestorans();
    //     }
    //     else{
    //       setCategory(event.target.value);
    //       getRestoransByCategory(event.target.value);
    //     }
    //   };

    const onChangeSearch = event => {
        setValue(event.target.value);
        if (!event.target.value){
          setShowSearch(false);
        }
      };

    const onSearch = (item) => {
      setValue(item.nama);
      setDataSearch(item);
      setShowSearch(true);
    }

    useEffect(() => {
      getTps();
      // getCategories();
      // checkIsLogin();
      // getBatas();
    }, []);

    const getTps = async () => {
      try{
        const dataTps = await axios.get("http://localhost:5000/api/tps");
          setTps(dataTps.data.data);
        }catch(e){
        // console.log(e);
        }
    };

    const getTpsByCategory = async (id) => {
      const dataTpsByCategory = await axios.get(`/tps/get-by-category/${id}`);
      setTps(dataTpsByCategory.data.data);
    };

    // const getCategories = async () => {
    //   const dataCategories = await axios.get("/categories");
    //   setCategories(dataCategories.data.response);
    // }

    // const getBatas = async () => {
    //   const batas = await axios.get("/analisis");
    //   setBatasAtas(batas.data.batas_atas);
    //   setBatasBawah(batas.data.batas_bawah);
    // }

    // const checkIsLogin = async () => {
    //   try {
    //       const res = await axios.get("/users/token");
    //       if (res.status === 200){
    //           setIsLogin(true);
    //       }
    //       else{
    //           setIsLogin(false);
    //       }
    //     } catch (error) {
    //       setIsLogin(false);
    //     }
    // }


    return (
      
      <div className={style.container}>
        <Header/>
        <Map  search={showSearch} data={tps} dataSearch={dataSearch}/>
        <div className={style.topleft}>
            <div className={style.form_search}>
              <input value={value} onChange={onChangeSearch} type="search" name="search" placeholder="&#xf002;  Search..."/>
            </div>
              {/* {tps.filter(item => {
                const searchTerm = value();
                const nama_tps = item.nama();
                const kecamatan = item.kecamatan();

                // if (searchTerm === nama_tps || searchTerm === kecamatan){
                //   return item;
                // }
                
                return searchTerm && (nama_tps.startsWith(searchTerm) || kecamatan.startsWith(searchTerm)) && nama_tps !== searchTerm;
              })
              .slice(0,10)
              .map((item) => (
                <div 
                  key={item.id}
                  onClick={() => onSearch(item)} 
                  className={style.dropdown_row}>
                  {item.nama}<br/>
                  <span>{item.kecamatan}</span>
                </div>
              ))} */}
            </div>
            <div class={style.dropdown}>
              <button class={style.dropbtn}>Pilih Peta <i class="fa fa-sort-desc" aria-hidden="true"></i></button>
              <div class={style.dropdown_content}>
                <a href="/geo">Poligon</a>
                <a href="/">Marker</a>
              </div>
            </div>

        {/* <div className={style.topright}> 
          {isLogin ? 
          <button className={style.login} onClick={event => handleClickDashboard(event)}>
          Dashboard 
          </button> : 
          <button className={style.login} onClick={event => handleClickLogin(event)}>
          Login <FontAwesomeIcon icon={faRightToBracket} />
          </button>}
          {isLogin ? 
          <button className={style.login_icon} onClick={event => handleClickDashboard(event)}>
          <FontAwesomeIcon icon={faUser} />
          </button> : 
          <button className={style.login_icon} onClick={event => handleClickLogin(event)}>
          <FontAwesomeIcon icon={faRightToBracket} />
          </button>}
        </div> */}
        {/* <div className={style.bottomleft}>
          <div className={style.legend}>
          <span className={style.legend_key}><hr width="40px" size="10" color="#3CFF33"/></span>
          <span className={style.legend_value}>{`: Banyak (X > ${batasAtas})`}</span>
          </div> 
          <div className={style.legend}>
          <span className={style.legend_key}><hr width="40px" size="10" color="#E3FF33"/></span>
          <span className={style.legend_value}>{`: Sedang (${batasBawah}`} &#8804; {`X`} &#8804; {`${batasAtas})`}</span>
          </div> 
          <div className={style.legend}>
          <span className={style.legend_key}><hr width="40px" size="10" color="#FF3333"/></span>
          <span className={style.legend_value}>{`: Sedikit (X < ${batasBawah})`}</span>
          </div> 
        </div> */}
      </div>
    );
  }