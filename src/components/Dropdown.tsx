import {
  HeadlessDisclosureChild,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "solid-headless";
import { Component, For, JSX } from "solid-js";
import classNames from "classNames";

const dropDownIcon = () => (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 9L11.1962 0H0.803848L6 9Z" fill="white" />
  </svg>
);

export type DropDownOption = {
  name: string;
  value: string;
};

export const Dropdown: Component<{
  onOptionSelect: (value: DropDownOption) => void;
  icon?: JSX.Element;
  value: DropDownOption;
  options: DropDownOption[];
  openUp?: boolean; // TODO toggle bottom-9 on listboxoptions
}> = (props) => {
  return (
    <div class="relative">
      <Listbox
        defaultOpen={false}
        value={props.value}
        onSelectChange={(option: any) =>
          props.onOptionSelect(option as DropDownOption)}
      >
        <ListboxButton class="gap-5 bg-neutral-800 hover:bg-neutral-600 box-border flex flex-row justify-center relative h-8 items-center px-3 py-px rounded-lg">
          <div class="text-sm capitalize font-['Inter'] font-bold text-white relative my-2">
            {props.value.name}
          </div>
          {props.icon || dropDownIcon()}
        </ListboxButton>
        <HeadlessDisclosureChild>
          {({ isOpen }) => (
            isOpen() && (
              <ListboxOptions
                class={classNames(
                  props.openUp && "bottom-full",
                  "absolute w-[300px] py-1 mb-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                )}
              >
                <For each={props.options}>
                  {(option) => (
                    <ListboxOption
                      class="focus:outline-none group"
                      value={option}
                    >
                      {({ isActive, isSelected }) => (
                        <div
                          class={classNames(
                            isActive()
                              ? "text-blue-900 bg-blue-100"
                              : "text-gray-900",
                            "group-hover:text-blue-900 group-hover:bg-blue-100",
                            "cursor-default select-none relative py-2 pl-10 pr-4",
                          )}
                        >
                          <span
                            class={classNames(
                              isSelected() ? "font-medium" : "font-normal",
                              "block truncate capitalize ",
                            )}
                          >
                            {option.name}
                          </span>
                        </div>
                      )}
                    </ListboxOption>
                  )}
                </For>
              </ListboxOptions>
            )
          )}
        </HeadlessDisclosureChild>
      </Listbox>
    </div>
  );
};
