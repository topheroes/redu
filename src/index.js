import React, {useState, useReducer} from 'react';
import ReactDOM from 'react-dom';


import {login} from './util';


function App(props){


    const [userLogin, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorText, setErrorText]  = useState('');


    let initialState = {
        userLogin: "",
        password: "",
        isDisabled: false,
        isLoggedIn: false,
        errorText: ""
    }


    const [state, dispatch] = useReducer(reducer, initialState);


    const doLogin = async (e)=>{
        
        setIsDisabled(true);
        e.preventDefault()
        
        try{
            await login({username:userLogin, password:password});
            setIsLoggedIn(true);
            setErrorText("");

        }
        catch(e){
            setPassword('');
            setErrorText("Incorrect username or password");
        }

        setIsDisabled(false);

        return false;
    }

    return (
        <div>
            { isLoggedIn ? <><h1>Hello {userLogin} </h1> <button onClick={(e)=>{setIsLoggedIn(false)}}>Logout</button></> : 

            <form className="form" onSubmit={(e)=>{doLogin(e)}}>
                <p> Login details:</p>
                <span>{errorText}</span>
                <input type="text" placeholder="username" onChange={(event)=>{setLogin(event.currentTarget.value)}} value={userLogin} />
                <input type="password" placeholder="password" autoComplete="new-password" onChange={(event)=>{setPassword(event.currentTarget.value)}} value={password}/>
                <button type="submit" disabled={isDisabled}>Login</button>
        

            </form>
            }
        </div>


    );


}


ReactDOM.render(<App />, document.getElementById('root'));

