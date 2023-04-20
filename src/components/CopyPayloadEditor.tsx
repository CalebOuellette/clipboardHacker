import { Index } from "solid-js";
import { CopyPayloadSection } from "./CopyPayloadSection";
import { CLIPBOARD_DATA_TYPES } from "../lib/ClipboardTypeUtils";

export type CopyPayload = {
  type: string;
  content: string;
};

export default function CopyPayloadEditor({
  copyPayload,
  setCopyPayload,
}: {
  copyPayload: () => CopyPayload[];
  setCopyPayload: (newCopyPayload: CopyPayload[]) => void;
}) {
  return (
    <div class="flex flex-col pt-3">
      <div>
        <Index each={copyPayload()}>
          {(item, index) => {
            return (
              <CopyPayloadSection
                data-index={index}
                item={item}
                onContentChange={(newContent) => {
                  const oldPayload = copyPayload();
                  const i = oldPayload.findIndex(
                    (entry) => entry.type === item().type
                  );
                  if (i === -1) return;
                  const oldContent = oldPayload[i];
                  oldPayload[i] = {
                    content: newContent,
                    type: oldContent.type,
                  };
                  setCopyPayload([...oldPayload]);
                }}
              />
            );
          }}
        </Index>
      </div>
      <div>
        <div>Add Sections</div>
        <div class="gap-3 flex flex-wrap">
          {CLIPBOARD_DATA_TYPES.filter(
            (type) =>
              !copyPayload()
                .map((p) => p.type)
                .includes(type)
          ).map((type) => {
            return (
              <button
                class="bg-neutral-800 hover:bg-neutral-700 text-slate-50 font-bold py-2 px-4 rounded"
                onClick={() => {
                  const oldPayload = copyPayload();
                  const i = oldPayload.findIndex(
                    (entry) => entry.type === type
                  );
                  if (i === -1) {
                    setCopyPayload([...oldPayload, { type, content: "" }]);
                  }
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
