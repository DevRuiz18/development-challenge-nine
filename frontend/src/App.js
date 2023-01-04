import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import Pagination from "./components/Pagination.js";
import Header from "./components/Header.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const Title = styled.h2`
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

//pagination  
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);


  // get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  //change page 
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 

  return (
    <>
      <Header/>
      <Container>
        <Title>Add or Edit an Register</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Title>Register Listing</Title>
      <Grid setOnEdit={setOnEdit} users={currentUsers} setUsers={setUsers} loading={loading}/>
      <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} currentPage={currentPage}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
