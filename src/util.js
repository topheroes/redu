export async function login({username, password}){
    return new Promise( (resolve, reject)=>{
        setTimeout( ()=>{ 
            console.log(username, password);
            if( (username=="user") && (password=='pass') ){
                resolve();
            }
            else{
                reject("wrong username or password");
            }
        }, 1000);
    }  )
}