import React, {useState} from 'react';
import '../css/App.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Switch,  Route, NavLink} from 'react-router-dom';
import Carro from '../components/Carro';
import Card from '../components/Card'
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
    ///Se crean el state renderizaran las Card de cada articulo en el arrayArticulos///
    let CardItem    =       [];
    const [CardCompose, setCardCompose] =  useState([]);

    React.useEffect(()  =>  {
        /////////////////////////////////////////////////////////////////////
        ///////Se Ejecuta la funcion que consume el API de productos/////////
        ///////Luego de renderizado el componente///////////////////////////
        getDataService();
      }, []);
 
      const getDataService = async  ()  =>  {
          ///////////////////Funcion que consume el API////////////////////
          const data   =    await   fetch('https://run.mocky.io/v3/729fdd53-f365-49b4-bd55-f7e10bcc9a4b')
          const productos = await data.json();  
          renderCard(productos.data) //Llamamos la funcion ue renderiza las card              
      }

      const renderCard = (productos) =>  {
          //Renderizando las Cards segun data recibida
          let Cards = [];
        for(let item    =    0; item     <   productos.length; item++){
            
            CardItem    =    [
                <div  className="col-lg" key = {productos[item].attributes.store_id}>
                    
                    <Card  
                        key         =   {productos[item].id}                             
                        id          =   {productos[item].id}
                        nProducto   =   {productos[item].attributes.name}
                        pProducto   =   {productos[item].attributes.price}
                        imgProducto =   {productos[item].attributes.image_large_url}
                        onClick     =   {añadirItem}
                        onClickRest =   {quitarItem}
                    />       

                </div>
            ];

            Cards.push(CardItem);

        }
        setCardCompose(Cards); //Se modifica el state del Card con cada producto
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