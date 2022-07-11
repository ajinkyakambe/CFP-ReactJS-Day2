import React, {  useState, useEffect } from 'react';
import {  useParams,Link } from 'react-router-dom';
import './payroll-form.scss';
import profile1 from '../../Assets/profile-images/Ellipse -1.png';
import profile2 from '../../Assets/profile-images/Ellipse -2.png';
import profile3 from '../../Assets/profile-images/Ellipse -3.png';
import profile4 from '../../Assets/profile-images/Ellipse -4.png';
import Header from '../header/header'
import EmployeeService from '../../components/services/employee-service'
/**
 * Importing Library for Alerts 
 */
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PayrollForm = (props) => {
  
   
    /**
    |--------------------------------------------------
    | Intial value object with the properties
    |--------------------------------------------------
    */

    let initialValue = {
        id: '',
        name: '',
        profileArray: [
            { url: '../../Assets/profile-images/Ellipse -1.png' },
            { url: '../../Assets/profile-images/Ellipse -2.png' },
            { url: '../../Assets/profile-images/Ellipse -3.png' },
            { url: '../../Assets/profile-images/Ellipse -4.png' }

        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        allDay:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        allMonths:['January','Febuary','March','April','May','June','July','August','September','October','November','December'],
        allYears:[2015,2016,2017,2018,2019,2020,2021,2022],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '',
        month: '',
        year: '',
        startDate: '',
        notes: '',        
        profilePic: '',
        isUpdate: false
       
        
    }

     /**
     * Using Hooks for use state
     */
      const [formValue, setForm] = useState(initialValue);

      const params = useParams();

    /**
    |--------------------------------------------------
    | Checking for id 
    |--------------------------------------------------
    */

    useEffect(() => {
        if (params.id) {
          getDataById(params.id);
        }
      },[params.id]);

      const getDataById = (id) => {
        EmployeeService
          .getEmployeeById(id)
          .then((data) => {
            
            let obj = data.data.data;
            setData(obj);
          })
          .catch((err) => {
            alert("err is ", err);
          });
          
      };

      const setData = (obj) => {
        let array=obj.startDate;
        console.log(array);
        console.log()
         setForm({
           ...formValue,
           ...obj,
           id: obj.empId,
           name: obj.name,
           profilePic: obj.profilePic,
           departmentValue: obj.departments,
           isUpdate: true,
           day:array[0]+array[1],
           month:array[3]+array[4]+array[5],
           year:array[7]+array[8]+array[9]+array[10],
           notes: obj.note,
           
         });
       };

  
    /**
     * Function//Method
     */
    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })

    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);

        let checkArray = [...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departmentValue: checkArray });
    }
    
    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const save = async (event) => {
        event.preventDefault();
        console.log("Saving the data")
        
        let formFilledObject = {
            id: formValue.id,
            name: formValue.name,
            salary: formValue.salary,
            gender: formValue.gender,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            note: formValue.notes,            
            profilePic: formValue.profilePic,
            departments: formValue.departmentValue          
            
          };
    
          if (formValue.isUpdate) {
            EmployeeService
              .updateEmployees(params.id,formFilledObject)
              .then((data) => {
                  var answer =  window.confirm("Data once modified cannot be restored!! Do you wish to continue?",data);
                  if(answer === true){
                    toast.success("Data updated successfully!");
                  }else{
                      window.location.reload();
                  }
              })
              .catch((error) => {
                toast.error("WARNING!! Error updating the data!",error);
              });
          } else {
            EmployeeService
              .addEmployee(formFilledObject)
              .then((response) => {
                console.log(response);
                toast.success("Data Added successfully!!",response)
                
              })
              .catch(error => {
                console.log(error);
                  toast.error("WARNING!! Error while adding the data!",error);
              });
          
        }     
    
    
        }
    
    
    
    
    
    
    

    

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
    }  


  return (

    <>
    <Header></Header>
    <ToastContainer />
    <div className="payroll-main">
          <div className="form-content">
              <div className="form"> 
                  <form className="form-head" action="#" onSubmit={save}>
                      <div className="form-head">Employee Payroll form</div>
                      <div className="row-content">
                          <label className="label text" htmlFor="name">Name</label>
                          <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                      </div>
                      <div className="row-content">
                          <label className="label text" htmlFor="profilePic">Profile image</label>
                          <div className="profile-radio-button">
                              <label>
                                  <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -1.png'} value="../../Assets/profile-images/Ellipse -1.png" onChange={changeValue} />
                                  <img className="profile" src={profile1} alt="profile" />
                              </label>
                              <label>
                                  <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -2.png'} value="../../Assets/profile-images/Ellipse -2.png" onChange={changeValue} />
                                  <img className="profile" src={profile2} alt="profile" />
                              </label>
                              <label>
                                  <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -3.png'} value="../../Assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                  <img className="profile" src={profile3} alt="profile" />
                              </label>
                              <label>
                                  <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -4.png'} value="../../Assets/profile-images/Ellipse -4.png" onChange={changeValue} />
                                  <img className="profile" src={profile4} alt="profile" />
                              </label>

                          </div>

                      </div>
                      <div className="row-content">
                          <label className="label text" htmlFor="gender">Gender</label>
                          <div>
                              <input type="radio" id="male" checked={formValue.gender === 'male'} onChange={changeValue} name="gender" value="male" />
                              <label className="text" htmlFor="male">Male</label>
                              <input type="radio" id="female" checked={formValue.gender === 'female'} onChange={changeValue} name="gender" value="female" />
                              <label className="text" htmlFor="female">Female</label>
                          </div>

                      </div>
                      <div className="row-content">
                          <label className="label text" htmlFor="departments">Department</label>
                          <div>
                              {formValue.allDepartment.map(item => (
                                  <span key={item}>
                                      <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                          checked={getChecked(item)} value={item} />
                                      <label className="text" htmlFor={item}>{item}</label>
                                  </span>
                              ))}

                          </div>

                      </div>

                      <div className="row-content">
                          <label className="label text" htmlFor="salary">Salary</label>
                          <input className="input" type="text" id="salary" name="salary" placeholder="Input the Salary" value={formValue.salary} onChange={changeValue} />

                      </div>

                      <div className="row-content">
                          <label className="label text" htmlFor="startDate">Start Date</label>
                          <div>
                              <select value={formValue.day} onChange={changeValue} id="day" name="day">
                               
                              
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                  
                                
                              </select>
                              <select value={formValue.month} onChange={changeValue} id="month" name="month">
                             
                                <option value="Jan">January</option>
                                <option value="Feb">Febuary</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                              </select>

                              <select value={formValue.year} onChange={changeValue} id="year" name="year">
                                                                     
                              
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                              </select>
                          </div>

                      </div>

                      <div className="row-content">
                          <label className="label text" htmlFor="notes">Notes</label>
                          <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" placeholder=""
                              style={{ height: '120%' }}></textarea>

                      </div>

                      <div className="buttonParent">
                          <Link to="/home" className="resetButton button cancelButton">Cancel</Link>


                          <div className="submit-reset">

                              <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                              <button type="button" onClick={reset} className="resetButton button">Reset</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div></>
  
    )
}

export default PayrollForm;