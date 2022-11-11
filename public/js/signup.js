import axios from "axios";

export const signup = async (name, email, password, passwordConfirm, role) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/login",
      data: {
        name,
        email,
        password,
        passwordConfirm,
        role,
      },
    });

    if (res.data.status === "success") {
      console.log("success!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};
