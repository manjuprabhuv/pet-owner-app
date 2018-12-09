import React, {Component} from 'react';

class Header extends Component{

   /* constructor(props){
        super(props);
    }*/

    render(){
        return(
         <div>
            <h1>{this.props.pageTitleH1}</h1>                     
         </div>
        )
    }
}

export default Header;