import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {Authcontext} from "./context/Authcontext";
import {Loader} from "./components/Loader";
import {Navbar} from "./components/Navbar";
import './css/normalize.min.css'

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token

    const routers = useRoutes(isAuthenticated)
    console.log("isAuthenticated =");
    console.log(isAuthenticated);

    if(!ready){
        return <Loader />
    }
    return (
         <Authcontext.Provider value={{token,login,logout,userId, isAuthenticated}}>
              <Router>
                  {isAuthenticated && <Navbar />}
                  <div>
                          {routers}
                      </div>
              </Router>
         </Authcontext.Provider>
     );
}

export default App;
