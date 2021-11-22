import uuid from 'react-uuid';

export const initialState = {
    user : null,
    problems: null,

};




const reducer = (state, action) =>{
    console.log(action);
    switch(action.type){
        case 'SET_USER':

        if(action.user === null)
        {
            return {...state,
                user:null
            };
        }
            return{
                ...state,
                user:action.user
            };

        case 'SET_PROBLEMS':
            return {
                ...state,
                problems:action.problems
            }
        default:
            return state;
    }
};
export default reducer;
