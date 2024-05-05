import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { ViewContext } from '../../pages/dashboardPage/TeacherDashBoard';
function EditTeacher() {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const [formData, setFormData] = useState({
    name: '',
    msgv: '',
    private_info: {
      gender: 'O',
      birthday: '',
      degree: '',
      faculty: '',
      cccd: '',
      cccdDay: '',
      cccdLocation: '',
      address: '',
      phoneNumber: '',
      email: '',
      personalEmail: '',
    },
    training_info: ''    
  });
  const getData = async () => {
    const id = window.location.pathname.split('/')[4];
    try {
      const response = await fetch(`http://localhost:5000/admin/dashboard/teacher/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        sessionStorage.setItem('editData', JSON.stringify(result));
      }
      else {
        console.error("Failed to get all student(s)");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = window.location.pathname.split('/')[4];
    try {
      const response = await fetch(`http://localhost:5000/admin/dashboard/teacher/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Update successfully');
        getData();
        alert('Update successfully.');
      } else {
        console.error('Failed to update student');
        alert('Failed to update student!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const userdata = sessionStorage.getItem('editData');
    if(userdata){
      const retrivedata = JSON.parse(userdata);
      setFormData({...formData, ...retrivedata});
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
      </div>
      <Tab.Content>
        <Tab.Pane eventKey='#info' style={{ borderTop: 'none' }}>
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Personal Information
            </p>
          </div>
          <Row style={{ width: '96%', margin: 'auto' }}>
            <Col sm={3}>
              <div style={{ textAlign: 'center' }}>
                <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <b style={{ textAlign: 'center' }}>
                  Last profile photo update time: ___
                </b>
              </div>
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="hovaten" className="form-label"><b>#Full Name</b></label>
              <input type="text" className="form-control" id="hovaten" placeholder="Enter" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />

              <label htmlFor="msgv" className="form-label"><b>#Teacher ID</b></label>
              <input type="text" className="form-control" id="msgv" placeholder="Enter" value={formData.msgv} />

              <div style={{ marginBottom: '6px' }}>
                <p style={{ fontWeight: 'bold' }}>#Sex</p>
                <input className="form-check-input" type="radio" name="gender" id="male" value='M' checked={formData.private_info.gender === 'M'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="nam">
                  Male
                </label>
                <input className="form-check-input" type="radio" name="gender" id="female" value='F' checked={formData.private_info.gender === 'F'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="nu">
                  Female
                </label>
                <input className="form-check-input" type="radio" name="gender" id="other" value='O' checked={formData.private_info.gender === 'O'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="khac">
                  Other
                </label>
              </div>

            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="ngaysinh" className="form-label"><b>#Day of Births</b></label>
              <input type="date" className="form-control" id="ngaysinh" placeholder="Enter" value={formData.private_info.birthday} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, birthday: e.target.value}} )} />

              <label htmlFor="malop" className="form-label"><b>#Degree</b></label>
              <input type="text" className="form-control" id="malop" placeholder="Enter" value={formData.private_info.degree} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, degree: e.target.value}} )} />

              <label htmlFor="khoa" className="form-label"><b>#Faculty</b></label>
              <input type="text" className="form-control" id="khoa" placeholder="Enter" value={formData.private_info.faculty} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, faculty: e.target.value}} )} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="cccd" className="form-label"><b>#Identity Card Number</b></label>
              <input type="text" className="form-control" id="cccd" placeholder="Enter" value={formData.private_info.cccd} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, cccd: e.target.value}} )} />

              <label htmlFor="ngaycapcccd" className="form-label"><b>#Date of issue of identity card</b></label>
              <input type="date" className="form-control" id="ngaycapcccd" placeholder="Enter" value={formData.private_info.cccdDay} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, cccdDay: e.target.value}} )} />
              
              <label htmlFor="noicapcccd" className="form-label"><b>#Place of issue of identity card</b></label>
              <input type="text" className="form-control" id="noicapcccd" placeholder="Enter" value={formData.private_info.cccdLocation} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, cccdLocation: e.target.value}} )} />
            </Col>
          </Row>
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Address Information
            </p>
          </div>
          <Row style={{ width: '96%', margin: '2% auto' }}>
            <Col sm={3}>
              <div style={{ paddingLeft: '1vh' }}>
                <label htmlFor="diachi" className="form-label"><b>#Address</b></label>
                <input type="text" className="form-control" id="diachi" placeholder="Enter" value={formData.private_info.address} 
                  onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, address: e.target.value}} )} />
              </div>
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="sdt" className="form-label"><b>#Telephone Number</b></label>
              <input type="text" className="form-control" id="sdt" placeholder="Enter"  value={formData.private_info.phoneNumber} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, phoneNumber: e.target.value}} )} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="emailtruong" className="form-label"><b>#University Email</b></label>
              <input type="text" className="form-control" id="emailtruong" placeholder="Enter"  value={formData.private_info.email} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, email: e.target.value}} )} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="email" className="form-label"><b>#Other Email</b></label>
              <input type="text" className="form-control" id="email" placeholder="Enter"  value={formData.private_info.personalEmail}
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, personalEmail: e.target.value}} )} />
            </Col>
          </Row>
          <Button type="submit" onClick={handleSubmit} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
            Save
          </Button>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default EditTeacher;