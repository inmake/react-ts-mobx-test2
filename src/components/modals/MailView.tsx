import React from "react";

interface IMail {
  id: number;
  author: string;
  body: string;
  date: string;
}

function MailView({ id, author, body, date }: IMail) {
  return (
    <div className="space-y-8">
      <p className="text-xl">
        Письмо от <span className="font-bold">{author}</span>
      </p>
      <p>{body}</p>
      <p className="text-sm">{date}</p>
    </div>
  );
}

export default MailView;
