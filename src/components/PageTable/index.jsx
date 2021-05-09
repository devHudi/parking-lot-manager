import { useState } from "react";
import { Table, Button, Select, Input } from "antd";
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
  const [searchColumn, setSearchColumn] = useState(columns[0].dataIndex);
  const [search, setSearch] = useState("");

  const keyData = data
    ? data.map((row) => ({ ...row, key: JSON.stringify(row) }))
    : [];

  const filteredData =
    search !== ""
      ? keyData.filter(
          (row) => String(row[searchColumn]).indexOf(search) !== -1
        )
      : keyData;

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

      <SpaceBetween
        style={{ marginTop: "10px", marginBottom: noButtons ? "0" : "10px" }}
      >
        <SpaceBetween.Box>
          <>
            <Select
              defaultValue={searchColumn}
              style={{ width: "100px" }}
              onChange={(value) => setSearchColumn(value)}
            >
              {columns.map((column) => (
                <Select.Option value={column.dataIndex}>
                  {column.title}
                </Select.Option>
              ))}
            </Select>
            <Input
              placeholder="검색어"
              allowClear
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              enterButton
            />
          </>
        </SpaceBetween.Box>
      </SpaceBetween>

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
        dataSource={dataHandler ? dataHandler(filteredData) : filteredData}
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
