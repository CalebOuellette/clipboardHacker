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
                onChange={(newContent, type) => {
                  const oldPayload = copyPayload();
                  oldPayload[index] = {
                    content: newContent,
                    type: type,
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
