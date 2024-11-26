import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Platform,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { apiPost } from "../functions/api";
import { back_router, server_url } from "../utils/routes";
import { public_header } from "../utils/headers";

export default function SignUpScreen({ setHaveAcount }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const password = watch("password");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    Keyboard.dismiss();
    const { confirm_password, ...form_data } = data;
    setError(null);
    setLoading(true);

    const { data: response, error } = await apiPost(
      `${server_url}/${back_router.auth.path}/${back_router.auth.sign_up}`,
      form_data,
      public_header
    );
    if (response) {
      //console.log("respuesta del back");
      //console.log(response);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      console.log("error");
      console.log(error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      setTimeout(() => {
        reset();
        setError(true);
      }, 2050);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={20}
    >
      <LinearGradient
        colors={["#6a11cb", "#2575fc"]}
        style={styles.background}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={"#fff"} />
        </View>
      )}

      <Image source={require("../assets/logo.png")} style={styles.imag} />
      <View style={styles.formContainer}>
        {/*EMAIL*/}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "El email es obligatorio",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputContainer}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorSpan}>*{errors.email.message}</Text>
          )}
        </View>
        {/*NOMBRE*/}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Nombre</Text>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "El nombre es obligatorio",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputContainer}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorSpan}>*{errors.name.message}</Text>
          )}
        </View>
        {/*APELLIDO*/}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Apellido</Text>
          <Controller
            control={control}
            name="lastname"
            rules={{
              required: "El apellido es obligatorio",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputContainer}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.lastname && (
            <Text style={styles.errorSpan}>*{errors.lastname.message}</Text>
          )}
        </View>
        {/*NOMBRE DE USUARIO*/}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "El nombre de usuario es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputContainer}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.username && (
            <Text style={styles.errorSpan}>*{errors.username.message}</Text>
          )}
        </View>
        {/*CONTRA*/}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Contraseña</Text>

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
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputContainer}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry // Esto hace que la contraseña se muestre oculta
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorSpan}>*{errors.password.message}</Text>
          )}
        </View>
        {/*CONFIRMAR CONTRA*/}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>

          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            rules={{
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputContainer}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry // Esto también oculta la confirmación de la contraseña
              />
            )}
          />
          {errors.confirm_password && (
            <Text style={styles.errorSpan}>
              *{errors.confirm_password.message}
            </Text>
          )}
        </View>
        {error ? (
          <Text style={styles.errorSpan}>Error al registrar la cuenta</Text>
        ) : (
          <></>
        )}
        {/*BOTON*/}
        <TouchableOpacity
          style={styles.authBtn}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.authBtnText}>Registrarse</Text>
        </TouchableOpacity>
        {/*SWITCH*/}
        <View style={styles.footerContainer}>
          <Text style={{ color: "#fff" }}>Tienes cuenta ? </Text>
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
            }}
            onPress={() => {
              setHaveAcount(true);
            }}
          >
            <Text style={{ fontSize: 14, color: "#4CC9FE" }}>
              Iniciar sesion
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  imag: {
    height: 150,
    width: 330,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    width: "78%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  label: {
    color: "#fff",
  },
  textInputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  authBtn: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "78%",
    marginTop: 20,
    backgroundColor: "#1677ff",
  },
  authBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  errorSpan: {
    color: "#FF2929",
  },
});
