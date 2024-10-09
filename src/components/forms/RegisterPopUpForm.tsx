import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user/userSlice';
import { loginUser, registerUser } from '../../api/userApi';
import { joiResolver } from '@hookform/resolvers/joi';
import { UserRegistrationSchema } from '../../schemas/user.requests.schemas';
import { useForm } from 'react-hook-form';
import { useLastVisitedPage } from '../../context/LastVisitedPageContext';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
interface RegisterPopUpFormProps {
  show: boolean;
  handleClose: () => void;
  setResponsePopupShow: (show: boolean) => void;
  setResponsePopupTitle: (title: string) => void;
  setResponsePopupMessage: (message: string) => void;
}

const RegisterPopUpForm: React.FC<RegisterPopUpFormProps> = ({
  show,
  handleClose,
  setResponsePopupShow,
  setResponsePopupTitle,
  setResponsePopupMessage,
}) => {
  const dispatch = useDispatch();
  const firstname = '';
  const lastname = '';
  const email = '';
  const password = '';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: joiResolver(UserRegistrationSchema),
    defaultValues: {
      firstname,
      lastname,
      email,
      password,
    },
  });
  const navigate = useNavigate();
  const { lastVisitedPage, setLastVisitedPage } = useLastVisitedPage();
  const handleSave = async (data: IFormInput) => {
    try {
      const { firstname, lastname, email, password } = data;
      await registerUser({ firstname, lastname, email, password });
      const { token, user } = await loginUser({ email, password });
      dispatch(login({ token, user }));
      if (lastVisitedPage) {
        navigate(lastVisitedPage);
        setLastVisitedPage(null);
      }
      handleClose();
    } catch (error) {
      setResponsePopupShow(true);
      setResponsePopupTitle('Failed to Register');
      setResponsePopupMessage('Error occurred, please try agin later!');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleSave)}>
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              {...register('firstname')}
              isInvalid={!!errors.firstname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstname?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              {...register('lastname')}
              isInvalid={!!errors.lastname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastname?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('email')}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register('password')}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            className="mt-3 float-end"
            onClick={handleSubmit(handleSave)}
            disabled={!isValid}
          >
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterPopUpForm;
