import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/userApi';
import { Table, Container, Row, Col, Spinner } from 'react-bootstrap';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { useLastVisitedPage } from '../context/LastVisitedPageContext';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

const UsersListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();
  const { setLastVisitedPage } = useLastVisitedPage();
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setLoading(false);
        setLastVisitedPage('/users');
        navigate('/403');
        return;
      }
      try {
        const usersData = await getAllUsers(token);
        setUsers(usersData.data);
      } catch (error) {
        if (
          error instanceof AxiosError &&
          (!error.response || [401, 403].includes(error.response.status))
        ) {
          setLastVisitedPage('/users');
          navigate('/403');
        }
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, setLastVisitedPage, navigate]);

  if (loading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2>Users List:</h2>
          <hr />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersListPage;
