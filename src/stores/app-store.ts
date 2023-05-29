import { defineStore } from "pinia";

export const useAppStore = defineStore("app-store", {
  state: () => ({
    systemEnable: false as boolean,
    errorSvetoforAll: false as boolean,
    errorSvetofor1: false as boolean,
    errorSvetofor2: false as boolean,
    circuit: null as null | number,
  }),
  actions: {
    changeError1(flag: boolean) {
      this.errorSvetofor1 = flag;
    },
    changeCircuit(item: number | null) {
      this.circuit = item;
    },
    changeError2(flag: boolean) {
      this.errorSvetofor2 = flag;
    },
    changeErrorAll(flag: boolean) {
      this.errorSvetoforAll = flag;
    },
    enableSystem(flag: boolean) {
      this.systemEnable = flag;
    },
  },
});
