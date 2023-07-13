import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../utils/network";
import { useSelector, useDispatch } from "react-redux";
import { resetUser, handleInputChange } from "../redux/slices/oneUserSlice";
import { fetchUsers } from "../redux/slices/usersSlice";
import { postReq } from "../utils/network";

const AddModel = () => {
  const user = useSelector((state) => state.oneUser);
  const dispatch = useDispatch();

  const handleSubmitAdd = async () => {
    try {
      let url = `${API_URL}/users`;
      if (user.name && user.email && user.phone) {
        const res = await postReq(url, user);
        if (res.status === "ok") {
          toast(res.msg);
          dispatch(resetUser());
          window.$("#addModal").modal("hide");
          dispatch(fetchUsers());
        } else {
          toast.error(res.error);
        }
      } else {
        toast.warn("Please fill all the fields");
      }
    } catch (error) {
      toast("something went wrong");
    }
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleInputChange({ name, value }));
  };

  return (
    <>
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group my-2">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="nameHelp"
                  placeholder="Enter Name"
                  name="name"
                  value={user.name}
                  onChange={inputChange}
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  value={user.email}
                  onChange={inputChange}
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="exampleInputPassword1">Phone No</label>
                <input
                  type="tel"
                  className="form-control"
                  id="exampleInputPhoneNo"
                  placeholder="Phone"
                  name="phone"
                  value={user.phone}
                  onChange={inputChange}
                />
              </div>

              <button
                onClick={handleSubmitAdd}
                type="button"
                className="btn btn-outline-dark my-2"
              >
                Add User
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddModel;
