<script setup lang="ts">
import { ref, computed } from "vue";

import { Icon } from "@iconify/vue";

interface CardReference {
  visa: string;
  mastercard: string;
  amex: string;
  discover: string;
  jcb: string;
}

const cardReference: CardReference = {
  visa: "fa6-brands:cc-visa",
  mastercard: "fa6-brands:cc-mastercard",
  amex: "fa6-brands:cc-amex",
  discover: "fa6-brands:cc-discover",
  jcb: "fa6-brands:cc-jcb",
};

let card = ref({
  name: "",
  card_number: "",
  expiry: "",
  cvc: "",
});

const cardIcon = computed<string>(() => {
  type ObjectKey = keyof typeof cardReference;

  let brand = GetCardType(card.value.card_number) as ObjectKey;

  return cardReference[brand] ?? "ic:baseline-credit-card";
});

function GetCardType(card_number: string): string {
  // visa
  let re = new RegExp("^4");
  if (card_number.match(re) != null) return "visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  re = new RegExp("^5");
  if (card_number.match(re) != null) return "mastercard";

  // AMEX
  re = new RegExp("^3[47]");
  if (card_number.match(re) != null) return "amex";

  // Discover
  re = new RegExp(
    "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
  );
  if (card_number.match(re) != null) return "discover";

  // Diners
  re = new RegExp("^36");
  if (card_number.match(re) != null) return "diners";

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (card_number.match(re) != null) return "jcb";

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (card_number.match(re) != null) return "visa";

  return "";
}
</script>

<template>
  <h1 class="section-title">payment</h1>
  <small class="text-gray-500 capitalize">pay for goods</small>

  <section class="my-4 p-5 bg-white w-full">
    <h1 class="section-title mb-4">card infromation</h1>

    <div class="w-full">
      <label for="fullname" class="capitalize mb-3">name on card</label>
      <input id="fullname" type="text" class="form-input w-full" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <div class="w-full">
        <label for="card-number" class="capitalize mb-3">card number</label>

        <div class="flex items-center">
          <Icon
            :icon="cardIcon"
            class="mx-2 text-lg text-gray-500"
            :width="32"
          />

          <input
            id="card-number"
            type="text"
            class="form-input w-full"
            v-model="card.card_number"
            v-cardformat:formatCardNumber
          />
        </div>
      </div>

      <div class="w-full">
        <label for="expiry" class="capitalize mb-3">Expiry</label>
        <input
          id="expiry"
          type="text"
          class="form-input w-full"
          v-model="card.expiry"
          v-cardformat:formatCardExpiry
        />
      </div>

      <div class="w-full">
        <label for="expiry" class="capitalize mb-3">CVC</label>
        <input
          id="expiry"
          type="text"
          class="form-input w-full"
          v-model="card.cvc"
          v-cardformat:formatCardCVC
        />
      </div>
    </div>

    <button class="btn-primary block mx-auto m-3">pay now</button>
  </section>

  <section class="my-4 p-5 bg-white w-full">
    <h1 class="section-title mb-4">Testing Cards</h1>

    <p class="mb-3">Visa - 4242 4242 4242 4242</p>
    <p class="mb-3">Mastercard - 5555 5555 5555 4444</p>
    <p class="mb-3">American Express - 3782 822463 10005</p>
    <p class="mb-3">Discover - 6011 1111 1111 1117</p>
    <p class="mb-3">JCB - 3566 0020 2036 0505</p>
  </section>
</template>
