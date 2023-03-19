import { createSignal, Index } from "solid-js";

const clipboardDataTypes = [
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

type CopyPayload = {
  [type: string]: string;
};

export default function CopyPaster() {
  const [copyPayload, setCopyPayload] = createSignal<CopyPayload>({});

  window.addEventListener("paste", (event) => {
    const newCopyPayload: CopyPayload = {};
    clipboardDataTypes.forEach((type) => {
      const paste = (event as ClipboardEvent).clipboardData?.getData(type);
      if (paste) {
        newCopyPayload[type] = paste;
      }
    });
    setCopyPayload(newCopyPayload);
  });

  function copyHandler(event: ClipboardEvent) {
    const values = copyPayload();
    Object.keys(values).forEach((key) => {
      event.clipboardData?.setData(key, values[key]);
    });
    event.preventDefault();
  }

  const copy = () => {
    document.execCommand("copy");
  };

  document.addEventListener("copy", copyHandler, true);

  return (
    <div class="flex flex-col">
      <button onClick={copy}>Copy</button>

      <div>
        <Index each={Object.keys(copyPayload())}>
          {(key, i) => {
            const section = copyPayload()[key()];
            return (
              <PayloadSection
                type={key()}
                content={section}
                onContentChange={(newContent) => {
                  setCopyPayload({ [key()]: newContent });
                }}
              />
            );
          }}
        </Index>
      </div>
    </div>
  );
}

function PayloadSection({
  type,
  content,
  onContentChange,
}: {
  type: string;
  content: string;
  onContentChange: (content: string) => void;
}) {
  return (
    <div>
      <h5>{type}</h5>
      <textarea
        onChange={(e) => onContentChange(e.currentTarget.value)}
        name={type}
        id=""
        cols="30"
        rows="10"
      >
        {content}
      </textarea>
    </div>
  );
}
