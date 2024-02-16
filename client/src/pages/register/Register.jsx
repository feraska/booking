import { useNavigate } from "react-router-dom";
import "./register.css"
import { useState } from "react";
const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        country:undefined,
        city:undefined,
        phone:undefined,
        password:undefined

      });
      const navigate = useNavigate()
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
      const handleClick =  async(e) => {
        e.preventDefault();
        const api = axios.create({baseURL:"http://localhost:8800/api"})
        try {
           await api.post("/auth/register", credentials);
           navigate("/")
        } catch (err) {
           
        }
      };  
    return (
        <div className="register">
        <div className="rContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="text"
            placeholder="country"
            id="country"
            onChange={handleChange}
            className="rInput"
          />
           <input
            type="text"
            placeholder="city"
            id="city"
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="phone"
            placeholder="phone"
            id="phone"
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="rInput"
          />
          <button  onClick={handleClick} className="rButton">
            register
          </button>
         
        </div>
      </div>
    )
   
}
export default Register