import { Box, CircularProgress, Modal } from "@mui/material";
import "./Loader.css";
import React from "react";

const progress = {
  color: "#fff",
};

const Loader = () => {
  return (
    <Modal open={true} className="LoadingModal">
      <Box className="LoaderStyle">
        <CircularProgress style={progress} thickness={5} size={80} />
      </Box>
    </Modal>
  );
};

export default Loader;
