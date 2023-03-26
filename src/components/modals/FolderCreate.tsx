import { FormEvent, useRef, useState } from "react";
import FolderStore from "../../stores/FolderStore";
import ModalStore from "../../stores/ModalStore";

function FolderCreate() {
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function addFolder(e: FormEvent) {
    e.preventDefault();

    if (!name.trim().length) {
      setName("");
      inputRef.current?.focus();
      return;
    }

    FolderStore.addFolder(name);
    ModalStore.close();
  }

  return (
    <div className="space-y-8">
      <p className="text-xl">Создание папки</p>
      <form className="flex flex-col space-y-4" onSubmit={addFolder}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Название"
          className="px-3 py-2 border border-gray-300 hover:border-blue-500 transition-colors rounded-lg w-full"
          required
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value.replace(/\s+/g, " "))}
        />
        <button
          type="submit"
          className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg shadow-lg"
        >
          Добавить папку
        </button>
      </form>
    </div>
  );
}

export default FolderCreate;
