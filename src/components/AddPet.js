import React, {Component} from 'react';

class AddPet extends Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          errors: []
        };
    }

  handleClick(e) {

    const errors = this.validateForm(this.petName.value, this.birthdate.value,
      this.ownerId.value);

    if (errors.length >= 0) {
      this.setState({ errors });
      if (errors.length !== 0)
        return;
    }

    let pet = {
      "name": this.petName.value, "birthday": this.birthdate.value,
      "ownerId": parseInt(this.ownerId.value)
    }
   
    //this.addPetForm.reset();
    this.props.changeHandler(pet,this.addPetForm);



  }

    validateForm(name,birthdate,ownerId){
      const errors = [];
      if (name.length === 0) {
        errors.push("Name can't be empty");
      }
      console.log("Birth date "+birthdate+"is valid ->"+this.isValidDate(birthdate))
      if (!this.isValidDate(birthdate)) {
        errors.push("Date is Invalid. Expected format is YYYY-MM-DD");
      }
      if(ownerId==="0"){
        errors.push("Owner is mandatory");
      }
      console.log(errors);
      return errors;
    }

    isValidDate(dateString) {
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      if(!dateString.match(regEx)) return false;  // Invalid format
      var d = new Date(dateString);
      if(Number.isNaN(d.getTime())) return false; // Invalid date
      return d.toISOString().slice(0,10) === dateString;
    }

    render(){
      const { errors } = this.state;
     
        return(
          <div>
          {errors.map(error => (
            <p key={error}>Error: {error}</p>
            ))}

          
          <form ref={(el) => this.addPetForm = el}>
            <input name="petName" ref={el => this.petName=el} type="text" className="form-control"/>
            <input name="birthdate" ref={el => this.birthdate=el} type="text" className="form-control"/>            
            <select className="form-control" ref={el => this.ownerId=el}>
              <option value="0"></option>
              {(this.props.owners).map((d, i)=> 
                <option key={d.id} value={d.id}>{d.firstName +" "+ d.lastName}</option>)}
            </select>
            <input type="button" value="Add Pet" onClick={(e) => this.handleClick(e)}  />
          </form>
         
        </div>
        )
    }
}

export default AddPet;