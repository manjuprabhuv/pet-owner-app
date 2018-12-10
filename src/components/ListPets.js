import React,{Component} from "react";


class ListPets extends Component {


  getOwnerName(ownerId){
    let data = this.props.owners;   
    let owner =data.find(ownr => ownr.id === ownerId);   
    return owner.firstName+" "+owner.lastName;
  }
  render() {
    return (
      <div className="ListPets">
      <h2>List of Pets</h2>
       <table className="table">
       <thead>
       <tr>
       <th className="text-center">Pet Name</th>
       <th className="text-center">Birth Date</th>
       <th className="text-center">Owner Name</th>
       </tr>
       </thead>
       <tbody>
       {(this.props.pets).map((d, i)=> 
        <tr key={i}>
        <td>{d.name}</td>
        <td>{d.birthday}</td>
        <td>{this.getOwnerName(d.ownerId)}</td>
        </tr>
       )}
       </tbody>
       </table>
      </div>
    );
  }
}

export default ListPets;
