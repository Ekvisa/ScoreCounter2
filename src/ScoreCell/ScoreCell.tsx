import { useState } from "react";

type ScoreCellProps = {
  value: number | null;
  editable: boolean;
  onSave: (value: number | null) => void;
};

function ScoreCell({ value, editable, onSave }: ScoreCellProps) {
  const [draft, setDraft] = useState(value?.toString() ?? "");

  if (!editable) {
    return <span>{value}</span>;
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      value={draft}
      onChange={(e) => {
        const v = e.target.value;
        setDraft(v);
        const parsed = Number(v);
        if (!Number.isNaN(parsed)) {
          onSave(parsed);
        }
      }}
    />
  );
}

export default ScoreCell;
