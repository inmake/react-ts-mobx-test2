import { ChangeEvent } from "react";
import MailItem from "./MailItem";
import { observer } from "mobx-react-lite";
import MailStore from "../stores/MailStore";
import FolderStore from "../stores/FolderStore";
import { EnvelopeOpenIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function MailList() {
  const searchQuery = MailStore.searchQuery;
  // const searchedMails = MailStore.searchedMails;
  const mails = MailStore.mailsFolder;
  const favoritesMails = MailStore.favoritesMails;
  const selectedMailIds = MailStore.selectedMailIds;
  const folders = FolderStore.folders;
  const folderId = FolderStore.selectedFolderId;
  const folderName = FolderStore.getSelectedFolderName;
  const checkedAll = mails.length === selectedMailIds.length;

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
    MailStore.setSearchQuery(e.target.value);
  }

  function removeSelectedMails() {
    MailStore.removeSelectedMails();
  }

  function markViewedSelectedMails() {
    MailStore.markViewedSelectedMails();
  }

  return (
    <div className="w-4/5 space-y-4">
      <p className="text-xl truncate">{folderName}</p>

      <input
        type="search"
        placeholder="Поиск в почте"
        className="px-3 py-2 border border-gray-300 hover:border-blue-500 transition-colors rounded-lg w-full"
        value={searchQuery}
        onChange={searchMails}
      />

      <div className="flex p-2 space-x-8">
        {mails.length > 0 && (
          <>
            {folderId !== 6 && (
              <input
                type="checkbox"
                className="my-3"
                checked={checkedAll}
                onChange={toggleSelectAll}
              />
            )}
            {MailStore.selectedMailIds.length > 0 && (
              <div className="flex space-x-4 w-full">
                <select
                  defaultValue={0}
                  onChange={updateMailsFolder}
                  className="w-1/4 px-2 py-1.5 rounded-lg border border-gray-300 hover:border-blue-500 transition-colors"
                >
                  <option value="0" disabled>
                    Переместить в папку
                  </option>
                  {folders.map(
                    (folder) =>
                      folder.id !== folderId &&
                      folder.id !== 6 && (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      )
                  )}
                </select>
                <button
                  data-tooltip-id="markViewedSelectedMails"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  onClick={markViewedSelectedMails}
                >
                  <EnvelopeOpenIcon className="w-5 h-5" />
                  <Tooltip
                    id="markViewedSelectedMails"
                    content="Отметить как прочитанное"
                    className="rounded-lg px-2.5 py-1"
                  />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  data-tooltip-id="removeSelectedMails"
                  onClick={removeSelectedMails}
                >
                  <TrashIcon className="w-5 h-5" />
                  <Tooltip
                    id="removeSelectedMails"
                    content="Удалить"
                    className="rounded-lg px-2.5 py-1"
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <table className="table-fixed w-full border-collapse text-left">
        <tbody>
          {folderId !== 6
            ? mails.map((mail) => (
                <MailItem
                  key={mail.id}
                  id={mail.id}
                  folderId={mail.folderId}
                  author={mail.author}
                  body={mail.body}
                  date={mail.date}
                  viewed={mail.viewed}
                  favorites={mail.favorites}
                />
              ))
            : favoritesMails.map((mail) => (
                <MailItem
                  key={mail.id}
                  id={mail.id}
                  folderId={mail.folderId}
                  author={mail.author}
                  body={mail.body}
                  date={mail.date}
                  viewed={mail.viewed}
                  favorites={mail.favorites}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default observer(MailList);
