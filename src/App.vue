<template>
  <div class="wrapper">
    <div class="wrapper-control">
      <h1>Маннанов Марат Фаилевич ИВТ-324</h1>
      <div class="control-panel">
        <div class="control-panel-buttons">
          <p>Панель управления</p>
          <div class="control-panel__content">
            <n-switch v-model:value="appStore.systemEnable">
              <template #checked> ВКЛ </template>
              <template #unchecked> ОТКЛ </template></n-switch
            >
            <NButton
              v-if="
                appStore.systemEnable && !appStore.errorSvetoforAll && !appStore.circuit
              "
              :type="errorId.id !== 0 ? 'error' : 'primary'"
              @click="randomErrorTime"
              :disabled="errorId.id !== 0"
              >Авария</NButton
            >
            <NButton
              v-if="
                appStore.systemEnable && !appStore.errorSvetoforAll && errorId.id === 0
              "
              :type="appStore.circuit !== null ? 'error' : 'primary'"
              @click="startCircuit"
            >
              {{
                appStore.circuit !== null ? "Устранить" : "Короткое замыкание"
              }}</NButton
            >
            <NButton
              v-if="appStore.systemEnable && errorId.id === 0 && !appStore.circuit"
              @click="startError"
              :type="appStore.errorSvetoforAll ? 'error' : 'primary'"
              >{{
                appStore.errorSvetoforAll
                  ? "Восстановить работу"
                  : "Отключить электричество"
              }}</NButton
            >
          </div>
        </div>
        <div class="control-panel__info">
          <div class="control-panel__info__item">
            <div class="machine--enable"></div>
            <p>Датчик исправен</p>
          </div>
          <div class="control-panel__info__item">
            <div class="machine--disable-not-anim"></div>
            <p>Датчик не исправен</p>
          </div>
        </div>
      </div>
    </div>
    <div class="road" v-show="appStore.systemEnable">
      <div class="road-inner">
        <div class="crossroad-wrapper">
          <p>
            Перекресток 1
            <span class="span__title--error">
              {{
                [1, 2, 3, 4].includes(errorId.id) || appStore.errorSvetoforAll
                  ? "Неисправен"
                  : ""
              }}
            </span>
          </p>

          <div class="crossroad">
            <Svetofor invert :index="1" :error="errorId.id" />
            <Svetofor invert :index="2" :error="errorId.id" />
            <Svetofor :index="3" :error="errorId.id" />
            <Svetofor :index="4" :error="errorId.id" />
          </div>
        </div>
        <div class="road-border"></div>
        <div class="crossroad-wrapper">
          <p>
            Перекресток 2
            <span class="span__title--error">
              {{
                [5, 6, 7, 8].includes(errorId.id) || appStore.errorSvetoforAll
                  ? "Неисправен"
                  : ""
              }}
            </span>
          </p>

          <div class="crossroad">
            <Svetofor invert :index="5" :error="errorId.id" />
            <Svetofor invert :index="6" :error="errorId.id" />
            <Svetofor :index="7" :error="errorId.id" />
            <Svetofor :index="8" :error="errorId.id" />
          </div>
        </div>
      </div>

      <div>
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th><span class="span__title">Номер</span></th>
              <th><span class="span__title">Датчик времени</span></th>
              <th>
                <span class="span__title"> Датчик работоспособности ламп</span>
              </th>
              <th style="width: 50px; white-space: break-spaces">
                <span class="span__title"
                  >Датчик работоспособности реле переключения</span
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in machinesArray">
              <td>
                <span class="span__title">{{ item.id }}</span>
              </td>
              <td>
                <div
                  @click="repairMachine(item.id, 'time')"
                  :class="{
                    'machine--enable': item.time,
                    'machine--disable': !item.time,
                  }"
                ></div>
              </td>
              <td>
                <div
                  @click="repairMachine(item.id, 'light')"
                  :class="{
                    'machine--enable': item.light,
                    'machine--disable': !item.light,
                  }"
                ></div>
              </td>

              <td>
                <div
                  @click="repairMachine(item.id, 'rele')"
                  :class="{
                    'machine--enable': item.rele,
                    'machine--disable': !item.rele,
                  }"
                ></div>
              </td>
            </tr>
          </tbody>
        </n-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Svetofor from "./components/Svetofor.vue";
import { NButton, NSwitch, NTable } from "naive-ui";
import { useAppStore } from "./stores/app-store";

