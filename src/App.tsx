import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";

import Footer from 'components/Footer';
import Header from 'components/Header';
import Router from 'components/Router';

function App() {

  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  return (
    <>
      <Header />
      <Router isAuthenticated={isAuthenticated}/>
      <Footer />
    </>
  );
}

export default App;
