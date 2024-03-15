import { useFormik } from "formik";
import * as Yup from "yup";

import "./Register.css";
import { Link } from "react-router-dom";
import { registerUser } from "../../../services/api";

const RenderRegister = () => {
  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        first_name: "", // Cambiar 'name' por 'first_name'
        last_name: "", // Añadir 'last_name'
        phone: "",
        email: "",
        password: "",
        repasword: "",
      },
      onSubmit: (data) => {
        console.log(data);
        const submit = registerUser(data);
        if (submit) window.location.href = "/Ecommerce/";
      },
      validationSchema: Yup.object({
        first_name: Yup.string()
          .required("Este campo es obligatorio")
          .min(3, "El nombre debe tener al menos 3 caracteres")
          .max(20),
        last_name: Yup.string(), // Validación opcional para last_name
        email: Yup.string()
          .email("Ingrese un email válido")
          .required("Este campo es obligatorio"),
        password: Yup.string()
          .required("Este campo es obligatorio")
          .min(6, "La contraseña debe tener al menos 6 caracteres")
          .matches(
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
            "La contraseña debe contener diferentes tipos de caracteres"
          ),
        repasword: Yup.string()
          .required("Este campo es obligatorio")
          .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
      }),
      validateOnChange: false,
      validateOnBlur: true,
    });

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* <button className="close-button" onClick={onClose}></button> */}
        <h2>Registrarse</h2>
        <div className="form-container">
          <form className="registration-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="first_name" // Cambiar 'name' por 'first_name'
              placeholder="Nombre"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name} // Cambiar 'name' por 'first_name'
            />
            {touched.first_name && errors.first_name && (
              <div>{errors.first_name}</div>
            )}

            <input
              type="text"
              name="last_name" // Añadir 'last_name'
              placeholder="Apellido"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.last_name} // Añadir 'last_name'
            />
            {touched.name && errors.name && <div>{errors.name}</div>}

            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {touched.phone && errors.phone && <div>{errors.phone}</div>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && <div>{errors.email}</div>}

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {touched.password && errors.password && (
              <div>{errors.password}</div>
            )}

            <input
              type="password"
              name="repasword"
              placeholder="Repetir Contraseña"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repasword}
            />
            {touched.repasword && errors.repasword && (
              <div>{errors.repasword}</div>
            )}

            <button type="submit">Registrarse</button>
          </form>
          <p>
            ¿Ya tienes cuenta? &nbsp;
            <Link to="/Ecommerce/login" className="button-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RenderRegister;
