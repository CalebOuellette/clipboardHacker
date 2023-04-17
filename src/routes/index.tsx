import { createSignal, createEffect } from "solid-js";
import CopyPayloadEditor from "~/components/CopyPayloadEditor";
import { CLIPBOARD_DATA_TYPES, formatText } from "../lib/ClipboardTypeUtils";

export type CopyPayload = {
  type: string;
  content: string;
};

export default function Home() {
  const [startScreen, setStartScreen] = createSignal<boolean>(true);
  const [copyPayload, setCopyPayload] = createSignal<CopyPayload[]>([]);

  function onPasteEvent(event: ClipboardEvent) {
    const newCopyPayload: CopyPayload[] = [];
    CLIPBOARD_DATA_TYPES.forEach((type) => {
      const paste = event.clipboardData?.getData(type);
      if (paste) {
        newCopyPayload.push({ type, content: formatText(paste, type) });
      }
    });
    setCopyPayload(newCopyPayload);
    setStartScreen(false);
  }

  createEffect(() => {
    if (startScreen()) {
      window.addEventListener("paste", onPasteEvent, true);
    } else {
      window.removeEventListener("paste", onPasteEvent, true);
    }
  });

  function onCopyEvent(event: ClipboardEvent) {
    copyPayload().forEach((item) => {
      event.clipboardData?.setData(item.type, item.content);
    });
    event.preventDefault();
  }

  const copy = () => {
    document.addEventListener("copy", onCopyEvent, true);
    document.execCommand("copy");
    document.removeEventListener("copy", onCopyEvent, true);
  };

  const reset = () => {
    setStartScreen(true);
    setCopyPayload([]);
  };

  return (
    <main class="text-slate-50 p-3 bg-neutral-900 min-h-screen">
      <div class="box-border ml-1 self-stretch flex flex-row justify-between">
        <div class="self-start flex flex-col justify-start box-border">
          <div class="whitespace-nowrap text-3xl font-['Inter'] font-bold text-[#ffffff] box-border self-start">
            Clipboard Hacker
          </div>
          <div class="whitespace-nowrap font-['Inter'] font-normal text-[#ffffff] box-border self-start">
            A utility for interacting with the clipboard.
          </div>
        </div>
        {!startScreen() && (
          <div class="box-border self-start flex flex-row justify-start gap-4">
            <button
              onClick={reset}
              class="border-solid border-t-default font-['Inter'] font-bold text-[#ffffff] border-r-default border-b-default border-l-default border-[#ffffff]  box-border pt-3 pb-3 pl-6 pr-6 self-start flex flex-col justify-center"
            >
              Reset
            </button>
            <button
              onClick={copy}
              class="text-[#ffffff] font-bold font-['Inter'] bg-[#68b2f6] box-border pt-3 pb-3 pl-8 pr-8 self-start flex flex-col justify-center"
            >
              Copy
            </button>
          </div>
        )}
      </div>
      {startScreen() ? (
        <div class="mt-[50vh] font-['Open Sans'] text-center font-bold text-[#ffffff]">
          Press Cmd + V to get started.
        </div>
      ) : (
        <CopyPayloadEditor
          copyPayload={copyPayload}
          setCopyPayload={setCopyPayload}
        />
      )}
    </main>
  );
}
