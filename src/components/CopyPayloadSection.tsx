import { Accessor } from "solid-js";
import { CopyPayload } from "./CopyPayloadEditor";
import { formatText } from "../lib/ClipboardTypeUtils";
import { Dropdown, DropDownOption } from "./Dropdown";
import { CLIPBOARD_DATA_TYPES } from "../lib/ClipboardTypeUtils";

const TypeOptions = CLIPBOARD_DATA_TYPES.map((type) => ({
  name: type,
  value: type,
}));

export function CopyPayloadSection({
  onChange,
  item,
}: {
  item: Accessor<CopyPayload>;
  onChange: (content: string, type: string) => void;
}) {
  const attemptFormat = () => {
    const { content, type } = item();
    onChange(formatText(content, type), type);
  };

  const onTypeChange = (option: DropDownOption) => {
    const { content, type } = item();
    onChange(content, option.value);
  };

  return (
    <div>
      <div class="text-xl capitalize font-medium">{item().type}</div>
      <Dropdown
        options={TypeOptions}
        onOptionSelect={onTypeChange}
        value={TypeOptions.find((option) => option.value === item().type)!}
      />
      <textarea
        class="text-white w-full bg-transparent border border-white rounded p-2"
        placeholder={`Start typing you ${item().type} here...`}
        onChange={(e) => onChange(e.currentTarget.value, item().type)}
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
