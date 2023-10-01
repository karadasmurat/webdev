import React, { useState } from "react";

type SettingsProps = {
  onUpdateTitle: (newTitle: string) => void;
};

export default function Settings({ onUpdateTitle }: SettingsProps) {
  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    onUpdateTitle(newTitle); // Notify App component about the new title
  };

  return (
    <div>
      <h2>Settings</h2>
      <label htmlFor="title">App Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  );
}
