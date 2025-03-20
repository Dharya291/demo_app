import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import React from "react";
import { deleteDiscount } from "../httpServices/discountServices";

export default function DiscountTable({ discountData, setDiscountData }) {
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(discountData);
  const handleEdit = (id, event) => {
    event.stopPropagation();
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    console.log(`Delete item with ID: ${id}`);
    const response = await deleteDiscount(id);
    console.log(response, "45643545");
    if (response.message === "Discount deleted successfully") {
      setDiscountData(response?.data);

      console.log(response?.data, "5666666666");
    }
    console.log(response?.status, "894372458234");
  };

  const rowMarkup = discountData?.map(
    ({ id, title, date,startDate, status, type }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {id}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{date || startDate}</IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone={status && "success"}>{status ? "Active" : "disabled"}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>{type}</IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup>
            <Button onClick={(event) => handleEdit(id, event)}>Edit</Button>
            <Button
              onClick={(event) => handleDelete(id, event)}
              variant="primary"
              tone="critical"
            >
              Delete
            </Button>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <LegacyCard>
      <IndexTable
        // resourceName={resourceName}
        itemCount={discountData?.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Id" },
          { title: "Title" },
          { title: "Date" },
          { title: "Status" },
          { title: "discount type" },
          { title: "Action", alignment: "center" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}
