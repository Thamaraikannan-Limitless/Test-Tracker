import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
import useLoginAuthStore from "./Store/useLoginAuthStore";
import LoginPage from "./Pages/Authentication/LoginPage";
import SignupPage from "./Pages/Authentication/SignupPage";
import ResetPasswordPage from "./Pages/Authentication/ResetPasswordPage";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets/Tickets";
import TicketsAllPage from "./Pages/Tickets/TicketsAllPage";
import TicketsCreatedPage from "./Pages/Tickets/TicketsCreatedPage";
import TicketsAssignedPage from "./Pages/Tickets/TicketsAssignedPage";
import TicketsCompletedPage from "./Pages/Tickets/TicketsCompletedPage";
import TicketDetailWrapper from "./Components/Ticket/TicketDetailWrapper";
import Header from "./Components/Header/Header";
import ProtectedRoute from "./Routes/ProtectedRoute";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  const { checkAuth } = useLoginAuthStore();

  useEffect(() => {
    checkAuth(); // Ensure authentication state is loaded on startup
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes (Authentication) */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Legacy Tickets route - redirects to /ticket */}
            <Route path="/tickets" element={<Tickets />} />

            {/* New Ticket Routes */}
            <Route path="/ticket" element={<TicketsAllPage />} />
            <Route path="/ticket/created" element={<TicketsCreatedPage />} />
            <Route path="/ticket/assigned" element={<TicketsAssignedPage />} />
            <Route
              path="/ticket/completed"
              element={<TicketsCompletedPage />}
            />

            {/* Ticket detail route */}
            <Route
              path="/tickets/:ticketId"
              element={<TicketDetailWrapper />}
            />
          </Route>
        </Route>

        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
