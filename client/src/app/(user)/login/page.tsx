"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// import { loginUser } from "@/redux/reducerSlice/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
// import { signIn } from "next-auth/react";

interface Props {}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login: React.FC<Props> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // const handleLogin = async (values) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/login`,
  //       values
  //     );
  //     if (response.status === 201) {
  //       toast.success(response.data.msg);
  //       dispatch(
  //         loginUser({
  //           token: response.data.token,
  //           userDetail: response.data.userDetail,
  //         })
  //       );
  //       router.push("/");
  //     } else {
  //       toast.error(response.data.msg);
  //     }
  //   } catch (err) {
  //     toast.error("Failed to login!");
  //   }
  // };

  return (
    <section className="h-screen bg-gray-50 flex items-center">
      <div className="container flex justify-center my-auto">
        <div>

        </div>
        <div className="flex flex-col items-center gap-6 w-[30%] p-8 shadow-lg bg-white">
          <h2 className="text-3xl font-semibold">Sign In</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { resetForm }) => {
              // handleLogin(values);
              resetForm();
            }}
          >
            {({ errors, touched, values }) => (
              <Form className="flex flex-col items-center gap-5 w-full">
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
                <button
                  type="submit"
                  className="border text-lg font-medium py-2 bg-red-600 text-white w-full rounded-lg"
                >
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <p className="w-full text-start">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="inline-block underline font-medium"
            >
              Create New
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
