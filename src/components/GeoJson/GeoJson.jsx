import React from 'react'
import axios from "axios";
import data from "../../data_geojson.json";
import { GeoJSON } from "react-leaflet";


const GeoJson = (props) => {
//   const checkKlasifikasi = async (kecamatan) => {
//     const {data:klasifikasi} = await axios.get(`/analisis/check/${kecamatan}`);
//     return klasifikasi.response;
// };
  const getBatas = async () => {
    const dataBatas = await axios.get('/analisis/sd');
    console.log(dataBatas.data);
    return dataBatas.data;
  }
  const getJumlah = async (kecamatan) => {
    const {data:jumlah} = await axios.get(`/analisis/jumlah/${kecamatan}`);
    return jumlah.response;
  };

  const jmlhSampahMasuk = async (kecamatan) => {
    const {data:jumlahSampah} = await axios.get(`/analisis/jumlahSampah/${kecamatan}`);
    return jumlahSampah.response[0]
  }
  console.log(props)

  const onEachContry = async (feature, layer) =>{
    layer.options.color = "grey";  
    layer.options.weight = 1; 
    layer.options.fillOpacity = 0.2;
    const contryName = feature.properties.KECAMATAN;
    const jumlah = await getJumlah(contryName);
    const sampah = await jmlhSampahMasuk(contryName);
    const batas = await getBatas();
    console.log(batas)

    // console.log(sampah);

    var klasifikasi = ''
    klasifikasi = await jmlhSampahMasuk(contryName);
    // console.log(props)
    if (sampah?.sampahMasuk < batas?.batasBawah){
      layer.setStyle({
        fillColor: '#20A100',
        fillOpacity: 0.4,
      });
      // layer.options.fillColor = '#3CFF33';
      // layer.options.fillOpacity = 0.4;
    }
    else if (sampah?.sampahMasuk < batas?.batasAtas){
      layer.setStyle({
        fillColor: '#FFF500',
        fillOpacity: 0.4,
      });
      // layer.options.fillColor = '#FF3333';
      // layer.options.fillOpacity = 0.4;
    }
    else if (sampah?.sampahMasuk > batas?.batasAtas){
      layer.setStyle({
        fillColor: '#FF0000',
        fillOpacity: 0.4,
      });
      // layer.options.fillColor = '#FF3333';
      // layer.options.fillOpacity = 0.4;
    }
    // else if (sampah?.sampahMasuk < 200){
    //   layer.setStyle({
    //     fillColor: '#E58200',
    //     fillOpacity: 0.4,
    //   });
    //   // layer.options.fillColor = '#FF3333';
    //   // layer.options.fillOpacity = 0.4;
    // }
    // else if (sampah?.sampahMasuk > 200){
    //   layer.setStyle({
    //     fillColor: '#FF0000',
    //     fillOpacity: 0.4,
    //   });
    //   // layer.options.fillColor = '#FF3333';
    //   // layer.options.fillOpacity = 0.4;
    // }

    else  {
      layer.setStyle({
        fillColor: '#000000',
        fillOpacity: 0.4,
      });
      // layer.options.fillColor = '#E3FF33';
      // layer.options.fillOpacity = 0.4;
    }
    layer.on(
      'click', function (e) {
        let popupContent = `
        <Popup>
            <table>
             <tr>
                <td style="width: 200px">Nama Kecamatan</td>
                <td>:</td>
                <td>${contryName}</td>
             </tr>
              <tr>
                <td>Jumlah TPS</td>
                <td>:</td>
                <td>${jumlah}</td>
              </tr>
              <tr>
                <td>Jumlah Sampah Masuk (±M³/Hari)</td>
                <td>:</td>
                <td>${sampah?.sampahMasuk}</td>
              </tr>
            </table>
        </Popup>
    `;
    layer.bindPopup(popupContent);
    });
    layer.on(
      'mouseover', function (e) {
        const target = e.target;
        target.setStyle({
          fillOpacity: 0.8,
        });
        let popupContent = `
        <Popup>
            <table>
             <tr>
                <td style="width: 200px">Nama Kecamatan</td>
                <td>:</td>
                <td>${contryName}</td>
             </tr>
              <tr>
                <td>Jumlah TPS</td>
                <td>:</td>
                <td>${jumlah}</td>
              </tr>
              <tr>
                <td>Jumlah Sampah Masuk(±M³/Hari)</td>
                <td>:</td>
                <td>${sampah?.sampahMasuk}</td>
              </tr>
            </table>
        </Popup>
    `;
    layer.bindPopup(popupContent);
    });
    layer.on(
      'mouseout', function (e) {
        const target = e.target;
        target.setStyle({
          fillOpacity: 0.4,
        });
    });
  }

  return (
    <GeoJSON 
    key='mygeojson' 
    data={data}
    onEachFeature={onEachContry}
    />
  )
}

export default GeoJson