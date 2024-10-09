import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Button, Container } from 'react-bootstrap';
import LoginPopUpForm from '../components/forms/LoginPopUpForm';
import RegisterPopUpForm from '../components/forms/RegisterPopUpForm';
import ResponsePopup from '../components/popups/ResponsePopup';

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [showLoginPopUpForm, setShowLoginPopUpForm] = useState<boolean>(false);
  const [showRegisterPopUpForm, setShowRegisterPopUpForm] =
    useState<boolean>(false);

  const [responsePopupShow, setResponsePopupShow] = useState<boolean>(false);
  const [responsePopupTitle, setResponsePopupTitle] = useState<string>('');
  const [responsePopupMessage, setResponsePopupMessage] = useState<string>('');

  const handleShowLogin = () => setShowLoginPopUpForm(true);
  const handleCloseLogin = () => setShowLoginPopUpForm(false);

  const handleShowRegister = () => setShowRegisterPopUpForm(true);
  const handleCloseRegister = () => setShowRegisterPopUpForm(false);

  return (
    <Container className="text-center mt-5">
      {user ? (
        <div>
          <h1>Welcome, {user.firstname}!</h1>
          <p>You are logged in.</p>
        </div>
      ) : (
        <div>
          <h1>Welcome To My Demo CRUD App</h1>
          <Button variant="primary" className="m-2" onClick={handleShowLogin}>
            Login
          </Button>
          <Button
            variant="secondary"
            className="m-2"
            onClick={handleShowRegister}
          >
            Register
          </Button>
          <LoginPopUpForm
            show={showLoginPopUpForm}
            handleClose={handleCloseLogin}
            setResponsePopupShow={setResponsePopupShow}
            setResponsePopupTitle={setResponsePopupTitle}
            setResponsePopupMessage={setResponsePopupMessage}
          />
          <RegisterPopUpForm
            show={showRegisterPopUpForm}
            handleClose={handleCloseRegister}
            setResponsePopupShow={setResponsePopupShow}
            setResponsePopupTitle={setResponsePopupTitle}
            setResponsePopupMessage={setResponsePopupMessage}
          />
        </div>
      )}
      <ResponsePopup
        show={responsePopupShow}
        handleClose={() => setResponsePopupShow(false)}
        title={responsePopupTitle}
        message={responsePopupMessage}
      />
    </Container>
  );
};

export default HomePage;
