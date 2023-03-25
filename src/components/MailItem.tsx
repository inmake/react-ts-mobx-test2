import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import MailStore from "../stores/MailStore";
import ModalStore from "../stores/ModalStore";
import MailView from "./modals/MailView";

interface MailItemProps {
  id: number;
  author: string;
  body: string;
  date: string;
  viewed: boolean;
}

function MailItem({ id, author, body, date, viewed }: MailItemProps) {
  const checked = MailStore.selectedMailIds.includes(id);

  function toggleSelectedMailIds(e: ChangeEvent<HTMLInputElement>) {
    MailStore.toggleSelectedMailIds(id);
  }

  function viewMail() {
    MailStore.markViewed(id);

    ModalStore.open(
      <MailView id={id} author={author} body={body} date={date} />
    );
  }

  return (
    <tr
      className={[
        "hover:bg-blue-50 transition-colors",
        !viewed && "font-bold",
      ].join(" ")}
    >
      <td className="w-1/12 p-2 border-t border-b border-gray-300">
        <input
          type="checkbox"
          className=""
          checked={checked}
          onChange={toggleSelectedMailIds}
        />
      </td>
      <td
        className="w-1/6 p-2 border-t border-b border-gray-300 truncate"
        onClick={viewMail}
      >
        {author}
      </td>
      <td
        className="w-3/6 p-2 border-t border-b border-gray-300 truncate"
        onClick={viewMail}
      >
        {body}
      </td>
      <td
        className="w-1/6 p-2 border-t border-b border-gray-300 truncate text-sm"
        onClick={viewMail}
      >
        {date}
      </td>
    </tr>
  );
}

export default observer(MailItem);
