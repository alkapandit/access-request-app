import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";

function AllUsersList(props) {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    per_page: 10,
  });
  const navigate = useNavigate();

  const fetchAllUsers = (pageNo = 0) => {
    axios(process.env.REACT_APP_API_URL + "/opsusers/list-users", {
      method: "POST",
      params: {
        page: pageNo,
        per_page: paginationData.per_page,
      },
    })
      .then(({ data }) => {
        console.log(data);
        setPaginationData(data.pagination);
        setUserData(data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllUsers(1);
  }, []);

  return (
    <div className="ots-userList w-100">
      {userData.length > 0 && (
        <ul>
          <li className="row m-0 headings">
            <div className="col">User Name</div>
            <div className="col">First Name</div>
            <div className="col">Last Name</div>
            <div className="col text-center">View Details</div>
            <div className="col text-center">Edit Details</div>
          </li>
          {userData.map((d, i) => {
            return (
              <li className="row m-0" key={"user-list-item" + i}>
                <div className="col">{d?.username}</div>
                <div className="col">{d?.firstname}</div>
                <div className="col">{d?.lastname}</div>
                <div className="col text-center">
                  <i
                    className="fa-solid fa-eye"
                    onClick={() => {
                      props?.validateUser(d?.username);
                    }}
                  ></i>
                </div>
                <div className="col text-center">
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      navigate("updateuserdetails");
                      props?.validateUser(d?.username, true);
                    }}
                  ></i>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalCount={paginationData.total}
        pageSize={paginationData.per_page}
        onPageChange={(page) => {
          setCurrentPage(page);
          fetchAllUsers(page);
        }}
      />
    </div>
  );
}
export default AllUsersList;
