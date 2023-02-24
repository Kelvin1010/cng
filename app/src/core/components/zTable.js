import { forwardRef, useImperativeHandle, useRef } from 'react';

import { Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileSaver from "file-saver";
import { useReactToPrint } from 'react-to-print';


import './zTable.style.scss';

const xlsx = require('better-xlsx');

const ZTable = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const columns = props.columns;
  const translatedColumns = columns.map(c => {
    if(c){
      c.title = t(c.title);
      return c;
    }
  });
  const data = props.dataSource;
  const onSelectChange = props.onSelectChange;
  const fitParent = props.fitParent;
  const pageSize = props.pageSize;
  const selectMode = props.selectMode;
  const selectedRows = props.selectedRows;

  const onRowClick = props.onRowClick;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const _onSelectChange = (newSelectedRowKeys, selectedItems) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (onSelectChange) onSelectChange(newSelectedRowKeys, selectedItems);
  };
  const rowSelectionMulti = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: _onSelectChange,
  };

  const rowSelectionSingle = {
    type: 'radio',
    onChange: _onSelectChange,
  };

  const createXlsxHeader = (sheet) => {
    const style = new xlsx.Style();
    style.fill.patternType = 'solid';
    style.fill.fgColor = 'FF008B8B';
    style.fill.bgColor = 'FF008B8B';
    style.font.color = "FFE0FFFF";
    style.align.h = 'center';
    style.align.v = 'center';
    style.border.bottom = 'thin';
    style.border.left = 'thin';
    style.border.right = 'thin';
    style.border.top = 'thin';

    const row = sheet.addRow();

    const res = {};

    translatedColumns.forEach((c, indx) => {
      if (c.dataIndex) {
        const cell = row.addCell();
        cell.value = c.title;
        cell.style = style;
        res[indx] = c.key;
      }
    });
    return res;
  }

  const createXlsxTable = (sheet, columnMap) => {
    const style = new xlsx.Style();
    // style.fill.patternType = 'solid';
    // style.fill.fgColor = 'FF008B8B';
    // style.fill.bgColor = 'FF008B8B';
    // style.font.color = "FFE0FFFF";
    // style.align.h = 'center';
    // style.align.v = 'center';
    style.border.bottom = 'thin';
    style.border.left = 'thin';
    style.border.right = 'thin';
    style.border.top = 'thin';

    const keys = Object.keys(columnMap).sort();
    data.forEach(r => {
      const row = sheet.addRow();
      keys.forEach(k => {
        const cell = row.addCell();
        const colKey = columnMap[k];
        if (Object.prototype.toString.call(colKey) === '[object Array]') {
          var val = null;
          colKey.forEach(e => {
            val = val ? val[e] : r[e];
            cell.value = val;
          });
        } else
          cell.value = r[columnMap[k]];
        cell.style = style;
      });
    });
  }

  useImperativeHandle(ref, () => ({
    exportExcel(tableName, fileName) {
      console.log(translatedColumns);
      const file = new xlsx.File();
      const sheet = file.addSheet(tableName);
      const columnMap = createXlsxHeader(sheet);
      createXlsxTable(sheet, columnMap);

      file.saveAs('blob', true).then(function (data) {
        FileSaver.saveAs(data, fileName);
      }).catch(function (e) {
        console.error(e);
      });

    },
    print() {
      handlePrint();
    },
  }));

  useEffect(() => {
    if (selectedRows)
      setSelectedRowKeys(selectedRows);
  }, [selectedRows])

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={fitParent ? 'ztable-container' : ''}>
      <Table
        ref={componentRef}
        onChange={(event) => {
          console.log(event);
        }}
        rowSelection={selectMode == 'single' ? rowSelectionSingle : selectMode == 'multi'? rowSelectionMulti: undefined}
        columns={translatedColumns}
        dataSource={data}
        pagination={pageSize ? { pageSize: pageSize } : false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log(record);
              setSelectedRowKeys([rowIndex + 1]);
              if (onRowClick) onRowClick(record, rowIndex);
            },
          };
        }}
      ></Table>
    </div>
  );
});

export default ZTable;
