import React, { useState, useEffect, useRef } from "react";

type ScoreCellProps = {
  value: number | null;
  onSave: (value: number | null) => void;
  editable: boolean;
};

const ScoreCell = ({ value, onSave, editable }: ScoreCellProps) => {
  const [temp, setTemp] = useState(value?.toString() ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editable) {
      setTemp(value?.toString() ?? "");
      inputRef.current?.focus();
    }
  }, [editable, value]);

  const save = () => {
    if (temp.trim() !== "") {
      onSave(Number(temp));
    }
  };

  if (!editable) return <span>{value ?? ""}</span>;

  return (
    <input
      ref={inputRef}
      value={temp}
      onChange={(e) => setTemp(e.target.value)}
      onBlur={save}
      onKeyDown={(e) => {
        if (e.key === "Enter") save();
      }}
    />
  );
};

export default ScoreCell;
