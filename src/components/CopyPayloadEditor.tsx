import { Index } from "solid-js";
import { CopyPayloadSection } from "./CopyPayloadSection";

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
    </div>
  );
}
