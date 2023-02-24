import React, { useState, useMemo } from "react";

import List from "devextreme-react/list";
import ArrayStore from "devextreme/data/array_store";

const ListView = (props) => {
  const itemRender = props.itemRender;
  const groupRender = props.groupRender;
  const data = props.data;
  const listAttrs = props.listAttrs;
  const itemKeyField = props.itemKeyField;
  const groupBy = props.groupBy;
  const searchExpr = props.searchExpr;
  const showSelectionControls = props.showSelectionControls;
  const searchEnabled = props.searchEnabled;

  const dataSourceOptions = useMemo(() => {
    return {
      store: new ArrayStore({
        data,
        key: itemKeyField,
      }),
      group: groupBy ? groupBy : "",
      searchExpr: searchExpr,
    };
  }, [data]);

  const [selectedItemKeys, setSelectedItemKeys] = useState([]);

  const onListSelectionChange = (e) => {
    const currentItem = e.addedItems[0];
    if (currentItem) setSelectedItemKeys([currentItem[itemKeyField]]);
    if (props.listSelectionChangeHandler) props.listSelectionChangeHandler(e);
  };

  return (
    <>
      <List
        showSelectionControls={showSelectionControls}
        selectionMode="multiple"
        dataSource={dataSourceOptions}
        grouped={groupBy ? true : false}
        searchEnabled={searchEnabled}
        selectedItemKeys={selectedItemKeys}
        onSelectionChanged={onListSelectionChange}
        itemRender={itemRender}
        groupRender={groupRender}
        elementAttr={listAttrs}
      />
    </>
  );
};

export default ListView;
