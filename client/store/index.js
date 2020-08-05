export const state = () => ({
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
  isError: false,
  errorMessage: "",
  errorType: "",
});

export const mutations = {
  DEFAULT_STATE: state => {
    state.user = null;
    state.isAuthenticated = false;
    state.isError = false;
    state.errorMessage = "";
    state.errorType = "";
  },
  SET_TOKEN: (state, payload) => {
    localStorage.setItem("token", payload.access_token);
  },
  AUTH_USER: (state, payload) => {
    state.token = localStorage.getItem("token");
    state.isAuthenticated = true;
    state.user = payload.user;
    state.isError = false;
    state.errorMessage = "";
    state.errorType = "";
  },
  LOGOUT_USER: state => {
    localStorage.removeItem("token");
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isError = false;
    state.errorMessage = "";
    state.errorType = "";
  },
  REGISTER_ERROR: state => {
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isError = true;
    state.errorMessage = "Registration failed";
    state.errorType = "REGISTER_ERROR";
  },
  LOGIN_ERROR: state => {
    localStorage.removeItem("token");
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isError = true;
    state.errorMessage = "Login failed";
    state.errorType = "LOGIN_ERROR";
  },
  AUTH_ERROR: state => {
    localStorage.removeItem("token");
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isError = true;
    state.errorMessage = "";
    state.errorType = "AUTH_ERROR";
  }
};

export const actions = {
  registerUser: function ({ commit }, payload) {
    const { name, username, password } = payload;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const newUser = JSON.stringify({
      name,
      username,
      password
    });
    this.$axios
      .post(`http://localhost:8000/api/user`, newUser, config)
      .then(res => {
        console.log(res);
        commit("DEFAULT_STATE");
        router.push("/login", () => {});
      })
      .catch(() => {
        commit("REGISTER_ERROR");
      });
  },
  registerUserError: function ({ commit }) {
    commit("REGISTER_ERROR");
  },
  loginUser: function ({ commit, dispatch }, payload) {
    const { username, password } = payload;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({
      grant_type: "password",
      client_id: 2,
      client_secret: "jbBMtwBc8SUHJCx6Zf90YgVxxG69H5cxMriLbKd8",
      username,
      password
    });
    this.$axios
      .post(`http://localhost:8000/oauth/token`, body, config)
      .then(res => {
        commit("SET_TOKEN", res.data);
        dispatch("authenticateUser");
      })
      .catch(() => {
        commit("LOGIN_ERROR");
      });
  },
  authenticateUser: function ({ commit }) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    this.$axios
      .get(`http://localhost:8000/api/user`, config)
      .then(res => {
        const payload = {
          user: res.data
        };
        commit("AUTH_USER", payload);
        this.$router.push("/", () => {});
      })
      .catch(() => {
        commit("AUTH_ERROR")
      });
  },
  logoutUser: function ({ commit }) {
    commit("LOGOUT_USER");
    this.$router.push("/login", () => {});
  }
};