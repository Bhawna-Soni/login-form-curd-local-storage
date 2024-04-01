import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function TableData() {
  const [loginData, setLoginData] = useState([]);
  const router = useRouter();

  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("items");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Error loading items from localStorage:", error);
      return [];
    }
  });

  const handleEdit = (id) => {
    console.log("id", id);
    router.push(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    const deleteItems = loginData.filter((item) => item.id !== id);
    setLoginData(deleteItems);
    localStorage.setItem("previousData", JSON.stringify(deleteItems));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("previousData");
    console.log("storedData", storedData);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLoginData(parsedData);
    }
  }, []);

  // console.log("loginData",loginData,storedData);
  return (
    <>
      <div className="container">
        <div className="table-container">
          <div className="p-4">
            <div className="col-12">
              <Link
                href="/login"
                className="btn btn-primary mb-2 justify-end text-right"
                style={{ float: "right" }}
              >
                New Login
              </Link>
              {/* table start */}

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {loginData &&
                    loginData.length > 0 &&
                    loginData.map((ele) => (
                      <tr key={ele.id}>
                        <td>{ele?.id}</td>
                        <td>{ele?.name}</td>
                        <td>{ele?.email}</td>
                        <td>{ele?.password}</td>
                        <td>
                          <td>
                            {/* <Link href={`/edit/${ele.id}`} > */}
                            <button
                              className="edit"
                              title="Edit"
                              data-toggle="tooltip"
                              onClick={() => {
                                handleEdit(ele.id),
                                  console.log(ele.id, "12345");
                              }}
                            >
                              <span className="material-icons">create</span>
                            </button>
                            {/* </Link> */}

                            <button
                              className="delete"
                              title="Delete"
                              data-toggle="tooltip"
                              onClick={() => handleDelete(ele.id)}
                            >
                              <span className="material-icons">delete</span>
                            </button>
                          </td>
                        </td>
                      </tr>
                    ))}
                  {!loginData && (
                    <tr>
                      <td colSpan="3">No login data found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* table end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
