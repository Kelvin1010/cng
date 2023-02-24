import { Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import bimClient from "../connection/bimClient";
import { processMessage } from "../utils/message.utils";
import { singularize } from "../utils/wordUtils";

const PopDeleteConfirm = ({ children, resource, record, forceUpdate, onDeleted }) => {
  const {t} = useTranslation();
  const confirm = (event) => {
    console.log('Delete', record);
    const keyVal = record.id ? record.id : record.key;
    if (keyVal) {
      bimClient.delete(resource + '/' + keyVal).then(json => {
        if (json.status === 200) {
          if (onDeleted) {
            const res = json.data;
            res['deletedRecord'] = record;
            if (onDeleted) {
              onDeleted(res)
            }
            processMessage(`The ${singularize(resource)} successfully deleted`);
          }
          forceUpdate();
        }
      });
    }
  }
  return (
    <Popconfirm placement="topLeft" title={t('Are you sure?')} onConfirm={confirm} okText={t("Yes")} cancelText={t("No")}>
      {children}
    </Popconfirm>
  )
}

export default PopDeleteConfirm;