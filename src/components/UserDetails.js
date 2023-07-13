import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/network";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: "-",
    name: "-",
    email: "-",
    phone: "-",
  });

  useEffect(() => {
    let url = `${API_URL}/users/${id}`;
    const getUserDetails = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email address</th>
            <th scope="col">Phone No</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{user.id}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserDetails;
