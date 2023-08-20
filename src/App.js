import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.css";
import Schedule from "./calendar/Schedule";
import Calendar from "./calendar/calendar";
import { Footer } from "./common/commons";
import PageNotFound from "./error/PageNotFound";
import Layout from "./layout/layout";
import { Orgchart } from "./orgchart/orgchart";
import Attendance, { AttendanceList, AttendanceMain } from "./pages/attendance/attendance";
import { Login } from "./pages/login";
import PaymentMain from "./pages/payment/main/PaymentMain";
import Payment from "./pages/payment/payment";
import EmployeeCard from "./employee/employeecard/main/Employeecard"

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/attendance" />} />
                        <Route path="attendance" element={<Attendance />}>
                            <Route index element={<AttendanceMain />} />
                            <Route path="list" element={<AttendanceList />} />
                        </Route>
                        <Route path="/orgchart" element={<Orgchart />} />
                        <Route path="payment" element={<Payment />}>
                            <Route index element={<PaymentMain/>} />
                        </Route>
                        <Route path="/schedule" element={<Schedule />}>
                            <Route index element={<Calendar />} />
                        </Route>
                        <Route path="/employeecard" element={<EmployeeCard />} />
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
