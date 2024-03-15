import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../../services/api";
import { Link } from "react-router-dom";
import "./Login.css";

const RenderLogin = () => {
  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Ingrese un email válido")
          .required("Este campo es obligatorio"),
        password: Yup.string()
          .required("Este campo es obligatorio")
          .min(4, "La contraseña debe tener al menos 4 caracteres"),
        // .matches(
        //   /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
        //   "La contraseña debe contener diferentes tipos de caracteres"
        // ),
      }),
      onSubmit: async (values) => {
        const submit = await loginUser(values.email, values.password);
        console.log(submit);
        if (submit) window.location.href = "/Ecommerce/";
      },
      validateOnChange: false,
      validateOnBlur: true,
    });

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Iniciar Sesión</h2>
        <div className="form-container">
          <form className="registration-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
            {touched.email && errors.email && (
              <div className="error">{errors.email}</div>
            )}
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
            />
            {touched.password && errors.password && (
              <div className="error">{errors.password}</div>
            )}
            <button type="submit">Iniciar Sesión</button>
          </form>
          <div className="google-login">
            <p>
              ¿No tienes cuenta?{"  "}
              <Link to="/Ecommerce/register" className="button-link">
                Registrarse
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderLogin;
