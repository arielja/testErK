import React, { Component } from 'react';
import './App.css';



class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ivapert:0,ivhigh:0,ivlow:0,ivclose:0,ivporc:0,imontodif: 0, isubio:true,
    }
    
    var subio = true;
    var i=0,vapert=0,vhigh=0,vlow=0,vclose=0,vcloseant=0,vporc=0,montodif= 0;
  }

  

mivalor=0;
mijson;
  mostrardato2(obj) {
  // aqui  deberia separar en una clase servicio en instanciar desde aqui. 
  var Request = require("request");
  const mipath="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+obj+"&outputsize=compact&apikey=X86NOH6II01P7R24";
  console.log(mipath);
  Request.get(mipath, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    this.mijson=JSON.parse(body);
    var datos = this.mijson["Time Series (Daily)"];
    this.i=0;this.vapert=0;this.vhigh=0;this.vlow=0;this.vclose=0;this.vcloseant=0;this.vporc=0;this.montodif= 0;
    for(var prop in datos) {
      if(this.i===0){this.vapert=datos[prop]["1. open"];this.vhigh=datos[prop]["2. high"];
      this.vlow=datos[prop]["3. low"];
       this.vclose=datos[prop]["4. close"];this.i++;}
       else{this.vcloseant = datos[prop]["4. close"]; break;}
    }
    
    this.subio =this.vapert>this.vcloseant? true:false;

    this.montodif  =(this.vapert - this.vclose).toFixed(2);
    this.vporc=100 - ((this.vcloseant*100)/this.vapert); this.vporc =parseFloat(this.vporc).toFixed(2); 
    this.text="cambio";
    this.setState({ivapert:this.vapert,ivhigh:this.vhigh,ivlow:this.vlow,ivclose:this.vclose,ivporc:this.vporc,imontodif: this.montodif,isubio:this.subio});
    console.log(this.ivapert +" "+this.state.ivapert);
    console.log(obj);
    //{1. open: "1829.0000", 2. high: "1838.5800", 3. low: "1825.1900", 4. close: "1837.2800", 5. volume: "3640476"}
    
});
  
    }

  render() {
    //se podria crear un componente e importarlo directamente
    var classlista = [
      {idf:'FB',nombre:'Facebook'},
      {idf:'AAPL',nombre:'Apple'},
      {idf:'MSFT',nombre:'Microsoft'},
      {idf:'GOOGL',nombre:'Google'},
      {idf:'AMZN',nombre:'Amazon'},
    ];
    //**************** */

    ///****************** */
    
    return (
     
      <div className="App">
        <header className="App-header">
          <ul>
          {
        classlista.map(el => <li type="link" onClick={this.mostrardato2.bind(this,el.idf)} value={el.idf} key={el.idf}> 
       <a href="#"></a>{el.nombre }</li>
        // >ver
        )}  
        </ul>
        
        <div className="App-body">
             {/* this.state.subio? <div className="App-verde">:<div className="App-rojo"> */}
            <div>
            <label> valor de apertura (open):</label><input value={this.state.ivapert}></input>
                  </div>
            <div >
              <label>valor mas alto (high):</label>

            <input value={this.state.ivhigh}></input> </div>
            <div><label> valor mas bajo (low):</label>
            <input value={this.state.ivlow}></input> </div>
            <div><label>valor de cierre (close):</label><input value={this.state.ivclose}></input></div>
            <div><label>porcentual:</label><input value={this.state.ivporc}></input></div>
            <div><label>monto direncial:</label><input value={this.state.imontodif}></input></div>
         </div>
          
          {/* <div>
            <label >"por favor, avisen de esta limitacion. me volvi loco en el testing de performance! :)
            Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency."</label>
          </div> */}
      
               </header>
      </div>
    );
  }
}

export default App;
 
