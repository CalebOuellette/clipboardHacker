import { createEffect, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import CopyPayloadEditor from "~/components/CopyPayloadEditor";
import { CLIPBOARD_DATA_TYPES } from "../lib/ClipboardTypeUtils";
import { AddSection } from "~/components/AddSection";

export type CopyPayload = {
  type: string;
  content: string;
};

export default function Home() {
  const [copyPayload, setCopyPayload] = createStore<{ items: CopyPayload[] }>(
    { items: [] },
  );
  const startScreen = createMemo(() => copyPayload.items.length === 0);

  const [copying, setCopying] = createSignal<boolean>(false);

  function onPasteEvent(event: ClipboardEvent) {
    const newCopyPayload: CopyPayload[] = [];
    CLIPBOARD_DATA_TYPES.forEach((type) => {
      const paste = event.clipboardData?.getData(type);
      if (paste) {
        newCopyPayload.push({
          type,
          content: paste,
        });
      }
    });
    setCopyPayload({ items: newCopyPayload });
  }

  createEffect(() => {
    if (startScreen()) {
      window.addEventListener("paste", onPasteEvent, true);
    } else {
      window.removeEventListener("paste", onPasteEvent, true);
    }
  });

  function onCopyEvent(event: ClipboardEvent) {
    copyPayload.items.forEach((item) => {
      event.clipboardData?.setData(item.type, item.content);
    });
    event.preventDefault();
  }

  const copy = () => {
    setCopying(true);
    setTimeout(() => setCopying(false), 1500);
    document.addEventListener("copy", onCopyEvent, true);
    document.execCommand("copy");
    document.removeEventListener("copy", onCopyEvent, true);
  };

  const reset = () => {
    setCopyPayload({ items: [] });
  };

  return (
    <main class="text-slate-50 p-7 bg-neutral-900 min-h-screen">
      <div class="box-border ml-1 self-stretch flex flex-row justify-between">
        <div class="self-start flex flex-col justify-start box-border">
          <div class="whitespace-nowrap text-3xl font-['Inter'] font-bold text-[#ffffff] box-border self-start">
            Clipboard Hacker
          </div>
          <div class="whitespace-nowrap font-['Inter'] font-thin text-[#ffffff] box-border self-start">
            A utility for interacting with the clipboard.
          </div>
        </div>
        {!startScreen() && (
          <div class="box-border self-start flex flex-row justify-start gap-4">
            <button
              onClick={reset}
              class="border-solid rounded hover:bg-neutral-700 border-t-default font-['Inter'] font-bold text-[#ffffff] border-r-default border-b-default border-l-default border-[#ffffff] box-border pt-3 pb-3 pl-6 pr-6 self-start flex flex-col justify-center"
            >
              Reset
            </button>
            <button
              onClick={copy}
              class="text-white font-bold font-['Inter'] rounded bg-blue-500 hover:bg-blue-400 box-border pt-3 pb-3 pl-8 pr-8 self-start flex flex-col justify-center"
            >
              {copying() ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
      {startScreen()
        ? (
          <div class="mt-[30vh] flex gap-1 flex-col items-center font-['Open Sans'] text-center font-bold text-[#ffffff]">
            <div class="text-xl">Press Cmd + V to get started</div>
          </div>
        )
        : (
          <CopyPayloadEditor
            copyPayload={copyPayload}
            setCopyPayload={setCopyPayload}
          />
        )}
      <div class="flex justify-center pt-2">
        <div class="w-8/12">
          <AddSection
            copyPayload={copyPayload}
            setCopyPayload={setCopyPayload}
          />
        </div>
      </div>
    </main>
  );
}
