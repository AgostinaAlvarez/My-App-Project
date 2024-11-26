import { Button, DatePicker, Input } from "antd";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const SignUpScreen = () => {
  const { setUserData, setLogged, setAuthToken } = useContext(AppContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("auth-token", response.data.token);
      setUserData(response.data.user);
      setAuthToken(response.data.token);
      setLogged(true);

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-bg-col auth-bg-col-left">
        <form onSubmit={handleSubmit(onSubmit)} className="auth-fom">
          <div className="auth-form-field-container">
            <span>Email</span>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "El email es obligatorio" }}
              render={({ field }) => (
                <Input {...field} status={errors.email && "error"} />
              )}
            />
            {errors.email && (
              <span className="auth-error-label" style={{ color: "red" }}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="auth-form-field-container">
            <span>Nombre</span>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "El nombre es obligatorio" }}
              render={({ field }) => (
                <Input {...field} status={errors.name && "error"} />
              )}
            />
            {errors.name && (
              <span className="auth-error-label">{errors.name.message}</span>
            )}
          </div>
          <div className="auth-form-field-container">
            <span>Apellido</span>
            <Controller
              name="lastname"
              control={control}
              defaultValue=""
              rules={{ required: "El apellido es obligatorio" }}
              render={({ field }) => (
                <Input {...field} status={errors.lastname && "error"} />
              )}
            />
            {errors.lastname && (
              <span className="auth-error-label">
                {errors.lastname.message}
              </span>
            )}
          </div>
          <div className="auth-form-field-container">
            <span>Nombre de usuario</span>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "El nombre de usuario es obligatorio" }}
              render={({ field }) => (
                <Input {...field} status={errors.username && "error"} />
              )}
            />
            {errors.username && (
              <span className="auth-error-label">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="auth-form-field-container">
            <span>Contraseña</span>
            {/* Campo de contraseña */}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Contraseña"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  status={errors.password && "error"}
                />
              )}
            />
            {errors.password && (
              <span className="auth-error-label">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="auth-form-field-container">
            <span>Confirmar contraseña</span>
            {/* Campo de confirmación de contraseña */}
            <Controller
              name="confirm_password"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Confirma la contraseña"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  status={errors.confirm_password && "error"}
                />
              )}
            />
            {errors.confirm_password && (
              <span className="auth-error-label">
                {errors.confirm_password.message}
              </span>
            )}
          </div>

          <Button
            className="auth-form-btn "
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Registrarse
          </Button>
          <div>
            <span>Tienes cuenta? </span>
            <NavLink to={"/login"}>Iniciar sesion</NavLink>
          </div>
          {error ? (
            <span className="auth-error-label">
              Error, intentalo de nuevo mas tarde
            </span>
          ) : (
            <></>
          )}
        </form>
      </div>
      <div className="auth-bg-col auth-bg-col-right"></div>
    </div>
  );
};

export default SignUpScreen;
