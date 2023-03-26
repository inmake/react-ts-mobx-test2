import { ChangeEvent } from "react";
import MailItem from "./MailItem";
import { observer } from "mobx-react-lite";
import MailStore from "../stores/MailStore";
import FolderStore from "../stores/FolderStore";
import { TrashIcon } from "@heroicons/react/24/outline";

function MailList() {
  const searchQuery = MailStore.searchQuery;
  const searchedMails = MailStore.searchedMails;
  const mails = MailStore.mailsFolder;
  const selectedMailIds = MailStore.getSelectedMailIds;
  const folders = FolderStore.folders;
  const folderId = FolderStore.selectedFolderId;
  const folderName = FolderStore.getSelectedFolderName;
  const checkedAll = !searchQuery
    ? mails.length === selectedMailIds.length
    : searchedMails.length === selectedMailIds.length;

  function updateMailsFolder(e: ChangeEvent<HTMLSelectElement>) {
    MailStore.updateMailsFolder(+e.target.value);
    MailStore.clearSelectedMailIds();
  }

  function toggleSelectAll() {
    MailStore.toggleSelectAllMailIds();
  }

  function searchMails(e: ChangeEvent<HTMLInputElement>) {
    MailStore.clearSelectedMailIds();
    MailStore.searchMails(e.target.value);
    MailStore.searchQuery = e.target.value;
  }

  function removeSelectedMails() {
    MailStore.removeSelectedMails();
  }

  return (
    <div className="w-full space-y-4">
      <p className="text-xl">{folderName}</p>
      {MailStore.mailsFolder.length > 0 && (
        <>
          <input
            type="search"
            placeholder="Поиск в почте"
            className="px-3 py-2 border border-gray-300 hover:border-blue-500 transition-colors rounded-lg w-full"
            value={searchQuery}
            onChange={searchMails}
          />
          <div className="flex p-2 space-x-8">
            {((mails.length > 0 && !searchQuery) ||
              searchedMails.length > 0) && (
              <input
                type="checkbox"
                className="my-3"
                checked={checkedAll}
                onChange={toggleSelectAll}
              />
            )}

            {MailStore.selectedMailIds.length > 0 && (
              <div className="flex space-x-4">
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
                <button
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  onClick={removeSelectedMails}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
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
                  viewed={mail.viewed}
                />
              ))
            : mails.map((mail) => (
                <MailItem
                  key={mail.id}
                  id={mail.id}
                  author={mail.author}
                  body={mail.body}
                  date={mail.date}
                  viewed={mail.viewed}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default observer(MailList);
