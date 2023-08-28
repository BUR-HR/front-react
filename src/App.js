import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.css";
import Schedule from "./pages/calendar/Schedule";
import Calendar from "./pages/calendar/main/Calendar";
import { Footer } from "./common/commons";
import PageNotFound from "./error/PageNotFound";
import Layout from "./layout/layout";
import { Orgchart } from "./orgchart/orgchart";
import {
    Attendance,
    AttendanceList,
    AttendanceMain,
} from "./pages/attendance/attendance";
import { Login } from "./pages/login";
import {
    Payment,
    PaymentMain,
    PayrollLedgerMain,
    SeveranceLedgerMain,
} from "./pages/payment/payment";
import EmployeeCard from "./pages/employee/employeecard/main/Employeecard";
import { AuthProvider, useAuth } from "./AuthContext";


function PrivateRoute() {
    const {token} = useAuth();
    
    return token ? <Layout/> : <Navigate to={"/login"}/>
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<PrivateRoute />}>
                            <Route
                                exact
                                index
                                element={<Navigate to="/attendance" />}
                            />
                            <Route exact path="attendance" element={<Attendance />}>
                                <Route exact index element={<AttendanceMain />} />
                                <Route
                                    exact
                                    path="list"
                                    element={<AttendanceList />}
                                />
                            </Route>
                            <Route exact path="/orgchart" element={<Orgchart />} />
                            <Route exact path="payment" element={<Payment />}>
                                <Route exact index element={<PaymentMain />} />
                                <Route
                                    exact
                                    path="/payment/payroll/list"
                                    element={<PayrollLedgerMain />}
                                />
                                <Route
                                    exact
                                    path="severance/list"
                                    element={<SeveranceLedgerMain />}
                                />
                            </Route>
                            <Route exact path="/schedule" element={<Schedule />}>
                                <Route exact index element={<Calendar />} />
                            </Route>
                            <Route
                                exact
                                path="/employeecard"
                                element={<EmployeeCard />}
                            />
                        </Route>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="*" element={<PageNotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
