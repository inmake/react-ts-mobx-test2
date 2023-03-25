import { makeAutoObservable } from "mobx";

class ModalStore {
  modal: JSX.Element | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  open(component: JSX.Element) {
    this.modal = component;
  }

  close() {
    this.modal = null;
  }
}

export default new ModalStore();
