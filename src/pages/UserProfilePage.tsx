import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../features/user/userSlice';
import { Container, Button } from 'react-bootstrap';
import { deleteUser } from '../api/userApi';
import { useLastVisitedPage } from '../context/LastVisitedPageContext';
import { useNavigate } from 'react-router-dom';
import EditUserDetailsPopUpForm from '../components/forms/EditUserDetailsPopUpForm';
import ChangePasswordPopUpForm from '../components/forms/ChangePasswordPopUpForm';
import ResponsePopup from '../components/popups/ResponsePopup';

const UserProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const [responsePopupShow, setResponsePopupShow] = useState<boolean>(false);
  const [responsePopupTitle, setResponsePopupTitle] = useState<string>('');
  const [responsePopupMessage, setResponsePopupMessage] = useState<string>('');

  const token = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();
  const { setLastVisitedPage } = useLastVisitedPage();
  useEffect(() => {
    if (!token) {
      setLastVisitedPage('/profile');
      navigate('/403');
    }
  }, [token, setLastVisitedPage, navigate]);
  const handleEditShow = () => setShowEdit(true);
  const handleEditClose = () => setShowEdit(false);
  const handleChangePasswordShow = () => setShowChangePassword(true);
  const handleChangePasswordClose = () => setShowChangePassword(false);

  const handleDelete = async () => {
    try {
      await deleteUser(userState.token!, userState.user!.id!);
      dispatch(logout());
    } catch (error) {
      setResponsePopupShow(true);
      setResponsePopupTitle('Failed to delete account');
      setResponsePopupMessage('Error occurred, please try agin later!');
    }
  };

  return (
    <Container className="my-5">
      <h2>Your Details:</h2>
      <hr />
      <p>
        <strong>First Name:</strong> {userState.user?.firstname}
      </p>
      <p>
        <strong>Last Name:</strong> {userState.user?.lastname}
      </p>
      <p>
        <strong>Email:</strong> {userState.user?.email}
      </p>
      <Container className="d-flex p-2">
        <Button variant="primary" onClick={handleEditShow}>
          Edit My Details
        </Button>
        <Button
          variant="warning"
          className="ms-3"
          onClick={handleChangePasswordShow}
        >
          Change My Password
        </Button>
        <Button variant="danger" className="ms-3" onClick={handleDelete}>
          Remove My Account
        </Button>
      </Container>
      <EditUserDetailsPopUpForm
        show={showEdit}
        handleClose={handleEditClose}
        setResponsePopupShow={setResponsePopupShow}
        setResponsePopupTitle={setResponsePopupTitle}
        setResponsePopupMessage={setResponsePopupMessage}
      ></EditUserDetailsPopUpForm>
      <ChangePasswordPopUpForm
        show={showChangePassword}
        handleClose={handleChangePasswordClose}
        setResponsePopupShow={setResponsePopupShow}
        setResponsePopupTitle={setResponsePopupTitle}
        setResponsePopupMessage={setResponsePopupMessage}
      ></ChangePasswordPopUpForm>
      <ResponsePopup
        show={responsePopupShow}
        handleClose={() => setResponsePopupShow(false)}
        title={responsePopupTitle}
        message={responsePopupMessage}
      />
    </Container>
  );
};

export default UserProfilePage;
