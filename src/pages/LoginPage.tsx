import { Button } from "components/button";
import { Input } from "components/input";
import { Label } from "components/label";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export interface LoginPageProps {}

const schema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "The password must be more than 8 characters"),
});

export default function LoginPage(props: LoginPageProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (errors) {
      const error = Object.values(errors);
      const errorMessage: String | undefined = error[0]?.message?.toString();

      toast.error(errorMessage);
    }
  }, [errors]);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user || !user.displayName) {
      return;
    }
    navigate("/");
  });

  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        navigate("/");
        toast.success("Login successfully !");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="xl:mx-auto w-[500px] pt-[150px] mx-5">
        <div className="text-center mb-5 flex justify-center">
          <Link to={"/"}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <form onSubmit={handleSubmit(handleSignIn)} noValidate className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              name="email"
              placeholder="Please enter your email"
              type={"email"}
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
            Do you not have an account?{" "}
            <Link to={"/register"} className="text-primary">
              Register
            </Link>
          </p>
          <Button isLoading={isSubmitting} type="submit" className="w-[150px] mx-auto">
            Login
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
