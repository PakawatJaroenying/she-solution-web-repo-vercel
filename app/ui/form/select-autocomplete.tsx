import { TextValue } from "@/app/lib/interfaces/option";
import clsx from "clsx";
import React, {
  HTMLAttributes,
  forwardRef,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { ControllerRenderProps } from "react-hook-form";
import TextField from "./textfield";
import { MAX_HEIGHT_DROPDOWN, getDropdownDirection } from "./_select-utils";
import Dropdown from "../dropdown/dropdown";
import DropdownContent from "../dropdown/dropdown-content";
import DropdownMenu from "../dropdown/dropdown-menu";
import DropdownItem from "../dropdown/dropdown-item";
import DropdownItemNotFound from "../dropdown/dropdown-item-not-found";

export type SelectAutocompleteProps = {
  options: TextValue[];
  hasError?: boolean;
  placeholder?: string;
  onChangeTextSearch?: (text: string) => void;
  disabled?: boolean;
};
const SelectAutocomplete = forwardRef(
  (props: SelectAutocompleteProps & ControllerRenderProps, ref) => {
    /* -------------------------------------------------------------------------- */
    const { options } = props;
    /* -------------------------------------------------------------------------- */
    const [dropdownWidth, setDropdownWidth] = useState<number>(0);
    const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">(
      "down",
    );

    const [searchValue, setSearchValue] = useState(props.value || "");
    const [selectedItem, setSelectedItem] = useState<TextValue | null>(
      options.find((ot) => ot.value === props.value) || null,
    );
    const [isFirstTimeTouchInput, setIsFirstTimeTouchInput] = useState(true);
    useEffect(() => {
      if (props.value !== selectedItem?.value) {
        setSearchValue(props.value);
        setSelectedItem(options.find((ot) => ot.value === props.value) || null);
      }
    }, [props, selectedItem, setSearchValue, setSelectedItem, options]);
    /* -------------------------------------------------------------------------- */
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    /* -------------------------------------------------------------------------- */
    const [isInitSizeAndDirection, setIsInitSizeAndDirection] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        handleResize();
      };
      const handleResize = () => {
        setDropdownWidth(dropdownRef.current?.clientWidth || 500);
        setDropdownDirection(getDropdownDirection(dropdownRef.current));
        // closeDropdown();
        resetSearchValue();
      };
      const handleClick = (e: MouseEvent) => {
        const clickOutside =
          inputRef.current && !inputRef.current.contains(e.target as Node);
        if (clickOutside) {
          resetSearchValue();
        }
      };
      const resetSearchValue = () => {
        if (selectedItem) {
          if (selectedItem.text !== searchValue) {
            setSearchValue(selectedItem.text);
          }
        } else {
          setSearchValue("");
        }
      };
      if (dropdownRef.current && !isInitSizeAndDirection) {
        handleResize();
        setIsInitSizeAndDirection(true);
      }

      document.addEventListener("click", handleClick);
      document.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      window.addEventListener("click", handleResize);
      return () => {
        document.removeEventListener("scroll", handleScroll);
        document.removeEventListener("click", handleClick);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("click", handleResize);
      };
    }, [dropdownRef, selectedItem, searchValue, isInitSizeAndDirection]);
    /* -------------------------------------------------------------------------- */
    const closeDropdown = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    function onSelectItem(item: TextValue) {
      setSearchValue(item.text);
      setSelectedItem(item);
      props.onChange(item.value);
      closeDropdown();
    }

    const filteredOptions = options.filter((ot) => {
      if (isFirstTimeTouchInput && selectedItem) {
        return true;
      } else {
        return ot.text.toLowerCase().includes(searchValue.toLowerCase());
      }
    });

    return (
      <Dropdown
        className={clsx({ "dropdown-top": dropdownDirection === "up" })}
        ref={dropdownRef}
      >
        <TextField
          ref={inputRef}
          role="button"
          className={clsx("input input-bordered w-full truncate")}
          style={{ borderColor: props.hasError ? "red" : "" }}
          value={searchValue}
          onFocus={() => {
            setIsFirstTimeTouchInput(true);
          }}
          onChange={(e) => {
            props.onChangeTextSearch &&
              props.onChangeTextSearch(e.target.value);
            setSearchValue(e.target.value);
            setIsFirstTimeTouchInput(false);
          }}
          placeholder={props.placeholder || "กรุณากรอกข้อมูล"}
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
            style={{
              width:
                dropdownWidth === 0
                  ? inputRef.current?.clientWidth
                  : dropdownWidth,
              maxHeight: MAX_HEIGHT_DROPDOWN,
            }}
            className={clsx({
              "pe-8": filteredOptions.length > 5,
            })}
          >
            {filteredOptions.length === 0 ? (
              <DropdownItemNotFound />
            ) : (
              filteredOptions.map((item, index) => {
                return (
                  <DropdownItem
                    onClick={() => onSelectItem(item)}
                    key={index}
                    item={item}
                    index={index}
                    className={
                      selectedItem?.value === item.value
                        ? "bg-aqua text-darkgreen"
                        : ""
                    }
                  >
                    <button
                      type="button"
                      className="shrink-0 p-4 text-base active:!bg-teal active:!text-white"
                    >
                      {item.text}
                    </button>
                  </DropdownItem>
                );
              })
            )}
          </DropdownMenu>
        </DropdownContent>
        {/*end of dropdown-content*/}
      </Dropdown> //end of dropdown container
    );
  },
);

SelectAutocomplete.displayName = "SelectAutocomplete";

export default SelectAutocomplete;
