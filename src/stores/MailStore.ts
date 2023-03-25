import { makeAutoObservable } from "mobx";
import FolderStore from "./FolderStore";

interface IMail {
  id: number;
  folderId: number;
  author: string;
  body: string;
  date: string;
}

class MailStore {
  mails: IMail[] = [
    {
      id: 1,
      folderId: 1,
      author: "Bobby Green",
      body: "Magna fermentum iaculis eu non. Etiam dignissim diam quis enim lobortis. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Convallis posuere morbi leo urna molestie. Egestas erat imperdiet sed euismod nisi porta. Elementum sagittis vitae et leo duis ut diam quam. Sed lectus vestibulum mattis ullamcorper velit sed. Luctus accumsan tortor posuere ac ut. Morbi quis commodo odio aenean sed adipiscing diam donec. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.",
      date: new Date().toLocaleString(),
    },
    {
      id: 2,
      folderId: 1,
      author: "Keith Walker",
      body: "Ac tortor vitae purus faucibus ornare suspendisse. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Massa vitae tortor condimentum lacinia quis vel. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Enim lobortis scelerisque fermentum dui faucibus. Nunc non blandit massa enim nec dui. Nulla pellentesque dignissim enim sit amet venenatis urna. Consectetur purus ut faucibus pulvinar elementum integer. Scelerisque eu ultrices vitae auctor eu augue. Lacinia quis vel eros donec ac odio.",
      date: new Date().toLocaleString(),
    },
    {
      id: 3,
      folderId: 2,
      author: "Charles Holland",
      body: "Iaculis nunc sed augue lacus viverra vitae congue. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Malesuada bibendum arcu vitae elementum curabitur. Maecenas volutpat blandit aliquam etiam erat velit. Purus gravida quis blandit turpis cursus in hac habitasse. Tortor consequat id porta nibh. In pellentesque massa placerat duis. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Elit ullamcorper dignissim cras tincidunt.",
      date: new Date().toLocaleString(),
    },
  ];

  selectedMailIds: number[] = [];
  selectedMailId: number | null = null;

  searchQuery = "";
  searchedMails: IMail[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get getMailsFolder() {
    const selectedFolderId = FolderStore.selectedFolderId;
    return this.mails.filter((mail) => mail.folderId === selectedFolderId);
  }

  get getSelectedMailIds() {
    return this.selectedMailIds;
  }

  toggleSelectedMailIds(id: number) {
    if (this.selectedMailIds.includes(id)) {
      this.selectedMailIds = this.selectedMailIds.filter(
        (selectedMailId) => selectedMailId !== id
      );
    } else {
      this.selectedMailIds = [...this.selectedMailIds, id];
    }
  }

  updateMailsFolder(folderId: number) {
    for (const selectedMailId of this.selectedMailIds) {
      this.mails = this.mails.map((mail) =>
        mail.id === selectedMailId ? { ...mail, folderId } : mail
      );
    }

    this.searchQuery = "";
    this.searchedMails = [];
  }

  removeSelectedMailIds() {
    this.selectedMailIds = [];
  }

  toggleSelectAllMailIds() {
    if (this.getMailsFolder.length !== this.selectedMailIds.length) {
      this.selectedMailIds = this.getMailsFolder.map((mail) => mail.id);
    } else {
      this.selectedMailIds = [];
    }
    console.log("this.selectedMailIds", this.selectedMailIds);
  }

  removeMailsFromFolder(folderId: number) {
    this.mails = this.mails.filter((mail) => mail.folderId !== folderId);
  }

  searchMails(query: string) {
    this.searchedMails = this.getMailsFolder.filter(
      (mail) =>
        mail.author.toLocaleLowerCase().includes(query) ||
        mail.body.toLocaleLowerCase().includes(query) ||
        mail.date.includes(query)
    );
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  //   setSearchQuery(query: string) {
  //     this.searchQuery = query;
  //   }

  //   removeSearchedMails() {
  //     this.searchQuery = "";
  //     this.searchedMails = [];
  //   }
}

export default new MailStore();
