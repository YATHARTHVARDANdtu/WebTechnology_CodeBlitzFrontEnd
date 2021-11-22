import React from 'react';
import { useStateValue } from '../stateProvider';
import './LeaderBoard.css';
import { useState, useEffect } from 'react';
import board from './7.png';

function LeaderBoard() {

    const [{user},dispatch]  = useStateValue();
    const [leaderBoard, setLeaderBoard] = useState([])
    const [count,updateCount] = useState(1)
    const [positionOfUser, setPosition] = useState(-1)

    const fetchLeaderBoard = async ()=> {
        let Response = await fetch("https://codeblitz25.herokuapp.com/leaderboard",{
            method:'GET',
            headers: {
                Accept: 'application/json'
            }
        })

        let result = await Response.json();
        console.log(result);
        var i = 1;
        setLeaderBoard(result.map(doc => (
            {
            score:doc.score,
            username:doc.username,
            _id:doc._id,
            position:i++,
            isUser:user?(user.username==doc.username?true:false):false
        }
        )))
    };

    useEffect(() => {
        fetchLeaderBoard();

        if(user)
        {
            return
        }
    }, [user]);

    const work = (value) => {
        setPosition(value)
    }

    var position = -1;
    return (
        <div className = "leaderboard">
            <div className = "leaderboard__left">
               
                <div className = "leader leaderhead">
                    <p>Rank</p>
                    <p>Username</p>
                    <p>Score</p>
                </div>
                <div className = "contain">
                {
                    
                    leaderBoard.map(leader => ( 
                     <div className = {leader.isUser?"leader user":" leader"}>
                         <p className = "norwester">{leader.position}</p>
                         <p >{leader.username}</p>
                         <p>{leader.score}</p>
                         </div>
 
                         
                     ))
                 }
                </div>
                
            </div>
            <div className = "leaderboard__right">
                <div className = {user?"rightOne hide":"rightOne"} >
                    Login to find yourself on the leaderboard
                </div>
                <div className = {user?"rightTwo":"rightTwo hide"}>
                    <div className = "rightTwoLeft">
                        <p>You can See your performance on the left</p>
                    </div>
                    <div className = "rightTwoRight">
                        <img src = {board}/>                        
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default LeaderBoard
