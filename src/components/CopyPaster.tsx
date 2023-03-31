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

export default function CopyPaster() {
  const [copyPayload, setCopyPayload] = createSignal<CopyPayload[]>([]);
  const [enableInterceptors, setEnableInterceptors] =
    createSignal<boolean>(true);

  window.addEventListener("paste", (event) => {
    if (enableInterceptors() === false) return;
    const newCopyPayload: CopyPayload[] = [];
    CLIPBOARD_DATA_TYPES.forEach((type) => {
      const paste = (event as ClipboardEvent).clipboardData?.getData(type);
      if (paste) {
        newCopyPayload.push({ type, content: paste });
      }
    });
    setCopyPayload(newCopyPayload);
  });

  function copyHandler(event: ClipboardEvent) {
    if (enableInterceptors() === false) return;
    copyPayload().forEach((item) => {
      event.clipboardData?.setData(item.type, item.content);
    });
    event.preventDefault();
  }

  const copy = () => {
    setEnableInterceptors(true);
    document.execCommand("copy");
    setEnableInterceptors(false);
  };

  document.addEventListener("copy", copyHandler, true);

  return (
    <div class="flex flex-col">
      <div>
        <button
          onClick={copy}
          class="flex flex-col justify-center pt-3 pr-8 pb-3 pl-8 bg-blue-200"
        >
          Copy
        </button>
        <button
          onClick={() => setEnableInterceptors(!enableInterceptors())}
          class="flex flex-col justify-center pt-3 pr-8 pb-3 pl-8 bg-blue-200"
        >
          Interceptor {enableInterceptors() ? "On" : "Off"}
        </button>
      </div>
      <div>
        <Index each={copyPayload()}>
          {(item, index) => {
            return (
              <CopyPayloadSection
                data-index={index}
                item={item}
                onFocus={() => setEnableInterceptors(false)}
                onBlur={() => setEnableInterceptors(true)}
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
