import React , { useState, useEffect } from 'react';
import style from "./modal.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = props => {
  const nama_kecamatan = [
    'Andir',
    'Astana Anyar',
    'Antapani',
    'Arcamanik',
    'Babakan Ciparay',
    'Bandung Kidul',
    'Bandung Kulon',
    'Bandung Wetan',
    'Batununggal',
    'Bojongloa Kaler',
    'Bojongloa Kidul',
    'Buahbatu',
    'Cibeunying Kaler',
    'Cibeunying Kidul',
    'Cibiru',
    'Cicendo',
    'Cinambo',
    'Coblong',
    'GedeBage',
    'KiaraCondong',
    'Lengkong',
    'MandalaJati',
    'Panyileukan',
    'Rancasari',
    'Regol',
    'Sukajadi',
    'Sukasari',
    'Sumur Bandung',
    'Ujung Berung'
  ];

//   const [categories, setCategories] = useState([]);
  const [nama, setNama] = useState("");
  const [kecamatan, setKecamatan] = useState(nama_kecamatan[0]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [wilayah, setWilayah] = useState("");
  const [sampah_masuk, setSampah_masuk] = useState("");
  const [error, setError] = useState("");

//   useEffect(() => {
//     getCategories();
//   }, []);

  useEffect(() => {
    console.log(props.id);
    if(props.id){
      getTpsById(props.id);
    }
  }, []);

  const getTpsById = async (id) => {
    console.log("data" + id)
    const {data : res} = await axios.get(`/tps/${id}`);
    console.log(res);
    setNama(res.data.nama);
    setKecamatan(res.data.kecamatan);
    setLatitude(res.data.latitude);
    setLongitude(res.data.longitude);
    setDeskripsi(res.data.deskripsi);
    setWilayah(res.data.wilayah);
    setSampah_masuk(res.data.sampah_masuk);
    
  }


  const addTps = async () => {
    try {
      var token = localStorage.getItem('token');
      console.log(token);
      await axios.post("/tps", {
         
        nama,
        kecamatan,
        latitude,
        longitude,
        deskripsi,
        wilayah,
        sampah_masuk,
      
      },
      {headers: {
          'Authorization': 'Bearer ' + token
        }},
      );
      
      props.onClose();
      props.getTps();
    } catch (error) {
      setError(error.response.data[0].message);
    }
  };


  const editTps = async (id) => {
    try {
      var token = localStorage.getItem('token');
      console.log(longitude);
      await axios.put(`/tps/${id}`, {
        nama,
        kecamatan,
        latitude,
        longitude,
        deskripsi,
        wilayah,
        sampah_masuk, 
        
      },
      {headers: {
        'Authorization': 'Bearer ' + token
      }});
      props.onClose();
      props.getTps();
    } catch (error) {
      setError(error.response.data[0].message);
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();   
    if(props.id){
      editTps(props.id)
    }
    else{
      addTps();
    }
  }

  return (
    <div className={style.modal} onClick={props.onClose}>
      <div className={style.modal_content} onClick={e => e.stopPropagation()}>
        <div className={style.modal_header}>
          <h4>{props.title}</h4>
          <button onClick={props.onClose} >
          <FontAwesomeIcon icon={faXmark} className="icon_close" />
          </button>
        </div>
        <div className={style.modal_body}>
        <form onSubmit={handleSubmit}>
          <label>Nama Tps</label><br/>
          <input 
          type="text" 
          name="nama_tps"
          onChange={(e) => setNama(e.target.value)}
          value={nama} 
          placeholder='Masukkan Nama Tps'
          /><br/>
          <label>Kecamatan</label><br/>
          <select onChange={(e) => setKecamatan(e.target.value)} value={kecamatan} name="kecamatan" id="kecamatan" >
            <option value="" disabled selected>Pilih Kecamatan</option>
            {nama_kecamatan.map((element, index) => (
              <option key={index} value={element}>{element}</option>
            ))}
          </select><br/>
          <label>Deskripsi</label><br/>
          <textarea 
          placeholder='Masukkan Deskripsi' 
          name="deskripsi" 
          onChange={(e) => setDeskripsi(e.target.value)}
          value={deskripsi}
          rows="4" 
          cols="50"
          ></textarea><br/>
          <label>Latitude</label><br/>
          <input 
          type="text" 
          name="latitude" 
          onChange={(e) => setLatitude(e.target.value)}
          value={latitude}
          placeholder='Masukkan Latitude'
          /><br/>
          <label>Longitude</label><br/>
          <input 
          type="text" 
          name="longitude" 
          onChange={(e) => setLongitude(e.target.value)}
          value={longitude}
          placeholder='Masukkan Longitude'
          /><br/>
          <label>Wilayah</label><br/>
          <input 
          type="text" 
          name="wilayah"
          onChange={(e) => setWilayah(e.target.value)}
          value={wilayah} 
          placeholder='Masukkan Wilayah'
          /><br/>
          <label>Sampah masuk</label><br/>
          <input 
          type="text" 
          name="sampah_masuk"
          onChange={(e) => setSampah_masuk(e.target.value)}
          value={sampah_masuk} 
          placeholder='Masukkan Jumlah Sampah Masuk'
          /><br/>
          {error && <div className={style.alert}>{error}</div>}
          <div className={style.container_button}>
            <button>Simpan</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Modal