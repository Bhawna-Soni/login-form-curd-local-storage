import Login from "@/pages/login";
import { setLoginData } from "@/redux/actions/loginAction";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TableData from "./TableData";
import { v4 as uuidv4 } from "uuid";

export default function Loginfrom() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  // console.log("login data pass",formData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e, val) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (router?.query?.id) {
      const storedData = localStorage.getItem("previousData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const item = parsedData.find((item) => item.id === id);
        if (item) {
          setFormData({
            name: item.name,
            email: item.email,
            password: item.password,
          });
        }
      }
    }
  }, [router, id]);

  const handleSubmit = () => {
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.password !== ""
    ) {
      const id = uuidv4();
      dispatch(
        setLoginData({
          id: id,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      );
      const previousData =
        JSON.parse(localStorage.getItem("previousData")) || [];
      const newData = {
        id: id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const updatedData = [...previousData, newData];
      localStorage.setItem("previousData", JSON.stringify(updatedData));
      const loginData = JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("loginData", loginData);
      router.push("/");
    } else {
      console.log("Please fill in all fields");
    }
  };

  // console.log("previousData",previousData);
  return (
    <>
      <div className="container my-4">
        <div className="table-container ">
          <div className="row text-center">
            <div className="col-md-12 ">
              <div className="row p-0">
                <div className="col-md-6  d-flex flex-col justify-center text-center login-left-side-container  p-4">
                  <div className=" contant">
                    <h4>Welcome To</h4>
                    <div className="img-container my-4 py-4">
                      <Image
                        src="/assest/images/travel_14110222.png"
                        alt="login_icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <h2 className="pb-3">Company Name</h2>
                    <span className="px-2 text-center font-weight-light">
                      Lorem ipsum is placeholder text commonly used in the
                      graphic, print, and publishing industries for previewing
                      layouts and visual mockups
                    </span>
                    <div className="d-flex justify-center text-center pt-5">
                      <p>Creator here</p>
                      <div
                        className="vr mx-3 "
                        style={{ color: "#fff", height: "30px", width: "1px" }}
                      ></div>
                      <p>Developer here</p>
                    </div>
                  </div>
                </div>
                <div className="container-fluid col-md-6   justify-center text-center login-right-side-container p-4">
                  <div className="contant">
                    <h2 className="pb-3">Create your account</h2>
                    {/* name */}
                    <div className="container-login-field ">
                      <div className="login-field">
                        <label htmlFor="input-text">Name</label>
                        <div className="input-box">
                          <input
                            type="text"
                            name="name"
                            id="input-text"
                            placeholder="Enter your text"
                            value={formData.name}
                            onChange={(e, val) => handleInputChange(e, val)}
                          />
                          <span className="material-icons">done</span>
                        </div>
                      </div>
                    </div>

                    {/* email */}
                    <div className="container-login-field">
                      <div className="login-field">
                        <label htmlFor="input-text">Email</label>
                        <div className="input-box">
                          <input
                            type="text"
                            name="email"
                            id="input-text"
                            placeholder="Enter your text"
                            value={formData.email}
                            onChange={(e, val) => handleInputChange(e, val)}
                          />
                          <span className="material-icons">done</span>
                        </div>
                      </div>
                    </div>

                    {/* password */}
                    <div className="container-login-field">
                      <div className="login-field">
                        <label htmlFor="input-text">Password</label>
                        <div className="input-box">
                          <input
                            type="text"
                            name="password"
                            id="input-text"
                            placeholder="Enter your text"
                            value={formData.password}
                            onChange={(e, val) => handleInputChange(e, val)}
                          />
                          <span className="material-icons">done</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        By Signing Up. I agree <b>Terms & Condition</b>
                      </label>
                    </div>

                    <div className="d-flex pt-4 justify-center gap-3">
                      <button type="button" className="btn btn-primary">
                        <span className="p-2">Sign Up</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => handleSubmit(formData)}
                      >
                        <span className="p-2">Sign In</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
