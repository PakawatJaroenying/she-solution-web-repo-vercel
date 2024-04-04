import { TextValue } from "@/app/lib/interfaces/option";
import clsx from "clsx";
import React, {
  HTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { MAX_HEIGHT_DROPDOWN, getDropdownDirection } from "./_select-utils";
import TextField from "./textfield";
import Checkbox from "./checkbox";
import { ControllerRenderProps } from "react-hook-form";
import Dropdown from "../dropdown/dropdown";
import DropdownContent from "../dropdown/dropdown-content";
import DropdownMenu from "../dropdown/dropdown-menu";
import DropdownItem from "../dropdown/dropdown-item";
import DropdownItemNotFound from "../dropdown/dropdown-item-not-found";

type SelectCheckBoxProps = ControllerRenderProps &
  HTMLAttributes<HTMLInputElement> & {
    options: TextValue[];
    hasError?: boolean;
    placeholder: string;
  };

const SelectCheckBox = forwardRef((props: SelectCheckBoxProps, ref) => {
  const { options, hasError } = props;
  /* -------------------------------------------------------------------------- */
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  /* -------------------------------------------------------------------------- */
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">(
    "down",
  );
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);

  const [searchValue, setSearchValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>(props.value);
  useEffect(() => {
    if (props.value !== selectedItems) {
      setSelectedItems(props.value);
    }
  }, [props, setSelectedItems, selectedItems]);
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      handleResize();
    };
    const handleResize = () => {
      if (dropdownRef.current) {
        setDropdownWidth(dropdownRef.current.clientWidth);
        setDropdownDirection(getDropdownDirection(dropdownRef.current));
        // resetSearchValueToSelectedItem();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const isClickOutside =
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node);
      if (isClickOutside) {
        resetSearchValueToSelectedItem();
      }
    };

    const resetSearchValueToSelectedItem = () => {
      setSearchValue("");
    };

    if (dropdownRef.current) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleResize);
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleResize);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownRef]); // Dependencies array is empty to mimic componentDidMount behavior
  /* -------------------------------------------------------------------------- */

  const filteredOptions = options.filter((ot) =>
    ot.text.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Dropdown
      className={clsx({
        "dropdown-top": dropdownDirection === "up",
      })}
      ref={dropdownRef}
    >
      <TextField
        ref={inputRef}
        role="button"
        className={clsx("text-md input input-bordered w-full truncate")}
        style={{ borderColor: props.hasError ? "red" : "" }}
        value={
          options
            .filter((it) => selectedItems.includes(it.value))
            .map((it) => it.text)
            .join(", ") || ""
        }
        placeholder={props.placeholder}
        readOnly
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            //สั่งหมุนไปทางตรงข้าม 180 องศา
            className={clsx(
              "h-6 w-6 transform cursor-pointer text-gray-400 transition-transform duration-300 ease-in-out",
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        }
        iconPosition="right"
        disabled={props.disabled}
      />
      <DropdownContent>
        <DropdownMenu
          style={{ width: dropdownWidth }}
          className={clsx({
            "pe-8": filteredOptions.length > 5,
          })}
        >
          <TextField
            disabled={props.disabled}
            placeholder="ป้อนข้อมูลที่ต้องการค้นหา"
            ref={inputRef}
            className={clsx("input input-bordered  w-full")}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            labelclassname="sticky top-0 z-10"
          />
          {filteredOptions.length === 0 ? (
            <DropdownItemNotFound />
          ) : (
            filteredOptions.map((item, index) => {
              return (
                <DropdownItem
                  key={index}
                  item={item}
                  index={index}
                  className={clsx(
                    {
                      "!bg-aqua !text-darkgreen": selectedItems.includes(
                        item.value,
                      ),
                    },
                    {
                      "mt-2": index === 0,
                    },
                  )}
                >
                  <label className="flex gap-2 p-4 text-base active:!bg-teal active:!text-white">
                    <Checkbox
                      onChange={() => {
                        const includedItem = selectedItems.includes(item.value);
                        if (includedItem) {
                          const itemFilted = selectedItems.filter(
                            (it) => it !== item.value,
                          );
                          setSelectedItems(itemFilted);
                          props.onChange(itemFilted);
                        } else {
                          const itemsWithNew = [...selectedItems, item.value];
                          setSelectedItems(itemsWithNew);
                          props.onChange(itemsWithNew);
                        }
                      }}
                      defaultChecked={selectedItems.includes(item.value)}
                      value={item.value}
                      className="h-6 w-6 shrink-0"
                      checked={selectedItems.includes(item.value)}
                    />
                    {item.text}
                  </label>
                </DropdownItem>
              );
            })
          )}
        </DropdownMenu>
      </DropdownContent>
    </Dropdown>
  );
});

SelectCheckBox.displayName = "SelectCheckBox";

export default SelectCheckBox;
