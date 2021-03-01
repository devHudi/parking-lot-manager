import { Link } from "react-router-dom";

import { Breadcrumb } from "antd";
import _ from "lodash";

const BreadcrumbWrapper = ({ items }) => {
  return (
    <Breadcrumb separator=">" style={{ "margin-bottom": "10px" }}>
      {_.map(items, (item) => {
        return (
          <Breadcrumb.Item>
            <Link to={item.link}>{item.text}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbWrapper;
