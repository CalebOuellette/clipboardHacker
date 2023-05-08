import { For } from "solid-js";
import { CopyPayloadSection } from "./CopyPayloadSection";

export type CopyPayload = {
  type: string;
  content: string;
};

export default function CopyPayloadEditor(props: {
  copyPayload: CopyPayload[];
  setCopyPayload: (newCopyPayload: CopyPayload[]) => void;
}) {
  return (
    <div class="flex flex-col pt-3">
      <div>
        <For each={props.copyPayload}>
          {(item, index) => {
            console.log("render");
            return (
              <CopyPayloadSection
                data-index={index}
                item={item}
                deleteItem={() => {
                  const oldPayload = props.copyPayload;
                  oldPayload.splice(index(), 1);
                  props.setCopyPayload([...oldPayload]);
                }}
                onChange={(newContent, type) => {
                  const oldPayload = props.copyPayload;
                  oldPayload[index()] = {
                    content: newContent,
                    type: type,
                  };
                  props.setCopyPayload([...oldPayload]);
                }}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}
