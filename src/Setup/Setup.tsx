import React, { useState } from "react";

type SetupProps = {
  onStart: (names: string[]) => void;
};

function Setup({ onStart }: SetupProps) {
  const [names, setNames] = useState<string[]>([""]);

  const handleCountChange = (newCount: number) => {
    setNames((prev) => {
      if (newCount > prev.length) {
        return [...prev, ...Array(newCount - prev.length).fill("")];
      }
      return prev.slice(0, newCount);
    });
  };

  const isReady = names.length > 0 && names.every((n) => n.trim() !== "");

  return (
    <div className="Setup">
      <h2>Настройка игроков</h2>
      <p>Число игроков:</p>
      <input
        type="number"
        value={names.length}
        onChange={(e) => {
          handleCountChange(+e.target.value);
        }}
      />
      <p>Имена игроков:</p>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            <input
              value={name}
              onChange={(e) => {
                const newNames = [...names];
                newNames[index] = e.target.value;
                setNames(newNames);
              }}
            />
          </li>
        ))}
      </ul>

      <button disabled={!isReady} onClick={() => onStart(names)}>
        Начать игру
      </button>
    </div>
  );
}

export default Setup;
