import { useState } from "react";
import moment from "moment";

import { paidTickets } from "apis";

import { FormModal, Fields } from "components";

const CreateModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({
    carNumber: "",
    carType: "",
    owner: "",
    contact: "",
    payMethod: "cash",
    depositor: "",
    bank: "",
    period: "30M",
    soldDate: new Date(),
    parkingDate: new Date(),
    isRnE: false,
    RCM: "R",
    memo: "",
  });

  const clearForm = () => {
    setForm({
      carNumber: "",
      carType: "",
      owner: "",
      contact: "",
      payMethod: "",
      depositor: "",
      bank: "",
      period: "30M",
      soldDate: new Date(),
      parkingDate: new Date(),
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
      carNumber,
      carType,
      owner,
      contact,
      payMethod,
      depositor,
      bank,
      period,
      soldDate,
      parkingDate,
      isRnE,
      RCM,
      memo,
    } = form;

    paidTickets.create(
      carNumber,
      carType,
      owner,
      contact,
      payMethod,
      bank,
      payMethod === "cash" ? depositor : null,
      period,
      soldDate,
      parkingDate,
      isRnE,
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
      title="주차권 판매 추가"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.Text
        label="차량번호"
        value={form.carNumber}
        onChange={(value) => {
          handleInput("carNumber", value);
        }}
      />
      <Fields.Text
        label="차종"
        value={form.carType}
        onChange={(value) => {
          handleInput("carType", value);
        }}
      />
      <Fields.Text
        label="차주"
        value={form.owner}
        onChange={(value) => {
          handleInput("owner", value);
        }}
      />
      <Fields.Text
        label="연락처"
        value={form.contact}
        onChange={(value) => {
          handleInput("contact", value);
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
      <Fields.Dropdown
        value={form.period}
        label="기간"
        items={[
          { label: "30분", value: "30M" },
          { label: "1시간", value: "1H" },
          { label: "1일", value: "1D" },
        ]}
        onChange={(value) => {
          handleInput("period", value);
        }}
      />
      <Fields.DatePicker
        label="판매 일자"
        value={moment(form.soldDate)}
        onChange={(value) => {
          handleInput("soldDate", value);
        }}
      />
      <Fields.DatePicker
        label="주차 일자"
        value={moment(form.parkingDate)}
        onChange={(value) => {
          handleInput("parkingDate", value);
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
    </FormModal>
  );
};

export default CreateModal;
