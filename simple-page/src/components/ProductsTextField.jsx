import { LegacyStack, Tag, Autocomplete } from "@shopify/polaris";
import { useState, useCallback, useMemo } from "react";

export default function ProductsTextField({selectedOptions, setSelectedOptions , inputValue, setInputValue}) {
  const deselectedOptions = useMemo(
    () => [
      { value: "smartphone", label: "Smartphone" },
      { value: "wireless_earbuds", label: "Wireless Earbuds" },
      { value: "gaming_laptop", label: "Gaming Laptop" },
      { value: "fitness_tracker", label: "Fitness Tracker" },
      { value: "mechanical_keyboard", label: "Mechanical Keyboard" },
      { value: "bluetooth_speaker", label: "Bluetooth Speaker" },
      { value: "digital_camera", label: "Digital Camera" },
      { value: "smartwatch", label: "Smartwatch" },
      { value: "electric_scooter", label: "Electric Scooter" },
      { value: "dslr_tripod", label: "DSLR Tripod" },
      { value: "noise_canceling_headphones", label: "Noise-Canceling Headphones" },
      { value: "portable_projector", label: "Portable Projector" },
      { value: "gaming_mouse", label: "Gaming Mouse" },
      { value: "wireless_charger", label: "Wireless Charger" },
      { value: "action_camera", label: "Action Camera" },
      { value: "smart_home_hub", label: "Smart Home Hub" },
      { value: "robot_vacuum", label: "Robot Vacuum" },
      { value: "led_desk_lamp", label: "LED Desk Lamp" },
      { value: "external_hard_drive", label: "External Hard Drive" },
      { value: "graphics_tablet", label: "Graphics Tablet" }
    ],
    []
  );
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions]
  );

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => {
          let tagLabel = "";
          tagLabel = option.replace("_", " ");
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </LegacyStack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Products"
      value={inputValue}
      placeholder="Select Products"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
    />
  );

  return (
    <div>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="Suggested Tags"
      />
    </div>
  );
  function titleCase(string) {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join("");
  }
}
