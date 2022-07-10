
import axios from "axios";


class EmployeeService {
   
     SERVICE_BASE_URL = "http://localhost:9000/api/employee"


    addEmployee(formData) {
        return axios.post(`${this.SERVICE_BASE_URL}/create`, formData);
      }

    getAllEmployees() {
       return axios.get(`${this.SERVICE_BASE_URL}/get/all`)       
    }

    getEmployeeById(employeeId) {
      return axios.get(`${this.SERVICE_BASE_URL}/get/${employeeId}`);
    }
  

    updateEmployees(employeeId,data) {
      return axios.put(`${this.SERVICE_BASE_URL}/update/${employeeId}`,data)
    }

    deleteEmployee(employeeId) {
      return axios.delete(`${this.SERVICE_BASE_URL}/delete/${employeeId}`)
    }

  
      
}

export default new EmployeeService();