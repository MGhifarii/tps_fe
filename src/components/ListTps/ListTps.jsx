import React, { useState, useEffect } from 'react'
import style from "./listtps.module.css";
import axios from "axios";
import { saveAs } from 'file-saver';
import Modal from "../Modal/Modal";
// import ModalImport from "../ModalImport/ModalImport";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListTps = () => {
    const [tps, setTps] = useState([]);
    const [show, setShow] = useState(false)
    // const [showImport, setShowImport] = useState(false)
    const [title, setTitle] = useState(false)
    const [id, setId] = useState('');

    useEffect(() => {
        getTps();
      }, []);

    const getTps = async (e) => {
        const dataTps = await axios.get("/tps");
        setTps(dataTps.data.data);
    };

    const onSearch = async (e) => {
        const dataTps = await axios.get(`/tps?search=${e.target.value}`);
        setTps(dataTps.data.data);
    };

    const exportHandle = async () => {
        axios.get('/export/create-pdf')
        .then(() => axios.get('/export/fetch-pdf', { responseType: 'blob' }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'data.pdf');
        });
    };

    const deleteTps = async (id) => {
        try {
            console.log("tps", id)
            var token = localStorage.getItem('token');
            console.log(token);
            await axios.delete(`/tps/${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token  // Gantilah your_auth_token_here dengan token Anda
            }} );          
          getTps();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className={style.container}>
        <div className={style.button_container}>
            <div className={style.button}>
                <button className={style.add_tps}  onClick = {() => [setShow(true), setTitle('Form Penambahan Tps'), setId('')]}>
                    Tambah Data
                </button>
            </div>
        </div>
        <div className={style.table_container}>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th className={style.nama}>Nama</th>
                        <th className={style.kelurahan}>Kecamatan</th>
                        <th>kelurahan</th>
                        <th>Sampah Masuk (m3)</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>                            
                    {tps.map((tps, index) => (
                        <tr key={tps._id}>
                            <td>{index+1}</td>
                            <td className={style.nama}>{tps.nama}</td>
                            <td className={style.kecamatan}>{tps.kecamatan}</td>
                            <td className={style.kelurahan}>{tps.kelurahan}</td>
                            <td>{tps.sampah_masuk}</td>
                            <td>{tps.latitude}</td>
                            <td>{tps.longitude}</td>
                            <td><button onClick = {() => [setShow(true), setTitle('Formulir Edit'), setId(tps._id)]}><FontAwesomeIcon icon={faPenToSquare} className={style.icon_edit} /></button> <button onClick={() => deleteTps(tps._id)}><FontAwesomeIcon icon={faTrash} className={style.icon_delete} /></button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {show ? <Modal className={style.modal} getTps={() => getTps()} onClose={() => setShow(false)} show={show} id={id} title={title}/> : null}
        {/* {showImport ? <ModalImport className={style.modal_import} gettps={() => getTps()} onClose={() => setShowImport(false)}/> : null} */}
    </div>
  )
}

export default ListTps