import React from "react";
import UsersList from "./UsersList";
import AddModel from "./AddModel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  return (
    <>
      <UsersList />
      <AddModel />
      <ToastContainer />
    </>
  );
};

export default Home;