const appStore = useAppStore();
const errorId = ref<MachineError>({
  id: 0,
  machine: "",
});

interface MachineError {
  id: number;
  machine: string;
}

interface Machine {
  id: number;
  time: boolean;
  light: boolean;
  rele: boolean;
}

const machinesArray = ref<Array<Machine>>([
  {
    id: 1,
    time: true,
    light: true,
    rele: true,
  },
  {
    id: 2,
    time: true,
    light: true,
    rele: true,
  },
  {
    id: 3,
    time: true,
    light: true,
    rele: true,
  },
  {
    id: 4,
    time: true,
    light: true,
    rele: true,
  },
  {
    id: 5,
    time: true,
    light: true,
    rele: true,
  },
  {
    id: 6,
    time: true,
    light: true,
    rele: true,
  },
  {
    id: 7,
    time: true,
    light: true,
    rele: true,
  },
  {
    id: 8,
    time: true,
    light: true,
    rele: true,
  },
]);

const startError = () => {
  if (!appStore.errorSvetoforAll) {
    alert(
      "В районе было отключено электричество. Светофоры на перекрестках отключены. Экстренная служба уже вызвана"
    );
  }
  appStore.changeErrorAll(!appStore.errorSvetoforAll);
};

const randomErrorTime = () => {
  errorId.value.id = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
  switch (Math.floor(Math.random() * (3 - 1 + 1)) + 1) {
    case 1:
      errorId.value.machine = "time";
      break;
    case 2:
      errorId.value.machine = "light";
      break;
    case 3:
      errorId.value.machine = "rele";
      break;
  }
  alert(
    `Датчик ${
      errorId.value.machine === "time"
        ? "времени"
        : errorId.value.machine === "light"
        ? "работоспоcобности ламп"
        : "реле"
    } на светофоре ${errorId.value.id} неисправен`
  );

  machinesArray.value = machinesArray.value.map((elem, index) =>
    index === errorId.value.id - 1 ? { ...elem, [errorId.value?.machine]: false } : elem
  );
  if ([1, 2, 3, 4].includes(errorId.value.id)) {
    appStore.changeError1(true);
  } else if ([5, 6, 7, 8].includes(errorId.value.id)) {
    appStore.changeError2(true);
  }
};

const repairMachine = (id: number, machine: string) => {
  if ([1, 2, 3, 4].includes(id)) {
    appStore.changeError1(false);
  } else if ([5, 6, 7, 8].includes(id)) {
    appStore.changeError2(false);
  }
  alert(
    `Датчик ${
      errorId.value.machine === "time"
        ? "времени"
        : errorId.value.machine === "light"
        ? "работоспоcобности ламп"
        : "реле"
    } на светофоре ${errorId.value.id} починен`
  );
  machinesArray.value = machinesArray.value.map((elem, index) =>
    index === id - 1 ? { ...elem, [machine]: true } : elem
  );
  errorId.value = {
    id: 0,
    machine: "",
  };
};

const startCircuit = () => {
  if (appStore.circuit === null) {
    let index = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    appStore.changeCircuit(index);
    alert(
      `Произошло короткое замыкание на одном из светофоров на перекрестке номер ${index}`
    );
  } else {
    alert("Короткое замыкание было устранено");
    appStore.changeCircuit(null);
  }
};
</script>

<style lang="scss">
.wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  &-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border: 1px solid #1b1b1b;
  border-radius: 20px;

  &-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__content {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  &__info__item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
.road {
  display: flex;
  justify-content: space-between;
  &-border {
    width: 50px;
    border: 4px solid #1f1f1f;
  }

  &-inner {
    padding: 20px;
    border: 2px solid #1f1f1f;
    display: flex;
    gap: 60px;
    justify-content: space-between;
  }
}
.crossroad {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 80px;

  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.machine--enable {
  width: 60px;
  height: 20px;
  background-color: #7cfc00;
  margin: 0 auto;
}

.machine--disable {
  cursor: pointer;
  width: 60px;
  height: 20px;
  background-color: #ff0000;
  animation: blinker 1s linear infinite;
  margin: 0 auto;
}

.machine--disable-not-anim {
  width: 60px;
  height: 20px;
  background-color: #ff0000;
  margin: 0 auto;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

p {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: #1f1f1f;
}

.span__title {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: #1f1f1f;

  &--error {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #ff0000;
  }
}
</style>
