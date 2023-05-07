import {
  HeadlessDisclosureChild,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "solid-headless";
import { Accessor, Component, For, JSX } from "solid-js";
import classNames from "classNames";

const dropDownIcon = (
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

type DropDownOption = {
  name: string;
  value: string;
};

export const Dropdown: Component<{
  onOptionSelect: (value: DropDownOption) => void;
  icon?: JSX.Element;
  value: DropDownOption;
  options: DropDownOption[];
  openUp?: boolean; // TODO toggle bottom-9 on listboxoptions
}> = (
  { onOptionSelect, openUp = false, icon = dropDownIcon, options, value },
) => {
    return (
      <Listbox
        defaultOpen={false}
        value={value}
        onSelectChange={(option: any) => onOptionSelect(option as DropDownOption)}
      >
        <ListboxButton class="gap-5 bg-neutral-800 hover:bg-neutral-600 hover:pointer box-border flex flex-row justify-center relative h-8 items-center px-3 py-px rounded-lg">
          <div class="text-sm font-['Inter'] font-bold text-white relative my-2">
            {value.name}
          </div>
          {icon}
        </ListboxButton>
        <HeadlessDisclosureChild>
          {({ isOpen }) => (
            isOpen() && (
              <ListboxOptions class="absolute bottom-9 w-[300px] py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <For each={options}>
                  {(person) => (
                    <ListboxOption
                      class="focus:outline-none group"
                      value={person}
                    >
                      {({ isActive, isSelected }) => (
                        <div
                          class={classNames(
                            isActive()
                              ? "text-amber-900 bg-amber-100"
                              : "text-gray-900",
                            "group-hover:text-amber-900 group-hover:bg-amber-100",
                            "cursor-default select-none relative py-2 pl-10 pr-4",
                          )}
                        >
                          <span
                            class={classNames(
                              isSelected() ? "font-medium" : "font-normal",
                              "block truncate",
                            )}
                          >
                            {person.name}
                          </span>
                          {isSelected()
                            ? (
                              <span
                                class={classNames(
                                  isActive()
                                    ? "text-amber-600"
                                    : "text-amber-600",
                                  "group-hover:text-amber-600",
                                  "absolute inset-y-0 left-0 flex items-center pl-3",
                                )}
                              >
                                check
                              </span>
                            )
                            : null}
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
    );
  };
