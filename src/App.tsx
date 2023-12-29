import { useEffect, useState } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from 'components/Footer';
import Header from 'components/Header';
import Router from 'components/Router';
import Loader from "components/Loader";

function App() {

  const auth = getAuth(app);
  // auth를 체크하기 전에 (initalize 전)에는 loader를 띄워주는 용고
  const [init, setInit] = useState<boolean>(false);
  // auth의 currentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setInit(true);
      });
    }, [auth]);

  return (
    <>
      <ToastContainer />
      <Header />
      {init ? 
      <>
        <Router isAuthenticated={isAuthenticated}/> 
        <Footer />
      </>
      : <Loader />
      }
    </>
  );
}

export default App;
