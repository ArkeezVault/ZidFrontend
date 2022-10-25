import { reactive } from "vue";

export let store = reactive({
  isMenuDocked: false,
  dockedIcon: "fa6-solid:lock",
  notDockedIcon: "fa6-solid:lock-open",
  user: { fullname: "Ahmed Hassan", dob: "1990-04-01", gender: "male" },
  lockMenu() {
    this.isMenuDocked = !this.isMenuDocked;
  },
  lockMobileMenu(isMobile: boolean = false) {
    if (isMobile) {
      this.isMenuDocked = !this.isMenuDocked;
    }
  },
});
