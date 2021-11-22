import './Problem.css'
import React from 'react'
import ace from 'react-ace'
import AceEditor from 'react-ace';
import { useParams } from 'react-router';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools"
import { useStateValue } from '../stateProvider';
import { Redirect, useHistory } from 'react-router';
import { useState ,useEffect} from 'react';
import axios from 'axios';

import creds from '../config';

function Problem() {

    const [{user},dispatch] = useStateValue();
    const {pid} = useParams()


    const [problemToDisplay,setProblem] = useState()
    const [customInput, setInput] = useState()
    const [customOutput, setOutput] = useState()
    const [langSubmission,setLanguage] = useState()
    const [attemptedProblems,setProblems] = useState(null)
    const [solvedProblems,setProblems1] = useState(null)

    const fetchProblem = async () => {
        await axios.get("https://codeblitz25.herokuapp.com/problems/"+pid).then(resp => {
            console.log(resp);
            setProblem(resp.data.problem)
        });
    }

    const fetchA = async (userID) => {
        await axios.post("https://codeblitz25.herokuapp.com/attempted",{
            userId:userID
        }).then(resp => 
            {
                setProblems(resp.data);
            });
    }

    const fetchB = async(userID) =>{
        await axios.post("https://codebltiz25.herokuapp.com/solve",{
            userId:userID
        }).then(Resp => {
            setProblems1(Resp.data)
        })
    }

    useEffect(() => {
        fetchProblem();

        if(user)
        {   
            setProblems(user.attemptedProblems)
            setProblems1(user.solvedProblems)
            return
        }

        const loggedInUser = JSON.parse(window.localStorage.getItem("user"))
        console.log("Problem section user is ",loggedInUser)
        if(loggedInUser)
        {
            dispatch({
                type:'SET_USER',
                user:loggedInUser
            });

            setProblems(loggedInUser.attemptedProblems);
            setProblems1(loggedInUser.solvedProblems)
        
        }
    }, [user])
    
    const questionPage = document.getElementsByClassName("problem__centerMiddle1");
    const submissionPage = document.getElementsByClassName("problem__centerMiddle2");
    const questionButtons = document.getElementsByClassName("problem__centerTopButton");
    const menu = document.getElementsByClassName('menu');


    //change the pages
    const changePage1 = () => {

        questionPage[0].classList.add("page-inactive")
        questionButtons[0].classList.remove("active")
        submissionPage[0].classList.remove("page-inactive")
        questionButtons[1].classList.add("active")
        
    };
    const changePage2 = () => {

        questionPage[0].classList.remove("page-inactive")
        questionButtons[0].classList.add("active")
        submissionPage[0].classList.add("page-inactive")
        questionButtons[1].classList.remove("active")
    };

    //adding new submission to the list
    const addNewSubmission = async e => {

        if(user == null){
            alert("Login / Register to submit a question");
            return;
        }

        var doc = <div className = "record">
             <p className="problem__centerMiddle21 ">WA</p>
                <p className="problem__centerMiddle22 ">143</p>
                <p className="problem__centerMiddle23 ">2435</p>
        </div>
        
        var f = document.getElementsByClassName("problem__centerMiddle2")
       
        var g = document.createElement("div")
        g.classList.add("record")
        var a = document.createElement("p");
        var b = document.createElement("p");
        var c = document.createElement("p");
        a.classList.add("problem__centerMiddle21")
        b.classList.add("problem__centerMiddle22")
        c.classList.add("problem__centerMiddle23")

        a.innerText = "WA"
        b.innerText = 143
        c.innerText = 456

        g.appendChild(a);
        g.appendChild(b);
        g.appendChild(c);

        f[0].appendChild(g);
    };

    var code = window.localStorage.getItem("code");
    var language = window.localStorage.getItem("language");

    
    function onChange(newValue)
    {
        code = newValue
        window.localStorage.setItem("code",newValue)
    }

    const changeLanguage = (newLang)=>{

        if(language == newLang)
        {
            return;
        }
        language = newLang;

        switch(language){
            case 'c_cpp':setLanguage("cpp17")
                        break 
            case 'python':setLanguage("python3")
                        break
            case 'java':setLanguage("java")
                        break
        }

        window.localStorage.setItem("language", language)
        window.location.reload()
    }

    function openMenu(){
            menu[0].style.display = "flex";
        
    }

    function closeMenu(newLang){
        menu[0].style.display = "none";
        changeLanguage(newLang)
    }

    const updateInput = e=>{
        setInput(e.target.value)
    }
    const tryTestCase = async e=> {

        if(code == "")
        {
            alert("Invalid Entries")
            return
        }

        console.log({problemId:pid,
            script:code,
            stdin:customInput,
            language:langSubmission,
            versionIndex:0})

        await axios.post('https://codeblitz25.herokuapp.com/sampleCases',{
            script:code,
            stdin:customInput,
            language:"cpp17",
            problemId:pid
        }).then(resp => {
            if(resp.status == 200)
            {
                setOutput(resp.data.output);
                return;
            }
            setOutput("Error in Running , Custom Case");
        });
    }

    const openCustomCase = e => {
        let custom = document.getElementsByClassName("problem__custom");
        custom[0].classList.remove("hide")
    }

    const closeCustomCase = e => {
        let custom = document.getElementsByClassName("problem__custom");
        custom[0].classList.add("hide")
    }
    
    return (
        <div className="problem">
            <div className="problem__left">
                <div className="problem__leftTab">
                    <div className="problem__leftTab1">
                        <p>{problemToDisplay?.successfulSubmissions}/{problemToDisplay?.totalSubmissions}</p>
                    </div>
                </div>
                <div className={"problem__leftTab " + "problem"+problemToDisplay?.difficulty }>
                    <div className={"problem"+problemToDisplay?.difficulty}>
                        <p>{problemToDisplay?.difficulty}</p>
                    </div>
                </div>

            </div>

            <div className="problem__center">

                <div className="problem__centerTop">
                    <div onClick={changePage2} className="problem__centerTopButton active">
                        <p >QUESTION</p>
                    </div>
                    <div onClick={changePage1} className="problem__centerTopButton" >
                        <p >SUBMISSIONS</p>
                    </div>
                </div>
                <div className="problem__centerMiddle">
                    <div className="problem__centerMiddle1 ">
                        <p className = "problem__centerMiddlequest">
                            Quest - {problemToDisplay?.number}
                        </p>
                        <p className = "problem__statement">
                            {problemToDisplay?.statement}
                        </p>
                        <p className = "testCase">
                            Test Cases
                        </p>
                        {
                                problemToDisplay?.testCases.map(doc => (
                                    <p className = "tests">{doc}</p>
                                ))
                        }
                        <p className = "testCase">
                            Expected Output
                        </p>
                        {
                                problemToDisplay?.expectedOutputs.map(doc => (
                                    <p className = "tests">{doc}</p>
                                ))
                        }

                    </div>
                    <div className = "problem__centerMiddle2 page-inactive">
                         <div className="record">
                            <p className="problem__centerMiddle21 heading">Status</p>
                            <p className="problem__centerMiddle22 heading">RunTime</p>
                            <p className="problem__centerMiddle23 heading">Memory</p>
                        </div>
                        {

                            attemptedProblems?.map(doc => (
                                console.log(doc),
                                <div className = {doc._id == pid?"record ":"record hide"}>
                                    <p className="problem__centerMiddle21  ">{doc.submissionStatus}</p>
                                    <p className="problem__centerMiddle22 ">{doc.runTime!=null?doc.runTime:"null"}</p>
                                    <p className="problem__centerMiddle23 ">{doc.memory?doc.memory:"null"}</p>
                                </div>
                            ))
                            
                            }
                        {
                            solvedProblems?.map(doc => (
                                <div className = {doc._id == pid?"record ":"record hide"}>
                                    <p className="problem__centerMiddle21 ">{doc.submissionStatus}</p>
                                    <p className="problem__centerMiddle22 ">{doc.runTime!=null?doc.runTime:"null"}</p>
                                    <p className="problem__centerMiddle23 ">{doc.memory?doc.memory:"null"}</p>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            <div className="problem__right">
                <div className="problem__rightTop">
                    <div className="problem__rightTopOption custom" onClick={openCustomCase}>
                        <p>Custom testCase</p>
                    </div>
                    <div className="problem__rightTopOption color1" onClick={addNewSubmission}>
                        <p>SUBMIT</p>
                    </div>
                    <div className="problem__rightTopOption raise">
                        <p onClick={openMenu}>{language?language:"Select Language"} 👉</p>
                    </div>

                    <div className = "problem__rightTopOption menu display" id="menu">
                        <p className="lang__options" onClick={() => {closeMenu("c_cpp")}}>C/C++</p>
                        <p className="lang__options" onClick={() => {closeMenu("python")}}>Python</p>
                        <p className="lang__options" onClick={() => {closeMenu("js")}}>Javascript</p>
                        <p className="lang__options" onClick={() => {closeMenu("java")}}>Java</p>
                    </div>
                </div>
                <AceEditor
                    mode = {language}
                    theme="chaos"
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={15}
                    
                    setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                    }}
                    value = {code}
                    onChange = {onChange}
                    height={600}
                    width={800}
                />
            </div>
            <div  className = "problem__custom hide">
                <div className = "content">
                    <p onClick = {closeCustomCase} className = "close">&#10060;</p>
                    <p>Input</p>
                    <textarea onChange = {updateInput} >
                    </textarea>
                    <p>Output</p>
                    <textarea value = {customOutput} disabled="true">
                    </textarea>
                    <div onClick = {tryTestCase}className="problem__rightTopOption custom">
                        <p >RUN 🏃‍♂️</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Problem
