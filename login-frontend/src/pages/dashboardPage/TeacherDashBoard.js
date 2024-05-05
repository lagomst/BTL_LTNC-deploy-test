import React, {createContext, useState } from 'react';
import TeacherInfo from './../../components/dashboard/teacherInfo';
import Footer from '../../components/header_footer/Footer';
import TeacherDashBoard from './../../components/dashboard/teacherDashboard';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TeacherHeader from '../../components/header_footer/TeacherHeader';
import EditTeacher from '../../components/dashboard/editTeacher';

export const ViewContext = createContext();
function DataTable() {
  const [currentView, setCurrentView] = useState('TeacherInfo');
  const handleNavigation = (viewName) => {
    setCurrentView(viewName);
  };
  
  return (
    <div>
      <TeacherHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 leftBody">
            <ul className="nav flex-column">
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer' }}>
                <a onClick={() => handleNavigation('TeacherInfo')}>
                    <i className="fa-regular fa-address-book fa-2x"></i> Personal
                </a>
              </li>
              <li className="nav-item" style={{ marginTop: '2rem', cursor: 'pointer'}}>
                <a onClick={() => handleNavigation('TeacherDashBoard')}>
                    <i className="fa-brands fa-blackberry fa-2x"></i> DashBoard
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-10 rightBody">
            <div className="dataTable mx-auto">
              <ViewContext.Provider value={{currentView, setCurrentView}} >
                {currentView === 'TeacherInfo' && <TeacherInfo />}
                {currentView === 'EditTeacher' && <EditTeacher />}
                {currentView === 'TeacherDashBoard' && <TeacherDashBoard />}
              </ViewContext.Provider>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataTable;
