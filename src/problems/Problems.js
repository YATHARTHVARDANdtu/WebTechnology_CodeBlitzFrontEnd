import React from 'react'
import { useStateValue } from '../stateProvider';
import Problem_Small from '../problem_small/Problem_Small'
import friendImage from './friend.png'
import filterImage from './filter.png'
import target from './target.png'
import { Link } from 'react-router-dom';

import {useState, useEffect} from 'react'
import './Problems.css'
function Problems() {

    const [{ problems, user }, dispatch] = useStateValue();
    const [loadedProblems,setProblem] = useState([])
    const [filteredProblem,filterProblems] = useState(null)
    const [filters,setFilter] = useState([0,0,0])


    const fetchProblems = async () =>{
        let response = await fetch('https://codeblitz25.herokuapp.com/problems',{
            method:'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        let Result =  await response.json();
        setProblem(Result.map(doc => ({
            id: doc.number,
            statement: doc.title,
            success:doc.successfulSubmissions,
            attempts:doc.totalSubmissions,
            difficulty:doc.difficulty,
            redId:doc._id
        })));

        
    }

    useEffect(() => {
       fetchProblems();
       filterProblems(loadedProblems)
       console.log(filteredProblem)
    }, [user])


        const filter = e => {

            var id;
            switch(e.target.id){
                case 'EASY':id = 1
                break
                case 'MEDIUM':id = 2
                break
                case 'HARD':id = 3
                break
            }

            var g = filters;
            g[id-1] ^= 1;

            setFilter(g);
            

            
            

            var h = [];
           
            loadedProblems.forEach(problem => {
                if(filters[0] && problem.difficulty == "EASY")
                {
                    h.push(problem);
                }
                else if(filters[1] && problem.difficulty == "MEDIUM")
                {
                    h.push(problem)
                }
                else if(filters[2] && problem.difficulty == "HARD")
                {
                    h.push(problem);
                }
            });
            filterProblems(h);
        }


    console.log(problems)
    var a,b,c,d,e;

    return (
        <div className="problems">
            <div className="problems__left">
               
                {/* <div className = {problems.length>0?"problems__problems":"problems__problems hide"}>
                    {
                        problems.forEach(problem => {
                            <Problem_small
                            id={problem.id}
                            title = {problem.title}
                            difficulty = {problem.difficulty}
                            />
                        })
                    }
                </div> */}
                <div className="problems__problems">
                    {
                        (filteredProblem!=null?filteredProblem.map(problem => (
                            <Problem_Small title={problem.statement} id={problem.id} difficulty={problem.difficulty} success={problem.success} attempts = {problem.attempts} redId = {problem.redId} />
                        )):loadedProblems.map(problem => (
                            <Problem_Small title={problem.statement} id={problem.id} difficulty={problem.difficulty} success={problem.success} attempts = {problem.attempts} redId = {problem.redId} />
                        )))

                    }
                </div>
            </div>
            <div className="problems__right">

                <div className="filter">
                    <div className="filter__heading">
                        <div className="filter__headingL">
                            <p>Filter</p>
                        </div>
                        <div className = "filter__headingC">
                            <img src = {filterImage}/>
                        </div>
                        <div className = "filter__headingL">
                            Problems
                        </div>
                    </div>
                    <div className = "filter__body">
                        <div className = "filter__body1">
                        Select Difficulty to Filter 
                        </div>
                        <div className = "filter__body2">
                            
                            <div><input  type="checkbox" id="easy" name="difficulty"/>
                            <label onClick={filter} id="EASY" for ="easy"> Easy</label> 
                            </div>
                            <div>
                            <input  type="checkbox" id="medium" name="difficulty"/>
                            <label onClick={filter} id="MEDIUM" for ="medium">  Medium</label>
                            </div>
                            <div>
                            <input  type="checkbox" id="hard" name="difficulty"/>
                            <label onClick={filter} id="HARD" for ="hard">  Hard</label>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                
               <div className= { user==null?"problems__right1":"problems__right1 hide"}>
                   
                </div>
                <Link to = '/user' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className={user == null?"problems__right2 hide":"problems__right2"}>
                    <div className = "problems__rightLeft">
                        <p>Add Friends &rarr;</p>
                    </div>
                    <div className = "problems__rightRight">
                        <img src = {friendImage}/>
                    </div>
                </div>
                </Link>     

            </div>
            
        </div>
    )
}

export default Problems
