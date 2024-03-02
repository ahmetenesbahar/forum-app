import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import Satuhaz from "../../assets/Satuhaz.png";
import Book from "../../assets/Book.png";

const registerSchema = yup.object().shape({
  username: yup.string().required("Required"),
  profileName: yup.string().required("Required"),
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
  location: yup.string().required("Required"),
  communities: yup.array().required("Required"),
  picture: yup.string().required("Required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesRegister = {
  username: "",
  profileName: "",
  email: "",
  password: "",
  picture: "",
  bio: "",
  communities: "",
};

const initialValuesLogin = {
  username: "",
  password: "",
};

const Form = ({ theme }) => {
  const isRegistered = useSelector((state) => state.isRegistered);

  const [pageType, setPageType] = useState(isRegistered ? "login" : "register");

  const dispatch = useDispatch();

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (pageType === "login") await login(values, onSubmitProps);
    if (pageType === "register") await register(values, onSubmitProps);
  };

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={
          isRegistered ? initialValuesLogin : initialValuesRegister
        }
        validationSchema={isRegistered ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            {!isRegistered ? (
              <div>
                <div className="relative pt-7">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 w-full rounded-full z-20 relative  focus:outline-none mb-2`}
                  />
                  {errors.username && touched.username && (
                    <div
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1  `}
                    >
                      {errors.username}
                    </div>
                  )}
                </div>
                <div className="relative pt-7">
                  <input
                    type="text"
                    name="profileName"
                    placeholder="Profile Name"
                    value={values.profileName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 w-full rounded-full z-20 relative  focus:outline-none mb-2`}
                  />
                  {errors.profileName && touched.profileName && (
                    <div
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1  `}
                    >
                      {errors.profileName}
                    </div>
                  )}
                </div>
                <div className="relative pt-7">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 w-full rounded-full z-20 relative  focus:outline-none mb-2`}
                  />
                  {errors.email && touched.email && (
                    <div
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1  `}
                    >
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="relative pt-7">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 w-full rounded-full z-20 relative  focus:outline-none mb-2`}
                  />
                  {errors.password && touched.password && (
                    <div
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1  `}
                    >
                      {errors.password}
                    </div>
                  )}
                </div>{" "}
                <div className="relative pt-7">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <div
                            className={`flex relative mt-20 justify-center `}
                          >
                            <img
                              src={Satuhaz}
                              className="w-52 h-56 absolute z-10 -top-24 "
                            />
                            <div className="z-20 flex items-start relative">
                              <img
                                src={Book}
                                className=" h-36 w-full object-fit "
                              />
                              <p className="absolute top-0 text-black font-semibold text-center">
                                Satuhaz's Profile Picture Collection
                              </p>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            ) : null}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
