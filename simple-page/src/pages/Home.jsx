import { Page, LegacyCard, DataTable, Button, Box, ButtonGroup } from "@shopify/polaris";
import { PlusCircleIcon } from "@shopify/polaris-icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/discount");
  };

  const handleEdit = (id) => {
    console.log(`Edit item with ID: ${id}`);
    // Add edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete item with ID: ${id}`);
    // Add delete logic here
  };

  const rows = [
    [
      "124689",
      "Emerald Silk Gown",
      "$875.00",
      140,
      "$122,500.00",
      <Box display="flex" justifyContent="center">
        <ButtonGroup>
          <Button onClick={() => handleEdit(124689)}>Edit</Button>
          <Button onClick={() => handleDelete(124689)} variant="primary"  tone="critical">Delete</Button>
        </ButtonGroup>
      </Box>
    ],
    [
      "124533",
      "Mauve Cashmere Scarf",
      "$230.00",
      83,
      "$19,090.00",
      <Box display="flex" justifyContent="center">
        <ButtonGroup>
          <Button onClick={() => handleEdit(124533)}>Edit</Button>
          <Button onClick={() => handleDelete(124533)} variant="primary" tone="critical">Delete</Button>
        </ButtonGroup>
      </Box>
    ],
    [
      "124518",
      "Navy Merino Wool Blazer",
      "$445.00",
      13-10-2025,
      "$14,240.00",
      <Box display="flex" justifyContent="center">
        <ButtonGroup>
          <Button onClick={() => handleEdit(124518)}>Edit</Button>
          <Button onClick={() => handleDelete(124518)} variant="primary" tone="critical">Delete</Button>
        </ButtonGroup>
      </Box>
    ],
  ];

  return (
    <Page title="Discount Details">
      <div style={{display: "flex", justifyContent: "end", paddingBottom :"10px"}} >
        <Button onClick={handleNavigate}size="large" icon={PlusCircleIcon}>Add Discount</Button>
      </div>

      <LegacyCard>
        <DataTable
          columnContentTypes={["numeric", "text", "numeric", "numeric", "numeric", "numeric"]}
          headings={["ID", "Title", "status", "date", "discount", "Action"]}
          rows={rows}
          
        />
      </LegacyCard>
    </Page>
  );
}

export default Home;
 