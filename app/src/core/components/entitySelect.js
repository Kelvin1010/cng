import { useEffect, useState } from "react";
import bimClient from '../connection/bimClient';
import { Select } from "antd";

import { removeVietnameseTones, normalize } from "../utils/strUtils";

const normalizeStr = (str) => {
  str = removeVietnameseTones(str);
  str = normalize(str);
  return str;
}

const Option = Select.Option;

const EntitySelect = (props) => { //multiple
  const { source, keyField, displayField, onSelect, searchFields, mode = 'single', value } = props;
  const [data, setData] = useState([]);
  const rerender = props.rerender;

  useEffect(() => {
    bimClient.get(source).then((json) => {
      if (json.status === 200) {
        let data = json.data.payload;
        setData(data)
      }
    })
  }, [source, keyField, displayField, rerender])

  const onChange = v => {
    if(onSelect) onSelect(v);
  };
  const filterOption = (v, option) => {
    const query = normalizeStr(v);
    var res = false;
    const displayVal = normalizeStr(option[displayField].toString());

    if (searchFields) {
      searchFields.forEach(s => {
        const sVal = normalizeStr(option[s].toString());
        res = res || sVal.includes(query);
      });
    }
    return res || displayVal.includes(query);
  };

  return(
    <Select
      // {...props}
      disabled={props.disabled}
      placeholder={props.placeholder}
      value={value}
      fieldNames={ {label: displayField, value: keyField} }
      showSearch
      allowClear
      mode={mode}
      notFoundContent={<div>Select..</div>}
      onChange={onChange}
      // onSearch={onSearch}
      filterOption={filterOption}
      style={{ width: props.width ? props.width : "100%" }}
      options={data}

      getPopupContainer={(triggerNode) => {
        return triggerNode.parentNode;
      }}
    >
    </Select>
  )
}

export default EntitySelect;