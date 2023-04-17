import { createSignal, Index } from "solid-js";
import { CopyPayloadSection } from "./CopyPayloadSection";

const CLIPBOARD_DATA_TYPES = [
  "text/plain",
  "text/uri-list",
  "text/csv",
  "text/css",
  "text/html",
  "application/xhtml+xml",
  "image/png",
  "image/jpg, image/jpeg",
  "image/gif",
  "image/svg+xml",
  "application/xml, text/xml",
  "application/javascript",
  "application/json",
  "application/octet-stream",
];

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
    <div class="flex flex-col">
      <div>
        <Index each={copyPayload()}>
          {(item, index) => {
            return (
              <CopyPayloadSection
                data-index={index}
                item={item}
                onContentChange={(newContent) => {
                  const existingItem = copyPayload().find(
                    (entry) => entry.type === item().type
                  );
                  if (!existingItem) return;
                  existingItem.content = newContent;
                  setCopyPayload([...copyPayload()]);
                }}
              />
            );
          }}
        </Index>
      </div>
    </div>
  );
}
