import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import MailStore from "../stores/MailStore";
import ModalStore from "../stores/ModalStore";
import MailView from "./modals/MailView";

interface MailItemProps {
  id: number;
  author: string;
  body: string;
  date: string;
}

function MailItem({ id, author, body, date }: MailItemProps) {
  const checked = MailStore.selectedMailIds.includes(id);

  function toggleSelectedMailIds() {
    MailStore.toggleSelectedMailIds(id);
  }

  return (
    <tr
      className="hover:bg-blue-50 transition-colors"
      onDoubleClick={() =>
        ModalStore.open(
          <MailView id={id} author={author} body={body} date={date} />
        )
      }
    >
      <td className="w-1/12 p-2 border-t border-b border-gray-300">
        <input
          type="checkbox"
          className=""
          checked={checked}
          onChange={() => toggleSelectedMailIds()}
        />
      </td>
      <td className="w-1/6 p-2 border-t border-b border-gray-300 truncate">
        {author}
      </td>
      <td className="w-3/6 p-2 border-t border-b border-gray-300 truncate">
        {body}
      </td>
      <td className="w-1/6 p-2 border-t border-b border-gray-300 truncate">
        {date}
      </td>
    </tr>
  );
}

export default observer(MailItem);
