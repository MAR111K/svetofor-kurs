<template>
  <div class="svetofor-wrapper">
    <p>Номер: {{ index }}</p>
    <div class="svetofor">
      <div class="svetofor--red" :class="{ active: status === 'red' }"></div>
      <div class="svetofor--yellow" :class="{ active: status === 'yellow' }"></div>
      <div class="svetofor--green" :class="{ active: status === 'green' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAppStore } from "../stores/app-store";

const status = ref("none");
const appStore = useAppStore();
var svetInterval: number = 0;
var timeouts: Array<number> = [];

var errorInterval: number = 0;
var errorTimeouts: Array<number> = [];

const props = defineProps<{ invert?: boolean; index: number; error: number }>();

watch(
  () => appStore.systemEnable,
  () => {
    if (appStore.systemEnable) {
      startWork();
    } else {
      disableSystem();
    }
  }
);

watch(
  () => appStore.circuit,
  () => {
    if (appStore.circuit === 1 && [1, 2, 3, 4].includes(props.index)) {
      disableSystem();
    } else if (appStore.circuit === 2 && [5, 6, 7, 8].includes(props.index)) {
      disableSystem();
    } else if (appStore.circuit === null && [1, 2, 3, 4].includes(props.index)) {
      startWork();
    } else if (appStore.circuit === null && [5, 6, 7, 8].includes(props.index)) {
      startWork();
    }
  }
);

const disableSystem = () => {
  clearInterval(svetInterval);
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  clearInterval(errorInterval);
  for (var i = 0; i < errorTimeouts.length; i++) {
    clearTimeout(errorTimeouts[i]);
  }
  status.value = "none";
};

const startWork = () => {
  timeouts.push(
    setTimeout(
      () => (props.invert ? (status.value = "green") : (status.value = "red")),
      1000
    )
  );
  timeouts.push(setTimeout(() => (status.value = "yellow"), 6000));
  timeouts.push(setTimeout(() => (status.value = "none"), 7000));
  timeouts.push(setTimeout(() => (status.value = "yellow"), 8000));
  timeouts.push(
    setTimeout(
      () => (props.invert ? (status.value = "red") : (status.value = "green")),
      9000
    )
  );
  timeouts.push(setTimeout(() => (status.value = "yellow"), 14000));
  timeouts.push(setTimeout(() => (status.value = "none"), 15000));
  timeouts.push(setTimeout(() => (status.value = "yellow"), 16000));
  timeouts.push(
    setTimeout(
      () => (props.invert ? (status.value = "green") : (status.value = "red")),
      17000
    )
  );

  svetInterval = setInterval(() => {
    timeouts.push(
      setTimeout(
        () => (props.invert ? (status.value = "green") : (status.value = "red")),
        1000
      )
    );
    timeouts.push(setTimeout(() => (status.value = "yellow"), 6000));
    timeouts.push(setTimeout(() => (status.value = "none"), 7000));
    timeouts.push(setTimeout(() => (status.value = "yellow"), 8000));
    timeouts.push(
      setTimeout(
        () => (props.invert ? (status.value = "red") : (status.value = "green")),
        9000
      )
    );
    timeouts.push(setTimeout(() => (status.value = "yellow"), 14000));
    timeouts.push(setTimeout(() => (status.value = "none"), 15000));
    timeouts.push(setTimeout(() => (status.value = "yellow"), 16000));
    timeouts.push(
      setTimeout(
        () => (props.invert ? (status.value = "green") : (status.value = "red")),
        17000
      )
    );
  }, 17000);
};

watch(
  () => appStore.errorSvetofor1,
  () => {
    if (appStore.errorSvetofor1) {
      if ([1, 2, 3, 4].includes(props.index)) {
        clearInterval(svetInterval);
        for (var i = 0; i < timeouts.length; i++) {
          clearTimeout(timeouts[i]);
        }

        errorTimeouts.push(setTimeout(() => (status.value = "yellow"), 1000));
        errorTimeouts.push(setTimeout(() => (status.value = "none"), 2000));
        errorTimeouts.push(setTimeout(() => (status.value = "yellow"), 3000));

        errorInterval = setInterval(() => {
          errorTimeouts.push(setTimeout(() => (status.value = "yellow"), 1000));
          errorTimeouts.push(setTimeout(() => (status.value = "none"), 2000));
          errorTimeouts.push(setTimeout(() => (status.value = "yellow"), 3000));
        }, 3000);
      }
    }
  }
);

watch(
  () => appStore.errorSvetofor1,
  () => {
    if (appStore.errorSvetofor1 === false && [1, 2, 3, 4].includes(props.index)) {
      clearInterval(svetInterval);
      for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
      clearInterval(errorInterval);
      for (var i = 0; i < errorTimeouts.length; i++) {
        clearTimeout(errorTimeouts[i]);
      }
      startWork();
    }
  }
);

watch(
  () => appStore.errorSvetofor2,
  () => {
    if (appStore.errorSvetofor2 === false && [5, 6, 7, 8].includes(props.index)) {
      clearInterval(svetInterval);
      for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
      clearInterval(errorInterval);
      for (var i = 0; i < errorTimeouts.length; i++) {
        clearTimeout(errorTimeouts[i]);
      }
      startWork();
    }
  }
);

watch(
  () => appStore.errorSvetofor2,
  () => {
    if (appStore.errorSvetofor2) {
      if ([5, 6, 7, 8].includes(props.index)) {
        clearInterval(svetInterval);
        for (var i = 0; i < timeouts.length; i++) {
          clearTimeout(timeouts[i]);
        }

        errorTimeouts.push(setTimeout(() => (status.value = "yellow"), 1000));
        errorTimeouts.push(setTimeout(() => (status.value = "none"), 2000));
        errorTimeouts.push(setTimeout(() => (status.value = "yellow"), 3000));

        errorInterval = setInterval(() => {
          errorTimeouts.push(setTimeout(() => (status.value = "yellow"), 1000));
          errorTimeouts.push(setTimeout(() => (status.value = "none"), 2000));
          errorTimeouts.push(setTimeout(() => (status.value = "yellow"), 3000));
        }, 3000);
      }
    }
  }
);

watch(
  () => appStore.errorSvetoforAll,
  () => {
    if (appStore.errorSvetoforAll) {
      disableSystem();
    } else {
      startWork();
    }
  }
);
</script>

<style scoped lang="scss">
.active {
  opacity: 1 !important;
}
.svetofor {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #222222;
  width: max-content;
  border-radius: 8px;

  &-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  &--red {
    opacity: 0.2;
    width: 30px;
    height: 30px;
    background-color: #ff0000;
    border-radius: 50%;
  }
  &--yellow {
    opacity: 0.2;
    width: 30px;
    height: 30px;
    background-color: #fff000;
    border-radius: 50%;
  }
  &--green {
    opacity: 0.2;
    width: 30px;
    height: 30px;
    background-color: #7cfc00;
    border-radius: 50%;
  }
}
</style>
