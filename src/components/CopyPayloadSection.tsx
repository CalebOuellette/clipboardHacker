import { CopyPayload } from "./CopyPayloadEditor";
import { formatText, FORMATTERS } from "../lib/ClipboardTypeUtils";
import { Dropdown, DropDownOption } from "./Dropdown";
import { CLIPBOARD_DATA_TYPES } from "../lib/ClipboardTypeUtils";
import { DeleteButton, FormatButton } from "./IconButton";
const TypeOptions = CLIPBOARD_DATA_TYPES.map((type) => ({
  name: type,
  value: type,
}));

// TODO check if format is possible

export function CopyPayloadSection(props: {
  deleteItem: () => void;
  item: CopyPayload;
  content: string;
  onChange: (content: string, type: string) => void;
}) {
  const attemptFormat = () => {
    const { content, type } = props.item;
    console.log("formatting...");
    const formattedText = formatText(content, type);
    props.onChange(formattedText, props.item.type);
  };

  const onTypeChange = (option: DropDownOption) => {
    const { content } = props.item;
    props.onChange(content, option.value);
  };

  return (
    <div class="p-2">
      <div class="flex flex-row gap-2">
        <Dropdown
          options={TypeOptions}
          onOptionSelect={onTypeChange}
          value={
            TypeOptions.find((option) => option.value === props.item.type)!
          }
        />
        {FORMATTERS[props.item.type] && (
          <FormatButton onClick={attemptFormat} />
        )}
        <DeleteButton onClick={props.deleteItem} />
      </div>
      <textarea
        class="text-white mt-2 w-full bg-neutral-800 rounded p-2"
        placeholder={`Start typing you ${props.item.type} here...`}
        onInput={(e) => {
          props.onChange(e.currentTarget.value, props.item.type);
        }}
        name={props.item.type}
        id=""
        rows={25}
        cols={80}
        value={props.content}
      ></textarea>
    </div>
  );
}
