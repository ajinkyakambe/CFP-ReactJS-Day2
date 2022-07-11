
import axios from "axios";


class EmployeeService {
   
     SERVICE_BASE_URL = "http://localhost:9000/api/employee"

    
    /**
     * req: Employee Id data. Employee DTO.
     * res: Created Employee Object
     */
    addEmployee(formData) {
        return axios.post(`${this.SERVICE_BASE_URL}/create`, formData);
      }
    
    /**
     * req: -
     * res: Employee Object
     */
    getAllEmployees() {
       return axios.get(`${this.SERVICE_BASE_URL}/get/all`)       
    }

    /**
     * req: Employee Id
     * res: Employee Object
     */
    getEmployeeById(employeeId) {
      return axios.get(`${this.SERVICE_BASE_URL}/get/${employeeId}`);
    }
  
    /**
     * req: Employee Id
     * res: Updated Employee Object
     */
    updateEmployees(employeeId,data) {
      return axios.put(`${this.SERVICE_BASE_URL}/update/${employeeId}`,data)
    }

    /**
     * req: Employee id
     * res: -
     */
    deleteEmployee(employeeId) {
      return axios.delete(`${this.SERVICE_BASE_URL}/delete/${employeeId}`)
    }

  
      
}

export default new EmployeeService();