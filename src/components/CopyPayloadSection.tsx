import { Accessor } from "solid-js";
import { CopyPayload } from "./CopyPayloadEditor";
export function CopyPayloadSection({
  onContentChange,
  item,
}: {
  item: Accessor<CopyPayload>;
  onContentChange: (content: string) => void;
}) {
  return (
    <div>
      <h5>{item().type}</h5>
      <textarea
        class="text-gray-900"
        onChange={(e) => onContentChange(e.currentTarget.value)}
        name={item().type}
        id=""
        cols="30"
        rows="10"
      >
        {item().content}
      </textarea>
    </div>
  );
}
