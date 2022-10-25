<script lang="ts">
import { store } from "../store/index";

export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <h1 class="section-title">Profile</h1>
  <small class="text-gray-500">
    Manage your details and change your password
  </small>

  <section class="my-4 p-5 bg-white w-full">
    <h1 class="section-title mb-4">General</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="w-full">
        <label for="fullname" class="capitalize mb-3">full name</label>
        <input
          id="fullname"
          type="text"
          class="form-input w-full"
          v-model="store.user.fullname"
        />
      </div>

      <div class="w-full">
        <label for="dob" class="capitalize mb-3">date of birth</label>
        <input
          id="dob"
          type="date"
          class="form-input w-full"
          v-model="store.user.dob"
        />
      </div>

      <div class="w-full">
        <label for="gender" class="capitalize mb-3">gender</label>

        <select
          class="form-input w-full"
          id="gender"
          v-model="store.user.gender"
        >
          <option value="male" class="capitalize">male</option>
          <option value="female" class="capitalize">female</option>
        </select>
      </div>
    </div>

    <button class="btn-primary block mx-auto m-3">Save</button>
  </section>
</template>
