import { Button, Card, CardBody, Input, Typography } from "@material-tailwind/react";
import { SignupSchema } from "../validation/validations";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function Register() {
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
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const hashedPassword = await bcrypt.hash(values.password, 10);
      const userData = {
        ...values,
        password: hashedPassword,
      };
      localStorage.setItem("User", JSON.stringify(userData));
      navigate("/login");
    }
  });

  return (
    <div className="flex justify-center items-center h-screen bg-[#166373]">
      <Card >
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            Register
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Register
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-3">
              <Input
                variant="outlined"
                size="lg"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Name"
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-xs ">{errors.name}</div>
              )}
              <Input
                variant="outlined"
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
                variant="outlined"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
                label="Password"
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-xs ">{errors.password}</div>
              )}
              <Input
                variant="outlined"
                type="text"
                name="number"
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
                label="Number"
              />
              {touched.number && errors.number && (
                <div className="text-red-500 text-xs ">{errors.number}</div>
              )}
            </div>
            <Button type="submit" className="my-6" fullWidth>
              Register
            </Button>
          </form>
        </CardBody>
        <button className="pb-5"
          onClick={() => navigate("/login")}
        >
          <span>Already Registered ?</span>
        </button>
      </Card>
    </div>
  )
}