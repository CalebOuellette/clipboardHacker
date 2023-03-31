import { Accessor } from "solid-js";
import { CopyPayload } from "./CopyPaster";
export function CopyPayloadSection({
  onContentChange,
  item,
  onBlur,
  onFocus,
}: {
  item: Accessor<CopyPayload>;
  onContentChange: (content: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <h5>{item().type}</h5>
      <textarea
        onFocus={onFocus}
        onBlur={onBlur}
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
