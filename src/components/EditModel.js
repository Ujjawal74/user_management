import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../utils/network";
import { useSelector, useDispatch } from "react-redux";
import { resetUser, handleInputChange } from "../redux/slices/oneUserSlice";
import { fetchUsers } from "../redux/slices/usersSlice";
import { putReq } from "../utils/network";

const EditModel = () => {
  const user = useSelector((state) => state.oneUser);
  const dispatch = useDispatch();

  const handleSubmitEdit = async () => {
    try {
      let url = `${API_URL}/users/${user.id}`;
      if (user.name && user.email && user.phone) {
        const res = await putReq(url, user);
        if (res.status === "ok") {
          toast(res.msg);
          window.$("#editModal").modal("hide");
          dispatch(fetchUsers());
          reset();
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

  const reset = () => {
    dispatch(resetUser());
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleInputChange({ name, value }));
  };

  return (
    <>
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Modal
              </h5>
            </div>
            <div className="modal-body">
              <div className="form-group my-2">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  value={user.name}
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="nameHelp"
                  placeholder="Enter Name"
                  name="name"
                  onChange={inputChange}
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  value={user.email}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  onChange={inputChange}
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="exampleInputPassword1">Phone No</label>
                <input
                  type="tel"
                  value={user.phone}
                  className="form-control"
                  id="exampleInputPhoneNo"
                  placeholder="Phone"
                  name="phone"
                  onChange={inputChange}
                />
              </div>

              <button
                onClick={handleSubmitEdit}
                type="button"
                className="btn btn-outline-dark my-2"
              >
                Edit User
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={reset}
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

export default EditModel;
