import { makeAutoObservable } from "mobx";
import FolderStore from "./FolderStore";

interface IMail {
  id: number;
  folderId: number;
  author: string;
  body: string;
  date: string;
  viewed: boolean;
  favorites: boolean;
}

class MailStore {
  mails: IMail[] = [
    {
      id: 1,
      folderId: 1,
      author: "Bobby Green",
      body: "Magna fermentum iaculis eu non. Etiam dignissim diam quis enim lobortis. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Convallis posuere morbi leo urna molestie. Egestas erat imperdiet sed euismod nisi porta. Elementum sagittis vitae et leo duis ut diam quam. Sed lectus vestibulum mattis ullamcorper velit sed. Luctus accumsan tortor posuere ac ut. Morbi quis commodo odio aenean sed adipiscing diam donec. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.",
      date: new Date().toLocaleString(),
      viewed: false,
      favorites: false,
    },
    {
      id: 2,
      folderId: 1,
      author: "Keith Walker",
      body: "Ac tortor vitae purus faucibus ornare suspendisse. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Massa vitae tortor condimentum lacinia quis vel. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Enim lobortis scelerisque fermentum dui faucibus. Nunc non blandit massa enim nec dui. Nulla pellentesque dignissim enim sit amet venenatis urna. Consectetur purus ut faucibus pulvinar elementum integer. Scelerisque eu ultrices vitae auctor eu augue. Lacinia quis vel eros donec ac odio.",
      date: new Date().toLocaleString(),
      viewed: false,
      favorites: true,
    },

    {
      id: 3,
      folderId: 2,
      author: "Charles Holland",
      body: "Iaculis nunc sed augue lacus viverra vitae congue. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Malesuada bibendum arcu vitae elementum curabitur. Maecenas volutpat blandit aliquam etiam erat velit. Purus gravida quis blandit turpis cursus in hac habitasse. Tortor consequat id porta nibh. In pellentesque massa placerat duis. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Elit ullamcorper dignissim cras tincidunt.",
      date: new Date().toLocaleString(),
      viewed: false,
      favorites: false,
    },
  ];

  selectedMailIds: number[] = [];
  selectedMailId: number | null = null;
  searchQuery = "";

  constructor() {
    makeAutoObservable(this);
  }

  get mailsFolder() {
    const selectedFolderId = FolderStore.selectedFolderId;

    if (!this.searchQuery) {
      return this.mails.filter((mail) => mail.folderId === selectedFolderId);
    } else {
      return this.mails.filter(
        (mail) =>
          (mail.folderId === selectedFolderId || selectedFolderId === 6) &&
          (mail.author.toLowerCase().includes(this.searchQuery) ||
            mail.body.toLowerCase().includes(this.searchQuery) ||
            mail.date.toLowerCase().includes(this.searchQuery))
      );
    }
  }

  setSearchQuery(value: string) {
    this.searchQuery = value;
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

    this.clearSearchQuery();
  }

  clearSelectedMailIds() {
    this.selectedMailIds = [];
  }

  clearSearchQuery() {
    this.searchQuery = "";
  }

  toggleSelectAllMailIds() {
    if (this.mailsFolder.length !== this.selectedMailIds.length) {
      this.selectedMailIds = this.mailsFolder.map((mail) => mail.id);
    } else {
      this.clearSelectedMailIds();
    }
  }

  removeMail(id: number) {
    this.mails = this.mails.filter((mail) => mail.id !== id);
  }

  removeSelectedMails() {
    for (const selectedMailId of this.selectedMailIds) {
      this.mails = this.mails.filter((mail) => mail.id !== selectedMailId);
    }

    this.clearSelectedMailIds();
    this.clearSearchQuery();
  }

  removeAllMailsFromFolder(folderId: number) {
    this.mails = this.mails.filter((mail) => mail.folderId !== folderId);
  }

  searchMails(query: string) {
    this.searchQuery = query;
  }

  markViewed(id: number) {
    this.mails = this.mails.map((mail) =>
      mail.id === id ? { ...mail, viewed: true } : mail
    );
  }

  markViewedSelectedMails() {
    for (const selectedMailId of this.selectedMailIds) {
      this.mails = this.mails.map((mail) =>
        mail.id === selectedMailId ? { ...mail, viewed: true } : mail
      );
    }

    this.clearSelectedMailIds();
    this.clearSearchQuery();
  }

  toggleFavoritesMail(id: number) {
    this.mails = this.mails.map((mail) =>
      mail.id === id ? { ...mail, favorites: !mail.favorites } : mail
    );
  }

  get favoritesMails() {
    if (!this.searchQuery) {
      return this.mails.filter((mail) => mail.favorites);
    } else {
      return this.mails.filter(
        (mail) =>
          mail.favorites &&
          (mail.author.toLowerCase().includes(this.searchQuery) ||
            mail.body.toLowerCase().includes(this.searchQuery) ||
            mail.date.toLowerCase().includes(this.searchQuery))
      );
    }
  }
}

export default new MailStore();
