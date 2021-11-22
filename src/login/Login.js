import React from 'react';
import './Login.css';
import {useStateValue} from '../stateProvider';
import { useHistory } from 'react-router';
import { useState } from 'react';
import 'axios'
import axios, { Axios } from 'axios';


function Login() {
    const history = useHistory();
    const [{problems}, dispatch] = useStateValue();

    const [usernamel,setLoginUsername] = useState("");
    const [passwordl,setLoginPassword] = useState("");


    const [usernamer,setRegisterUsername] = useState("");
    const [passwordr,setRegisterPassword] = useState("");
    const [namer,setRegisterName] = useState("");


    console.log(problems)

    const loginBox = document.getElementsByClassName("login__fields")
    const registerBox = document.getElementsByClassName("register__fields")
    const loginFields = document.getElementsByClassName("loginInput")
    const registerFields = document.getElementsByClassName("registerInput")
    const loginSwitch = document.getElementsByClassName("login__switch")
    const loginBtn = document.getElementsByClassName("login__btn")
    const registerBtn = document.getElementsByClassName("register__btn")

    const loginPage = (box) => {
        if(box==null)
         {
             return;
         }
        loginSwitch[0].classList.add("active")
        loginSwitch[1].classList.remove("active")
        loginBox[0].classList.remove("hide")
        registerBox[0].classList.add("hide")
        loginBtn[0].classList.remove("hide")
        registerBtn[0].classList.add("hide")
    }
    const registerPage = (box)=>{
         if(box==null)
         {
             return
         }
        loginSwitch[1].classList.add("active")
        loginSwitch[0].classList.remove("active")
        loginBox[0].classList.add("hide")
        registerBox[0].classList.remove("hide")
        loginBtn[0].classList.add("hide")
        registerBtn[0].classList.remove("hide")
    }

    const slu = (e)=>{
        setLoginUsername(e.target.value)
    }

    const slp = (e) => {
        setLoginPassword(e.target.value)
    }
    const sru = (e) => {
        setRegisterUsername(e.target.value)
    }
    const srn = (e) => {
        setRegisterName(e.target.value)
    }
    const srp = (e) => {
        setRegisterPassword(e.target.value)
    }
    const tryLogin = async e => {

        console.log(passwordl, usernamel)
        if(passwordl == "" || usernamel=="")
        {
            alert("Invalid entries");
            return;
        }

        let formData = new FormData();
        formData.append('username',usernamel)
        formData.append('password',passwordl)
        var response;
        await axios.post('https://codeblitz25.herokuapp.com/login',{
            username:usernamel,
            password:passwordl
        })
        .then((resp) => {
            console.log(resp)
            if(resp.status==200)
            {
                response = resp.data;
            }
            else{
                response = null
            }
        });

        if(response)
        {
            dispatch({
                type:'SET_USER',
                user:response
            });

            window.localStorage.setItem("user",JSON.stringify(response))
            history.push('/');
        }
        else{
            alert("Wrong Username / Password");
        }
    }


    const tryRegister = async e => {
        if(namer=="" || usernamer == "" || passwordr == "")
        {
            alert("Invalid Entries");
            return;
        }

        let formData = new FormData();
        formData.append('username',usernamer)
        formData.append('password',passwordr)
        formData.append('name',namer)
        var response;
        await axios.post('https://codeblitz25.herokuapp.com/register',{
            username:usernamer,
            password:passwordr,
            name:namer
        })
        .then((resp) => {
            if(resp.status==200)
            {
                response = resp.data;
            }
            else{
                response = null
            }
        });

        if(response)
        {
            dispatch({
                type:'SET_USER',
                user:response
            });
            history.goBack();
        }
        else{
            alert("Username Taken");
        }
    }
    return (
        <div className = "login">
            <div className="login__modeSwitch">

                <div className="login__switch active"  onClick={ loginPage}><p>LOGIN</p></div>
                <div className = "login__switch" onClick={ registerPage}><p>REGISTER</p></div>
                
            </div>
            <div className = "login__fields ">
                <input type="text" onChange = {slu}  className="loginInput" name="usernamel" placeholder="Enter Username"/>
                <input type="password" onChange={slp}  className="loginInput" name="passwordl" placeholder="Enter Password" />
            </div>
            <div className = "register__fields hide">
                <input type="text" onChange = {srn} className="registerInput" name="namer" placeholder="Enter your Name"/> 
                <input type="text" onChange = {sru} className="registerInput" name="usernamer" placeholder="Enter Username"/>
                <input type="password" onChange = {srp} name="passwordr" className="registerInput" placeholder="Enter password"/>
            </div>

            <div className="login__btn">
                <button className="login__submitBtn" onClick = {tryLogin}>LOGIN</button>
            </div>

            <div className = "register__btn hide">
                <button onClick = {tryRegister} className = "login__submitBtn">REGISTER</button>
            </div>
        </div>
    )
}

export default Login
