import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.css";
import Footer from "./common/footer";
import PageNotFound from "./error/PageNotFound";
import Layout from "./layout/layout";
import { Orgchart } from "./orgchart/orgchart";
import Attendance from "./pages/attendance/attendance";
import AttendanceContent from "./pages/attendance/main/AttendanceContent";
import AttendanceListContent from "./pages/attendance/main/AttendanceListContent";
import { Login } from "./pages/login";
import Payment from "./pages/payment/payment";
import PaymentContent from "./pages/payment/main/PaymentContent";

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/attendance" />} />
                        <Route path="attendance" element={<Attendance />}>
                            <Route index element={<AttendanceContent />} />
                            <Route path="list" element={<AttendanceListContent />} />
                        </Route>
                        <Route path="/orgchart" element={<Orgchart />} />
                        <Route path="payment" element={<Payment />}>
                            <Route index element={<PaymentContent/>} />
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
