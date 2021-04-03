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
    payMethod: "",
    period: "",
    soldDate: moment(),
    parkingDate: moment(),
    memo: "",
  });

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
      period,
      soldDate,
      parkingDate,
      memo,
    } = form;

    paidTickets.create(
      carNumber,
      carType,
      owner,
      contact,
      payMethod,
      period,
      soldDate,
      parkingDate,
      memo
    );
    onClose();
  };

  const handleCancel = () => {
    console.log(form);
    alert("Cancel");
    onClose();
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
        onChange={(value) => {
          handleInput("carNumber", value);
        }}
      />
      <Fields.Text
        label="차종"
        onChange={(value) => {
          handleInput("carType", value);
        }}
      />
      <Fields.Text
        label="차주"
        onChange={(value) => {
          handleInput("owner", value);
        }}
      />
      <Fields.Text
        label="연락처"
        onChange={(value) => {
          handleInput("contact", value);
        }}
      />
      <Fields.Dropdown
        value={form.payMethod}
        label="납부 방법"
        items={[
          { label: "카드", value: "card" },
          { label: "현금", value: "cash" },
        ]}
        onChange={(value) => {
          handleInput("payMethod", value);
        }}
      />
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
      <Fields.Text
        label="납부 은행"
        onChange={(value) => {
          handleInput("bank", value);
        }}
      />
      <Fields.DatePicker
        label="판매 일자"
        onChange={(value) => {
          handleInput("soldDate", value);
        }}
      />
      <Fields.DatePicker
        label="주차 일자"
        onChange={(value) => {
          handleInput("parkingDate", value);
        }}
      />
      <Fields.Text
        label="비고"
        onChange={(value) => {
          handleInput("memo", value);
        }}
      />
    </FormModal>
  );
};

export default CreateModal;
