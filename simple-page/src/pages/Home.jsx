import {
  Page,
  LegacyCard,
  DataTable,
  Button,
  Box,
  ButtonGroup,
} from "@shopify/polaris";
import { PlusCircleIcon } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiscountTable from "../components/discountTable";
import { getAllDiscounts } from "../httpServices/discountServices";

function Home() {
  const [discountData, setDiscountData] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/discount");
  };
  const getAllDiscountsData = async () => {
    try {
      const response = await getAllDiscounts();
      console.log(response);
      setDiscountData(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllDiscountsData();
  }, []);

  return (
    <Page title="Discount Details">
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingBottom: "10px",
        }}
      >
        <Button onClick={handleNavigate} size="large" icon={PlusCircleIcon}>
          Add Discount
        </Button>
      </div>
      <DiscountTable discountData={discountData} setDiscountData={setDiscountData}/>
    </Page>
  );
}

export default Home;
