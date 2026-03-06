type ScoreCellProps = {
  value: number | null;
  editable: boolean;
  onSave: (value: number | null) => void;
};

function ScoreCell({ value, editable, onSave }: ScoreCellProps) {
  if (!editable) {
    return <span>{value}</span>;
  }

  return (
    <input
      type="number"
      value={value ?? ""}
      onChange={(e) => {
        const v = Number(e.target.value);
        onSave(v);
      }}
    />
  );
}

export default ScoreCell;
