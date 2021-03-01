import {
  Input,
  InputNumber,
  Select,
  DatePicker as AntDatePicker,
  Checkbox as AntCheckbox,
  Typography,
} from "antd";
import moment from "moment";

const TitleWrapper = ({ label, children }) => {
  return (
    <div style={{ width: "100%" }}>
      <Typography.Text> {label} </Typography.Text>
      {children}
    </div>
  );
};

const Text = ({ label, onChange, ...props }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <TitleWrapper label={label}>
      <Input onChange={handleChange} style={{ width: "100%" }} {...props} />
    </TitleWrapper>
  );
};

const Number = ({ label, onChange, ...props }) => {
  return (
    <TitleWrapper label={label}>
      <InputNumber
        min={0}
        defaultValue={1}
        style={{ width: "100%" }}
        onChange={onChange}
        {...props}
      />
    </TitleWrapper>
  );
};

const Dropdown = ({ items, label, onChange, ...props }) => {
  return (
    <TitleWrapper label={label}>
      <Select
        defaultValue={items[0].value}
        style={{ width: "100%" }}
        onChange={onChange}
        {...props}
      >
        {items.map((item) => (
          <Select.Option value={item.value}>{item.label}</Select.Option>
        ))}
      </Select>
    </TitleWrapper>
  );
};

const DatePicker = ({ label, onChange, ...props }) => {
  const dateFormat = "YYYY-MM-DD";
  return (
    <TitleWrapper label={label}>
      <AntDatePicker
        style={{ width: "100%" }}
        selected={moment().format(dateFormat)}
        onChange={onChange}
        {...props}
      />
    </TitleWrapper>
  );
};

const CheckBox = ({ label, children, onChange, ...props }) => {
  return (
    <TitleWrapper label={label}>
      <AntCheckbox
        style={{ width: "100%" }}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      >
        {children}
      </AntCheckbox>
    </TitleWrapper>
  );
};

export default {
  Text,
  Number,
  Dropdown,
  DatePicker,
  CheckBox,
};
