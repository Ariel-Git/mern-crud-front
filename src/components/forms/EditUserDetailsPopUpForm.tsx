import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setUserState } from '../../features/user/userSlice';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateUserDetails } from '../../api/userApi';
import { User } from '../../types';
import { joiResolver } from '@hookform/resolvers/joi';
import { UserUpdateSchema } from '../../schemas/user.requests.schemas';
import { useForm } from 'react-hook-form';
import { useLastVisitedPage } from '../../context/LastVisitedPageContext';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
}

interface EditUserDetailsPopUpFormProps {
  show: boolean;
  handleClose: () => void;
  setResponsePopupShow: (show: boolean) => void;
  setResponsePopupTitle: (title: string) => void;
  setResponsePopupMessage: (message: string) => void;
}

const EditUserDetailsPopUpForm: React.FC<EditUserDetailsPopUpFormProps> = ({
  show,
  handleClose,
  setResponsePopupShow,
  setResponsePopupTitle,
  setResponsePopupMessage,
}) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const firstname = userState.user?.firstname || '';
  const lastname = userState.user?.lastname || '';
  const email = userState.user?.email || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: joiResolver(UserUpdateSchema),
    defaultValues: {
      firstname,
      lastname,
      email,
    },
  });
  const navigate = useNavigate();
  const { setLastVisitedPage } = useLastVisitedPage();
  const handleSave = async (data: IFormInput) => {
    try {
      const token = userState.token!;
      await updateUserDetails(token, userState.user!.id!, data);
      const user: User = { ...userState.user!, ...data };
      dispatch(setUserState({ user, token }));
      handleClose();
      setResponsePopupShow(true);
      setResponsePopupTitle('Success');
      setResponsePopupMessage('Your details updated successfully!');
    } catch (error) {
      if (
        error instanceof AxiosError &&
        (!error.response || [401, 403, 406].includes(error.response.status))
      ) {
        switch (error.response!.status) {
          case 406:
            setResponsePopupShow(true);
            setResponsePopupTitle('Failed to update your details');
            setResponsePopupMessage(
              'The email you entered is already in use by other user!',
            );
            break;
          default:
            setLastVisitedPage('/users');
            navigate('/403');
        }
        return;
      }
      setResponsePopupShow(true);
      setResponsePopupTitle('Failed to update your details');
      setResponsePopupMessage('Error occurred, please try agin later!');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit My Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
          <Button
            variant="primary"
            className="mt-3 float-end"
            onClick={handleSubmit(handleSave)}
            disabled={!isValid}
          >
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserDetailsPopUpForm;
