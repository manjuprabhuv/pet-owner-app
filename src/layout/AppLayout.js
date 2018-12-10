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
       
    }
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
      }

    async componentDidMount(){  
        this.initData();
    }


    async fetchResults(url){
        let fetchedData ={};
        let fetchSuccess=false;
        let headers = new Headers();
        headers.set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');
        headers.set('Content-Type', 'application/json');
        await fetch(url, {
            method: 'GET',
            headers: headers
        }).then((response) => {
            console.log("api response status" + response.status);
            
            if (response.status === 200) {
                fetchSuccess = true;
                return response.json();
            }
        }).then((responseJson) => {
            fetchedData = responseJson;
            console.log(fetchedData);
        }).catch((error) => {
                console.log("error in api call")
                console.error(error);
        });

        return(
            {
                data:fetchedData,
                success:fetchSuccess
            }
        )
        
    }
   
    

    async initData() {
       // console.log("init log")
        let pets = {};
        let owners = {};
        let ownerResults = await this.fetchResults('http://localhost:8080/api/v1/owners');
        owners = ownerResults.data;
        let petResults = await this.fetchResults('http://localhost:8080/api/v1/pets');
        pets = petResults.data;   

        if (ownerResults.success===true && petResults.success === true) {
            this.setState(({
                pets: pets,
                owners: owners,
                loaded: true
            }));
        } else {
            this.setState({ hasError: true, loaded: false });
        }
    }

    async addPetHandler(pet, form) {
        let headers = new Headers();
        headers.set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');
        headers.set('Content-Type', 'application/json');
        //console.log("in add peth handler")
        //console.log(pet)
        let message;
        let petList = this.state.pets;

        await fetch('http://localhost:8080/api/v1/pets', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(pet)
        }).then(function (response) {           
            console.log(response.status);
            if (response.status === 201) {               
                message = "Pet added successfully";
                petList.push(pet);
                form.reset();

            } else if (response.status > 400 && response.status < 500) {
                message = "Unable to add Pet object; Please check the input parameters";
            } else {
                message = "Unable to add Pet object";
            }
        });

        this.showMessage(message, petList)
    }

    showMessage(message,petsList){
       
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

    renderError(){

        return(
            <h1>Something went wrong.</h1>
        );
    }
    

    render(){
        // initData();
         return(
            <div>
            
            {this.state.hasError? this.renderError():null}
            {this.state.loaded ? this.content() : null}
          </div> 
         )
     }

}

export default AppLayout;
