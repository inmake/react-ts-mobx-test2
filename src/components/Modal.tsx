import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ModalStore from "../stores/ModalStore";

function Modal() {
  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.code === "Escape") {
        ModalStore.close();
      }
    }

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  return (
    <>
      {ModalStore.modal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 overflow-y-auto cursor-pointer"
          onClick={() => ModalStore.close()}
        >
          <div className="p-8 w-full min-h-full relative flex flex-col justify-center items-center">
            <div
              className="p-8 w-[500px] bg-white rounded-lg cursor-default shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {ModalStore.modal}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default observer(Modal);
