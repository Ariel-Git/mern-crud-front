import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import LoginPopUpForm from '../components/forms/LoginPopUpForm';
import RegisterPopUpForm from '../components/forms/RegisterPopUpForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ResponsePopup from '../components/popups/ResponsePopup';

const ForbiddenPage: React.FC = () => {
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
    <Container className="my-5">
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <Container className="my-5">
        {!user && (
          <>
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
          </>
        )}
      </Container>
      <ResponsePopup
        show={responsePopupShow}
        handleClose={() => setResponsePopupShow(false)}
        title={responsePopupTitle}
        message={responsePopupMessage}
      />
    </Container>
  );
};

export default ForbiddenPage;
