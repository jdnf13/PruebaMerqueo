import React, {useState} from 'react';
import '../css/App.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Switch,  Route, NavLink} from 'react-router-dom';
import Carro from '../components/Carro';
import Card from '../components/Card'
import Slider1 from '../images/Slider1.jpg';
import Slider2 from '../images/Slider2.jpg';
import Slider3 from '../images/Slider3.jpg';
import Slider4 from '../images/Slider4.jpg';
import Slider5 from '../images/Slider5.jpg';
import Slider6 from '../images/Slider6.jpg';
import Slider7 from '../images/Slider7.jpg';
import Slider8 from '../images/Slider8.jpg';
import Slider9 from '../images/Slider9.jpg';
import Slider10 from '../images/Slider10.jpg';
import Footer from '../components/FooterInicio';


const Tienda    =   ()  =>  {
    /////////////////////////////////////////////////////////////////////////////////////////////
    //Se usa el State del componente add, para importar el evento desde Card,
    //De esta forma, se muestra el numero de items en el carrito
    let recuperarArray = localStorage.getItem('articulos');
    let transforArray   =   [];
    let items = 0;
    if(recuperarArray !== null){
        transforArray   =   JSON.parse(recuperarArray);
        items = transforArray.length;
    }
    const [add, setAdd] =  useState(items);
    if(add === 0){
        setAdd(null);
    }

    const añadirItem  =   (event, arrayItems) => {
        let recuperarArray = localStorage.getItem('articulos');
        let transforArray   =   [];    
        let nuevoArray  =   [];
        if(recuperarArray !== null){
            transforArray   =   JSON.parse(recuperarArray);    
            nuevoArray  =   [];
        }
        
        transforArray.forEach(item => {
            if(item.id !== arrayItems[0].id){
                nuevoArray.push(item);
            }
        });
        localStorage.setItem('articulos',JSON.stringify(nuevoArray)); 

        let arrayFinal = localStorage.getItem('articulos');
        let arrayCarro = JSON.parse(arrayFinal);
        let recibirArrayCard  =
        {
            Cantidad:arrayItems[0].cantidad,
            Precio: arrayItems[0].pProducto,
            Producto: arrayItems[0].nProducto,
            id: arrayItems[0].id
        }
    arrayCarro.push(recibirArrayCard);
    localStorage.setItem('articulos',JSON.stringify(arrayCarro));  
    setAdd(arrayCarro.length);
    }

    const quitarItem    =   (event,arrayItems) =>  {
       
        let recuperarArray = localStorage.getItem('articulos');
        let transforArray   =   JSON.parse(recuperarArray);
        let nuevoArray  =   [];
        transforArray.forEach(item => {
            if(item.id !== arrayItems.id){
                nuevoArray.push(item);
            }
        });
        localStorage.setItem('articulos',JSON.stringify(nuevoArray)); 
        if(arrayItems.cantidad >= 1){
            let arrayFinal = localStorage.getItem('articulos');
            let arrayCarro = JSON.parse(arrayFinal);
            let recibirArrayCard  =
            {
                Cantidad:arrayItems.cantidad,
                Precio: arrayItems.pProducto,
                Producto: arrayItems.nProducto,
                id: arrayItems.id
            }
        arrayCarro.push(recibirArrayCard);
        localStorage.setItem('articulos',JSON.stringify(arrayCarro));  
        setAdd(arrayCarro.length);
        }else{
        setAdd(nuevoArray.length);
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///////Array que contiene la informacion de los items en venta///////////////////////////////
    ///////Se simula la data obtenida de un API REST -JsonArray- //////////////////7
    let arrayArticulos  =   [
        {
            idArticulo : 10,
            nProducto:'Cafe Premium 500g',
            pProducto:21500,
            imgProducto:Slider1
        },
        {
            idArticulo : 12,
            nProducto:'Cafe Tradicional 500g',
            pProducto:15700,
            imgProducto:Slider2
        },
        {
            idArticulo : 17,
            nProducto:'Aceite 500 ml',
            pProducto:15400,
            imgProducto:Slider3
        },
        {
            idArticulo : 16,
            nProducto:'Detergente 250g',
            pProducto:12100,
            imgProducto:Slider4
        },
        {
            idArticulo : 21,
            nProducto:'Panela Molida 125g',
            pProducto:6100.0,
            imgProducto:Slider5
        },
        {
            idArticulo : 13,
            nProducto:'Detergente grande 2500g',
            pProducto:97050,
            imgProducto:Slider6
        },
        {
            idArticulo : 41,
            nProducto:'Packs x 6 leche marca propia',
            pProducto:15900.0,
            imgProducto:Slider7
        },
        {
            idArticulo : 51,
            nProducto:'Crema dental',
            pProducto:1700,
            imgProducto:Slider8
        },
        {
            idArticulo : 18,
            nProducto:'Olla de Presión',
            pProducto:97000,
            imgProducto:Slider9
        },
        {
            idArticulo : 19,
            nProducto:'Escoba',
            pProducto:4700.0,
            imgProducto:Slider10
        }
    ];
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///Se crean los array donde se renderizaran las Card de cada articulo en el arrayArticulos///
    let CardItem    =       [];
    let CardCompose =       [];    
    if(arrayArticulos.length     >=  1){/**Si el arrayArticulos tiene items, lo recorremos con un for
         y dibujamos una tarjeta por     item, con los datos de cada item */

        let item    =    0;
        let lengtArray      =      arrayArticulos.length

        for(item    =    0; item     <   lengtArray; item++){
        
            CardItem    =    [
                <div    key={arrayArticulos[item].idArticulo} className="col-lg" id={item}>
                    
                    <Card   
                        
                        id          =   {arrayArticulos[item].idArticulo}
                        nProducto   =   {arrayArticulos[item].nProducto}
                        pProducto   =   {arrayArticulos[item].pProducto}
                        imgProducto =   {arrayArticulos[item].imgProducto}
                        onClick     =   {añadirItem}
                        onClickRest =   {quitarItem}
                    />       

                </div>
            ];

            CardCompose.push(CardItem);

        }
    }else{
        CardCompose=[];
    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    return(
        <div>
            <div className="container">
                <h3>Mercado Virtual</h3>
            </div>           
            <div className="carritoCompras">
                <div className="borderCarrito">
                <NavLink to="/Carro"><p className="addItems">{add}</p></NavLink>
                <NavLink to="/Carro"><ShoppingCartIcon style={{color: "white", textAling:"end", fontSize: "40"}} ></ShoppingCartIcon></NavLink>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    {CardCompose}
                </div>
            </div> 
          
             <div className="containerCarrusel">
                
            </div>
            
            <Footer></Footer>  
            <Switch>
                <Route path="/Carro" component={Carro}/>
            </Switch>                    
        </div>
    )
}
export default Tienda;