import axios from "axios";
import styled from "styled-components";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { toast } from "react-toastify";

export const Main = styled.div`

.content-table {
  border-collapse: collapse;
  font-size: 0.9em;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
  background-color: #009ADF;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

.content-table th,
.content-table td {
  padding: 12px 15px;
}

.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #009ADF;
}

.content-table tbody tr:hover {
  color: #009ADF;
}

`;

const Grid = ({ users, setUsers, setOnEdit, loading }) => {
  if (loading) {
    return <h2>Loading ... </h2>;
  }

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Main>
      <table class="content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Birthday</th>
            <th>Adress</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <tr key={i}>
              <td width="30%">{item.name}</td>
              <td width="30%">{item.email}</td>
              <td width="30%">{item.birth_date}</td>
              <td width="30%">{item.adress}</td>
              <td alignCenter width="5%">
                <EditRoundedIcon onClick={() => handleEdit(item)} />
              </td>
              <td alignCenter width="5%">
                <DeleteForeverRoundedIcon
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Main>
  );
};

export default Grid;