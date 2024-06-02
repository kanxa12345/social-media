"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {}

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(/[A-Z]/, "Must Contain One Uppercase character"),
  rePassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
  //   birthDate: Yup.date().nullable().required("Required"),
  gender: Yup.string().required("Required"),
});

const Register: React.FC<Props> = ({}) => {
  const [date, setDate] = useState<Date | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //   const handleRegister = async (values) => {
  //     try {
  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API_URL}/register`,
  //         values
  //       );
  //       if (response.status === 201) {
  //         toast.success(response.data.msg);
  //         router.push("/login");
  //       } else {
  //         toast.error(response.data.msg);
  //       }
  //     } catch (err) {
  //       toast.error("Failed to register!");
  //     }
  //   };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container flex justify-center">
        <div className="flex flex-col items-center gap-6 w-1/3 p-8 shadow-lg bg-white">
          <h2 className="text-3xl font-semibold">Sign Up</h2>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              rePassword: "",
              birthDate: null,
              gender: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values: any, { resetForm }) => {
              values.birthDate = date;
              //   handleRegister(values);
              console.log(values);
              resetForm();
            }}
          >
            {({ errors, touched, values }) => (
              <Form className="flex flex-col items-center gap-5 w-full">
                <div className="flex flex-col items-start gap-[2px] w-full relative">
                  <label htmlFor="fullName">Full Name</label>
                  <Field
                    name="fullName"
                    id="fullName"
                    className="border border-gray-600 p-1 w-full focus:outline-none"
                  />
                  <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                    {errors.fullName && touched.fullName
                      ? errors.fullName
                      : null}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px] w-full relative">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="border border-gray-600 p-1 w-full focus:outline-none"
                  />
                  <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                    {errors.email && touched.email ? errors.email : null}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px] w-full relative">
                  <label htmlFor="password">Password</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="border border-gray-600 p-1 w-full focus:outline-none"
                  />
                  {values.password.length > 0 && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPassword(!showPassword);
                      }}
                      className="absolute right-2 top-1/2 translate-y-1/2 inline-block cursor-pointer"
                    >
                      <FaEye className={`${showPassword ? "" : "hidden"}`} />
                      <FaEyeSlash
                        className={`${showPassword ? "hidden" : ""}`}
                      />
                    </span>
                  )}
                  <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                    {errors.password && touched.password
                      ? errors.password
                      : null}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px] w-full relative">
                  <label htmlFor="rePassword">Confirm Password</label>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="rePassword"
                    id="rePassword"
                    className="border border-gray-600 p-1 w-full focus:outline-none"
                  />
                  {values.rePassword.length > 0 && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      className="absolute right-2 top-1/2 translate-y-1/2 inline-block cursor-pointer"
                    >
                      <FaEye
                        className={`${showConfirmPassword ? "" : "hidden"}`}
                      />
                      <FaEyeSlash
                        className={`${showConfirmPassword ? "hidden" : ""}`}
                      />
                    </span>
                  )}
                  <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                    {errors.rePassword && touched.rePassword
                      ? errors.rePassword
                      : null}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px] w-full relative">
                  <label htmlFor="birthDate">Birth Date</label>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                  />
                  <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                    {errors.birthDate && touched.birthDate
                      ? errors.birthDate
                      : null}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px] w-full relative">
                  <div id="my-radio-group">Gender</div>
                  <div
                    role="group"
                    aria-labelledby="my-radio-group"
                    className="flex items-center gap-3"
                  >
                    <label className="flex items-center gap-1 font-medium">
                      <Field type="radio" name="gender" value="male" />
                      Male
                    </label>
                    <label className="flex items-center gap-1 font-medium">
                      <Field type="radio" name="gender" value="female" />
                      Female
                    </label>
                    <label className="flex items-center gap-1 font-medium">
                      <Field type="radio" name="gender" value="custom" />
                      Custom
                    </label>
                  </div>
                  <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                    {errors.gender && touched.gender ? errors.gender : null}
                  </div>
                </div>
                <button
                  type="submit"
                  className="border py-1 px-2 bg-red-600 text-white"
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          <p className="w-full text-start">
            Already have an account?{" "}
            <Link href="/login" className="inline-block underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
