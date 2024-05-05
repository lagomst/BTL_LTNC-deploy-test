import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import FirstPage from './pages/FirstPage';
import AuthPage from './pages/authPage';
import Course from './pages/coursePage/Course';
import MyCourse from './pages/coursePage/MyCourse';
import CourseRegistration from './pages/coursePage/CourseRegistration';
import StudentDashBoard from './pages/dashboardPage/StudentDashboard';
import TeacherDashBoard from './pages/dashboardPage/TeacherDashBoard';
import AdminDashBoard from './pages/dashboardPage/AdminDashboard';
import AdminStudentEdit from './pages/adminPage/adminStudent/AdminStudentEdit';
import AdminTeacherEdit from './pages/adminPage/adminTeacher/AdminTeacherEdit';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<FirstPage />} />
          <Route path='/teacher/login' element={<AuthPage />} />
          <Route path='/student/login' element={<AuthPage />} />
          <Route path='/admin/login' element={<AuthPage />} />
          <Route path='/teacher/changepassword' element={<AuthPage />} />
          <Route path='/student/changepassword' element={<AuthPage />} />
          <Route path='/admin/changepassword' element={<AuthPage />} />

          <Route element={<PrivateRoute />} >
            <Route path='/teacher/dashboard' element={<TeacherDashBoard />} />
            <Route path='/student/dashboard' element={<StudentDashBoard />} />
            <Route path='/admin/dashboard' element={<AdminDashBoard />} />
            <Route path='/student/course' element={<Course />} />
            <Route path='/student/mycourse' element={<MyCourse />} />
            <Route path='/student/courseRegistration' element={<CourseRegistration />} />
            
            <Route path='/admin/dashboard/student/:studentid' element={<AdminDashBoard />} />
            <Route path='/admin/dashboard/teacher/:teacherid' element={<AdminDashBoard />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
