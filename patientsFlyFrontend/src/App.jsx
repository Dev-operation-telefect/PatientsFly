import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import Forgot from "./pages/auth/Forgot";
import Login from "./pages/auth/Login";


import AdminDashboard from "./pages/admin/AdminDashboard";
import VerifyEmail from "./pages/VerifyEmail";
import AdminPrivateRoute from "./component/Routes/AdminPrivateRoute";
import { useAuth } from "./component/context/auth";
import AdminEditProfile from "./pages/admin/AdminEditProfile";
import AdminBlogPosts from "./pages/admin/AdminBlogPosts";
import AdminUsersList from "./pages/admin/AdminUsersList";
import AdminCompany from "./pages/admin/AdminCompany";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminRegistration from "./pages/admin/AdminRegistration";
import AdminTeammates from "./pages/admin/AdminTeammates";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminHospitalList from "./pages/admin/AdminHospitalList";
import AdminPatientReviews from "./pages/admin/AdminPatientReviews";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdminVideos from "./pages/admin/AdminVideos";
import About from "./pages/about/About";
import OurServices from "./pages/ourServices/OurServices";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import AirAmbulancePage from "./pages/airAmbulancePage/AirAmbulancePage";


function App() {
    const [auth, setAuth] = useAuth();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/air-ambulance" element={<AirAmbulancePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* auth controller routes */}
        <Route path="/login" element={auth?.user ? <Navigate to="/" replace /> :<Login />} />
        <Route path="/forgot" element={auth?.user ? <Navigate to="/" replace /> :<Forgot />} />
        
        {/*admin Private Routes */}
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/edit-profile" element={<AdminEditProfile />} />
          <Route path="admin/blog-posts" element={<AdminBlogPosts />} />
          <Route path="admin/users-list" element={<AdminUsersList />} />
          <Route path="admin/company-info" element={<AdminCompany />} />
          <Route path="admin/bookings" element={<AdminBookings />} />
          <Route path="admin/registration" element={<AdminRegistration/>} />
          <Route path="admin/team-member" element={<AdminTeammates/>} />
          <Route path="admin/contacts" element={<AdminContacts/>} />
          <Route path="admin/hospital-list" element={<AdminHospitalList/>} />
          <Route path="admin/patient-reviews" element={<AdminPatientReviews/>} />
          <Route path="admin/videos-reviews" element={<AdminVideos />} />
        </Route>


        {/* <Route path="/expenses-dashboard" element={<ExpensesDashboard />} /> */}
        {/* Add more routes as needed */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
