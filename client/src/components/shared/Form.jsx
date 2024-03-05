import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import Select, { StylesConfig } from "react-select";
import { getThemeReactSelect } from "theme";

const registerSchema = yup.object().shape({
  username: yup.string().required("Required"),
  profileName: yup.string().required("Required"),
  email: yup.string().email("Invalid Email").required("Required"),
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
  communities: [],
};

const initialValuesLogin = {
  username: "",
  password: "",
};

const Form = ({ theme }) => {
  const mode = useSelector((state) => state.mode);
  const reactSelectTheme = getThemeReactSelect(mode);
  const isRegistered = useSelector((state) => state.isRegistered);

  const communities = [
    { id: 1, name: "Durward Reynolds", unavailable: false },
    { id: 2, name: "Kenton Towne", unavailable: false },
    { id: 3, name: "Therese Wunsch", unavailable: false },
    { id: 5, name: "Katelyn Rohan", unavailable: false },
  ];

  const [selectedCommunities, setSelectedCommunities] = useState([]);

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
                <div className="relative">
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
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
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
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
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
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
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
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
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
                            className={`dropzone border-dashed h-32 flex items-center justify-center border-2 ${theme.primaryBorder} p-10 rounded-lg text-center ${theme.secondaryBackground}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <p>
                              <span
                                className={`px-2 py-1 rounded-md ${theme.secondary} ${theme.hoverBlue} text-white cursor-pointer mx-1`}
                                onClick={(e) => {
                                  const input = document.createElement("input");
                                  input.setAttribute("type", "file");
                                  input.setAttribute(
                                    "accept",
                                    ".jpg,.jpeg,.png"
                                  );
                                  input.onchange = (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      setFieldValue("picture", file);
                                    }
                                  };
                                  input.click();
                                }}
                              >
                                Select
                              </span>
                              or drop your profile photo here
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <img
                              src={URL.createObjectURL(values.picture)}
                              alt="Profile Photo"
                              className=" object-cover w-44 h-44 rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className={`relative pt-7`}>
                  <Select
                    name="communities"
                    options={communities.map((community) => ({
                      value: community.id,
                      label: community.name,
                    }))}
                    value={selectedCommunities}
                    onChange={(selectedOptions) =>
                      setSelectedCommunities(selectedOptions)
                    }
                    onBlur={handleBlur}
                    isMulti
                    closeMenuOnSelect={false}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: reactSelectTheme.secondaryBackground,
                        maxWidth: "371px",
                        color: "white !important",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: reactSelectTheme.secondaryBackground,
                        color: reactSelectTheme.text,
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? reactSelectTheme.secondaryBackground
                          : "initial",
                        "&:hover": {
                          backgroundColor: reactSelectTheme.hoverBackground,
                        },
                        cursor: "pointer",
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: reactSelectTheme.primary,
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "600",
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        color: "#fff",
                        fontSize: "16px",
                        "&:hover": {
                          color: "rgb(139, 0, 0)",
                          backgroundColor: "transparent",
                        },
                        ":hover svg": {
                          fill: "red",
                          width: "16px",
                          height: "16px",
                        },
                      }),
                      clearIndicator: (provided) => ({
                        ...provided,
                        color: reactSelectTheme.text,
                        cursor: "pointer",
                        "&:hover": {
                          color: "red",
                        },
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        color: reactSelectTheme.text,
                        cursor: "pointer",
                        "&:hover": {
                          color: reactSelectTheme.text,
                        },
                      }),
                      input: (provided) => ({
                        ...provided,
                        color: reactSelectTheme.text,
                      }),
                    }}
                  />
                  {errors.communities && touched.communities && (
                    <div
                      className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
                    >
                      {errors.communities}
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className={`${theme.primary} w-full px-4 py-2 rounded-full text-white font-semibold`}
                  >
                    Submit
                  </button>
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
