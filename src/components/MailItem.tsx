import { StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import StarIconSolid from "@heroicons/react/24/solid/StarIcon";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import FolderStore from "../stores/FolderStore";
import MailStore from "../stores/MailStore";
import ModalStore from "../stores/ModalStore";
import MailView from "./modals/MailView";

interface MailItemProps {
  id: number;
  folderId: number;
  author: string;
  body: string;
  date: string;
  viewed: boolean;
  favorites: boolean;
}

function MailItem({
  id,
  folderId,
  author,
  body,
  date,
  viewed,
  favorites,
}: MailItemProps) {
  const checked = MailStore.selectedMailIds.includes(id);
  const convertedDate = `${date.slice(0, 5)} в ${date.slice(12, 17)}`;

  function toggleSelectedMailIds(e: ChangeEvent<HTMLInputElement>) {
    MailStore.toggleSelectedMailIds(id);
  }

  function viewMail() {
    MailStore.markViewed(id);

    ModalStore.open(
      <MailView id={id} author={author} body={body} date={date} />
    );
  }

  function removeMail() {
    MailStore.removeMail(id);
  }

  function toggleFavoritesMail() {
    MailStore.toggleFavoritesMail(id);
  }

  function updateSelectedFolderId() {
    FolderStore.updateSelectedFolderId(folderId);
  }

  return (
    <tr
      className={[
        "hover:bg-blue-50 transition-colors",
        !viewed && "font-bold",
      ].join(" ")}
    >
      {FolderStore.selectedFolderId !== 6 ? (
        <td className="w-[5%] p-2 border-t border-b border-gray-300">
          <input
            type="checkbox"
            className=""
            checked={checked}
            onChange={toggleSelectedMailIds}
          />
        </td>
      ) : (
        <td className="w-[15%] p-2 border-t border-b border-gray-300">
          <div
            className="text-blue-500 hover:text-blue-600 transition-colors truncate font-normal cursor-pointer"
            onClick={updateSelectedFolderId}
          >
            {FolderStore.getFolderName(folderId)}
          </div>
        </td>
      )}
      <td className="w-[5%] p-2 border-t border-b border-gray-300">
        <button
          className="text-blue-500 hover:text-blue-600 transition-colors"
          onClick={toggleFavoritesMail}
        >
          {!favorites ? (
            <StarIcon className="w-5 h-5 mt-1" />
          ) : (
            <StarIconSolid className="w-5 h-5 mt-1" />
          )}
        </button>
      </td>
      <td
        className="w-[15%] p-2 border-t border-b border-gray-300 truncate"
        onClick={viewMail}
      >
        {author}
      </td>
      <td
        className="w-[60%] p-2 border-t border-b border-gray-300 truncate"
        onClick={viewMail}
      >
        {body}
      </td>
      <td
        className="w-[15%] p-2 border-t border-b border-gray-300 truncate text-sm"
        onClick={viewMail}
      >
        {convertedDate}
      </td>
      <td className="w-[5%] p-2 border-t border-b border-gray-300 truncate text-sm">
        <button
          className="text-blue-500 hover:text-blue-600 transition-colors"
          onClick={removeMail}
        >
          <TrashIcon className="w-5 h-5 mt-1" />
        </button>
      </td>
    </tr>
  );
}

export default observer(MailItem);
