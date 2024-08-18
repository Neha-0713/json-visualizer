'use client';
import React, { useRef } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";


const propertySchema = Yup.object().shape({
  location: Yup.string()
    .min(2, "Too short")
    .max(25, "Too Long")
    .required("Please enter location"),

  area: Yup.string()
  .min(2, "Too short")
  .max(25, "Too Long")
  .required("Please enter area of the property"),

  category: Yup.string()
  .min(2, "Too short")
  .max(25, "Too Long")
  .required("Please enter category"),

  price: Yup.number().required(),




});

const initialValues= {
  location: "",
  area:"",
  category:"",
  price:"",
  image:"",
};

const PropertyForm = () => {
  const router = useRouter();
  const fileRef = useRef("");
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, {resetForm, setSubmitting})=>{
      console.log(values);

      axios.post("http://localhost:5000/realstate/add", values)
      .then((response) => {
        console.log(response.status);
        resetForm();
        fileRef.current.value="";
       
        toast.success("Registered successfully");
          //router.push("/allproduct");
      }).catch((err) => {
        console.log(err);
      });
      setSubmitting(false);
    },
    validationSchema: propertySchema,
  })



  return (
    <div>
      <>
        {/* Card Section */}
        <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
          {/* Card */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                Property description
              </h2>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                List your property 
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              {/* Grid */}
              <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                <div className="sm:col-span-3">
                  <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                    Profile photo
                  </label >
                </div>
                {/* End Col */}
                <div className="sm:col-span-9">
                  <div className="flex items-center gap-5">
                    <img
                      className="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-900"
                      src="https://preline.co/assets/img/160x160/img1.jpg"
                      alt="Avatar"
                    />
                    <div className="flex gap-x-2">
                      <div>
                        <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                         htmlFor="image">
                     
                       <input 
                        id="image"
                        type="file"
                        ref={fileRef}
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                          formik.setFieldValue(
                            "image",
                            URL.createObjectURL(event.currentTarget.files[0])
                            
                          );
                        }}
                      />

                       </label>
                      </div>
                      {formik.errors.image && formik.touched.image ? (
                  <p className="text-xs text-red-600 mt-2">
                    {formik.errors.image}
                  </p>
                ) : null}

                    </div>
                  </div>
                </div>
                {/* End Col */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Location
                  </label>
                </div>
                {/* End Col */}
                <div className="sm:col-span-9">
                  <div className="sm:flex">
                    <input
                      id="location"
                      type="text"
                      name="location"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Street name,locality,city"
                    />
                    
                  </div>
                  {formik.errors.location && formik.touched.location ? (
                    <p className="text-xs text-red-600 mt-2">
                      {formik.errors.title}
                    </p>
                  ) : null}

                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="brand"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Area
                  </label>
                </div>
                {/* End Col */}
                <div className="sm:col-span-9">
                  <div className="sm:flex">
                    <input
                      id="area"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.brand}
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="2000 sqft"
                    />
                  </div>
                  {formik.errors.area && formik.touched.area ? (
                    <p className="text-xs text-red-600 mt-2">
                      {formik.errors.brand}
                    </p>
                  ) : null}

                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-full-name"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Category
                  </label>
                </div>
                {/* End Col */}
                <div className="sm:col-span-9">
                  <div className="sm:flex">
                    <input
                      id="category"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Residential/Commercial"
                    />
                  </div>
                  {formik.errors.category && formik.touched.category ? (
                    <p className="text-xs text-red-600 mt-2">
                      {formik.errors.category}
                    </p>
                  ) : null}

                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Price(₹)
                  </label>
                </div>
                {/* End Col */}
                <div className="sm:col-span-9">
                  <div className="sm:flex">
                    <input
                      id="price"
                      type="number"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.price}
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="₹400/sqrt"
                    />
                  </div>
                  {formik.errors.price && formik.touched.price ? (
                    <p className="text-xs text-red-600 mt-2">
                      {formik.errors.price}
                    </p>
                  ) : null}

                </div>
              </div>
              {/* End Grid */}
              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                disabled={formik.isSubmitting}
                  type="submit"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
          {/* End Card */}
        </div>
        {/* End Card Section */}
      </>
    </div>
  );
};

export default PropertyForm