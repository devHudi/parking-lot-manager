import { useState } from "react";
import moment from "moment";

import { paidTickets, rooms } from "apis";
import { nullCheck } from "utils/formCheck";

import { FormModal, Fields } from "components";

const CreateModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({
    roomId: "",
    payMethod: "cash",
    depositor: "",
    bank: "",
    period: "30M",
    amount: 0,
    proof: "taxBill",
    soldDate: new Date(),
    isRnE: false,
    RCM: "R",
    memo: "",
  });

  const clearForm = () => {
    setForm({
      roomId: "",
      payMethod: "cash",
      depositor: "",
      bank: "",
      period: "30M",
      amount: 0,
      proof: "taxBill",
      soldDate: new Date(),
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
      roomId,
      payMethod,
      depositor,
      bank,
      period,
      amount,
      proof,
      soldDate,
      isRnE,
      RCM,
      memo,
    } = form;

    if (!nullCheck(form)) {
      alert("모든 내용을 채워주세요.");
      return;
    }

    const isExists = rooms.isExists(roomId);
    if (isExists) {
      paidTickets.create(
        roomId,
        payMethod,
        payMethod === "cash" ? depositor : null,
        bank,
        period,
        amount,
        proof,
        soldDate,
        isRnE,
        RCM,
        memo
      );
    } else {
      alert("해당 호실이 존재하지 않습니다. 호실 입력을 다시 확인해주세요.");
    }

    alert("주차권이 추가되었습니다.");

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
      <Fields.DatePicker
        label="판매 일자"
        value={moment(form.soldDate)}
        onChange={(value) => {
          handleInput("soldDate", value);
        }}
      />
      <Fields.Text
        label="호실"
        value={form.roomId}
        onChange={(value) => {
          handleInput("roomId", value);
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
        label="주차권"
        items={[
          { label: "무료", value: "FREE" },
          { label: "30분", value: "30M" },
          { label: "1시간", value: "1H" },
          { label: "1일", value: "1D" },
          { label: "공사차량", value: "WORK" },
        ]}
        onChange={(value) => {
          handleInput("period", value);
        }}
      />
      <Fields.Number
        label="개수"
        value={form.amount}
        onChange={(value) => {
          handleInput("amount", value);
        }}
      />
      <Fields.Dropdown
        value={form.proof}
        label="지출 증빙"
        items={[
          { label: "세금계산서", value: "taxBill" },
          { label: "현금영수증", value: "cashReceipt" },
          { label: "기타", value: "etc" },
        ]}
        onChange={(value) => {
          handleInput("proof", value);
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
