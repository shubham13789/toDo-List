<template>
  <form class="login" @submit.prevent="onSubmit">
    <h2>Welcome, User!</h2>
    <p>Please log in</p>

    <p class="warning" v-show="errorCheck">Something went wrong.</p>
    <input type="text" placeholder="Email" v-model="userEmail" />
    <p class="warning" v-show="userEmailCheck">
      Please enter a valid email address.
    </p>

    <input type="password" placeholder="Password" v-model="userPassword" />
    <p class="warning" v-show="userPasswordCheck">
      password must be longer than or equal to 8 characters
    </p>
    <input type="submit" value="Log In" @click="submitForm" />
    <p class="warning" v-show="invalidUserCheck">
      Invalid username or password
    </p>

    <div class="links">
      <router-link to="/register" class="link">Register</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { setAuthHeader } from "../setAuthHeader";
import { useListStore } from "@/stores/listStore";
export default {
  name: "LoginPage",
  setup() {
    const ListData = useListStore();
    const router = useRouter();
    const userEmail = ref("");
    const userPassword = ref("");
    const userEmailCheck = ref(false);
    const userPasswordCheck = ref(false);
    const invalidUserCheck = ref(false);
    const errorCheck = ref(false);

    const submitForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      userEmailCheck.value = !emailRegex.test(userEmail.value);
      userPasswordCheck.value = userPassword.value.length >= 8 ? false : true;
      if (
        (userEmailCheck.value == false) &
        (userPasswordCheck.value == false)
      ) {
        axios
          .post("https://nextjs-dev.deploy.nl/auth/login", {
            email: userEmail.value,
            password: userPassword.value,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.accessToken);
            setAuthHeader(response.data.accessToken);
            router.push({ name: "DashBoard" });
            ListData.isAuthenticated = true;
          })
          .catch((error) => {
            console.log(error.response.data.message);
            if (error.response.data.message == "Unauthorized") {
              invalidUserCheck.value = true;
              errorCheck.value = false;
            } else {
              invalidUserCheck.value = false;
              errorCheck.value = true;
            }
          });
      }
    };

    return {
      userEmail,
      userPassword,
      userEmailCheck,
      userPasswordCheck,
      submitForm,
      invalidUserCheck,
      errorCheck,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin: 20px auto;
  padding: 40px 50px;
  max-width: 350px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #6bb36b;
  -webkit-box-shadow: 38px 59px 75px -28px rgba(107, 179, 107, 0.46);
  -moz-box-shadow: 38px 59px 75px -28px rgba(107, 179, 107, 0.46);
  box-shadow: 38px 59px 75px -28px rgba(107, 179, 107, 0.46);

  input {
    background-color: #e6ffe6;
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin: 10px 0;
    padding: 14px 12px;
    font-size: 16px;
    border-radius: 2px;
    font-family: Raleway, sans-serif;
  }
  input[type="text"],
  input[type="password"] {
    border: 1px solid #c0c0c0;
    transition: 0.1s;
  }
  input[type="text"]:hover {
    border-color: #6bb36b;
    outline: none;
  }
  input[type="submit"] {
    border: none;
    background: #6bb36b;
    color: white;
    font-weight: bold;
    transition: 0.2s;
    margin: 20px 0px;
    &:hover {
      background: #6bb36b;
    }
  }
  .warning {
    color: red;
    font-size: 12px;
    margin-bottom: 0px;
  }

  h2 {
    margin: 20px 0 0;
    color: #6bb36b;
    font-size: 28px;
  }
  p {
    margin-bottom: 40px;
  }
  h2,
  p,
  a {
    text-align: center;
  }
  a {
    text-decoration: none;
    font-size: 0.8em;
    &:visited {
      color: inherit;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  .links {
    display: table;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #c0c0c0;
    margin-bottom: 10px;
    .link {
      color: #6bb36b;
      font-weight: bold;
      display: table-cell;
      padding-top: 10px;
      cursor: pointer;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
}
</style>
