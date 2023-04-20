import { CLIPBOARD_DATA_TYPES } from "../lib/ClipboardTypeUtils";

export type CopyPayload = {
  type: string;
  content: string;
};

export default function AddSection({
  copyPayload,
  setCopyPayload,
}: {
  copyPayload: () => CopyPayload[];
  setCopyPayload: (newCopyPayload: CopyPayload[]) => void;
}) {
  return (
    <div>
      <div class="gap-3 flex flex-wrap justify-center">
        {CLIPBOARD_DATA_TYPES.filter(
          (type) =>
            !copyPayload()
              .map((p) => p.type)
              .includes(type)
        ).map((type) => {
          return (
            <button
              class="bg-blue-500  hover:bg-blue-400 text-slate-50 font-bold py-2 px-4 rounded"
              onClick={() => {
                const oldPayload = copyPayload();
                const i = oldPayload.findIndex((entry) => entry.type === type);
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
  );
}
