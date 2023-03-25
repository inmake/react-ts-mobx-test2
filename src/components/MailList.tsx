import React, { ChangeEvent, useEffect, useState } from "react";
import MailItem from "./MailItem";
import { observer } from "mobx-react-lite";
import MailStore from "../stores/MailStore";
import FolderStore from "../stores/FolderStore";
import ModalStore from "../stores/ModalStore";
import FolderCreate from "./modals/FolderCreate";
import Modal from "./Modal";

function MailList() {
  const mails = MailStore.getMailsFolder;
  const folders = FolderStore.folders;
  const folderId = FolderStore.selectedFolderId;
  const folderName = FolderStore.getSelectedFolderName;
  const checkedAll =
    MailStore.getMailsFolder.length === MailStore.getSelectedMailIds.length;
  // const searchedMails = MailStore.searchedMails;
  const searchQuery = MailStore.searchQuery;

  function updateMailsFolder(e: ChangeEvent<HTMLSelectElement>) {
    MailStore.updateMailsFolder(+e.target.value);
    MailStore.removeSelectedMailIds();
  }

  function toggleSelectAll() {
    MailStore.toggleSelectAllMailIds();
  }

  function searchMails(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;

    MailStore.setSearchQuery(query);
    MailStore.searchMails(query.toLowerCase());
  }

  return (
    <div className="w-full space-y-4">
      <p className="text-xl">{folderName}</p>
      {MailStore.getMailsFolder.length > 0 && (
        <>
          <input
            type="search"
            placeholder="Поиск в почте"
            className="px-3 py-2 border border-gray-300 hover:border-blue-500 transition-colors rounded-lg w-full"
            value={searchQuery}
            onChange={searchMails}
          />
          <div className="flex p-2 space-x-8">
            {mails.length > 0 && searchQuery === "" && (
              <input
                type="checkbox"
                className="my-3"
                checked={checkedAll}
                onChange={() => toggleSelectAll()}
              />
            )}

            {MailStore.selectedMailIds.length > 0 && (
              <select
                defaultValue={0}
                onChange={updateMailsFolder}
                className="px-2 py-1.5 rounded-lg border border-gray-300 hover:border-blue-500 transition-colors"
              >
                <option value="0" disabled>
                  Переместить в папку
                </option>
                {folders.map(
                  (folder) =>
                    folder.id !== folderId && (
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    )
                )}
              </select>
            )}
          </div>
        </>
      )}

      <table className="table-fixed w-full border-collapse text-left">
        {/* <thead>
        <tr>
          <th>Author</th>
          <th>Body</th>
          <th>Date</th>
        </tr>
      </thead> */}
        <tbody>
          {MailStore.searchedMails.length > 0 || searchQuery !== ""
            ? MailStore.searchedMails.map((mail) => (
                <MailItem
                  key={mail.id}
                  id={mail.id}
                  author={mail.author}
                  body={mail.body}
                  date={mail.date}
                />
              ))
            : mails.map((mail) => (
                <MailItem
                  key={mail.id}
                  id={mail.id}
                  author={mail.author}
                  body={mail.body}
                  date={mail.date}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default observer(MailList);
