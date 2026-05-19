<template>
  <div class="header__mail">
    <div class="header__mail-contact">
      <svg
        class="header__mail-logo"
        width="15"
        height="15"
        viewBox="0 0 18 14"
        aria-hidden="true"
      >
        <path
          d="M15.3 0H2.7C1.98392 0 1.29716 0.276562 0.790812 0.768845C0.284464 1.26113 0 1.92881 0 2.625V11.375C0 12.0712 0.284464 12.7389 0.790812 13.2312C1.29716 13.7234 1.98392 14 2.7 14H15.3C16.0161 14 16.7028 13.7234 17.2092 13.2312C17.7155 12.7389 18 12.0712 18 11.375V2.625C18 1.92881 17.7155 1.26113 17.2092 0.768845C16.7028 0.276562 16.0161 0 15.3 0ZM14.931 1.75L9.639 6.895C9.55533 6.97701 9.45579 7.04211 9.34612 7.08653C9.23645 7.13095 9.11881 7.15382 9 7.15382C8.88119 7.15382 8.76355 7.13095 8.65388 7.08653C8.54421 7.04211 8.44467 6.97701 8.361 6.895L3.069 1.75H14.931ZM16.2 11.375C16.2 11.6071 16.1052 11.8296 15.9364 11.9937C15.7676 12.1578 15.5387 12.25 15.3 12.25H2.7C2.46131 12.25 2.23239 12.1578 2.0636 11.9937C1.89482 11.8296 1.8 11.6071 1.8 11.375V2.98375L7.092 8.12875C7.59825 8.62033 8.2845 8.89644 9 8.89644C9.7155 8.89644 10.4017 8.62033 10.908 8.12875L16.2 2.98375V11.375Z"
          fill="currentColor"
        />
      </svg>
      <a :href="link" class="header__mail-text">{{ text }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  link: string
}>()
</script>

<style scoped lang="scss">
.header__mail {
  display: flex;
  align-items: center;
  color: inherit;

  &-contact {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &-text {
    color: inherit;
    font-size: 15px;
    line-height: 18px;
  }

  &-logo {
    display: block;
    flex: 0 0 auto;
    color: inherit;
  }
}
</style>
