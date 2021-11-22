import React from 'react'
import { useEffect,useState } from 'react';
import { useStateValue } from '../stateProvider'
import axios from 'axios';
import { useHistory } from 'react-router';
import './Friends.css'

function Friends() {
    const history = useHistory();
    const [{user},dispatch] = useStateValue();

    const [currentFriends, setUser1] = useState()
    const [potentialFriends, setUser2] = useState()

    const fetchUsers = async () => {
        await axios.get("https://codeblitz25.herokuapp.com/users").then(resp => {
            console.log(resp);

            let currentFriends = []
            let potentialFriends = []
            
            for( let i = 0;i<resp.data.length;i++)
            {
                if(resp.data[i]._id in user?.friends)
                {
                    currentFriends.push(resp.data[i]);
                }
                else if(resp.data[i]._id == user?._id)
                {
                    continue;
                }
                else{
                    potentialFriends.push(resp.data[i]);
                }
            }
            setUser1(currentFriends)
            setUser2(potentialFriends)
        })
    }

    useEffect(() => {
        if(user)
        {
            fetchUsers ();
            return;
        }

        const loggedInUser = JSON.parse(window.localStorage.getItem("user"))
        console.log("Friends section user is ",loggedInUser)
        if(loggedInUser)
        {
            dispatch({
                type:'SET_USER',
                user:loggedInUser
            });

            fetchUsers()
        }
        else{
            history.back()
        }
    }, [])

    const removeFriend = e => {
       var fl = potentialFriends
       var fg = []

       currentFriends.forEach(friend => {
           if(friend._id != e.target.id)
           {
               fg.push(friend)
           }
           else{
               fl.push(friend)
           }
       })

       setUser1(fg)
       setUser2(fl)
    }
    const addFriend = e => {

        
        var fl = [];
        var fg = currentFriends;
        
        console.log(e.target.id)
        potentialFriends.forEach(friend => {
            if(friend._id != e.target.id)
            {
                fl.push(friend)
            }
            else{
                fg.push(friend)
            }
        });
        setUser1(fg);
        setUser2(fl);
    }

    const logout = e => {
        window.localStorage.setItem("user",null);
        dispatch({
            type:'SET_USER',
            user:null
        });

        history.push('/');
    }
    return (
        <div className = "friends">

            <div className = "display__field">
                <p className = "display__left">Name</p> <p className = "display__right">{user?.name}</p>
            </div>
            <div className = "display__field">
                <p className = "display__left">Username</p> <p className = "display__right">{user?.username}</p>
            </div>
            <div className = "display__field">
                <p className = "display__left">Score</p> <p className = "display__right">{user?.score}</p>
            </div>

            <h2>
                Current Friends 
            </h2>
            <h6>
                Click on a name to Remove friend
            </h6>
            
            <div className = "friends__current">
            {
                currentFriends?.map(friend => (
                    <div onClick = {removeFriend} className = "friend" id = {friend._id}>
                        <p id = {friend._id}>{friend.name}</p>
                    </div>
                ))
            }
            </div>
            <h2>
                Potential Friends 
            </h2>
            <h6>
                Click on a name to ADD friend
            </h6>
            <div className = "friends__potential">
                {potentialFriends?.map(friend => (
                    <div onClick = {addFriend} value = {friend._id} className = "friend"  id = {friend._id}>
                        <p id = {friend._id}>{friend.name}</p>
                    </div>

                ))
                }
            </div>
            <p onClick = {logout} className = "logout"> LOGOUT </p>
        </div>
    )
}

export default Friends
