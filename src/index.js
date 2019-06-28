import React, {useState, useReducer, useContext} from 'react';
import ReactDOM from 'react-dom';

import produce from "immer";
import {useImmerReducer} from "use-immer";

import {login} from './util';


function reducer(draft, action){
    switch(action.type){
        case 'login':
            {
                
                draft.isLoggedIn = true;
                draft.errorText = '';
                return;
                
                //return {...state, isLoggedIn: true, errorText: ""};
            }
        case 'error':
            {
                draft.errorText = "Incorrect username or password";
                draft.password = '';
                return;
                //return {...state, errorText: "Incorrect username or password", password: ""};
            }
        case 'disabled':
            {
                draft.isDisabled = action.off;
                return;
                //return {...state, isDisabled: action.off };

            }   
        case 'logout':
            {
                draft.isLoggedIn = false;
                return;
                //return {...state, isLoggedIn: false};
            }
        case 'setField':
            {
                draft[action.fieldName] = action.field ;
                return;
                //return {...state, [action.fieldName] : action.field }
            }

        // case 'setName':
        //     {
        //         return {...state, userLogin: action.field}

        //     }
        // case 'setPass':{
        //     return {...state, password: action.field}
        //     }

        default: 
            return draft;
    }



}


const dispatchContext = React.createContext({});



function  Button(props){

    const dispatch = useContext(dispatchContext)

    return <button onClick={(e)=>{dispatch({type:'login'})}}>Click me</button>

}

function CheckBoxForm(props) {
    return (
        <>
        <span> here is some text </span>
        <input type="text" placeholder="what value to add" />
        <Button/>
        </>
    )

}




function App(props){


    // const [userLogin, setLogin] = useState('');
    // const [password, setPassword] = useState('');
    // const [isDisabled, setIsDisabled] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [errorText, setErrorText]  = useState('');



    let initialState = {
        userLogin: "",
        password: "",
        isDisabled: false,
        isLoggedIn: false,
        errorText: ""
    }

    //const curriedFunction = produce(reducer);

    const [state, dispatch] = useImmerReducer(reducer, initialState);


    
    let {userLogin,
        password,
        isDisabled,
        isLoggedIn,
        errorText} = state;


    const doLogin = async (e)=>{
        
        //setIsDisabled(true);
        dispatch( {type: 'disabled', off: true}); 
        
        
        e.preventDefault()
        
        try{
            await login({username:userLogin, password:password});
            dispatch( {type: 'login'});
            //setIsLoggedIn(true);
            //setErrorText("");

        }
        catch(e){
            dispatch( {type: 'error'});
            //setPassword('');
            //setErrorText("Incorrect username or password");
        }

        dispatch( {type: 'disabled', off: false}); 
        //setIsDisabled(false);

        return false;
    }

    return (
        
        <dispatchContext.Provider value={dispatch} >
            
            <>

                <div>
                
                    { isLoggedIn ? <><h1>Hello {userLogin} </h1> <button onClick={(e)=>{dispatch( {type:'logout'} ) } }>Logout</button></> : 

                    <form className="form" onSubmit={(e)=>{doLogin(e)}}>
                        <p> Login details:</p>
                        <span>{errorText}</span>
                        <input type="text" placeholder="username" onChange={(event)=>{ dispatch({type: 'setField', fieldName: 'userLogin', field: event.currentTarget.value})   }} value={userLogin} />
                        <input type="password" placeholder="password" autoComplete="new-password" onChange={(event)=>{ dispatch({type: 'setField', fieldName: 'password', field: event.currentTarget.value}) }} value={password}/>
                        <button type="submit" disabled={isDisabled}>Login</button>
                                

                    </form>
                    }
                    
                </div>
                <CheckBoxForm/>
            </>
        </dispatchContext.Provider>

    );


}


ReactDOM.render(<App />, document.getElementById('root'));

