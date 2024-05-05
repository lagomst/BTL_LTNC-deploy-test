import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { ViewContext } from '../../pages/dashboardPage/StudentDashboard';
function EditStudent() {
  const jwtToken = sessionStorage.getItem('jwtToken');

  const [formData, setFormData] = useState({
    name: '',
    mssv: '',
    private_info: {
      gender: 'O',
      birthday: '',
      classId: '',
      faculty: '',
      cccd: '',
      cccdDay: '',
      cccdLocation: '',
      address: '',
      phoneNumber: '',
      email: '',
      personalEmail: '',
    },
    training_info: {
      yearOfAdmission: '',
      trainingTime: '',
      educationProgram: '',
      status: '',
      expectSemester: '',
      maximumSemester: '',
      AAC: '',
      GPA: '',
      major: '',
      expectGrationDate: '',
    }    
  });
  const getData = async () => {
    const id = window.location.pathname.split('/')[4];
    try {
      const response = await fetch(`http://localhost:5000/admin/dashboard/student/${id}`, {
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
        console.error("Failed to get student(s)");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = window.location.pathname.split('/')[4];
    try {
      const response = await fetch(`http://localhost:5000/admin/dashboard/student/${id}`, {
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
    const editData = sessionStorage.getItem('editData');
    if(editData){
      const retrivedata = JSON.parse(editData);
      setFormData({...formData, ...retrivedata});
    }
  }, [sessionStorage.getItem('editData')]);
  return (
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
              <input type="text" className="form-control" id="hovaten" placeholder="Enter" aria-label="Họ & tên" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />

              <label htmlFor="mssv" className="form-label"><b>#Student ID</b></label>
              <input type="text" className="form-control" id="mssv" value={formData.mssv} />

              <div style={{ marginBottom: '6px' }}>
                <p style={{ fontWeight: 'bold' }}>#Sex</p>
                <input className="form-check-input" type="radio" name="gioitinh" id="nam" value='M' checked={formData.private_info.gender === 'M'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="nam">
                  Male
                </label>
                <input className="form-check-input" type="radio" name="gioitinh" id="nu" value='F' checked={formData.private_info.gender === 'F'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="nu">
                  Female
                </label>
                <input className="form-check-input" type="radio" name="gioitinh" id="khac" value='O' checked={formData.private_info.gender === 'O'} onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, gender: e.target.value}} )} />
                <label className="form-check-label" htmlFor="khac">
                  Other
                </label>
              </div>

            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="ngaysinh" className="form-label"><b>#Day of Births</b></label>
              <input type="date" className="form-control" id="ngaysinh" placeholder="Enter" value={formData.private_info.birthday} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, birthday: e.target.value}} )} />

              <label htmlFor="malop" className="form-label"><b>#Class</b></label>
              <input type="text" className="form-control" id="malop" placeholder="Enter" value={formData.private_info.classId} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, classId: e.target.value}} )} />

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
              <input type="text" className="form-control" id="sdt" placeholder="Enter" value={formData.private_info.phoneNumber} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, phoneNumber: e.target.value}} )} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="emailtruong" className="form-label"><b>#University Email</b></label>
              <input type="text" className="form-control" id="emailtruong" placeholder="Enter" value={formData.private_info.email} 
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, email: e.target.value}} )} />
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="email" className="form-label"><b>#Other Email</b></label>
              <input type="text" className="form-control" id="email" placeholder="Enter" value={formData.private_info.personalEmail}
                onChange={(e) => setFormData({...formData, private_info: {...formData.private_info, personalEmail: e.target.value}} )} />
            </Col>
          </Row>
          <Button type="submit" onClick={handleSubmit} style={{marginLeft: '40em', backgroundColor: 'green', width: '10vh'}}>
            Save
          </Button>
        </Tab.Pane>

        <Tab.Pane eventKey='#training' style={{ borderTop: 'none' }}>
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Training Infomation
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
              <label htmlFor="" className="form-label"><b>#Year of Admission</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={formData.training_info.yearOfAdmission} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, yearOfAdmission: e.target.value}} )} />
              
              <label htmlFor="" className="form-label"><b>#Training Time</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={formData.training_info.trainingTime} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, traingTime: e.target.value}} )} />
              
              <label htmlFor="" className="form-label"><b>#Education Program</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={formData.training_info.educationProgram} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, educationProgram: e.target.value}} )} />
              
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              
              <label htmlFor="" className="form-label"><b>#Status</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={formData.training_info.status} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, status: e.target.value}} )} />
              
              <label htmlFor="" className="form-label"><b>#Expected number of semesters</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={formData.training_info.expectSemester} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, expectSemester: e.target.value}} )} />
              
              <label htmlFor="" className="form-label"><b>#Maximum Number of Semesters</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={formData.training_info.maximumSemester} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, maximumSemester: e.target.value}} )} />
              
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="" className="form-label"><b>#Accumulate Academic Credits</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter" value={formData.training_info.AAC} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, AAC: e.target.AAC}} )} />

              <label htmlFor="" className="form-label"><b>#GPA</b></label>
              <input type="text" className="form-control" id="" placeholder="Enter"value={formData.training_info.GPA} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, GPA: e.target.value}} )} />
            </Col>
          </Row>
          <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: '2% auto' }}>
            <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
              Graduated Infomation
            </p>
          </div>
          <Row style={{ width: '96%', margin: '2% auto' }}>
            <Col sm={3}>
              <div style={{ paddingLeft: '1vh' }}>
                <label htmlFor="diachi" className="form-label"><b>#Major</b></label>
                <input type="text" className="form-control" id="diachi" placeholder="Enter" value={formData.training_info.major} 
                  onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, major: e.target.value}} )} />
              </div>
            </Col>
            <Col sm={3} style={{ paddingLeft: '1vh', borderLeft: '1px solid rgb(204, 203, 203)' }}>
              <label htmlFor="sdt" className="form-label"><b>#Expected Graduation Date</b></label>
              <input type="text" className="form-control" id="sdt" placeholder="Enter" value={formData.training_info.expectGrationDate} 
                onChange={(e) => setFormData({...formData, training_info: {...formData.training_info, expectGrationDate: e.target.value}} )} />
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

export default EditStudent;