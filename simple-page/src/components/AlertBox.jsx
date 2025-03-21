import { Modal, Text } from "@shopify/polaris";

function AlertBox({
  title,
  description,
  setActive,
  active,
  action,
  discountId,
  primaryAction
}) {
  return (
    <>
      {active && (
        <Modal
          open={active}
          onClose={() => setActive(false)}
          title={title}
          primaryAction={{
            content: action,
            destructive: action === "edit" ? false : true,
            onAction: () => {
              primaryAction(discountId);
              setActive(false);
            },
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: () => setActive(false),
            },
          ]}
        >
          <Modal.Section>
            <Text variant="bodyMd">{description}</Text>
          </Modal.Section>
        </Modal>
      )}
    </>
  );
}

export default AlertBox;
