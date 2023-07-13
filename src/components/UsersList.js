import React from "react";
import EditModel from "./EditModel";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/network";
import { fetchUsers } from "../redux/slices/usersSlice";
import { editHandler } from "../redux/slices/oneUserSlice";
import { STATUS } from "../utils/network";
import { delReq } from "../utils/network";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersList = () => {
  const dispatch = useDispatch();
  const { data: users, status } = useSelector((state) => state.users);
  // users is just the alias or just use name data in map

  useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      let url = `${API_URL}/users/${id}`;
      const res = await delReq(url);
      if (res.status === "ok") {
        toast(res.msg);
        url = `${API_URL}/users`;
        dispatch(fetchUsers());
      }
    } catch (error) {
      toast("something went wrong");
    }
  };

  if (users.length === 0 && status === STATUS.IDLE) {
    return (
      <>
        <h1>No Users Found!</h1>
      </>
    );
  }

  if (status === STATUS.WAITING) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (status === STATUS.ERROR) {
    return (
      <>
        <h1>Something Went Wrong!</h1>
      </>
    );
  }

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr className="table-warning">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>
                <NavLink to={`/user/${user.id}`}>
                  <button
                    type="button"
                    className="btn btn-outline-success mx-1"
                  >
                    View
                  </button>
                </NavLink>

                <button
                  type="button"
                  className="btn btn-outline-info mx-1"
                  data-toggle="modal"
                  data-target="#editModal"
                  onClick={() => dispatch(editHandler(user))}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  type="button"
                  className="btn btn-outline-danger mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModel />
      <ToastContainer />
    </>
  );
};

export default UsersList;
