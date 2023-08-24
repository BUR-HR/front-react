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
import { Orgchart } from "./pages/orgchart/orgchart";
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
import EmployeeCard from "./pages/employee/employeecard/Employeecard";
import EmployeecardMain from "./pages/employee/employeecard/main/EmployeecardMain";

function hasAccessToken() {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    return !!accessToken;
}

function PrivateRoute() {
    
    return hasAccessToken() ? <Layout/> : <Navigate to={"/login"}/>
}

function App() {
    return (
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
                        >
                            <Route index element={<EmployeecardMain/>}/>
                            </Route>
                    </Route>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
