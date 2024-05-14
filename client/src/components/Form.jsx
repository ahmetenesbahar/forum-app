import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setRegistered } from "state";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import Select from "react-select";
import { getThemeReactSelect } from "theme";
import Button from "./shared/Button";
import axios from "axios";

const registerSchema = yup.object().shape({
  userName: yup.string().required("Required"),
  profileName: yup.string().required("Required"),
  email: yup.string().email("Invalid Email").required("Required"),
  password: yup.string().required("Required"),
  interestedCommunities: yup.array().of(yup.string().required("Required")),
  picture: yup.string().notRequired("Required"),
});

const loginSchema = yup.object().shape({
  userName: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesRegister = {
  userName: "",
  profileName: "",
  email: "",
  password: "",
  picture: "",
  interestedCommunities: [],
};

const initialValuesLogin = {
  userName: "",
  password: "",
};

const Form = ({ theme }) => {
  const mode = useSelector((state) => state.auth.mode);
  const reactSelectTheme = getThemeReactSelect(mode);
  const isRegistered = useSelector((state) => state.auth.isRegistered);

  const [communities, setCommunities] = useState([]);

  const [selectedCommunities, setSelectedCommunities] = useState([]);

  const [pageType, setPageType] = useState(isRegistered ? "login" : "register");

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchCommunities = async () => {
        const response = await fetch("http://localhost:3001/communities");
        const data = await response.json();
        setCommunities(data);
      };
      fetchCommunities();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const register = async (values, onSubmitProps) => {
    try {
      const interestedCommunities = selectedCommunities.map(
        (community) => community.value
      );

      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("profileName", values.profileName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("picture", values.picture);
      formData.append("picturePath", values.picture?.name);
      formData.append("interestedCommunities", interestedCommunities);

      const savedUserResponse = await axios.post(
        "http://localhost:3001/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const savedUser = await savedUserResponse.data;
      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
        dispatch(setRegistered(true));
      }

      await login(
        { userName: values.userName, password: values.password },
        onSubmitProps
      );
    } catch (error) {
      console.error("Error while registering:", error);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn && loggedInResponse.status === 200) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (pageType === "login") await login(values, onSubmitProps);
    if (pageType === "register") await register(values, onSubmitProps);
  };

  return (
    <div className="min-w-[370px]">
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
            <div>
              <div className="relative pt-7">
                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 w-full rounded-full z-20 relative  focus:outline-none mb-2`}
                />
                {errors.userName && touched.userName && (
                  <div
                    className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
                  >
                    {errors.userName}
                  </div>
                )}
              </div>
              {!isRegistered && (
                <>
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
                </>
              )}
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
              </div>
              {!isRegistered && (
                <>
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
                                    const input =
                                      document.createElement("input");
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
                                alt="Profile"
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
                      name="interestedCommunities"
                      options={communities.map((community) => ({
                        value: community._id,
                        label: community.communityName,
                      }))}
                      value={selectedCommunities}
                      onChange={(selectedOptions) => {
                        setSelectedCommunities(selectedOptions);
                        setFieldValue("communities", selectedOptions);
                      }}
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
                </>
              )}
              <div className="flex justify-center mt-6">
                <Button label={isRegistered ? "Login" : "Register"} />
              </div>
            </div>
          </form>
        )}
      </Formik>
      <div
        className="w-full items-center justify-center flex underline hover:font-semibold cursor-pointer mt-2"
        onClick={() => {
          setPageType(isRegistered ? "register" : "login");
          dispatch(setRegistered(!isRegistered));
        }}
      >
        {isRegistered
          ? "Don't have an account? Sign Up here."
          : "Already have an account? Login here."}
      </div>
    </div>
  );
};

Form.displayName = "Form";
export default Form;
