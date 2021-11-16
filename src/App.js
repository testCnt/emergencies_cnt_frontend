import React, { useState , useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App() {
  const urlAPI = "http://localhost:80/EmergencyPatient";
  const [data, setData] = useState([]);
  const [dataByRisk, setDataByRisk] = useState([]);
  const [dataHigherPrioritySmokingPatientWithPendingStatus, setDataHigherPrioritySmokingPatientWithPendingStatus] = useState([]);
  const [dataYoungerPatientWithPendingStatus, setDataYoungerPatientWithPendingStatus] = useState([]);
  const [dataOlderPatientWithPendingStatus, setDataOlderPatientWithPendingStatus] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [selected, setSelected] = useState({
    documentNumberEmergencyPatients: 0,
    namesEmergencyPatients: "",
    lastNamesEmergencyPatients: "",
    ageEmergencyPatients: 0,
    addressEmergencyPatients: "",
    genderEmergencyPatients: "",
    heightEmergencyPatients: 0,
    weightEmergencyPatients: 0,
    smokerEmergencyPatients: 0,
    dietEmergencyPatients: 0
  });

  const rechargeAll = () => {
    emergenciesClientByPriorityGet();
    emergenciesClientByRiskGet();
    higherPrioritySmokingPatientWithPendingStatusGet();
    youngerPatientWithPendingStatusGet();
    olderPatientWithPendingStatusGet();
  }

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setSelected({
      ...selected,
      [name]: value
    });
    console.log(selected);
  };

  const emergenciesClientByPriorityGet = async() => {
    await axios.get(
      (urlAPI + "/PatientsByPriority")
      ).then(
      response => {
        setData(response.data);
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  };

  const emergenciesClientByRiskGet = async() => {
    await axios.get(
      (urlAPI + "/PatientsByRisk")
      ).then(
      response => {
        setDataByRisk(response.data);
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  };

  const youngerPatientWithPendingStatusGet = async() => {
    await axios.get(
      (urlAPI + "/YoungerPatientWithPendingStatus")
      ).then(
      response => {
        setDataYoungerPatientWithPendingStatus(response.data);
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  };

  const olderPatientWithPendingStatusGet = async() => {
    await axios.get(
      (urlAPI + "/OlderPatientWithPendingStatus")
      ).then(
      response => {
        setDataOlderPatientWithPendingStatus(response.data);
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  };

  const changeStatusToAttendedPut = async(idEmergencyPatients) => {
    await axios.put(
      (urlAPI + `/ChangeStatusToAttended/${idEmergencyPatients}`)
      ).then(
      response => {
        rechargeAll();
        console.log(response.data);
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  };

  const emergenciesClientPost = async() => {
    delete selected.idEmergencyPatients;
    selected.ageEmergencyPatients = parseInt(selected.ageEmergencyPatients);
    selected.heightEmergencyPatients = parseInt(selected.heightEmergencyPatients);
    selected.weightEmergencyPatients = parseInt(selected.weightEmergencyPatients);
    selected.smokerEmergencyPatients = parseInt(selected.smokerEmergencyPatients);
    selected.dietEmergencyPatients = parseInt(selected.dietEmergencyPatients);
    await axios.post(
      (urlAPI), selected
      ).then(
      response => {
        setData(data.concat(response.data));
        openCloseModalInsert();
        rechargeAll();
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  };

  const higherPrioritySmokingPatientWithPendingStatusGet = async() => {
    await axios.get(
      (urlAPI + "/HigherPrioritySmokingPatientWithPendingStatus")
      ).then(
      response => {
        setDataHigherPrioritySmokingPatientWithPendingStatus(response.data);
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  };

  useEffect(
    () => {
      emergenciesClientByPriorityGet();
      emergenciesClientByRiskGet();
      higherPrioritySmokingPatientWithPendingStatusGet();
      youngerPatientWithPendingStatusGet();
      olderPatientWithPendingStatusGet();
    }, []
  );

  return (
    <div className="App">
      <div>
        <br/>
        <button className="btn btn-success" onClick={() => openCloseModalInsert()}>Insert New Patient</button> { }
        <button className="btn btn-danger" onClick={() => rechargeAll()}>Recharge Data</button>
        <br/>
      </div>
      <br/>
      <div>
        <h1>Older Patient With Pending Status</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Docuemnt Number</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Smoker</th>
              <th>Diet</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              dataOlderPatientWithPendingStatus.map(item4 =>(
                <tr>
                  <td>{item4.idEmergencyPatients}</td>
                  <td>{item4.documentNumberEmergencyPatients}</td>
                  <td>{item4.namesEmergencyPatients}</td>
                  <td>{item4.lastNamesEmergencyPatients}</td>
                  <td>{item4.ageEmergencyPatients}</td>
                  <td>{item4.addressEmergencyPatients}</td>
                  <td>{item4.genderEmergencyPatients}</td>
                  <td>{item4.weightEmergencyPatients}</td>
                  <td>{item4.heightEmergencyPatients}</td>
                  <td>{item4.smokerEmergencyPatients}</td>
                  <td>{item4.dietEmergencyPatients}</td>
                  <td>{item4.statusEmergencyPatients}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => changeStatusToAttendedPut(item4.idEmergencyPatients)}>Attend</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <br/>
      <div>
        <h1>Younger Patient With Pending Status</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Docuemnt Number</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Smoker</th>
              <th>Diet</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              dataYoungerPatientWithPendingStatus.map(item3 =>(
                <tr>
                  <td>{item3.idEmergencyPatients}</td>
                  <td>{item3.documentNumberEmergencyPatients}</td>
                  <td>{item3.namesEmergencyPatients}</td>
                  <td>{item3.lastNamesEmergencyPatients}</td>
                  <td>{item3.ageEmergencyPatients}</td>
                  <td>{item3.addressEmergencyPatients}</td>
                  <td>{item3.genderEmergencyPatients}</td>
                  <td>{item3.weightEmergencyPatients}</td>
                  <td>{item3.heightEmergencyPatients}</td>
                  <td>{item3.smokerEmergencyPatients}</td>
                  <td>{item3.dietEmergencyPatients}</td>
                  <td>{item3.statusEmergencyPatients}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => changeStatusToAttendedPut(item3.idEmergencyPatients)}>Attend</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div>
        <h1>Higher Priority Smoking Patient With Pending Status</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Docuemnt Number</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Smoker</th>
              <th>Diet</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              dataHigherPrioritySmokingPatientWithPendingStatus.map(item2 =>(
                <tr>
                  <td>{item2.idEmergencyPatients}</td>
                  <td>{item2.documentNumberEmergencyPatients}</td>
                  <td>{item2.namesEmergencyPatients}</td>
                  <td>{item2.lastNamesEmergencyPatients}</td>
                  <td>{item2.ageEmergencyPatients}</td>
                  <td>{item2.addressEmergencyPatients}</td>
                  <td>{item2.genderEmergencyPatients}</td>
                  <td>{item2.weightEmergencyPatients}</td>
                  <td>{item2.heightEmergencyPatients}</td>
                  <td>{item2.smokerEmergencyPatients}</td>
                  <td>{item2.dietEmergencyPatients}</td>
                  <td>{item2.statusEmergencyPatients}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => changeStatusToAttendedPut(item2.idEmergencyPatients)}>Attend</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div>
        <h1>Pending Patients Sorted By Priority</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Docuemnt Number</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Smoker</th>
              <th>Diet</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(item =>(
                <tr>
                  <td>{item.idEmergencyPatients}</td>
                  <td>{item.documentNumberEmergencyPatients}</td>
                  <td>{item.namesEmergencyPatients}</td>
                  <td>{item.lastNamesEmergencyPatients}</td>
                  <td>{item.ageEmergencyPatients}</td>
                  <td>{item.addressEmergencyPatients}</td>
                  <td>{item.genderEmergencyPatients}</td>
                  <td>{item.weightEmergencyPatients}</td>
                  <td>{item.heightEmergencyPatients}</td>
                  <td>{item.smokerEmergencyPatients}</td>
                  <td>{item.dietEmergencyPatients}</td>
                  <td>{item.statusEmergencyPatients}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => changeStatusToAttendedPut(item.idEmergencyPatients)}>Attend</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <br/>
      <div>
        <h1>Pending Patients Sorted By Risk</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Docuemnt Number</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Smoker</th>
              <th>Diet</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              dataByRisk.map(item5 =>(
                <tr>
                  <td>{item5.idEmergencyPatients}</td>
                  <td>{item5.documentNumberEmergencyPatients}</td>
                  <td>{item5.namesEmergencyPatients}</td>
                  <td>{item5.lastNamesEmergencyPatients}</td>
                  <td>{item5.ageEmergencyPatients}</td>
                  <td>{item5.addressEmergencyPatients}</td>
                  <td>{item5.genderEmergencyPatients}</td>
                  <td>{item5.weightEmergencyPatients}</td>
                  <td>{item5.heightEmergencyPatients}</td>
                  <td>{item5.smokerEmergencyPatients}</td>
                  <td>{item5.dietEmergencyPatients}</td>
                  <td>{item5.statusEmergencyPatients}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => changeStatusToAttendedPut(item5.idEmergencyPatients)}>Attend</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalInsert}>
        <ModalHeader>Insert new patient</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Names: </label>
            <br/>
            <input type="text" className="form-control" name="namesEmergencyPatients" onChange={handleChange}/>
            <br/>
            <label>Last Names: </label>
            <br/>
            <input type="text" className="form-control" name="lastNamesEmergencyPatients" onChange={handleChange}/>
            <br/>
            <label>Diet: </label>
            <br/>
            <select class="form-select form-control" name="dietEmergencyPatients" onChange={handleChange}>
              <option value="0">NO</option>
              <option value="1">YES</option>
            </select>
            <br/>
            <label>Gender: </label>
            <br/>
            <select class="form-select form-control" name="genderEmergencyPatients" onChange={handleChange}>
              <option value="FAMALE" selected>FAMALE</option>
              <option value="MALE">MALE</option>
            </select>
            <br/>
            <label>Document: </label>
            <br/>
            <input type="number" min="0" data-bind="value:replyNumber" className="form-control" name="documentNumberEmergencyPatients" onChange={handleChange}/>
            <br/>
            <label>Age: </label>
            <br/>
            <input type="number" min="0" max="120" className="form-control" name="ageEmergencyPatients" onChange={handleChange}/>
            <br/>
            <label>Address: </label>
            <br/>
            <input type="text" className="form-control" name="addressEmergencyPatients" onChange={handleChange}/>
            <br/>
            <label>Height (cm): </label>
            <br/>
            <input type="number" min="0" data-bind="value:replyNumber" className="form-control" name="heightEmergencyPatients" onChange={handleChange}/>
            <br/>
            <label>Weight (kg): </label>
            <br/>
            <input type="number" min="0" data-bind="value:replyNumber" className="form-control" name="weightEmergencyPatients" onChange={handleChange}/>
            <br/>
            <label>Years smoking: </label>
            <br/>
            <input type="number" min="0" data-bind="value:replyNumber" className="form-control" name="smokerEmergencyPatients" onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => emergenciesClientPost()}>Insert</button>
          <button className="btn btn-primary" onClick={() => openCloseModalInsert()}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
