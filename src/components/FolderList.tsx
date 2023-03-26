import { PlusIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import FolderStore from "../stores/FolderStore";
import ModalStore from "../stores/ModalStore";
import FolderItem from "./FolderItem";
import FolderCreate from "./modals/FolderCreate";

function FolderList() {
  return (
    <div className="w-1/5 flex flex-col space-y-4">
      {FolderStore.folders.map((folder) => (
        <FolderItem
          key={folder.id}
          id={folder.id}
          name={folder.name}
          readonly={folder.readonly}
          icon={folder.icon}
        />
      ))}

      <button
        className="px-2 py-1.5 rounded-lg border text-blue-500 border-blue-500 hover:text-blue-600 hover:border-blue-600 transition-colors flex justify-center items-center space-x-1"
        onClick={() => ModalStore.open(<FolderCreate />)}
      >
        <PlusIcon className="w-5 h-5" />
        <span>Создать папку</span>
      </button>
    </div>
  );
}

export default observer(FolderList);
