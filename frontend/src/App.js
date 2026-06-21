import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import BookingForm from "./pages/BookingForm";
import PaymentPage from "./PaymentPage";
import FoodSelection from "./pages/FoodSelection";
import BlogPage from "./pages/BlogPage";
import RulesPage from "./pages/RulesPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import BlogDetail from "./pages/BlogDetail"
import AdminFood from "./pages/AdminFood";
import AdminBooking from "./pages/AdminBooking";
import AdminUsers from "./pages/AdminUsers";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRevenue from "./pages/AdminRevenue";
import FoodPayment from "./pages/FoodPayment";
import AdminRoom from "./pages/AdminRoom";
import Payment from "./pages/Payment";
import FloatingButtons from "./components/FloatingButtons";





function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/choose-food/:bookingId" element={<FoodSelection />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/food" element={<FoodSelection />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/noi-quy" element={<RulesPage />} />
        <Route path="/admin/foods" element={<AdminFood />} />
        <Route path="/admin/bookings" element={<AdminBooking />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<AdminRoom />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/admin/revenue" element={<AdminRevenue />} />
        <Route path="/payment-food" element={<FoodPayment />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <FloatingButtons />
    </Router>
  );
}
export default App;
