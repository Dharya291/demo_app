import { useState, useCallback } from "react";
import {
  Page,
  Grid,
  Card,
  Text,
  Divider,
  TextField,
  Checkbox,
  LegacyStack,
  RadioButton,
  Button,
  Box,
  ChoiceList,
  Select,
  List,
  Badge,
  ButtonGroup,
  InlineGrid,
  Form,
  FormLayout,
} from "@shopify/polaris";
import { DeleteIcon, PlusCircleIcon, ArrowLeftIcon } from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
import TagInput from "../components/TagsComp";
import { collectonData } from "../constants/collectionData";
import ProductsTextField from "../components/ProductsTextField";
import DatePicker from "../components/DatePicker";
import { createDiscount } from "../httpServices/discountServices";
import ToastMarkup from "../components/toastMarkup";
import { useNavigate } from "react-router-dom";
function Discount() {
  const [title, setTitle] = useState("");
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedEndTime, setCheckedEndTime] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [selected, setSelected] = useState("Specific Products");
  const [discount, setDiscount] = useState("percentage");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("today");
  // const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleChange = useCallback((newValue) => setDiscount(newValue), []);
  const [strategy, setStrategy] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    productDiscounts: false,
    shippingDiscounts: false,
    orderDiscounts: false,
  });
  const [widget, setWidget] = useState({
    heading: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handlePage= ()=>{
    navigate("/");
  }
  const handleTitleChange = useCallback((value) => {
    setTitle(value);
    setErrors((prev) => ({
      ...prev,
      title: value.trim().length > 0 ? "" : "Title is required",
    }));
  }, []);
  const handleChecked = useCallback((newChecked) => setChecked(newChecked), []);
  const handleProductDetails = () => {
    setProductDetails((prev) => [
      ...prev,
      {
        id: Date.now(),
        quantity: "",
        discount: "",
      },
    ]);
  };
  const handleDeleteProductDetails = (id) => {
    setProductDetails((prev) => prev.filter((item) => item?.id !== id));
  };
  const handleProductDetailsChange = (id, field, value) => {
    setProductDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  const handleChoiceList = useCallback((value) => {
    setSelected(value[0]);
  }, []);
  const handleSelectChange = useCallback(
    (value) => setSelectedCollection(value),
    []
  );
  const handleStrategy = useCallback((value) => setStrategy(value), []);
  const handleCheckedCombinations = useCallback(
    (key) => (newChecked) => {
      setCheckedItems((prev) => ({
        ...prev,
        [key]: newChecked,
      }));
    },
    []
  );
  const handleWidgetInfo = (field, value) => {
    setWidget((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const formattedValue = useCallback((dateValue) => {
    console.log(dateValue, "84698485");
    return `${dateValue.getDate()}-${String(dateValue.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateValue.getFullYear()).padStart(2, "0")}`;
  }, []);

  console.log(selectedOptions, "54653676");
  const toggleToast = useCallback(() => setToastActive(false), []);
  const handleSubmit = async() => {
    let validationErrors = {};
    const hasEmptyQuantity = productDetails.some(
      (tier) => !tier.quantity.trim()
    );
    if (!title.trim()) {
      validationErrors.title = "Title is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(productDetails, "6843056");
    if (productDetails?.length === 0) {
      setToastMessage("Please add at least one discount tier.");
      setToastActive(true);
      return;
    } else if (hasEmptyQuantity) {
      setToastMessage("Quantity cannot be empty in any discount tier.");
      setToastActive(true);
      return;
    }
    console.log(formattedValue(selectedDate), "8709657");
    console.log(hasEmptyQuantity, "586554");
    const discountObject = {
      title: title,
      status: checked,
      type: discount,
      discountTiers: productDetails,
      selectedProduct: selected,              
      productOptions: selectedOptions,
      tagsOptions: tags,
      collectionOptions: selectedCollection,
      discountStrategy: strategy,
      combinations: checkedItems,
      startDate: formattedValue(selectedDate),
      ...(checkedEndTime ? { endDate: formattedValue(selectedEndDate) } : {}),
      endDateStatus: checkedEndTime,
    };
    console.log(discountObject, "435690584");
    // const response =  createDiscount(discountObject)
    //   .then((data) => {
    //     console.log("Discount Created:", data);
    //     alert("Form submitted successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Submission failed:", error);
    //   });
    const response = await createDiscount(discountObject)
    if(response?.message === "New discount added successfully"){
      navigate('/');
    }
      console.log(response, "68435");
  };
  console.log(selectedDate, "3469859");
  return (
    <Page>
      <Box paddingBlock={400}>
      <Button  icon={ArrowLeftIcon} size="large" onClick={handlePage}/>
      </Box>
      
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <Grid columns={{ xs: 1 }}>
            <Grid.Cell columnSpan={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8 }}>
              <div className="grid-cell-wrapper">
                <Card title="Sales" padding={0}>
                  <Box
                    paddingBlockEnd={{ lg: "200" }}
                    style={{ padding: "15px" }}
                  >
                    <Text variant="headingLg" as="h5">
                      Volume discount
                    </Text>
                  </Box>

                  <Divider borderColor="border" />
                  <Box paddingBlock={{ lg: "600" }} style={{ padding: "15px" }}>
                    <Text variant="headingMd" as="h6">
                      Method
                    </Text>
                    <Text>Automatic</Text>
                  </Box>
                  <div style={{ padding: "0px 15px" }}>
                    <TextField
                      label="Title"
                      value={title}
                      onChange={handleTitleChange}
                      helpText="Customers will see this as the discount name."
                      autoComplete="off"
                      error={errors?.title}
                    />
                  </div>

                  <Box
                    paddingBlockStart={{ lg: "600" }}
                    style={{ padding: "15px" }}
                  >
                    <Checkbox
                      label="Active discount"
                      checked={checked}
                      onChange={handleChecked}
                    />
                  </Box>
                </Card>
                <Card title="Sales">
                  <Box paddingBlock={{ lg: "200" }}>
                    <Text variant="headingLg" as="h5">
                      Discount tiers
                    </Text>
                  </Box>

                  <div>
                    <LegacyStack>
                      <RadioButton
                        label="Percentage"
                        checked={discount === "percentage"}
                        id="percentage"
                        name="percentage"
                        onChange={() => handleChange("percentage")}
                      />
                      <RadioButton
                        label="Fixed amount on each item"
                        id="fixed"
                        name="fixed"
                        checked={discount === "fixed"}
                        onChange={() => handleChange("fixed")}
                      />
                    </LegacyStack>
                  </div>
                  {toastActive && (
                    <ToastMarkup
                      active={toastActive}
                      toastContent={toastMessage}
                      toggleToast={toggleToast}
                    />
                  )}
                  <div className="productDetails">
                    {productDetails &&
                      productDetails?.map((item) => (
                        <div className="productItems" key={item?.id}>
                          <TextField
                            label="Quantity"
                            value={item?.quantity}
                            // onChange={handleChange}
                            type="number"
                            autoComplete="off"
                            onChange={(value) =>
                              handleProductDetailsChange(
                                item?.id,
                                "quantity",
                                value
                              )
                            }
                          />
                          <TextField
                            label="discount"
                            value={item?.discount}
                            type="number"
                            suffix={`${
                              discount === "percentage" ? "%" : "$"
                            } off`}
                            onChange={(value) => {
                              let newValue = value;

                              // If the value contains %, remove it and ensure it's a number
                              if (discount === "percentage") {
                                newValue = Math.min(Number(newValue), 100);
                              }
                              handleProductDetailsChange(
                                item?.id,
                                "discount",
                                newValue
                              );
                            }}
                          />

                          <div
                            style={{
                              height: "full",
                              display: "flex",
                              alignItems: "end",
                              marginLeft: "10px",
                            }}
                          >
                            <Button
                              size="large"
                              fullWidth="true"
                              icon={DeleteIcon}
                              variant="primary"
                              tone="critical"
                              onClick={() =>
                                handleDeleteProductDetails(item?.id)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    <Box paddingBlockStart={{ lg: "200" }}>
                      <Button
                        icon={PlusCircleIcon}
                        onClick={handleProductDetails}
                      >
                        Add Tier
                      </Button>
                    </Box>
                  </div>
                  <Divider borderColor="border" />
                  <Box className="collectionContainer">
                    <Box paddingBlock={{ lg: "600" }} paddingBlockStart={400}>
                      <Text variant="headingLg" as="h5">
                        Applies to
                      </Text>
                    </Box>

                    <ChoiceList
                      choices={[
                        {
                          label: "Specific Products",
                          value: "Specific Products",
                        },
                        { label: "Specific Tags", value: "Specific Tags" },
                        {
                          label: "Specific Collection",
                          value: "Specific Collection",
                        },
                      ]}
                      selected={selected}
                      onChange={handleChoiceList}
                    />
                    <Box paddingBlock={{ lg: "600" }}>
                      {selected === "Specific Products" ? (
                        <ProductsTextField
                          label={selected}
                          selectedOptions={selectedOptions}
                          setSelectedOptions={setSelectedOptions}
                          inputValue={inputValue}
                          setInputValue={setInputValue}
                        />
                      ) : selected === "Specific Tags" ? (
                        <TagInput tags={tags} setTags={setTags} />
                      ) : (
                        selected === "Specific Collection" && (
                          <Select
                            label="Selected Collection"
                            options={collectonData}
                            onChange={handleSelectChange}
                            value={selectedCollection}
                          />
                        )
                      )}
                    </Box>
                  </Box>
                  <Divider borderColor="border" />
                  <Box paddingBlock={{ lg: "400" }}>
                    <Text variant="headingLg" as="h5">
                      Discount application strategy
                    </Text>
                  </Box>
                  <LegacyStack vertical>
                    <RadioButton
                      label="Sum up quantities across all applicable carts lines to determine the discount later."
                      checked={strategy === "all"}
                      id="all"
                      name="all"
                      onChange={() => handleStrategy("all")}
                    />
                    <RadioButton
                      label="Each cart line quantity will be separately considered to determine the discount later."
                      id="seperate"
                      name="seperate"
                      checked={strategy === "seperate"}
                      onChange={() => handleStrategy("seperate")}
                    />
                  </LegacyStack>
                </Card>
                <Card title="Sales">
                  <Box
                    paddingBlock={{ lg: "200" }}
                    paddingBlockEnd={{ lg: 400 }}
                  >
                    <Text variant="headingLg" as="h5">
                      Combinations
                    </Text>
                  </Box>

                  <Text>
                    Volume discount can be combined with other products,
                    shipping and other discounts
                  </Text>
                  <div className="combination_container">
                    <Checkbox
                      label="Product Discounts"
                      checked={checkedItems.productDiscounts}
                      onChange={handleCheckedCombinations("productDiscounts")}
                    />
                    <Checkbox
                      label="Shipping Discounts"
                      checked={checkedItems.shippingDiscounts}
                      onChange={handleCheckedCombinations("shippingDiscounts")}
                    />
                    <Checkbox
                      label="Order Discounts"
                      checked={checkedItems.orderDiscounts}
                      onChange={handleCheckedCombinations("orderDiscounts")}
                    />
                  </div>
                </Card>
                <Card title="Sales">
                  <Box paddingBlock={{ lg: "200" }} paddingBlockEnd={400}>
                    <Text variant="headingLg" as="h5">
                      Active dates
                    </Text>
                  </Box>

                  <InlineGrid columns={2} gap={400}>
                    <DatePicker
                      label={"Start Date"}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                    <TextField
                      label="Start time(CDT)"
                      value={widget?.description}
                      onChange={(value) =>
                        handleWidgetInfo("description", value)
                      }
                      autoComplete="off"
                      type="time"
                      ariaControls="true"
                    />
                  </InlineGrid>
                  <Box paddingBlock={{ lg: 200 }}>
                    <Checkbox
                      label="Set End Time"
                      checked={checkedEndTime}
                      onChange={(newChecked) => setCheckedEndTime(newChecked)}
                    />
                  </Box>
                  {checkedEndTime && (
                    <DatePicker
                      label={"End Date"}
                      selectedDate={selectedEndDate}
                      setSelectedDate={setSelectedEndDate}
                    />
                  )}
                </Card>
                <Card title="Sales">
                  <Box paddingBlock={{ lg: "400" }}>
                    <Text variant="headingLg" as="h5">
                      Overwrite widget text
                    </Text>
                  </Box>

                  <Text>
                    When not set, the default text from Setting page will be
                    used.
                  </Text>
                  <Box paddingBlockStart={{ lg: "600" }}>
                    <TextField
                      label="Heading"
                      value={widget?.heading}
                      placeholder="Optional: E.g. Get more, save more!"
                      onChange={(value) => handleWidgetInfo("heading", value)}
                      autoComplete="off"
                    />
                  </Box>
                  <Box paddingBlock={{ lg: "600" }}>
                    <TextField
                      label="Additional Description"
                      value={widget?.description}
                      placeholder="Optional: E.g. You can pick any item from this collection"
                      onChange={(value) =>
                        handleWidgetInfo("description", value)
                      }
                      autoComplete="off"
                    />
                  </Box>
                </Card>
              </div>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 4, sm: 4, lg: 4, xl: 4 }}>
              <div style={{ position: "sticky", top: "20px" }}>
                <Card title="Sales" sectioned>
                  <Box paddingBlock={{ lg: "200" }}>
                    <Text variant="headingLg" as="h5">
                      Summary
                    </Text>
                  </Box>
                  <Text variant="headingMd" as="h5" tone={!title && "disabled"}>
                    {title || "no title"}
                  </Text>
                  <Box paddingBlock={{ lg: "200" }}>
                    <Badge tone={checked && "success-strong"}>
                      {checked ? "Active" : "Disabled "}
                    </Badge>
                  </Box>

                  <Box paddingBlockStart={{ lg: "200" }}>
                    <Text variant="headingSm" as="h5">
                      TYPE AND METHOD
                    </Text>
                    <div style={{ listStyleType: "none", paddingLeft: 0 }}>
                      <List type="bullet">
                        <List.Item
                          style={{ listStyleType: "none", paddingLeft: 0 }}
                        >
                          Volume Discounts
                        </List.Item>
                        <List.Item>Automatic</List.Item>
                      </List>
                    </div>
                  </Box>
                  <Box paddingBlock={{ lg: "200" }}>
                    <Text variant="headingSm" as="h5">
                      DETAILS
                    </Text>
                    <List type="bullet">
                      {productDetails?.map(
                        (item, index) =>
                          item?.quantity && (
                            <List.Item>
                              Tier{index + 1} - Buy {item?.quantity} for{" "}
                              {item?.discount || 0}{" "}
                              {discount === "percentage" ? "%" : "$"} off
                            </List.Item>
                          )
                      )}
                    </List>
                  </Box>
                  <Box paddingBlockEnd={{ lg: "300" }}>
                    <p>View a summary of your online store’s sales.</p>
                  </Box>

                  <Divider borderColor="border" />
                  <Box paddingBlock={{ lg: "300" }}>
                    <Text variant="headingSm" as="h5">
                      Performance
                    </Text>
                    <p>0 used</p>
                  </Box>
                </Card>
              </div>
            </Grid.Cell>
          </Grid>
          <InlineGrid>
            <Box
              paddingBlock={{ lg: "400" }}
              style={{ display: "flex", justifyContent: "end" }}
            >
              <ButtonGroup>
                <Button variant="primary" tone="critical">
                  Delete
                </Button>
                <Button variant="primary" tone="success" submit>
                  Save Discount
                </Button>
              </ButtonGroup>
            </Box>
          </InlineGrid>
        </FormLayout>
      </Form>
    </Page>
  );
}

export default Discount;
