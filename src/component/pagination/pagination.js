import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "19px",
    margin: "10px",
    "& a": {
      color: "black",
      float: "left",
      padding: "8px 16px",
      textDecoration: "none",
    },
    "& a-active": {
      backgroundColor: "#4CAF50",
      color: "white",
    },
  },
});
const Pagination = ({ totalPages, paginate, currentPage }) => {
  const [pages, setPages] = useState([]);
  const getPager = (page) => {
    if (page < 1 || page > totalPages || page === undefined) {
      return;
    }
    // let currentPage = currentPage || 1;
    let startPage, endPage;
    //   pageSize = 10;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    let range = [];

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return setPages(range);
  };
  useEffect(() => {
    getPager(currentPage);
  }, [currentPage]);

  const classes = useStyles();

  return (
    <div className={classes.pagination}>
      {pages[0] !== 1 ? <div> ... </div> : ""}
      {pages.map((number) => (
        <a href="#" key={number} onClick={() => paginate(number)}>
          {number}
        </a>
      ))}
      {currentPage < totalPages ? <div> ... </div> : ""}
    </div>
  );
};

export default Pagination;
