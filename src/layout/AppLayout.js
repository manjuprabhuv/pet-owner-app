import React, {Component} from 'react';
//import pets from '../data/Pets.json';
//import owners from '../data/Owners.json'
import Header from '../components/Header'
import AddPet from '../components/AddPet'
import ListOwners from '../components/ListOwners'
import ListPets from '../components/ListPets'

class AppLayout extends Component{

    constructor(props){
       
        super(props);
        
        this.state = {pets : [],owners :[],loaded: false};
        //console.log(pets);
        this.pets ={};
        this.owners={};
       
    }
    async componentDidMount(){  
        this.initData();
        
        
       
    }

    async initData() {
        console.log("init log")
        let headers = new Headers();
        headers.set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');
        headers.set('Content-Type', 'application/json');
        let pets ={};
        let owners={};
       // headers.set('blah-Type', 'application/json');
       let fetchSuccess;
        await fetch('http://localhost:8080/api/v1/owners', {
            method: 'GET',
            headers: headers
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                owners = responseJson;
                fetchSuccess=true;
            })
            .catch((error) => {
                fetchSuccess=false;
                console.error(error);
            });
            console.log("Owner call done")
        await fetch('http://localhost:8080/api/v1/pets', {
            method: 'GET',
            headers: headers
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                pets = responseJson;
                fetchSuccess=true;
            })
            .catch((error) => {
                fetchSuccess= false
                console.error(error);
            });    
            this.setState(({
                pets: pets  ,
                owners:owners,
                loaded: fetchSuccess       
            }));
           
            console.log("Pet call done")  
           

    }

    async addPetHandler(pet,form) {
        let headers = new Headers();
        headers.set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');
        headers.set('Content-Type', 'application/json');
        console.log("in add peth handler")
        console.log(pet)
        let message ;
        let petList = this.state.pets;
       // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        await fetch('http://localhost:8080/api/v1/pets', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(pet)
        }).then(function(response) {
            console.log("call response");
            console.log(response.status);
            if (response.status === 201) {
                console.log("inside 201");
                message = "Pet added successfully";
                petList.push(pet);
                form.reset();
                
            }else if (response.status > 400 && response.status <500 ) {
                message ="Unable to add Pet object; Please check the input parameters";
            }else{
                message ="Unable to add Pet object";
            }
          });
          
          this.showMessage(message,petList)
    }

    showMessage(message,petsList){
        console.log("show Message "+ message);
        this.setState({showMsg: true, msg :message,petsList,owners:this.state.owners });
        //setTimeout(this.setState({showMsg: false, pets:this.state.pets,owners:this.state.owners }),5000)
        
    }

    renderMessage(){
        return(
            <p>{this.state.msg}</p>
        );
    }

    content(){
        return(
            <div className='container jumbotron text-center'>
            
            <Header pageTitleH1="Pet Owner Application" />
            <h2>Add Pet</h2>
            {this.state.showMsg ?  this.renderMessage(): null}
            <AddPet owners={this.state.owners} changeHandler={(pet,form) => this.addPetHandler(pet,form) }></AddPet>
            <ListOwners owners={this.state.owners}></ListOwners>
            <ListPets pets={this.state.pets} owners={this.state.owners}></ListPets>
 
            
            
        </div>
        )
    }
    

    render(){
        // initData();
         return(
            <div>
            {this.state.loaded ? this.content() : null}
          </div> 
         )
     }

}

export default AppLayout;
