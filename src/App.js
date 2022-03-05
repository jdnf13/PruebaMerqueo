import React from 'react';
import {BrowserRouter,  Switch,  Route, NavLink} from 'react-router-dom';
import Carro from './components/Carro.jsx';
import Tienda from './components/Tienda.jsx';
import FormCompra from  './components/FormCompra'
import './css/App.css';
import LogoBanner from './images/logobanner4.png';
import Departamentos from './components/Departamentos';
import Ciudades from './components/Ciudades';


function App() {
  
  return (
    <BrowserRouter key="Brows1">
    <div className= "App">
      <div className="Banner">
        <div className="center-image">
          <a href="https://merqueo.com"><img
            src={LogoBanner}
            alt={LogoBanner}
            className="imageBanner"
            
          ></img></a>
        </div>
        <nav className="navbar navbar-dark">
          <NavLink to="/Tienda" className="navbar-brand"><p className="ItemHover">Tienda</p></NavLink>
          <NavLink to="/Carro" className="navbar-brand" activeClassName="active"><p className="ItemHover">Carrito</p></NavLink>
                   
        </nav>  
      </div>
      <Switch key="switch1">
        <Route path="/Tienda" exact component={Tienda}/>
        <Route path="/Carro" component={Carro}/>
        <Route path="/Compra" component={FormCompra}/>
        <Route path="/" exact component={Tienda}/>
      </Switch>
      <Departamentos></Departamentos>
      <Ciudades></Ciudades>
    </div>    
    </BrowserRouter>
  );
}

export default App;
