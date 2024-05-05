import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup, TabContainer } from 'react-bootstrap';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
const DashBoard = () => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const [courses, setCourses] = useState([
    {
      'semester': '',
      'courseCode': '',
      'credit': '',
      'scheduleDay': '',
      'scheduleTime': '',
      'classroom': '',
      'studentCount': '',
    }
  ]);
  useEffect(() => {
    getCourses();
  }, []);
  const getCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/teacher/dashboard/bangdieukhien/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        setCourses(result);
        console.log("All course(s):", courses );
      }
      else {
        console.error("Failed to get all course(s)");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#register">
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="#register">
                <h4 style={{ marginTop: '2rem', textAlign: 'center'}}>List of Classes</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Semester</th>
                      <th>Course Code</th>
                      <th>Credit</th>
                      <th>Schedule Day</th>
                      <th>Schedule Time</th>
                      <th>Classroom</th>
                      <th>Student Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(courses => (
                      <tr key={courses.id}>
                        <td>{courses.semester}</td>
                        <td>{courses.courseCode}</td>
                        <td>{courses.credit}</td>
                        <td>{courses.scheduleDay}</td>
                        <td>{courses.scheduleTime}</td>
                        <td>{courses.classroom}</td>
                        <td>{courses.studentCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="#education">
                <h1>CHƯƠNG TRÌNH ĐÀO TẠO</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default DashBoard;