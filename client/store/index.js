export const state = () => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isError: false,
  errorMessage: "",
  errorType: "",
});

export const mutations = {
  DEFAULT_STATE: function (state) {
    state.user = null;
    state.isAuthenticated = false;
    state.isError = false;
    state.errorMessage = "";
    state.errorType = "";
  },
  SET_TOKEN: function (state, payload) {
    this.$cookies.set('token', payload.access_token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
  },
  AUTH_USER: function (state, payload) {
    state.token = this.$cookies.get("token");
    state.isAuthenticated = true;
    state.user = payload.user;
    state.isError = false;
    state.errorMessage = "";
    state.errorType = "";
  },
  LOGOUT_USER: function () {
    this.$cookies.remove("token");
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isError = false;
    state.errorMessage = "";
    state.errorType = "";
  },
  REGISTER_ERROR: function (state) {
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isError = true;
    state.errorMessage = "Registration failed";
    state.errorType = "REGISTER_ERROR";
  },
  LOGIN_ERROR: function (state) {
    this.$cookies.remove("token");
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isError = true;
    state.errorMessage = "Login failed";
    state.errorType = "LOGIN_ERROR";
  },
  AUTH_ERROR: function (state) {
    this.$cookies.remove("token");
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
    console.log(payload)
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
      .post(`./api/user`, newUser, config)
      .then(res => {
        console.log(res);
        console.log('success');
        commit("DEFAULT_STATE");
        this.$router.push("/login", () => {});
      })
      .catch(() => {
        console.log('err');
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
      grant_type: process.env.GRANT_TYPE,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      username,
      password
    });
    this.$axios
      .post(`./oauth/token`, body, config)
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
        Authorization: `Bearer ${this.$cookies.get("token")}`
      }
    };

    this.$axios
      .get(`./api/user`, config)
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