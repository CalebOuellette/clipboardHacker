import { For } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { CopyPayloadSection } from "./CopyPayloadSection";

export type CopyPayload = {
  type: string;
  content: string;
};

export default function CopyPayloadEditor(props: {
  copyPayload: { items: CopyPayload[] };
  setCopyPayload: SetStoreFunction<{ items: CopyPayload[] }>;
}) {
  return (
    <div class="flex flex-col pt-3">
      <div>
        <For each={props.copyPayload.items}>
          {(item, index) => {
            console.log("render");
            return (
              <CopyPayloadSection
                data-index={index}
                item={item}
                content={item.content}
                deleteItem={() => {
                  props.setCopyPayload("items", (oldPayload) => {
                    oldPayload.splice(index(), 1);
                    return [...oldPayload];
                  });
                }}
                onChange={(newContent, type) => {
                  console.log("setting...");
                  props.setCopyPayload("items", index(), "content", newContent);
                  props.setCopyPayload("items", index(), "type", type);
                }}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}
