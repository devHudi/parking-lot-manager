import { useState } from "react";
import moment from "moment";
import { FormModal, Fields } from "components";

import { roomPurchases } from "apis";

const PurchaseModal = ({ visible, roomId, onClose }) => {
  const [form, setForm] = useState({
    payMethod: "cash",
    depositor: "",
    bank: "",
    amount: 0,
    fake: false,
    purchaseDate: new Date(),
    isRnE: false,
    RCM: "R",
    memo: "",
  });

  const clearForm = () => {
    setForm({
      payMethod: "cash",
      depositor: "",
      bank: "",
      amount: 0,
      fake: false,
      purchaseDate: new Date(),
      isRnE: false,
      RCM: "R",
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
    const {
      bank,
      payMethod,
      depositor,
      amount,
      fake,
      purchaseDate,
      isRnE,
      RCM,
      memo,
    } = form;
    roomPurchases.create(
      roomId,
      payMethod,
      payMethod === "cash" ? depositor : null,
      bank,
      amount,
      fake,
      purchaseDate,
      payMethod === "cash" ? isRnE : null,
      RCM,
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
        value={form.amount}
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
        value={form.bank}
        onChange={(value) => {
          handleInput("bank", value);
        }}
      />
      {form.payMethod === "cash" && (
        <Fields.Text
          label="입금자"
          value={form.depositor}
          onChange={(value) => {
            handleInput("depositor", value);
          }}
        />
      )}
      <Fields.DatePicker
        label="납부 날짜"
        value={moment(form.purchaseDate)}
        onChange={(value) => {
          handleInput("purchaseDate", value);
        }}
      />
      {form.payMethod === "cash" && (
        <Fields.Dropdown
          value={form.isRnE}
          label="세계"
          items={[
            { label: "O", value: true },
            { label: "X", value: false },
          ]}
          onChange={(value) => {
            handleInput("isRnE", value);
          }}
        />
      )}
      <Fields.Dropdown
        value={form.RCM}
        label="RCM"
        items={[
          { label: "R", value: "R" },
          { label: "C", value: "C" },
          { label: "M", value: "M" },
        ]}
        onChange={(value) => {
          handleInput("RCM", value);
        }}
      />
      <Fields.Text
        label="비고"
        value={form.memo}
        onChange={(value) => {
          handleInput("memo", value);
        }}
      />
      <Fields.CheckBox
        value={form.fake}
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
