<template>
  <form class="login" @submit.prevent="onSubmit">
    <h2>Registration</h2>

    <p class="warning" v-show="errorCheck">Something went wrong.</p>

    <input type="text" placeholder="Username" v-model="userUsername" />
    <p class="warning" v-show="userUsernameCheck">
      Please enter a valid username.
    </p>
    <input type="text" placeholder="Email" v-model="userEmail" />
    <p class="warning" v-show="userEmailCheck">
      Please enter a valid email address.
    </p>

    <input type="password" placeholder="Password" v-model="userPassword" />
    <p class="warning" v-show="userPasswordCheck">
      password must be longer than or equal to 8 characters
    </p>
    <input
      type="password"
      placeholder="Confirm Password"
      v-model="userConfirmPassword"
    />
    <p class="warning" v-show="userConfPassCheck">password don't match.</p>
    <input type="submit" value="Log In" @click="submitForm" />
    <p class="warning" v-show="invalidUserCheck">
      Invalid username or password
    </p>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RegistrationPage",
  setup() {
    // const router = useRouter();
    const userUsername = ref("");
    const userEmail = ref("");
    const userPassword = ref("");
    const userConfirmPassword = ref("");
    const userUsernameCheck = ref(false);
    const userEmailCheck = ref(false);
    const userPasswordCheck = ref(false);
    const userConfPassCheck = ref(false);
    const invalidUserCheck = ref(false);
    const errorCheck = ref(false);

    const submitForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      userUsernameCheck.value = userUsername.value.length >= 1 ? false : true;
      userEmailCheck.value = !emailRegex.test(userEmail.value);
      userPasswordCheck.value = userPassword.value.length >= 8 ? false : true;
      userConfPassCheck.value =
        userPassword.value == userConfirmPassword.value ? false : true;

      if (
        (userEmailCheck.value == false) &
        (userPasswordCheck.value == false) &
        (userUsernameCheck.value == false) &
        (userConfPassCheck.value == false)
      ) {
        localStorage.setItem("username", userUsername.value);
        localStorage.setItem("password", userPassword.value);
        localStorage.setItem("email", userEmail.value);
        console.log("http://localhost:8080/confirmed");
      }
    };

    return {
      userEmail,
      userPassword,
      userUsername,
      userConfirmPassword,
      userUsernameCheck,
      userEmailCheck,
      userPasswordCheck,
      userConfPassCheck,
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
    a {
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
