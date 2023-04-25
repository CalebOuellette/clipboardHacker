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
      <div class="text-xl capitalize font-medium">{item().type}</div>
      <textarea
        class="text-white w-full bg-transparent border border-white rounded p-2"
        placeholder={`Start typing you ${item().type} here...`}
        onChange={(e) => onContentChange(e.currentTarget.value)}
        name={item().type}
        id=""
        rows={25}
        cols={80}
      >
        {item().content}
      </textarea>
    </div>
  );
}
