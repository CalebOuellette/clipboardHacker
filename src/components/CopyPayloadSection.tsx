export function CopyPayloadSection({
  type,
  content,
  onContentChange,
}: {
  type: string;
  content: string;
  onContentChange: (content: string) => void;
}) {
  return (
    <div>
      <h5>{type}</h5>
      <textarea
        onChange={(e) => onContentChange(e.currentTarget.value)}
        name={type}
        id=""
        cols="30"
        rows="10"
      >
        {content}
      </textarea>
    </div>
  );
}
