import axios from "axios";
const API_ENDPOINT = "https://backendcourse.up.railway.app";

// Define una función de manejo de errores personalizada
const handleRequestError = (error) => {
  // Ignora los errores relacionados con la red
  if (error.response) {
    console.error("Error de respuesta:", error.response.status);
  } else if (error.request) {
    console.error("Error de solicitud:", error.request);
  } else {
    console.error("Error:", error.message);
  }
};

const setConfig = () => {
  const tokenString = localStorage.getItem("user");
  if (tokenString) {
    const tokenObj = JSON.parse(tokenString);
    const token = `Bearer ${tokenObj}`;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    return config;
  }
  return null;
};

async function loginUser(email, password) {
  try {
    const body = {
      email,
      password,
    };
    const response = await axios.post(
      `http://localhost:8080/api/users/login`,
      body
    );

    if (response.status === 200) {
      const token = response.data.data;
      window.localStorage.setItem("user", JSON.stringify(token));
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      if (user) return true;
      return false;
    } else {
      throw new Error("Error al iniciar sesión");
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

async function registerUser(registerForm) {
  try {
    const body = {
      first_name: registerForm.first_name,
      last_name: registerForm.last_name,
      email: registerForm.email,
      password: registerForm.password,
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/users/register`,
      body
    );
    console.log("llegado a este punto");

    if (response.status === 201) {
      return true;
    } else {
      throw new Error("Error al iniciar sesión");
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

const getAllUsers = async () => {
  try {
    const config = setConfig();
    if (!config) return null;
    const response = await axios.get(
      `${API_ENDPOINT}/api/users/all-users`,
      config
    );

    if (response.status === 200) {
      const users = response.data.data;
      return users;
    } else {
      return false;
    }
  } catch (error) {
    handleRequestError(error);
    return false;
  }
};

const updateRole = async (email, role) => {
  try {
    const config = setConfig();
    if (!config || !email || !role) return null;

    const body = {
      email,
      role,
    };
    const response = await axios.put(
      `${API_ENDPOINT}/api/users/update-role`,
      body,
      config
    );

    if (response.status === 200) {
      const userUpdated = response.data.data;
      return userUpdated;
    } else {
      return false;
    }
  } catch (error) {
    handleRequestError(error);
    return false;
  }
};

const deleteUser = async (email) => {
  try {
    const config = setConfig();
    if (!config || !email) return null;

    const response = await axios.delete(
      `${API_ENDPOINT}/api/users/delete-user/${email}`,
      config
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    handleRequestError(error);
    return false;
  }
};

const getProducts = async () => {
  try {
    const config = setConfig();
    if (!config) return null;

    const response = await axios.get(`${API_ENDPOINT}/api/products/`, config);
    const products = response.data.data;
    console.log(products);
    return products;
  } catch (error) {
    handleRequestError(error);
    return null;
  }
};

const getCartId = async (config) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/api/users/email`, config);
    const cartId = response.data.data;
    return cartId;
  } catch (error) {
    handleRequestError(error);
  }
};

const addProductToCart = async (pid, quantity) => {
  try {
    const config = setConfig();
    if (!config) return null;
    const cartId = await getCartId(config);

    const response = await axios.put(
      `${API_ENDPOINT}/api/carts/${cartId}/products/${pid}`,
      { quantity },
      config
    );
    const cartData = response.data.data;
    console.log(cartData);
    return cartData;
  } catch (error) {
    handleRequestError(error);
  }
};

const getCartData = async () => {
  try {
    const config = setConfig();
    if (!config) return null;
    const cartId = await getCartId(config);

    const response = await axios.get(
      `${API_ENDPOINT}/api/carts/${cartId}`,
      config
    );
    const cartData = response.data.data.products;
    return cartData;
  } catch (error) {
    handleRequestError(error);
  }
};

const purchaseCart = async () => {
  try {
    const config = setConfig();
    if (!config) return null;
    const cartId = await getCartId(config);

    const response = await axios.post(
      `${API_ENDPOINT}/api/carts/${cartId}/purchase`,
      {},
      config
    );
    const cartData = response.data.data;
    return cartData;
  } catch (error) {
    handleRequestError(error);
    return null;
  }
};

export {
  loginUser,
  registerUser,
  getAllUsers,
  updateRole,
  deleteUser,
  getProducts,
  getCartId,
  addProductToCart,
  getCartData,
  purchaseCart,
};
