import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { getThemeReactSelect } from "theme";
import Select from "react-select";
import Button from "components/shared/Button";

const createSchema = yup.object().shape({
  title: yup.string().required("Required"),
  content: yup.string().required("Required"),
  picture: yup.string().required("Required"),
});

const initialValues = {
  title: "",
  content: "",
  picture: "",
};

const CreatePostForm = ({ theme }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.auth.mode);
  const reactSelectTheme = getThemeReactSelect(mode);
  let communities = [];

  const token = useSelector((state) => state.auth.token);
  const { _id } = useSelector((state) => state.auth.user);
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  /* //!Burada communities'i fetch etmek gerekiyor ama tüm communityleri fetch etmek mantıksız. Kullanıcının tkaip ettiği communityi fetchlemen gerekiyor. Önce sayfa kenarlarında communitylerin listelendiği bir component yap. Sonra oradan seçilen communityleri buraya gönder. Burada da seçilen communityleri fetch et.


 const fetchCommunities = async () => {
   try {
     const response = await fetch("http://localhost:3001/communities", {
       method: "GET",
       headers: { Authorization: `Bearer ${token}` },
     });
     communities = await response.json();
   } catch (error) {
     console.error(error);
   }
 };

 fetchCommunities();
  */

  const createPost = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    formData.append("userId", _id);

    const createdPostResponse = await fetch(
      "http://localhost:3001/posts/createPost",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await createPost(values, onSubmitProps);
  };

  return (
    <div className="min-w-[370px]">
      <Formik
        initialValues={initialValues}
        validationSchema={createSchema}
        onSubmit={handleFormSubmit}
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
                  name="title"
                  placeholder="Enter Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 w-full rounded-full z-20 relative  focus:outline-none mb-2`}
                />
                {errors.title && touched.title && (
                  <div
                    className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
                  >
                    {errors.title}
                  </div>
                )}
              </div>
              <div className="relative pt-7">
                <textarea
                  name="content"
                  placeholder="Enter Description"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 h-[100px] w-full rounded-lg z-20 relative max-h-[350px] min-h-[45px]  focus:outline-none`}
                />
                {errors.content && touched.content && (
                  <div
                    className={`${theme.primary} absolute w-20 h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
                  >
                    {errors.content}
                  </div>
                )}
              </div>
              <div className={`relative pt-7`}>
                <Select
                  name="communities"
                  placeholder="Select Community"
                  options={communities.map((community) => ({
                    value: community._id,
                    label: community.communityName,
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
                      maxWidth: "100%",
                      color: "white !important",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: reactSelectTheme.secondaryBackground,
                      color: reactSelectTheme.text,
                      maxHeight: "200px",
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
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: "200px",
                      overflowY: "auto",
                      backgroundColor: reactSelectTheme.secondaryBackground,
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
                          className={`dropzone min-w-[410px] border-dashed h-32 flex items-center justify-center border-2 ${theme.primaryBorder} p-10 rounded-lg text-center ${theme.secondaryBackground}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p>
                            <span
                              className={`px-2 py-1 rounded-md ${theme.secondary} ${theme.hoverBlue} text-white cursor-pointer mx-1`}
                              onClick={(e) => {
                                const input = document.createElement("input");
                                input.setAttribute("type", "file");
                                input.setAttribute("accept", ".jpg,.jpeg,.png");
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
                            or drop your photo here
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center min-w-[410px]">
                          <img
                            src={URL.createObjectURL(values.picture)}
                            alt="Post Photo"
                            className="  object-cover w-44 h-44 rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="flex justify-center mt-6">
                <Button label={"Create Post"} />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePostForm;
