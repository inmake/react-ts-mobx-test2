import { FormEvent, useState } from "react";
import FolderStore from "../stores/FolderStore";
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import heroicons from "@heroicons/react/24/outline";
import ModalStore from "../stores/ModalStore";
import FolderRemove from "./modals/FolderRemove";
import { observer } from "mobx-react-lite";

interface FolderProps {
  id: number;
  name: string;
  readonly?: boolean;
  icon?: string;
}

function FolderItem({ id, name, readonly, icon = "TagIcon" }: FolderProps) {
  const [edited, setEdited] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);

  const { ...icons } = heroicons;

  // @ts-ignore
  const Icon = icons[icon];

  function updateFolder(e: FormEvent) {
    e.preventDefault();

    FolderStore.updateFolder(id, newName);

    setEdited(false);
  }

  function removeFolder() {
    ModalStore.open(<FolderRemove id={id} />);
  }

  return (
    <div className="w-full flex items-center justify-between space-x-4">
      {!edited ? (
        <>
          <button
            onClick={() => FolderStore.updateSelectedFolderId(id)}
            className="w-full px-3 py-2 text-left bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg truncate"
          >
            {/*  */}
            <span className="space-x-2">
              <Icon className="w-5 h-5 inline-block -mt-1" />
              <span>{name}</span>
            </span>
          </button>
          {!readonly && (
            <div className="flex space-x-2">
              <button onClick={() => setEdited(true)}>
                <PencilSquareIcon className="h-5 w-5 text-blue-500" />
              </button>
              <button onClick={removeFolder}>
                <TrashIcon className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          )}
        </>
      ) : (
        <form
          className="flex items-center justify-between space-x-4 w-full"
          onSubmit={updateFolder}
        >
          <input
            type="text"
            className="w-full px-3 py-2 pr-1 text-left bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg truncate"
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <button type="submit">
            <CheckCircleIcon className="h-5 w-5 text-blue-500" />
          </button>
        </form>
      )}
    </div>
  );
}

export default observer(FolderItem);
