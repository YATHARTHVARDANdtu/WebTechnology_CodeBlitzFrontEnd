import React from 'react'
import { Link } from 'react-router-dom';
import target from './target.png';
import './Problem_Small.css';
import { diff } from 'react-ace';

function Problem_Small({id,title,difficulty,success,attempts,tags,redId}) {
    return (
        <Link to={'/problem/'+redId} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className = {"problem__small " + difficulty} id= {id}>
            {/* <p className="questID smaller">{id}</p>
            <p className="title greater">{title}</p>
            <p className="success"> </p> */}
            <div className="problem__smallLeft">
                <div className="problem__smallHeading">
                    <p className="heading__left">{id}</p>
                    <p className="heading__right">{title}</p>
                </div>
                <div className="problem__smallBody ">
                    
                    </div>
            </div>
            <div className="problem__smallRight">
                <div className= "img"><img src = {target}/></div>
                <div><p> {attempts==0?0:Number(success*100/attempts).toFixed(0)} % </p></div>
            </div>
        </div>
        </Link>
    )
}

export default Problem_Small
