import { Button } from "components/button";
import { Input } from "components/input";
import { Label } from "components/label";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export interface RegisterPageProps {}

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "The password must be more than 8 characters"),
});

export default function RegisterPage(props: RegisterPageProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const uiConfig = {
    signInFlow: "redirect",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  useEffect(() => {
    if (errors) {
      const error = Object.values(errors);
      const errorMessage: String | undefined = error[0]?.message?.toString();

      toast.error(errorMessage);
    }
  }, [errors]);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.displayName) {
        return;
      }
      navigate("/");
    });
  }, [auth, navigate]);

  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const handleSignUp: SubmitHandler<FieldValues> = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password).then(
      async (userPrev) => {
        await updateProfile(userPrev.user, { displayName: values.username });
        navigate("/");
        toast.success("Register successfully !");
      }
    );
  };

  return (
    <>
      <div className="mx-auto md:w-[500px] w-[350px] pt-[150px] md:px-0 px-3">
        <div className="text-center mb-5 flex justify-center">
          <Link to={"/"}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <form noValidate onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Please enter your username"
              type="text"
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              name="email"
              placeholder="Please enter your email"
              type="email"
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              control={control}
              name="password"
              placeholder="Please enter your password"
              type={passwordShow ? "text" : "password"}
              passwordShow={passwordShow}
              setPasswordShow={setPasswordShow}
              hasEye
            ></Input>
          </div>
          <p>
            Do you already have an account?{" "}
            <Link to={"/login"} className="text-primary">
              Login
            </Link>
          </p>
          <Button isLoading={isSubmitting} type="submit" className="w-[150px] mx-auto">
            Register
          </Button>
        </form>
        <div className="mt-10">
          <div className="w-[300px] h-[1px] mx-auto bg-gray-300"></div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </div>
    </>
  );
}
