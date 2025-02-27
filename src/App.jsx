import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
import useLoginAuthStore from "./Store/useLoginAuthStore";
import AuthForm from "./Pages/AuthForm";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";
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

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   ); // Optional loading state
  // }

  return (
    <Router>
      <Routes>
        {/* Public Route (Login) */}
        <Route path="/" element={<AuthForm />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ticket" element={<Tickets />} />
            <Route
              path="/tickets/:ticketId"
              element={<TicketDetailWrapper />}
            />
          </Route>
        </Route>

        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
export default App;
