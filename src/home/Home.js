import React from 'react';
import './Home.css';
import logo from './logo.png';

function Home() {
    return (
        <div className="home">
            <div className="home__body">
                <div className = "home__bodyDesc">
                    <div className="home__bodyDescLeft">
                        <img src = {logo} alt="Code-Blitz" about="Code-Blitz"/>
                    </div>
                    <div className = "home__bodyDescRight">
                        <p className="different">
                            Algorithms and problem-solving form the backbone of Computer Science!
                             A good platform where programmers can improve their skills and know where they stand is always in demand.  
                             This project aims to develop a user-friendly web application that acts as a platform where programmers
                              can try their hand at solving challenging problems to hone their programming skills, 
                            and as a playground for those who love coding!
                            </p>

                        <p className="home__bodyDescSlogan up">
                            GOOD CODE REQUIRES GOOD CODERS
                        </p>
                        <p className="home__bodyDescSlogan">
                            GOOD CODERS REQUIRES CODE BLITZ
                        </p>
                    </div>
                </div>
            </div>
            <div className="home__problems">
                
            </div>
            <div className = "home__footer">
                
            </div>
        </div>
    );
}

export default Home
