import React, {createContext, useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ListStudent from '../../components/dashboard/listStudent';
import ListTeacher from '../../components/dashboard/listTeacher';
import AdminEditStudent from '../../components/dashboard/adminEditStudent';
import AdminEditTeacher from '../../components/dashboard/adminEditTeacher';
import AdminHeader from '../../components/header_footer/AdminHeader';
import Footer from '../../components/header_footer/Footer';

export const ViewContext = createContext();
function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentView, setCurrentView] = useState('Student');
    
  const renderTableData = () => {
    switch (currentView){
      case 'Student': return <ListStudent />;
      case 'Teacher': return <ListTeacher />; 
      case 'AdminEditStudent': return <AdminEditStudent />;
      case 'AdminEditTeacher': return <AdminEditTeacher />
    }
  }
  return (
    <>
      <AdminHeader />
      <div className="row">
        <div className="col-md-2 leftBody">
          <ul className="nav flex-column" style={{ height: '100%', backgroundColor: 'rgb(58, 35, 35)', color: 'white' }}>
            <li className="nav-item" style={{ paddingTop: '2rem', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
              <i className="fas fa-regular fa-id-badge fa-md fa-2x"></i> User Information
              <i className="fa-solid fa-angles-down"></i>
            </li>
            {isOpen && (
              <ul>
                <ol className="nav-item" style={{ paddingTop: '2rem' }}>
                  <Link to={'/admin/dashboard'} style={{ color: 'white', padding: '0', textDecoration: 'none' }}>
                    <p onClick={() => setCurrentView('Student')} className={currentView === 'Student' && 'greentext'} style={{ marginBottom: '0', cursor: 'pointer' }}>
                      Student
                    </p>
                  </Link>
                </ol>
                <ol className="nav-item" style={{ paddingTop: '2rem' }}>
                  <Link to={'/admin/dashboard'} style={{ color: 'white', padding: '0', textDecoration: 'none' }}>
                    <p onClick={() => {setCurrentView('Teacher')}} className={currentView === 'Teacher' && 'greentext'} style={{ marginBottom: '0', cursor: 'pointer' }}>
                      Teacher
                    </p>
                  </Link>
                </ol>
              </ul>
            )}
            <li className="nav-item" style={{ paddingTop: '2rem' }}>
              <Link to='/dashboard' style={{ color: 'white', padding: '0', textDecoration: 'none' }}>
                <i className="fa fa-solid fa-question fa-md fa-2x"></i> Dashboard
              </Link> 
            </li>
          </ul>
        </div>
        <div className='col-md-10 rightBody'>
          <div className="dataTable mx-auto">
            <ViewContext.Provider value={{currentView, setCurrentView}} >
              {renderTableData()}
            </ViewContext.Provider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;

