import React, { FormEvent, useState } from "react";
import FolderStore from "../../stores/FolderStore";
import ModalStore from "../../stores/ModalStore";

function FolderCreate({ id }: { id: number }) {
  function removeFolder(e: FormEvent) {
    e.preventDefault();

    FolderStore.removeFolder(id);
    ModalStore.close();
  }

  return (
    <div className="space-y-8">
      <p className="text-xl">Удаление папки</p>
      <form className="flex flex-col space-y-4" onSubmit={removeFolder}>
        <p className="font-bold">Внимание!</p>
        <p className="text-sm">
          Если вы удалите эту папку, то все письма, которые содержатся в ней
          также будут удалены.
        </p>
        <button
          type="submit"
          className="px-3 py-2 text-white bg-red-500 hover:bg-red-600 transition-colors rounded-lg shadow-lg"
        >
          Удалить папку
        </button>
      </form>
    </div>
  );
}

export default FolderCreate;
