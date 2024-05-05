import React, { useMemo, useState, useEffect, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ViewContext } from '../../pages/dashboardPage/AdminDashboard';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import IconButton from '@mui/material/IconButton';
import { Button, Modal, Form } from 'react-bootstrap';

function ListTeacher() {
  const {currentView, setCurrentView} = useContext(ViewContext);

  const [faculty, setFaculty] = useState('CSE');
  const [validationErrors, setValidationErrors] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teachers, setTeachers] = useState([
    {
      'msgv': '1234567',
      'name': 'Nguyen Van A',
      'email': 'abcxyz@mut.edu.vn',
    },
    {
      'msgv': '2345678',
      'name': 'Nguyen Van B',
      'email': 'abc123@mut.edu.vn',
    }
  ]);
  const [showModal, setShowModal] = useState(false);

  // Lấy JWT từ Session Storage
  const jwtToken = sessionStorage.getItem('jwtToken');
  // Gửi yêu cầu GET với JWT trong header
  useEffect(() => {
    sessionStorage.removeItem('editData');
  },[])
  const getAllUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/dashboard/teacher", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        setTeachers(result);
      }
      else {
        console.error("Failed to get all teacher(s)");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getData = async (row) => {
    let id = row.original.msgv;
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
        setCurrentView('AdminEditTeacher'); 
      }
      else {
        console.error("Failed to get user");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName('');
    setEmail('');
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleAdd = async () => {
    //event.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/admin/dashboard/teacher/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      if (response.status === 201) {
        const result = await response.json();
        console.log("Add successfully");

        alert('Add successfully.');

        getAllUser();

        handleCloseModal();
      }
      else {
        console.error("Failed to add teacher");

        alert('Failed to add teacher!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (row) => {
    //event.preventDefault();
    
    let teacherid = row.original.msgv;
    try {
      const response = await fetch(`http://localhost:5000/admin/dashboard/teacher/${teacherid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log("Teacher deleted successfully.");
        alert('Teacher deleted successfully.');
        getAllUser();
      }
      else {
        console.error("Failed to delete teacher");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'msgv',
        header: 'Teacher ID',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.msgv,
          helperText: validationErrors?.msgv,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              msgv: undefined,
            }),
          //readOnly: true,
        },
      },
      {
        accessorKey: 'name',
        header: 'Full Name',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },

      {
        accessorKey: 'edit',
        header: 'Edit',
        Cell: ({ row }) => (
          <a onClick={(e) => {e.preventDefault();getData(row)}}>
          <Link to={`/admin/dashboard/teacher/${row.original.msgv}`} style={{ padding: 0 }}>
            <IconButton >
              <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3757 2.02007C16.0264 1.30193 16.9002 0.883741 17.82 0.850314C18.7398 0.816888 19.6366 1.17073 20.3287 1.84007L20.5027 2.02007L21.357 2.96273C22.0075 3.68063 22.3862 4.64457 22.4165 5.65918C22.4468 6.67379 22.1264 7.66315 21.5201 8.42673L21.357 8.61873L7.80916 23.5694C7.61761 23.7808 7.38556 23.942 7.13008 24.0414L6.93433 24.1041L1.55241 25.4747C1.36387 25.5228 1.16763 25.5203 0.98016 25.4673C0.792694 25.4144 0.619477 25.3125 0.475054 25.1704C0.330632 25.0283 0.219219 24.85 0.150173 24.6506C0.0811261 24.4511 0.0564605 24.2362 0.0782473 24.0241L0.102414 23.8734L1.34337 17.9334C1.40468 17.6421 1.52442 17.3696 1.69379 17.1361L1.82791 16.9694L15.3757 2.02007ZM14.5215 6.7334L3.65854 18.7201L2.89004 22.3974L6.22262 21.5481L17.0855 9.5614L14.5215 6.7334ZM18.7941 3.9054C18.5861 3.67583 18.3092 3.53792 18.0156 3.51755C17.7219 3.49717 17.4316 3.59573 17.1991 3.79473L17.0855 3.9054L16.23 4.84807L18.7941 7.67606L19.6484 6.7334C19.8565 6.50381 19.9814 6.19834 19.9999 5.87431C20.0184 5.55027 19.929 5.22994 19.7487 4.9734L19.6484 4.84807L18.7941 3.9054Z" fill="black" />
              </svg>
            </IconButton>
          </Link>
          </a>
        ),
      },
      {
        accessorKey: 'delete',
        header: 'Delete',
        Cell: ({ row }) => (
          <IconButton onClick={() => handleDelete(row)}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="26" viewBox="0 0 48 48">
              <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
            </svg>
          </IconButton>
        ),
      },
    ],
    [validationErrors]
  );
  const table = useMaterialReactTable({
    columns,
    data: teachers,
    getRowId: (row) => row.msgv,
    initialState: { columnVisibility: { msgv: true, name: true, email: true } },
    muiTableContainerProps: {
      sx: {
        overflowX: 'auto',
        width: '100%',
      },
    }
  });
  return(
    <>
      <div className="navigation">
        <h2 style={{ padding: '1vh' }}>
          TEACHER INFORMATION
        </h2>
      </div>
      <hr style={{ borderTop: '1px solid' }} />

      <div className='mb-3' style={{ backgroundColor: '#f2f2f2', padding: '10px' }}>
        <label htmlFor="khoa" className="form-label">Khoa:</label>
        <input type="text" id="khoa" placeholder="Nhập Khoa" aria-label="Khoa" value={faculty} onChange={(e) => setFaculty(e.target.value)} />

        <Button style={{ marginLeft: '65%', backgroundColor: '#20bd20', borderColor: 'green' }} onClick={() => handleShowModal()}>Add teacher</Button>
      </div>
      <MaterialReactTable style={{ minWidth: '1000px' }} table={table} />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add teacher...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};
export default ListTeacher;