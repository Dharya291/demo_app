import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { deleteDiscount } from "../httpServices/discountServices.js";
import { useNavigate } from "react-router-dom";
import AlertBox from "./AlertBox";

export default function DiscountTable({ discountData, setDiscountData }) {
  const [modalData, setModalData] = useState({
    active: false,
    discountId: "",
    title: "",
    description: "",
    action: "",
  });

  const navigate = useNavigate();
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(discountData);

  const handleModal = useCallback((id, type, event) => {
    event.stopPropagation();
    setModalData({
      active: true,
      discountId: id,
      title: type === "edit" ? "Edit Discount" : "Delete Discount",
      description:
        type === "edit"
          ? "Are you sure you want to edit this discount?"
          : "Are you sure you want to delete this discount?",
      action: type,
    });
  }, []);

  const handleEditRequest = useCallback(
    (id) => navigate(`/discount/${id}`),
    [navigate]
  );

  const handleDeleteRequest = useCallback(
    async (id) => {
      const response = await deleteDiscount(id);
      if (response?.message === "Discount deleted successfully") {
        setDiscountData(response?.data);
      }
    },
    [setDiscountData]
  );

  return (
    <LegacyCard>
      <IndexTable
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
          { title: "Discount Type" },
          { title: "Action", alignment: "center" },
        ]}
      >
        {discountData?.map(({ id, title, date, startDate, status, type }) => (
          <IndexTable.Row
            key={id}
            id={id}
            selected={selectedResources.includes(id)}
          >
            <IndexTable.Cell>
              <Text variant="bodyMd" fontWeight="bold">
                {id}
              </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>{title}</IndexTable.Cell>
            <IndexTable.Cell>{date || startDate}</IndexTable.Cell>
            <IndexTable.Cell>
              <Badge tone={status ? "success" : "critical"}>
                {status ? "Active" : "Disabled"}
              </Badge>
            </IndexTable.Cell>
            <IndexTable.Cell>{type}</IndexTable.Cell>
            <IndexTable.Cell>
              <ButtonGroup>
                <Button onClick={(event) => handleModal(id, "edit", event)}>
                  Edit
                </Button>
                <Button
                  onClick={(event) => handleModal(id, "delete", event)}
                  variant="primary"
                  tone="critical"
                >
                  Delete
                </Button>
              </ButtonGroup>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>

      {modalData.active && (
        <AlertBox
          active={modalData.active}
          setActive={(active) => setModalData((prev) => ({ ...prev, active }))}
          title={modalData.title}
          description={modalData.description}
          action={modalData.action}
          discountId={modalData.discountId}
          primaryAction={
            modalData.action === "edit"
              ? handleEditRequest
              : handleDeleteRequest
          }
        />
      )}
    </LegacyCard>
  );
}
