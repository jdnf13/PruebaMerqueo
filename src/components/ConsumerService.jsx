/**
 * 
 */
    import React from 'react';
    //Simulamos los datos obtenidos de un API RESTS para la obtención de los departamentos
    const ConsumerService  =   ()  =>  {
        fetch('https://run.mocky.io/v3/729fdd53-f365-49b4-bd55-f7e10bcc9a4b')
        .then(response => {
            return response.json();
        })
        .then(response => {
            localStorage.setItem('Productos', JSON.stringify(response.data));  
        });    
    return (
        <div></div>
    );
    }
    export default ConsumerService;