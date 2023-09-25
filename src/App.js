import {
    Navigate,
    Outlet,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./AuthContext";
import PageNotFound from "./error/PageNotFound";
import Layout from "./layout/layout";
import {
    Attendance,
    AttendanceList,
    AttendanceMain,
} from "./pages/attendance/attendance";
import Schedule from "./pages/calendar/Schedule";
import Calendar from "./pages/calendar/main/Calendar";
import EmployeeCard from "./pages/employee/employeecard/Employeecard";
import EmployeecardMain from "./pages/employee/employeecard/main/EmployeecardMain";
import Inquiry from "./pages/employee/inquiry/Inquiry";
import InquiryMain from "./pages/employee/inquiry/main/InquiryMain";
import { Login } from "./pages/login";
import Logout from "./pages/logout";
import { Orgchart } from "./pages/orgchart/orgchart";
import {
    PayPopup,
    Payment,
    PaymentLedgerPopup,
    PaymentLedgerUpdatePopup,
    PaymentMain,
    PayrollLedgerMain,
    SeveraceMain,
    SeveranceLedgerMain,
} from "./pages/payment/payment";

function PrivateRoute() {
    const { user } = useAuth();
    return user.token ? <Outlet /> : <Navigate to={"/login"} />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="container">
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<PrivateRoute />}>
                                <Route
                                    exact
                                    index
                                    element={<Navigate to="/attendance" />}
                                />
                                <Route
                                    exact
                                    path="attendance"
                                    element={<Attendance />}
                                >
                                    <Route
                                        exact
                                        index
                                        element={<AttendanceMain />}
                                    />
                                    <Route
                                        exact
                                        path="list"
                                        element={<AttendanceList />}
                                    />
                                </Route>
                                <Route
                                    exact
                                    path="/orgchart"
                                    element={<Orgchart />}
                                />
                                <Route
                                    exact
                                    path="payment"
                                    element={<Payment />}
                                >
                                    <Route
                                        exact
                                        index
                                        element={<PaymentMain />}
                                    />
                                    <Route
                                        exact
                                        path="payroll/list"
                                        element={<PayrollLedgerMain />}
                                    />
                                    <Route
                                        exact
                                        path="severance"
                                        element={<SeveraceMain />}
                                    />
                                    <Route
                                        exact
                                        path="severance/list"
                                        element={<SeveranceLedgerMain />}
                                    />
                                </Route>
                                <Route
                                    exact
                                    path="/schedule"
                                    element={<Schedule />}
                                >
                                    <Route exact index element={<Calendar />} />
                                </Route>
                                <Route
                                    exact
                                    path="/employeecard"
                                    element={<EmployeeCard />}
                                >
                                    <Route
                                        index
                                        element={<EmployeecardMain />}
                                    />
                                </Route>
                                <Route
                                    exact
                                    path="/inquiry"
                                    element={<Inquiry />}
                                >
                                    <Route index element={<InquiryMain />} />
                                </Route>
                            </Route>
                            <Route exact path="/logout" element={<Logout />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="*" element={<PageNotFound />} />
                        </Route>
                        <Route exact path="/pay/payroll/popup/:no" element={<PaymentLedgerPopup/>} />
                        <Route exact path="/pay/payroll/update/:no" element={<PaymentLedgerUpdatePopup/>} />
                        <Route exact path="/pay/payment/popup" element={<PayPopup/>}/>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
