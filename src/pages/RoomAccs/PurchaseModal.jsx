import { useState } from "react";
import { FormModal, Fields } from "components";

import { roomPurchases } from "apis";

const PurchaseModal = ({ visible, roomId, onClose }) => {
  const [form, setForm] = useState({
    payMethod: "cash",
    bank: "",
    amount: 0,
    fake: false,
    purchaseDate: new Date(),
    memo: "",
  });

  const clearForm = () => {
    setForm({
      bank: "",
      amount: 0,
      fake: false,
      purchaseDate: new Date(),
      memo: "",
    });
  };

  const handleInput = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOk = () => {
    const { bank, payMethod, amount, fake, purchaseDate, memo } = form;
    roomPurchases.create(
      roomId,
      payMethod,
      bank,
      amount,
      fake,
      purchaseDate,
      memo
    );
    onClose();
    clearForm();
  };

  const handleCancel = () => {
    onClose();
    clearForm();
  };

  return (
    <FormModal
      title="수납 처리"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.Number label="호실" value={roomId} disabled />
      <Fields.Number
        label="납부 금액"
        onChange={(value) => {
          handleInput("amount", value);
        }}
      />
      <Fields.Dropdown
        value={form.payMethod}
        label="납부 방법"
        items={[
          { label: "현금", value: "cash" },
          { label: "카드", value: "card" },
        ]}
        onChange={(value) => {
          handleInput("payMethod", value);
        }}
      />
      <Fields.Text
        label={form.payMethod === "cash" ? "납부 은행" : "카드사"}
        onChange={(value) => {
          handleInput("bank", value);
        }}
      />
      <Fields.DatePicker
        label="납부 날짜"
        onChange={(value) => {
          handleInput("purchaseDate", value);
        }}
      />
      <Fields.Text
        label="비고"
        onChange={(value) => {
          handleInput("memo", value);
        }}
      />
      <Fields.CheckBox
        onChange={(value) => {
          handleInput("fake", value);
        }}
      >
        이 수납은 가수납 입니다.
      </Fields.CheckBox>
    </FormModal>
  );
};

export default PurchaseModal;
