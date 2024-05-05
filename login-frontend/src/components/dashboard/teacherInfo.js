import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { ViewContext } from '../../pages/dashboardPage/TeacherDashBoard';

function StudentInfo(props) {
  const {currentView, setCurrentView} = useContext(ViewContext);
  const toggleSwitch = () => {
    setCurrentView(currentView === 'TeacherInfo' ? 'EditTeacher' : 'TeacherInfo');
  }
  const [msgv, setMsgv] = useState('');
  const [gender, setGender] = useState('O');
  const [faculty, setFaculty] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [degree, setDegree] = useState('');
  const [cccd, setCccd] = useState('');
  const [cccdDay, setCccdDay] = useState('');
  const [cccdLocation, setCccdLocation] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  useEffect(() => {
    const userdata = sessionStorage.getItem('userdata');
    if(userdata){
      const retrivedata = JSON.parse(userdata);
      setFullName(retrivedata.name || '');
      setMsgv(retrivedata.msgv || '');
      setBirthday(retrivedata.private_info?.birthday || '');
      setDegree(retrivedata.private_info?.degree || '');
      setGender(retrivedata.private_info?.gender || '');
      setCccd(retrivedata.private_info?.cccd || '');
      setCccdDay(retrivedata.private_info?.cccdDay || '');
      setCccdLocation(retrivedata.private_info?.cccdLocation || '');
      setFaculty(retrivedata.private_info?.faculty || '');
      setAddress(retrivedata.private_info?.address || '');
      setPhoneNumber(retrivedata.private_info?.phoneNumber || '');
      setEmail(retrivedata.private_info?.email || '');
      setPersonalEmail(retrivedata.private_info?.personalEmail || '');
    }
  }, [])

  return (
    <Tab.Container defaultActiveKey={'#info'}>
      <ListGroup style={{ marginTop: '2%', flexDirection: 'row', textAlign: 'center' }}>
        <ListGroup.Item action href="#info" style={{ width: '100%' }}>
          <b>Teacher Information</b>
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
              <p>{fullName}</p>
              <p style={{ fontWeight: 'bold' }}>#Teacher ID</p>
              <p>{msgv}</p>
              <p style={{ fontWeight: 'bold' }}>#Sex</p>
              <p>{(gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other')||'None'}</p>
            </div>
            <div className="data-box">
              <p style={{ fontWeight: 'bold' }}>#Day of Births</p>
              <p>{birthday||'None'}</p>
              <p style={{ fontWeight: 'bold' }}>#Degree</p>
              <p>{degree||'None'}</p>
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
      </Tab.Content>
    </Tab.Container>
  );
}

export default StudentInfo;
