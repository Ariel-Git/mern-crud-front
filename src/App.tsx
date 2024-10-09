import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import store, { RootState } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import UsersListPage from './pages/UsersListPage';
import { logout } from './features/user/userSlice';
import NotFoundPage from './pages/NotFoundPage';
import ForbiddenPage from './pages/ForbiddenPage';
import { LastVisitedPageProvider } from './context/LastVisitedPageContext';
import { isTokenExpired } from './utils/auth';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }, [token, dispatch]);

  return (
    <Provider store={store}>
      <LastVisitedPageProvider>
        <Router>
          <Header />
          <main className="py-3">
            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/users" element={<UsersListPage />} />
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </LastVisitedPageProvider>
    </Provider>
  );
};

export default App;
