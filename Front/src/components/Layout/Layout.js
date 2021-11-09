import { Route, Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

const Layout = ({ exact, path, component:Component, ...props }) => {
  const authCtx = useContext(AuthContext);

  return (
    <Route 
      exact={exact}
      path={path}
      render={() => {
        const userPages = <div>
                            <NavBar/>
                            <main>
                              <Component {...props}/>
                            </main>
                          </div>;
        if(authCtx.currentUser) return userPages;
        return <Redirect to='register'/>
      }}
    />
  );
}

export default Layout;
