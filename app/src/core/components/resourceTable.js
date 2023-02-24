import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import ZTable from './zTable';
import bimClient from '../connection/bimClient';
import '../utils/arrayUtils';
import { Input, Space } from 'antd';
import ZSelect from './zSelect';

import {
  PlusCircleOutlined,
  EditFilled,
  DeleteFilled,
  FileExcelOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import ZModal from './zModal';
import ZForm from '../components/form/zForm';

import { singularize, titleize } from '../utils/wordUtils';
import PopDeleteConfirm from './popDeleteConfirm';
import { processMessage } from '../utils/message.utils';
import { useIsGranted } from '../hooks/auth.hooks';
import EntitySelect from './entitySelect';
import { useTranslation } from 'react-i18next';

const { Search } = Input;

const ResourceTable = ({ ctx, addPermission, deletePermission, updatePermission, allowSearch, extras, extendResource, mapToDto, ...props }) => {
  const tableRef = useRef(null);

  const [data, setData] = useState([]);
  const selectedRows = props.selectedRows;
  const [selectedRowKeys, setSelectedRowKeys] = useState(null);
  const [rerender, setRerender] = useState(null);
  const forceRerender = props.forceRerender;
  const forceUpdate = useCallback(() => {
    console.log('forceUpdate');
    setRerender({})
  }, []);


  const { t, i18n } = useTranslation();

  const [filters, setFilters] = useState({});

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (props.onSelectChange) {
      props.onSelectChange(newSelectedRowKeys, selectedRows);
    }
  };

  const tableName = props.name;

  const selectMode = props.selectMode ? props.selectMode : undefined; //'single'

  const resource = props.resource;
  const query = props.query ? '?' + props.query : '';
  const fitParent = props.fitParent ? props.fitParent : false;
  const pageSize = props.pageSize;
  const keyField = props.keyField ? props.keyField : 'id';
  const groupBy = props.groupBy ? props.groupBy : null;
  const reduceBy = props.reduceBy ? props.reduceBy : 'revision';
  const mapData = props.mapData ? props.mapData : null;
  const filterOptionsList = props.filterOptionsList
    ? props.filterOptionsList
    : [];
  const allowAddNew = props.allowAddNew;
  const allowExport = props.allowExport;
  const fieldsSpecForEdit = props.fieldsSpec ?? [];
  const [fields, setFields] = useState(fieldsSpecForEdit);
  const [modalVisible, setModalVisible] = useState(false);
  const columnsProp = props.columns;
  const enableActions = props.enableActions ? props.enableActions : 'true';
  const allowEdit = props.allowEdit !== undefined ? props.allowEdit : true;
  const allowDelete = props.allowDelete ? props.allowDelete : true;
  const onRowClick = props.onRowClick;

  const [columns, setColumns] = useState(columnsProp);

  const [selectedRowData, setSelectedRowData] = useState(null);

  const onRecordUpdated = props.onRecordUpdated;
  const onNewRecordAdded = props.onNewRecordAdded;
  const onRecordDeleted = props.onRecordDeleted;

  const editFormRef = useRef();

  const [queryString, setQueryString] = useState(query);

  useEffect(() => {
    setQueryString(query)
  }, [query])

  const closeModal = useCallback(() => {
    setModalVisible(false);
    editFormRef.current.resetFields();
    setSelectedRowData(null);
  }, []);
  const openModal = useCallback(() => {
    // editFormRef.current?.resetFields()
    if (selectedRowData) {

    }
    setModalVisible(true);
  }, [selectedRowData]);

  useEffect(() => {
    setSelectedRowKeys(selectedRows);
  }, [selectedRows])

  useEffect(() => {
    var _queryString = query;
    Object.keys(filters).forEach(k => {
      if (filters[k] && (filters[k] instanceof Array ? filters[k].length > 0 : true))
        _queryString = ((!_queryString) ? '?' : '') + _queryString + (_queryString.endsWith('&') ? '' : '&') + `${k}=${filters[k]}&`
    });
    // _queryString = _queryString ? `?${_queryString}` : ''
    setQueryString(_queryString);
  }, [filters])

  useEffect(() => {
    if (fieldsSpecForEdit.length > 0) {
      var managedFields = fieldsSpecForEdit.map((f) => {
        const _f = { ...f };
        if (!_f.label && _f.name)
          _f.label = _f.name
        _f.onChange = (name, value) => {
          console.log('managed field onChange', name, value);
        };
        // _f.defaultValue = 
        return _f;
      });

      setFields(managedFields);
    }
  }, [fieldsSpecForEdit]);

  const _renderHeader = () => {
    const addGranted = useIsGranted(addPermission);
    return (
      <div style={{ display: 'flex' }}>
        {<h4>{t(tableName)}</h4>}

        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.25rem',
          }}
        >
          {allowAddNew && addGranted && (
            <Button
              icon={
                <PlusCircleOutlined
                  style={{ color: 'green' }}
                  onClick={onAddNew}
                />
              }
            />
          )}

          {allowExport && (
            <>
              <Button
                icon={
                  <FileExcelOutlined
                    style={{ color: 'green' }}
                    onClick={onExportExcel}
                  />
                }
              />
              <Button
                icon={
                  <PrinterOutlined
                    style={{ color: 'green' }}
                  onClick={onPrint}
                  />
                }
              />

            </>
          )}

          {extras}

          {fields.length > 0 && _renderEditModal()}
        </div>
      </div>
    );
  };

  const _renderEditModal = () => {
    var title = resource;
    title = title.split('?')[0]
    title = (selectedRowData ? t('Edit') + ' ' : t('Add new') + ' ') + t(singularize(title));
    title = titleize(title);
    return (
      <>
        {modalVisible && (
          <ZModal
            title={title}
            visible={true}
            closeModal={closeModal}
            renderContent={() => (
              <ZForm
                name={tableName}
                ref={editFormRef}
                fieldsSpec={fields}
                data={selectedRowData}
              ></ZForm>
            )}
            onOk={async () => {
              try {
                const value = await editFormRef.current.validateFields();
              } catch (err) {
                console.log(err);
              }

              const numErrors = editFormRef.current.getFieldsError().filter(e => e.errors.length > 0).length;

              if (numErrors > 0)
                return false;

              if (mapToDto) {
                const values = fields.map((e) => {
                  return { name: e.name, value: editFormRef.current.getFieldValue(e.name) }
                })
                const valueDict = {}
                values.forEach(e => {
                  valueDict[e.name] = e.value
                });
                const dto = mapToDto(ctx, valueDict);
                if (dto[keyField]) {
                  const res = await bimClient.put(resource, dto);
                  const data = res.data;
                  if (data.error)
                    processMessage(data);
                  else {
                    processMessage(`The ${singularize(resource)} successfully updated`);
                    if (onRecordUpdated) { onRecordUpdated(data) }
                    forceUpdate();
                    return true;
                  }
                }
                else {
                  const res = await bimClient.post(resource, dto);
                  const data = res.data;
                  if (data.error)
                    processMessage(data);
                  else {
                    processMessage(`The ${singularize(title)} successfully added`);
                    if (onNewRecordAdded) { onNewRecordAdded(data) }
                    forceUpdate()
                    return true;
                  }
                }
              }
              else {
                // const dueDate = editFormRef.current.getFieldValue('assignedToId');
                // console.log(dueDate);
                //TODO: post to source directly
              }
              return false;
            }}
          />
        )}
      </>
    );
  };

  const _renderFilters = () => {
    return (
      <div
        style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}
      >
        {allowSearch && (
          <Search style={{ width: 200 }} placeholder={'Contain text'}
            onSearch={(val) => {
              const _filters = { ...filters }
              if (val)
                _filters['search'] = val;
              else
                delete _filters['search']
              setFilters(_filters);
            }}
          ></Search>
        )}

        {filterOptionsList &&
          filterOptionsList.map(
            (e, index) => {
              if (e.Options?.source) {
                return (
                  <EntitySelect
                    key={index}
                    width={160}
                    mode="multiple"
                    source={e.Options.source}
                    keyField={e.Options.keyField}
                    displayField={e.Options.displayField}
                    placeholder={e.placeHolder}
                    onSelect={(val) => {
                      const _filters = { ...filters }
                      if (val)
                        _filters[e.field] = val;
                      else
                        delete _filters[e.field]
                      setFilters(_filters);
                    }}
                  ></EntitySelect>
                )
              } else
                return (
                  <ZSelect
                    key={index}
                    width={160}
                    placeholder={e.placeHolder}
                    options={e.Options}
                    colormap={e.ColorMap}
                    onChange={(val) => {
                      const _filters = { ...filters }
                      if (val)
                        _filters[e.field] = val;
                      else
                        delete _filters[e.field]
                      setFilters(_filters);
                    }}
                  ></ZSelect>
                )
            }
          )
        }
      </div>
    );
  };

  const onAddNew = () => {
    openModal();
  };

  const onExportExcel = () => {
    tableRef.current.exportExcel(tableName, tableName + '.xlsx');
  };

  const onPrint = () => {
    tableRef.current.print();
  }

  const onEdit = (rowData) => {
    setSelectedRowData(rowData);
    openModal();
  };

  var editGranted = useIsGranted(updatePermission);
  var deleteGranted = useIsGranted(deletePermission);

  useEffect(() => {
    if (enableActions === 'true') {
      const actionCol = {
        title: 'Action',
        key: 'key',
        width: '150px',
        render: (_, record) => (
          <>
            {!record.notAllowAction && (
              <Space size="small">
                {allowEdit && editGranted && <Button
                  size="small"
                  style={{ border: 0 }}
                  icon={
                    <EditFilled
                      style={{ color: 'gray' }}
                      onClick={() => {
                        onEdit(record);
                      }}
                    />
                  }
                />}
                {
                  deleteGranted && <PopDeleteConfirm resource={resource}
                    record={record}
                    forceUpdate={forceUpdate}
                    onDeleted={(data) => {
                      if (onRecordDeleted)
                        onRecordDeleted(data)
                    }}>
                    <Button
                      size="small"
                      style={{ border: 0 }}
                      icon={
                        <DeleteFilled
                          style={{ color: 'red' }}
                          onClick={() => {
                            // forceUpdate();
                          }}
                        />
                      }
                    />
                  </PopDeleteConfirm>
                }
              </Space>
            )}
          </>
        ),
      };
      const _columns = [...columnsProp];
      _columns.push(actionCol);
      setColumns(_columns);
    }
  }, [enableActions]);

  useEffect(() => {
    if (resource)
      bimClient.get(resource + queryString).then((json) => {
        if (json.status === 200) {
          let data = json.data.payload;
          // Map data
          if (mapData) {
            data = data.map((x) => mapData(x));
          }
          // nhcuongit Concat extend resource
          if (extendResource) {
            const extendData = extendResource();
            if (extendData && extendData.length > 0) {
              data = [...extendData, ...data];
            }
          }
          let mappedData = data.map((x) => {
            const res = { ...x, key: x[keyField] };
            return res;
          });
          let res = mappedData;
          if (groupBy) {
            mappedData = Array.prototype.groupBy(mappedData, groupBy);

            res = [];
            for (const [key, value] of Object.entries(mappedData)) {
              if (value.length > 1) {
                let maxObj = value.reduce((max, obj) =>
                  max[reduceBy] > obj[reduceBy] ? max : obj
                );
                res.push(maxObj);
              } else if (value.length > 0) {
                res.push(value[0]);
              }
            }
          }

          setData(res);
        }
      });
  }, [resource, queryString, rerender, forceRerender]);

  return (
    <>
      {/* Render table name and toolbar */}
      {!props.simpleTable && _renderHeader(forceUpdate)}

      {/* Render search box and filter controls */}
      {!props.simpleTable && _renderFilters()}

      <ZTable
        ref={tableRef}
        selectedRows={selectedRowKeys}
        onSelectChange={onSelectChange}
        onRowClick={onRowClick}
        columns={columns}
        dataSource={data}
        fitParent={fitParent}
        pageSize={pageSize}
        selectMode={selectMode}
      />
    </>
  );
};

export default ResourceTable;