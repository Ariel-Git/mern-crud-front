import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { UserChangePasswordSchema } from '../../schemas/user.requests.schemas';
import { changePassword } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useLastVisitedPage } from '../../context/LastVisitedPageContext';
import { logout } from '../../features/user/userSlice';
import { AxiosError } from 'axios';
import { RootState } from '../../store/store';

interface IFormInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
interface ChangePasswordPopUpFormProps {
  show: boolean;
  handleClose: () => void;
  setResponsePopupShow: (show: boolean) => void;
  setResponsePopupTitle: (title: string) => void;
  setResponsePopupMessage: (message: string) => void;
}

export const ChangePasswordPopUpForm: React.FC<
  ChangePasswordPopUpFormProps
> = ({
  show,
  handleClose,
  setResponsePopupShow,
  setResponsePopupTitle,
  setResponsePopupMessage,
}) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: joiResolver(UserChangePasswordSchema),
  });
  const navigate = useNavigate();
  const { setLastVisitedPage } = useLastVisitedPage();

  const handleSave = async (data: IFormInput) => {
    try {
      const token = userState.token!;
      const { oldPassword, newPassword } = data;
      await changePassword(
        token,
        userState.user!.id!,
        oldPassword,
        newPassword,
      );
      handleClose();
      setResponsePopupShow(true);
      setResponsePopupTitle('Success');
      setResponsePopupMessage('Your password changed successfully!');
    } catch (error) {
      if (
        error instanceof AxiosError &&
        (!error.response || [401, 403, 406].includes(error.response.status))
      ) {
        switch (error.response!.status) {
          case 406:
            setResponsePopupShow(true);
            setResponsePopupTitle('Failed to change your password');
            setResponsePopupMessage(
              'The old password you entered is incorrect!',
            );
            break;
          default:
            dispatch(logout());
            setLastVisitedPage('/users');
            navigate('/403');
        }
        return;
      }

      setResponsePopupShow(true);
      setResponsePopupTitle('Failed to change your password');
      setResponsePopupMessage('Error occurred, please try agin later!');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                {...register('oldPassword')}
                isInvalid={!!errors.oldPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.oldPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                {...register('newPassword')}
                isInvalid={!!errors.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                {...register('confirmPassword')}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              className="mt-3 float-end"
              onClick={handleSubmit(handleSave)}
              disabled={!isValid}
            >
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePasswordPopUpForm;
