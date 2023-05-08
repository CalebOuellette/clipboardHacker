import { For } from "solid-js";
import type { SetStoreFunction, Store, StoreNode } from "solid-js/store";
import { CopyPayloadSection } from "./CopyPayloadSection";

export type CopyPayload = {
  type: string;
  content: string;
};

export default function CopyPayloadEditor(props: {
  copyPayload: CopyPayload[];
  setCopyPayload: SetStoreFunction<CopyPayload[]>;
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
                content={item.content}
                deleteItem={() => {
                  const oldPayload = props.copyPayload;
                  oldPayload.splice(index(), 1);
                  props.setCopyPayload([...oldPayload]);
                }}
                onChange={(newContent, type) => {
                  console.log("setting...");
                  props.setCopyPayload(index(), "content", newContent);
                  props.setCopyPayload(index(), "type", type);
                }}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}
