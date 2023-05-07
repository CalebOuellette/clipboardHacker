import { CLIPBOARD_DATA_TYPES } from "../lib/ClipboardTypeUtils";
import { Dropdown } from "./Dropdown";

export type CopyPayload = {
  type: string;
  content: string;
};

const PlusIcon = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.9887 8V0H5.0113V8H2.9887ZM0 5.0113V2.9887H8V5.0113H0Z"
      fill="white"
    />
  </svg>
);

const SectionOptions = CLIPBOARD_DATA_TYPES.map((type) => ({
  name: type,
  value: type,
}));

export default function AddSection({
  copyPayload,
  setCopyPayload,
}: {
  copyPayload: () => CopyPayload[];
  setCopyPayload: (newCopyPayload: CopyPayload[]) => void;
}) {
  const addSection = (option: { name: string; value: string }) => {
    const oldPayload = copyPayload();
    const i = oldPayload.findIndex((entry) => entry.type === option.value);
    if (i === -1) {
      setCopyPayload([...oldPayload, { type: option.value, content: "" }]);
    }
  };

  return (
    <div class="fixed left-1/2 transform translate-x-[-50%] bottom-2">
      <Dropdown
        openUp
        icon={PlusIcon}
        options={SectionOptions}
        onOptionSelect={addSection}
        value={{ name: "Add Section", value: "" }}
      />
    </div>
  );
}
