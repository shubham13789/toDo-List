<template>
  <div class="dashboard-wrap">
    <div class="container">
      <div class="row">
        <p v-if="registration" class="registered">Registration successful!</p>
        <p v-else class="not-registered">Registration Unsucessful!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "ConfirmRegistration",
  setup() {
    const registration = ref(false);
    (() => {
      axios
        .post("https://nextjs-dev.deploy.nl/auth/register", {
          name: localStorage.getItem("username"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
        })
        .then(() => {
          registration.value = true;
        });
    })();

    return {
      registration,
    };
  },
};
</script>

<style lang="scss">
.dashboard-wrap {
  padding: 30px;
  background-color: #f6fdf6;
  text-align: center;
  .registered {
    color: green;
    font-size: 5vw;
  }
  .not-registered {
    color: red;
    font-size: 5vw;
  }
}
</style>
