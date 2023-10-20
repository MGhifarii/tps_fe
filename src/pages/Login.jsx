// // import React, { useState, useContext } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// import "../Style/login.module.css";
// // import AuthContext from "../context/AuthContext.js";

// import { useState, useEffect } from "react";
// // import { FaSignInAlt } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { login, reset } from "../features/auth/authSlice";
// // import Spinner from "../components/Spinner";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const { username, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
//     }

//     if (isSuccess || user) {
//       navigate("/home");
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const userData = {
//       username,
//       password,
//     };

//     dispatch(login(userData));
//   };

//   // if (isLoading) {
//   //   return <Spinner />;
//   // }

//   return (
//     <>
//       <body className="body-bg min-h-screen md:px-0 align-middle grid content-center font-nunito tracking-wide">
//         <div>
//           <div className="text-center font-nunito font-bold mb-2">
//             <h1 className="">MASUK KE AKUN-MU</h1>
//           </div>
//           <div className="LoginForm">
//             <form onSubmit={onSubmit} className="flex flex-col">
//               <div className="flex flex-row">
//                 <label for="username" className="w-1/3">
//                   Alamat E-mail
//                 </label>
//                 <input
//                   value={username}
//                   type="username"
//                   id="username"
//                   name="username"
//                   className="mb-3.5 border border-silver rounded w-2/3 p-1 pl-2"
//                   placeholder="Masukkan Alamat E-Mail"
//                   onChange={onChange}
//                 />
//               </div>
//               <div className="flex flex-row">
//                 <label for="password" className="w-1/3">
//                   Sandi
//                 </label>
//                 <input
//                   value={password}
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="mb-3.5 border border-silver rounded w-2/3 p-1 pl-2"
//                   placeholder="Masukkan Sandi"
//                   onChange={onChange}
//                 ></input>
//               </div>
//               {/* <div className="grid place-items-center">
//                 <div>
//                   <input
//                     type="checkbox"
//                     className="accent-silver bg-silver border border-black"
//                   ></input>
//                   <label for="checkbox" className="ml-2">
//                     Ingat Akun Saya
//                   </label>
//                 </div>
//               </div> */}
//               <div className="grid grid-cols-3">
//                 <div></div>
//                 <button
//                   type="submit"
//                   className="h-9 px-10 m-2 bg-blue hover:bg-black rounded-lg text-white place-item-start"
//                 >
//                   Masuk
//                 </button>
//                 <Link to="/register">
//                   <div className="text-sm text-blue text-center p-3 hover:underline">
//                     Belum punya akun?
//                   </div>
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react'
import axios from "axios";
import style from "../Style/login.module.css";
import logo from '../icons/Logo.png';
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("/users/login", {
        username,
        password,
      });
      console.log(res)
      setLocalStorage("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
      setError("");
      navigate("/dashboard");
    } catch (error) {
      console.error(error)
      // error.data[0] ? setError(error.data[0].message) : setError(error.data.message);
    }
    
  }

  const checkIsLogin = async () => {
    try {
        const res = await axios.get("/users/token", {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
        if (res.status === 200){
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    checkIsLogin(); 
  }, []);
  
  return (
    <div className={style.flex_container}>
    <div className={style.left}>
        <div className={style.back_button}>
        <a href="/" ><FontAwesomeIcon icon={faArrowLeft} /> Kembali ke Peta</a>
        </div>
        <div className={style.form_container}>
          <div className={style.form_login}>
            <h2>Login Admin</h2>
            <form onSubmit={handleSubmit}>
            <label>Username</label><br/>
            <input 
            className={style.login_input} 
            type="username" 
            placeholder="Masukkan Username" 
            name="username" 
            onChange={(e) => setUsername(e.target.value)}
            required/><br/>
            <label>Password</label><br/>
            <input 
            className={style.login_input} 
            type="password" 
            placeholder="Masukkan Password" 
            name="password"
            onChange={(e) => setPassword(e.target.value)} 
            required
            minLength="6"/>
            {error && <div className={`${style.alert} danger`}>{error}</div>}
            <div className={style.login_button_container}>
              <button className={style.login_button}>
              Login
              </button>
            </div>
            
            </form>
          </div>
        </div>
    </div>
  
    {/* <div className={style.right}>
        <img src={logo}/>
    </div> */}
  
    </div>
  )
}

export default Login










// import React, { useState, useEffect } from 'react'
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { setLocalStorage } from "../scripts/localStorage";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import style from "../Style/login.css";


// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import logo from '../icons/Logo.png'

// // import { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { toast } from "react-toastify";
// // import { login, reset } from "../features/auth/authSlice";

// const Login = () => {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const { email, password } = formData;

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const { user, isError, isSuccess, message } = useSelector(
// //     (state) => state.auth
// //   );

// //   useEffect(() => {
// //     if (isError) {
// //       toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
// //     }

// //     if (isSuccess || user) {
// //       navigate("/home");
// //     }

// //     dispatch(reset());
// //   }, [user, isError, isSuccess, message, navigate, dispatch]);

// //   const onChange = (e) => {
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const onSubmit = (e) => {
// //     e.preventDefault();

// //     const userData = {
// //       email,
// //       password,
// //     };

// //     dispatch(login(userData));
// //   };

// //ini  yang dipake dibawah

// // const navigate = useNavigate();
// // const [email, setEmail] = useState("");
// // const [password, setPassword] = useState("");
// // const [error, setError] = useState("");

// // const handleSubmit = async (e) => {
// //   e.preventDefault();
  
// //   try {
// //     const { data: res } = await axios.post("/users/login", {
// //       email,
// //       password,
// //     });

// //     setLocalStorage("token", res.token);
// //     axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
// //     setError("");
// //     navigate("/dashboard");
// //   } catch ({ response }) {
// //     response.data[0] ? setError(response.data[0].message) : setError(response.data.message);
// //   }
// // }

// // const checkIsLogin = async () => {
// //   try {
// //       const res = await axios.get("/users/token");
// //       if (res.status === 200){
// //         navigate("/dashboard");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// // }

// // useEffect(() => {
// //   checkIsLogin(); 
// // }, []);

// //   return (

// // <div className={style.flex_container}>

// // <div className={style.left}>
// //     <div className={style.back_button}>
// //     <a href="/" ><FontAwesomeIcon icon={faArrowLeft} /> Kembali ke Peta</a>
// //     </div>
// //     <div className={style.form_container}>
// //       <div className={style.form_login}>
// //         <h2>Login Admin</h2>
// //         <form onSubmit={handleSubmit}>
// //         <label>Email</label><br/>
// //         <input 
// //         className={style.login_input} 
// //         type="email" 
// //         placeholder="Masukkan Email" 
// //         name="email" 
// //         onChange={(e) => setEmail(e.target.value)}
// //         required/><br/>
// //         <label>Password</label><br/>
// //         <input 
// //         className={style.login_input} 
// //         type="password" 
// //         placeholder="Masukkan Password" 
// //         name="password"
// //         onChange={(e) => setPassword(e.target.value)} 
// //         required
// //         minLength="6"/><br/>
// //         {error && <div className={`${style.alert} danger`}>{error}</div>}
// //         <button className={style.login_button}>
// //           Login
// //         </button>
// //         </form>
// //       </div>
// //     </div>
// // </div>


// // </div> 

    
// //   );

// // const [formData, setFormData] = useState({
// //   userName: "",
// //   password: "",
// // });

// // const { userName, password } = formData;

// // const dispatch = useDispatch();

// // const { admin, status, error } = useSelector((state) => state.admin);

// // useEffect(() => {
// //   if (admin) {
// //       window.location.href = "/admin/dashboard";
// //   }

// //   if (error) {
// //       alert(error.message);
// //   }

// //   dispatch(reset());
// // }, [admin, error, dispatch]);

// // const onChange = (e) => {
// //   setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //   }));
// // };

// // const onSubmit = (e) => {
// //   e.preventDefault();
// //   const data = {
// //       userName: userName,
// //       password: password
// //   }
// //   dispatch(login(data));
// // };

// const card = {
//   border: "2px solid #ECECEC",
//   borderRadius: "12px",
//   padding: "3rem 4.5rem",
//   margin: "5rem auto",
//   width: "30%",
//   textAlign: 'center'
// }
// const link = {
//   textDecoration: 'none'
// }
// const input = {
//   border: "2px solid #ECECEC"
// }

// return (
// <>
// <Form></Form>
//   <div className={style.flex_container}>
//       <p style={{fontSize: '1.5rem', margin: '1rem 0 2rem'}}>Masuk <b>Admin</b></p>
//       <Form >
//           <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control 
//               type="text"
//               name="userName" 
//               // value={userName} 
//               // onChange={onChange} 
//               style={input} />
//           </Form.Group>

//           <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control 
//               type="password" 
//               name="password"
//               // onChange={onChange} 
//               style={input} />
//           </Form.Group>
//           <Button type='submit' className='py-3 w-100' style={{background: '#4361EE', fontWeight: '500'}}>MASUK</Button>
//       </Form>
//   </div>
// </>
// )

// };

// export default Login;

