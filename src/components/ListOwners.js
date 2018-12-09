import React,{Component} from "react";


class ListOwners extends Component {
  render() {
    return (
    
      <div className="OwnersList">
      <h2>List of Owners</h2>
       <table className="table">
       <thead >
        <tr>
        <th scope="col" className="text-center">First Name</th>
        <th scope="col" className="text-center">Last Name</th>
        <th scope="col" className="text-center">City</th>       
        </tr>
       </thead>
       <tbody>
       {(this.props.owners).map((d, i)=> 
        <tr key={i}>
        <td >{d.firstName}</td>
        <td>{d.lastName}</td>
        <td>{d.city}</td>
        </tr>
        
       )}
       </tbody>
       </table>
      </div>
    );
  }
}

export default ListOwners;
