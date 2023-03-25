import React from "react";
import FolderList from "./components/FolderList";
import MailList from "./components/MailList";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <div className="container mx-auto xl:max-w-screen-xl px-4 py-8 flex space-x-8">
        <FolderList></FolderList>
        <MailList></MailList>
      </div>

      <Modal />
    </>
  );
}

export default App;
