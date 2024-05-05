import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { ViewContext } from '../../pages/dashboardPage/StudentDashboard';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
function StudentInfo() {
  const {currentView, setCurrentView} = useContext(ViewContext);
  const toggleSwitch = () => {
    setCurrentView(currentView === 'StudentInfo' ? 'EditStudent' : 'StudentInfo');
  }
  
  const [mssv, setMssv] = useState('');  const [gender, setGender] = useState('');
  const [faculty, setFaculty] = useState('');  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');  const [classId, setClassId] = useState('');
  const [cccd, setCccd] = useState('');  const [cccdDay, setCccdDay] = useState('');
  const [cccdLocation, setCccdLocation] = useState('');  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');  const [email, setEmail] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');

  const[yearOfAdmission, setYearOfAdmission] = useState('');  const [traingTime, setTraingTime] = useState('');
  const [educationProgram, setEducationProgram] = useState('');  const [status, setEtatus] = useState('');
  const [expectSemester, setExpectSemester] = useState('');  const [maximumSemester, setMaximumSemester] = useState('');
  const [AAC, setAAC] = useState('');  const [GPA, setGPA] = useState('');
  const [major, setMajor] = useState('');  const [expectGrationDate, setExpectGrationDate] = useState('');
  useEffect(() => {
    const userdata = sessionStorage.getItem('userdata');
    if(userdata){
      const retrivedata = JSON.parse(userdata);
      setName(retrivedata.name || '');
      setMssv(retrivedata.mssv || '');
      setBirthday(retrivedata.private_info?.birthday || '');
      setGender(retrivedata.private_info?.gender || '');
      setCccd(retrivedata.private_info?.cccd || '');
      setCccdDay(retrivedata.private_info?.cccdDay || '');
      setCccdLocation(retrivedata.private_info?.cccdLocation || '');
      setFaculty(retrivedata.private_info?.faculty || '');
      setClassId(retrivedata.private_info?.classId || '');
      setAddress(retrivedata.private_info?.address || '');
      setPhoneNumber(retrivedata.private_info?.phoneNumber || '');
      setEmail(retrivedata.private_info?.email || '');
      setPersonalEmail(retrivedata.private_info?.personalEmail || '');

      setYearOfAdmission(retrivedata.training_info?.yearOfAdmission || '');
      setTraingTime(retrivedata.training_info?.traingTime || '');
      setEducationProgram(retrivedata.training_info?.educationProgram || '');
      setEtatus(retrivedata.training_info?.status || '');
      setExpectSemester(retrivedata.training_info?.expectSemester || '');
      setMaximumSemester(retrivedata.training_info?.maximumSemester || '');
      setAAC(retrivedata.training_info?.AAC || '');
      setGPA(retrivedata.training_info?.GPA || '');
      setMajor(retrivedata.training_info?.major || '');
      setExpectGrationDate(retrivedata.training_info?.expectGrationDate || '');
    }
  }, [])

  return (
    <>
      <Tab.Container defaultActiveKey={'#info'}>
        <ListGroup style={{ marginTop: '2%', flexDirection: 'row' }}>
          <ListGroup.Item action href="#info" style={{ width: '25%' }}>
            <b>Personal Information</b>
          </ListGroup.Item>
          <ListGroup.Item action href="#training" style={{ width: '25%' }}>
            <b>Training Information</b>
          </ListGroup.Item>
        </ListGroup>
      <div style={{ padding: '10px' }}>
        <i style={{ fontWeight: 'bold' }}>Last updated time: dd/mm/yyyy realtime</i>
        <Button onClick={toggleSwitch} style={{marginLeft :'100vh', marginRight: '1vh'}}>Edit</Button>
      </div>

      <Tab.Content>
        <Tab.Pane eventKey='#info' style={{ borderTop: 'none' }}>
          <div className="smallbox">
            <p>Personal Information</p>
          </div>
          <div className="data-container" style={{ display: 'flex' }}> 
            <div className="data-box" style={{ marginLeft: '4vh' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
              </div>
              <p style={{ fontWeight: 'bold' }}>
                Last profile photo update time: ___
              </p>
            </div>
            <div className="data-box col-3x">
              <p style={{ fontWeight: 'bold' }}>#Full Name</p>
              <p>{name}</p>
              <p style={{ fontWeight: 'bold' }}>#Student ID</p>
              <p>{mssv}</p>
              <p style={{ fontWeight: 'bold' }}>#Sex</p>
              <p>{(gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other')||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Day of births</p>
              <p>{birthday||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Class</p>
              <p>{classId||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Faculty</p>
              <p>{faculty||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Identity Card Number</p>
              <p>{cccd||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Date of issue of identity card</p>
              <p>{cccdDay||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Place of issue of identity card</p>
              <p>{cccdLocation||'None'}</p>
            </div>
          </div>
          <div className="smallbox">
            <p>Address Information</p>
          </div>
          <div className="data-container" style={{ display: 'flex' }}>
            <div className="data-box" style={{ marginLeft: '4vh' }}>
              <p style={{ fontWeight: 'bold' }}>#Address</p>
              <p>{address||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Telephone Number</p>
              <p>{phoneNumber||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#University Email</p>
              <p>{email||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Other Email</p>
              <p>{personalEmail||'None'}</p>
            </div>
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey='#training' style={{ borderTop: 'none' }}>
          <div className="training-info">        
            <div className="smallbox">
              <p>Training Information</p>
            </div>
            <div className="data-container" style={{ display: 'flex' }}> 
              <div className="data-box" style={{ marginLeft: '4vh' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
                </div>
                <p style={{ fontWeight: 'bold' }}>
                  Last profile photo update time: ___
                </p>
              </div>
              <div className="data-box">
                <p style={{ fontWeight: 'bold' }}>#Year of Admission</p>
                <p>{yearOfAdmission||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#Training Time</p>
                <p>{traingTime||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#Education Program</p>
                <p>{educationProgram||'None'}</p>
              </div>
              <div className="data-box">
                <p style={{ fontWeight: 'bold' }}>#Status</p>
                <p>{status||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#Expected number of semesters</p>
                <p>{expectSemester||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#Maximum Number of Semesters</p>
                <p>{maximumSemester||'None'}</p>
              </div>
              <div className="data-box">
                <p style={{ fontWeight: 'bold' }}>#Accumulate Academic Credits</p>
                <p>{AAC||'None'}</p>
                <p style={{ fontWeight: 'bold' }}>#GPA</p>
                <p>{GPA||'None'}</p>
              </div>
            </div>
            <div className="smallbox">
              <p>Graduate Information</p>
            </div>
            <div className="data-container" style={{ display: 'flex' }}>
              <div className="data-box" style={{ marginLeft: '4vh' }}>
                <p style={{ fontWeight: 'bold' }}>#Major</p>
                <p>{major||'None'}</p>
              </div>
              <div className="data-box">
                <p style={{ fontWeight: 'bold' }}>#Expected Graduation Date</p>
                <p>{expectGrationDate||'None'}</p>
              </div>
            </div>
          </div>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    </>
  );
}

export default StudentInfo;
