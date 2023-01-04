import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #009ADF;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.adress.value = onEdit.adress;
      user.birth_date.value = onEdit.birth_date;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.name.value ||
      !user.email.value ||
      !user.adress.value ||
      !user.birth_date.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          name: user.name.value,
          email: user.email.value,
          adress: user.adress.value,
          birth_date: user.birth_date.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          name: user.name.value,
          email: user.email.value,
          adress: user.adress.value,
          birth_date: user.birth_date.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.name.value = "";
    user.email.value = "";
    user.adress.value = "";
    user.birth_date.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Name</Label>
        <Input name="name" />
      </InputArea>

      <InputArea>
        <Label>Birthday</Label>
        <Input name="birth_date" type="date" />
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      
      <InputArea>
        <Label>Adress</Label>
        <Input name="adress"/>
      </InputArea>

      <Button type="submit"><AddCircleRoundedIcon/></Button>
    </FormContainer>
  );
};

export default Form;