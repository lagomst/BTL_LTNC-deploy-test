import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';

import CourseHeader from '../../components/header_footer/CourseHeader';
import Footer from '../../components/header_footer/Footer';

function MyCourse() {
  const [mycourses, setMycourses] = useState([
    {
      'courseCode': 'COxxxx',
      'semester': '1',
      'credit': '50',
      'instructorName': 'Tên giảng viên',
      'msgv': '1234567',
    }
  ])
  
  // Lấy JWT từ Session Storage
  const jwtToken = sessionStorage.getItem('jwtToken');
  // Gửi yêu cầu GET với JWT trong header
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/student/dashboard/khoahoc", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log("My course:", result);

        setMycourses(result);
      }
      else {
        console.error("Failed to get my course");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <CourseHeader />
      <div style={{ margin: '5% 10%' }}>
        <div style={{ marginBottom: '2%' }}>
          <h2 style={{ color: '#eba234' }}>My Course</h2>
        </div>
        <Row xs={1} md={3} className="g-4">
          {mycourses.map((mycourse, idx) => (
            <Col key={mycourse.id}>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>({mycourse.courseCode})_{mycourse.instructorName}-{mycourse.msgv}</Card.Title>
                  <Card.Text>
                    (CQ_HK{mycourse.semester})_Số lượng {mycourse.credit}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default MyCourse;