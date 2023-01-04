import React from "react";
import styled from "styled-components";

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const PagenationConatainer = styled.div`

    padding-top: 1.2rem;
    padding-bottom: 1.2rem;

    nav {
      display: inline-block;
    }

    a, p {
      color: black;
      float: left;
      padding: 8px 16px;
      text-decoration: none;
    }

    .pagination{
      background-color: #0A2435;
      color: white;
      border-radius: 5px;
    }

    a:hover{
      background-color: #ddd;
      border-radius: 5px;
    }
  `;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PagenationConatainer>
      <nav>
        <p class="pagination">Current Page:&nbsp; &nbsp;{currentPage}</p>
        <p></p>
        {pageNumbers.map((number) => (
          <a key={number} onClick={() => paginate(number)} href="!#">
            {number}
          </a>
        ))}
      </nav>
    </PagenationConatainer>
  );
};

export default Pagination;