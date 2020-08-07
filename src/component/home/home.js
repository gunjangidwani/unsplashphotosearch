import React from "react";
import { useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
});
const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      history.push(`/photos?keyword=${event.target.value}`);
    }
  };
  return (
    <div className={classes.root}>
      <h3>Unsplash search</h3>
      <input placeholder="Type here to Search" onKeyPress={handleSearch} />
    </div>
  );
};

export default Home;
