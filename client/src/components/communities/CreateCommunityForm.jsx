import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommunities } from "state";
import { setShowCreateModal } from "state/modalSlice";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useTheme } from "components/contexts/ThemeContext";
import Button from "components/shared/Button";
import axios from "axios";
import useCommunities from "hooks/useCommunities";

const createSchema = yup.object().shape({
  communityName: yup
    .string()
    .required("Required")
    .max(25, "Community name must be at most 25 characters"),
  communityBio: yup.string().required("Required"),
  picture: yup.string().required("Required"),
});

const initialValues = {
  communityName: "",
  communityBio: "",
  picture: "",
};

const CreateCommunityForm = ({ theme }) => {
  const dispatch = useDispatch();
  const { mutate: mutateCommunities } = useCommunities();
  const token = useSelector((state) => state.auth.token);
  const { _id } = useSelector((state) => state.auth.user);

  const createCommunity = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      formData.append("picture", values.picture);
      formData.append(
        "communityName",
        values.communityName.split(" ").join("")
      );
      formData.append("communityBio", values.communityBio);
      formData.append("userId", _id);
      formData.append("picturePath", values.picture.name);

      await axios.post("http://localhost:3001/communities/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onSubmitProps.resetForm();
      mutateCommunities();
      dispatch(setShowCreateModal(false));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (values, onSubmitProps) => {
    await createCommunity(values, onSubmitProps);
  };

  return (
    <div className="min-w-[370px]">
      <Formik
        initialValues={initialValues}
        validationSchema={createSchema}
        onSubmit={handleSubmit}
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
                  name="communityName"
                  placeholder=" Community Name"
                  value={values.communityName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 w-full rounded-full z-20 relative  focus:outline-none mb-2`}
                />
                {errors.communityName && touched.communityName && (
                  <div
                    className={`${theme.primary} absolute  h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
                  >
                    {errors.communityName}
                  </div>
                )}
              </div>
              <div className="relative pt-7">
                <textarea
                  name="communityBio"
                  placeholder=" Community Bio"
                  value={values.communityBio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border-2 border-gray-300 ${theme.secondaryBackground} p-2 w-full rounded-lg h-[100px] max-h-[350px] min-h-[45px] z-20 relative  focus:outline-none mb-2`}
                />
                {errors.communityName && touched.communityName && (
                  <div
                    className={`${theme.primary} absolute  h-16 rounded-lg px-2 py-1 top-0 left-1 text-white `}
                  >
                    {errors.communityName}
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
                          className={`dropzone border-dashed h-32 flex items-center justify-center border-2 ${theme.primaryBorder} p-10 rounded-lg text-center ${theme.secondaryBackground}`}
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
                            or drop your community photo here
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <img
                            src={URL.createObjectURL(values.picture)}
                            alt="Community Photo"
                            className=" object-cover w-44 h-44 rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="flex justify-center mt-6">
                <Button label={"Create Community"} />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
CreateCommunityForm.displayName = "CreateCommunityForm";
export default CreateCommunityForm;
