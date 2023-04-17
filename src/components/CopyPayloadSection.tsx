import { Accessor } from "solid-js";
import { CopyPayload } from "./CopyPayloadEditor";
import { formatText } from "../lib/ClipboardTypeUtils";

export function CopyPayloadSection({
  onContentChange,
  item,
}: {
  item: Accessor<CopyPayload>;
  onContentChange: (content: string) => void;
}) {
  const attemptFormat = () => {
    onContentChange(formatText(item().content, item().type));
  };

  return (
    <div>
      <h5>{item().type}</h5>
      <textarea
        class="text-gray-900 w-full"
        onChange={(e) => onContentChange(e.currentTarget.value)}
        name={item().type}
        onBlur={attemptFormat}
        id=""
        rows={25}
        cols={80}
      >
        {item().content}
      </textarea>
    </div>
  );
}
