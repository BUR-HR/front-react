import "./App.css";
import Footer from "./common/footer";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { Login } from "./pages/login";
import { Orgchart } from './orgchart/orgchart'
import Attendance from "./pages/attendance";
import PageNotFound from "./error/PageNotFound";
import Layout from "./layout/layout";
import Schedule from "./calendar/Schedule";
import Calendar from "./calendar/calendar";

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/attendance" />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="/orgchart" element={<Orgchart />} />
                        <Route path="/schedule" element={<Schedule />}>
                            <Route index element={<Calendar />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
