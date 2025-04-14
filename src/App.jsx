import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Reports from './components/Reports';
import NewBill from './components/NewBill';
import ViewBill from './components/ViewBill';
import UpdateMenu from './components/UpdateMenu';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import RestaurantSignUp from './components/SignUpPage'

export default function App() {
    return (
        <Routes>
            {/* Error Handler Page */}
            <Route path="*" element={<ErrorPage />} />

            <Route path="/" element={<LoginPage />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/new-bill" element={<NewBill />} />
            <Route path="/view-bill" element={<ViewBill />} />
            <Route path="/update-menu" element={<UpdateMenu />} />
            <Route path="/sign-up" element={<RestaurantSignUp />} />
            
        </Routes>
    );
}

