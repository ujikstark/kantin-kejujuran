import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './NavigationBar';
import AuthProvider from './AuthContext';
import Loader from './Loader';
import { Route, Routes } from 'react-router-dom';
// import ProductView from './ProductView';


function App() {

  const ProductView = React.lazy(() => import('./ProductView'));
  

  return (
    <div className="App">

      <AuthProvider>
        <NavigationBar/>
        <React.Suspense fallback={<Loader/>}>
                    
                    <Routes>
                        <Route path="/" index element={<ProductView/>}/>
                        
                    </Routes>
                </React.Suspense>
      </AuthProvider>


    </div>
  );
}

export default App;
