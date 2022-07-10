import React, { Component } from 'react';
import Header from '../header/header'
import Add from '../../Assets/icons/add-24px.svg';
import './home.scss'
import Displaydata from '../../components/displaydata/displaydata'
import  EmployeeService from '../../components/services/employee-service'
import {toast} from 'react-toastify'


export default class Home extends Component {

  /**
   * Required
   */
  constructor(props) {
    super(props);
    
    this.state = {
      allEmployeeArrays: []
    };
  }

  
  /**
  |--------------------------------------------------
  | Mounting the compoent and calling the getAllEmloyee method above
  |--------------------------------------------------
  */
  componentDidMount() { 
    this.getAllEmployees();
   }


  /**
  |--------------------------------------------------
  | Here we are using the service component which is implementing the axios.
  |--------------------------------------------------
  */
  getAllEmployees = () => {
    EmployeeService.getAllEmployees()
    .then((response) =>{
      // console.log("Got all the employees");
      // console.log(response.data);
      this.setState({ allEmployeeArrays: response.data})
      // console.log("Employee after state change");
      // console.log(this.state.allEmployeeArrays)
    })
    .catch((err) => {
      toast.error("Something went wrong, while getting all the records", err);
    });
  }
  
  

  

  render() {
    return (      
        <><Header></Header>        
        <div className="main-content">
            <div className="header-content">
                <div className="emp-detail-text">
                    Employee Details
                    <div className="emp-count"></div>
                </div>
                <a href="/payroll-form" className="add-button">
                <img src={Add} alt=""/>Add User</a>
        </div>     
        {/* calling the Displaydata Component */}
        
        <Displaydata passedEmployeeData={this.state.allEmployeeArrays} />        
        </div></>
    );
  }
}
