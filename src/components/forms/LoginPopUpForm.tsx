import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user/userSlice';
import { loginUser } from '../../api/userApi';
import { useLastVisitedPage } from '../../context/LastVisitedPageContext';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface LoginFormProps {
  show: boolean;
  handleClose: () => void;
  setResponsePopupShow: (show: boolean) => void;
  setResponsePopupTitle: (title: string) => void;
  setResponsePopupMessage: (message: string) => void;
}

const LoginPopUpForm: React.FC<LoginFormProps> = ({
  show,
  handleClose,
  setResponsePopupShow,
  setResponsePopupTitle,
  setResponsePopupMessage,
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { lastVisitedPage, setLastVisitedPage } = useLastVisitedPage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user, token } = await loginUser({ email, password });
      dispatch(login({ user, token }));
      handleClose();
      if (lastVisitedPage) {
        navigate(lastVisitedPage);
        setLastVisitedPage(null);
      }
    } catch (error) {
      setResponsePopupShow(true);
      setResponsePopupTitle('Login Failed');
      if (
        error instanceof AxiosError &&
        (!error.response || error.response.status >= 500)
      ) {
        setResponsePopupMessage('Error occurred, please try agin later!');
      } else {
        setResponsePopupMessage('Incorrect user name or password!');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3 float-end">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginPopUpForm;
