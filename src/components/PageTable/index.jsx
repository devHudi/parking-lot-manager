import { useState } from "react";
import { Table, Button } from "antd";

import { SpaceBetween } from "components";

const PageTable = ({
  name,
  columns,
  data,
  noButtons,
  children,
  onAddClick,
  onRemoveClick,
  dataHandler,
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <>
      {!noButtons && (
        <SpaceBetween style={{ marginBottom: "10px" }}>
          <SpaceBetween.Box>
            <Button type="primary" onClick={onAddClick}>
              {name} 추가
            </Button>
            <Button type="danger" onClick={() => onRemoveClick(selected)}>
              선택 삭제
            </Button>
          </SpaceBetween.Box>
          <SpaceBetween.Box>{children}</SpaceBetween.Box>
        </SpaceBetween>
      )}

      {noButtons && (
        <SpaceBetween style={{ marginBottom: "10px" }}>
          <SpaceBetween.Box>{children}</SpaceBetween.Box>
        </SpaceBetween>
      )}

      <Table
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) =>
            setSelected(selectedRows),
        }}
        columns={columns}
        dataSource={dataHandler ? dataHandler(data) : data}
      />
    </>
  );
};

export default PageTable;