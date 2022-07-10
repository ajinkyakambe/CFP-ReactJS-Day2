import React from 'react'
import './displaydata.scss'
import profile1image from "../../Assets/profile-images/Ellipse -1.png";
import profile2image from "../../Assets/profile-images/Ellipse -2.png";
import profile3image from "../../Assets/profile-images/Ellipse -3.png";
import profile4image from "../../Assets/profile-images/Ellipse -4.png";
import deleteIcon from "../../Assets/icons/delete-black-18dp.svg";
import editIcon from "../../Assets/icons/create-black-18dp.svg";
import EmployeeService from "../../components/services/employee-service";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function Displaydata(props) {

  let navigate = useNavigate();
/**
|--------------------------------------------------
| Update function 
|--------------------------------------------------
*/
  const update = (employeeId) => {
    navigate(`/payroll-form/${employeeId}`);
    
  };

/**
|--------------------------------------------------
| Remove function
|--------------------------------------------------
*/

const remove = (employeeId) => {
EmployeeService
.deleteEmployee(employeeId)
.then((data) => {
  var answer = window.confirm("Do you wish to continue ?",data);
  if(answer === true){
    toast.success("Data deleted successfully!!");
      window.location.reload();
      props.getAllEmployees();
  }
  else{
    window.location.reload();
  }
})
.catch((err) => {
  toast.error("Something Went Wrong!");
});
};

  /**
  |--------------------------------------------------
  | Here we are receving the data using the props passed 
    and then we are maping in render function.
  |--------------------------------------------------
  */

  return (
    <>
    <table id="display" className="table">
    <tbody>
        <tr key="11">   
          <th></th>     
          <th>Name</th>
          <th>Gender</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Start Date</th>
          
          <th>Actions</th>
        </tr>
        {/* // Data display for the array */}
    {
      
        props.passedEmployeeData.map((employees,index) => (
           <tr key={employees.employeeId} >
              <td> 
                <img className="profile" 
                      src={
                        employees.profilePic ===
                        "../../Assets/profile-images/Ellipse -1.png"
                          ? profile1image
                          : employees.profilePic ===
                            "../../Assets/profile-images/Ellipse -2.png"
                          ? profile2image
                          : employees.profilePic ===
                            "../../Assets/profile-images/Ellipse -3.png"
                          ? profile3image
                          : profile4image
                      }
                      alt=""
                      />
                       </td>
              <td>{employees.name}</td>
              <td><div className="gender">{employees.gender}</div></td>
              <td> 
                  {employees.departments &&
                        employees.departments.map((dept) => (
                          <div className="dept-label">{dept}</div>
                        ))}
              </td>
              <td>₹ {employees.salary}</td>
              <td>{employees.startDate}</td>
              
              <td>
              <img onClick={() => remove(employees.employeeId)}
                      src={deleteIcon}
                      alt="delete" />
                    <img onClick={() => update(employees.employeeId)}
                      src={editIcon}
                      alt="edit" />
              </td>
           </tr>
        )) 
        
      }
    </tbody>
    </table>
    
    </>
  )
}




