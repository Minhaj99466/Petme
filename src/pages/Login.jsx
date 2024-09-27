import { Button, Card, CardBody, Input, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../validation/validations";
import { useFormik } from "formik";
import bcrypt from 'bcryptjs'
export default function Login() {


  const navigate = useNavigate()

  const initialValues = {
    email: "",
    password: "",
    number: "",
    name: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const user = JSON.parse(localStorage.getItem("User"));
      if (user && values.email === user.email) {
        const isPasswordMatch = bcrypt.compareSync(values.password, user.password);
        if (isPasswordMatch) {
          localStorage.setItem('loggedIn',true)
          navigate("/");
        } else {
          alert("Wrong email or Password");
        }
      } else {
        alert("User not found. Please register.");
      }
    },
  });
  return (

    <div className="flex justify-center items-center h-screen bg-[#166373]">
      <Card >

        <CardBody>
          <Typography variant="h4" color="blue-gray">
            Sign in
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Login
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-3">
              <Input
                variant="static"
                size="lg"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-xs ">{errors.email}</div>
              )}
              <Input
                variant="static"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                size="lg"
                label="Password"
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-xs ">{errors.password}</div>
              )}
            </div>
            <Button type="submit" className="my-6" fullWidth>
              Sign in
            </Button>
          </form>
        </CardBody>
          <button  className="pb-5"
                    onClick={() => navigate("/register")}
                  >
                    <span>Do you have an account ?</span>
                  </button>
      </Card>
    </div>
  )
}