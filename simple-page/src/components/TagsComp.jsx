import { useState, useCallback } from "react";
import { TextField, Tag, LegacyStack } from "@shopify/polaris";

export default function TagInput() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Add tags when space or enter is pressed
  const handleAddTags = useCallback(
    (value = inputValue.trim()) => {
      if (!value) return; // Ignore empty input

      const words = value
        .split(/\s+/) // Split by spaces
        .map(titleCase)
        .filter((word) => word && !tags.includes(word)); // Remove empty & duplicate tags

      if (words.length > 0) {
        setTags((prevTags) => [...prevTags, ...words]);
        setInputValue(""); // Clear input after adding tags
      }
    },
    [inputValue, tags]
  );

  // Handle input change (Triggers tag creation on space)
  const handleInputChange = useCallback(
    (value) => {
      if (value.endsWith(" ")) {
        handleAddTags(value.trim());
      } else {
        setInputValue(value);
      }
    },
    [handleAddTags]
  );

  // Handle tag removal
  const handleRemoveTag = useCallback(
    (tag) => () => {
      setTags((prevTags) => prevTags.filter((t) => t !== tag));
    },
    []
  );

  return (
    <TextField
      label="Tags"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleAddTags();
        }
      }}
      onBlur={() => handleAddTags(inputValue.trim())} // Add remaining input on blur
      placeholder="Type words and press Enter or Space..."
      verticalContent={
        tags.length > 0 && (
          <LegacyStack spacing="tight" alignment="center">
            {tags.map((tag) => (
              <Tag key={tag} onRemove={handleRemoveTag(tag)}>
                {tag}
              </Tag>
            ))}
          </LegacyStack>
        )
      }
      autoComplete="off"
    />
  );
}

// Function to format text to title case
function titleCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
