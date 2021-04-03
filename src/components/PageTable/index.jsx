import { useState } from "react";
import { Table, Button } from "antd";
import { FileAddOutlined, DeleteOutlined } from "@ant-design/icons";

import { SpaceBetween } from "components";

const PageTable = ({
  name,
  columns,
  data,
  noButtons,
  noSelection,
  children,
  onAddClick,
  onRemoveClick,
  onRowClick,
  dataHandler,
}) => {
  const [selected, setSelected] = useState([]);

  const keyData = data
    ? data.map((row) => ({ ...row, key: JSON.stringify(row) }))
    : [];

  return (
    <>
      {!noButtons && (
        <SpaceBetween style={{ marginBottom: "10px" }}>
          <SpaceBetween.Box>
            {onAddClick && (
              <Button
                type="primary"
                icon={<FileAddOutlined />}
                onClick={onAddClick}
              >
                {name} 추가
              </Button>
            )}
            {onRemoveClick && (
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => onRemoveClick(selected)}
              >
                선택 삭제
              </Button>
            )}
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
        style={{
          minWidth: "1050px",
        }}
        rowSelection={
          !noSelection && {
            onChange: (selectedRowKeys, selectedRows) =>
              setSelected(selectedRows),
          }
        }
        columns={columns}
        dataSource={dataHandler ? dataHandler(keyData) : keyData}
        onRow={(record, rowIndex) => ({
          onClick: onRowClick
            ? () => onRowClick({ rowIndex, ...record })
            : () => {
                console.log({ rowIndex, ...record });
              },
        })}
      />
    </>
  );
};

export default PageTable;
