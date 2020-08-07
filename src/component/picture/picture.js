import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPhotos } from "../../api/api";
import Pagination from "../pagination/pagination";
import { createUseStyles } from "react-jss";

const Picture = () => {
  const [fetching, setFetching] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const search = new URLSearchParams(useLocation().search).get("keyword");

  const useStyles = createUseStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    container: {
      display: "flex",
      alignItems: "center",
      margin: "10px",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    image: {
      height: "300px",
      width: "300px",
      margin: "10px",
    },
    imageContainer: {
      display: "flex",
      alignItems: "center",
      margin: "10px",
      flexDirection: "row",
    },
    dialog: {
      boxShadow: "80px 80px 80px 80px #f3f3f3",
      // position: "relative",
      // top: "10%",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
    },
    dialogImage: {
      width: "800px",
      padding: "10px",
      height: "auto",
    },
    dialogbtn: {
      backgroundColor: "black",
      color: "white",
      fontSize: "20px",
      "& a": {
        textDecoration: "none",
        color: "white",
      },
    },
  });

  const handleShowModal = (url, downloadLink) => {
    setShowModal(!showModal);
    setImageUrl(url);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (downloadLink) {
      setDownloadLink(downloadLink);
    }
  };
  const fetchPhotos = async (keyword, currentPage) => {
    setFetching(true);
    setCurrentPage(currentPage);
    const response = await getPhotos(keyword, currentPage);
    setFetching(false);
    setPhotos(response.results);
    setTotalPages(response.total_pages);
  };

  useEffect(() => {
    fetchPhotos(search, currentPage);
  }, [search]);
  const paginate = (pageNo) => {
    fetchPhotos(search, pageNo);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <h3> Showing search result matching {search}</h3>
        {fetching ? (
          <span> Loading .... </span>
        ) : (
          <div className={classes.container}>
            {totalPages > 1 ? (
              <Pagination
                totalPages={totalPages}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              ""
            )}
            <div>
              {photos.map((pic, i) => (
                <div
                  className={classes.imageContainer}
                  key={i}
                  onClick={() =>
                    handleShowModal(
                      pic.links.download,
                      pic.links.download_location
                    )
                  }
                >
                  <img
                    className={classes.image}
                    alt={pic.description}
                    src={pic.urls.regular}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {/*  The Modal  */}

        {showModal ? (
          <dialog className={classes.dialog} open>
            <img
              className={classes.dialogImage}
              src={imageUrl}
              onClick={() => handleShowModal("")}
              alt="no image"
            />
            <button className={classes.dialogbtn}>
              <a download={downloadLink} href="">
                Download
              </a>
            </button>
            <button
              className={classes.dialogbtn}
              onClick={() => handleShowModal("")}
            >
              close
            </button>
          </dialog>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default Picture;
