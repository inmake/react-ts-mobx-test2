import { makeAutoObservable } from "mobx";
import MailStore from "./MailStore";

interface IFolder {
  id: number;
  name: string;
  readonly?: boolean;
  icon?: string;
}

class FolderStore {
  folders: IFolder[] = [
    {
      id: 1,
      name: "Входящие",
      readonly: true,
      icon: "InboxIcon",
    },
    {
      id: 2,
      name: "Исходящие",
      readonly: true,
      icon: "PaperAirplaneIcon",
    },
    {
      id: 3,
      name: "Черновики",
      readonly: true,
      icon: "DocumentIcon",
    },
    {
      id: 4,
      name: "Удаленные",
      readonly: true,
      icon: "TrashIcon",
    },
    {
      id: 5,
      name: "Спам",
      readonly: true,
      icon: "ExclamationCircleIcon",
    },
    {
      id: 6,
      name: "Избранное",
      readonly: true,
      icon: "StarIcon",
    },
  ];

  selectedFolderId = this.folders[0].id;

  constructor() {
    makeAutoObservable(this);
  }

  get getSelectedFolderName() {
    return this.folders.find((folder) => folder.id === this.selectedFolderId)
      ?.name;
  }

  updateSelectedFolderId(id: number) {
    this.selectedFolderId = id;
    MailStore.clearSelectedMailIds();
    MailStore.clearSearchQuery();
  }

  addFolder(name: string) {
    this.folders = [
      ...this.folders,
      { id: Math.floor(Date.now() / 1000), name },
    ];
  }

  updateFolder(id: number, name: string) {
    this.folders = this.folders.map((folder) =>
      folder.id === id ? { ...folder, name } : folder
    );
  }

  removeFolder(id: number) {
    MailStore.removeAllMailsFromFolder(id);
    this.folders = this.folders.filter((folder) => folder.id !== id);
  }

  getFolderName(id: number) {
    return this.folders.find((folder) => folder.id == id)?.name;
  }
}

export default new FolderStore();
