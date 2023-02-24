
import ResourceTable from '../../../core/components/resourceTable';

import {
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import BackupConfigForm from './backupConfigForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import ZModal from '../../../core/components/zModal';
import bimClient from '../../../core/connection/bimClient';
import { processMessage } from '../../../core/utils/message.utils';
import { deepCopy } from '../../../core/utils/object.util';
import { useTranslation } from 'react-i18next';
import { dateTime2String } from '../../../core/utils';

const BackupConfig = ({ onNewBackupConfig }) => {

  return (
    <Button
      icon={
        <PlusCircleOutlined
          style={{ color: 'green' }}
          onClick={onNewBackupConfig}
        />
      }
    />
  )
}

const BackupList = () => {
  const [rerender, setRerender] = useState(null);
  const { t } = useTranslation();
  const forceUpdate = useCallback(() => {
    console.log('forceUpdate');
    setRerender({})
  }, []);

  const columns = [
    {
      title: 'Backup file',
      dataIndex: 'backupFile',
      key: 'backupFile',
      width: '250px',
      render: (value) => value,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: '80px',
      render: (value) => value// dateTime2String(value),
    },
    {
      title: 'Restore',
      width: '80px',
      render: (record) => {
        return (
          <Popconfirm placement="topLeft" title={t('Are you sure?')} onConfirm={() => { restoreData(record.backupFile) }} okText={t('Yes')} cancelText={t("No")}>
            <a style={{ color: 'green', textDecorationLine: 'underline' }} >{t('restore')}</a>
          </Popconfirm>
        )
      }

    },
  ];

  const restoreData = (backupFile) => {
    bimClient.post('databaseBackup/restore', { backupFile }).then(json => {
      console.log(json);
      if (json.status === 200) {
        const data = json.data;
        if (data.error)
          processMessage(data);
        else {
          processMessage(`Your Restore Has Completed Successfully`);
          forceUpdate();
        }
      }
    });
  }

  const [modalVisible, setModalVisible] = useState(false);

  const editFormRef = useRef();

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const _renderConfigModal = () => {
    return (
      <>
        {modalVisible && (
          <ZModal
            modalWidth="50%"
            title={t('Database Backup')}
            visible={true}
            closeModal={closeModal}
            renderContent={() => (
              <BackupConfigForm ref={editFormRef}></BackupConfigForm>
            )}
            onOk={async () => {
              const backupType = editFormRef.current.getFieldValue('backupType');
              if (backupType === 0) {
                // TODO: manual backup and refresh
                bimClient.post('databaseBackup/manual', {}).then(json => {
                  if (json.status === 200) {
                    const data = json.data;
                    if (data.error)
                      processMessage(data);
                    else {
                      processMessage(`Your Backup Has Completed Successfully`);
                      forceUpdate();
                    }
                  }
                })
                return true;
              }

              try {
                const value = await editFormRef.current.validateFields();
              } catch (err) {
                console.log(err);
              }

              const numErrors = editFormRef.current.getFieldsError().filter(e => e.errors.length > 0).length;

              if (numErrors > 0)
                return false;

              const freq = editFormRef.current.getFieldValue('freq');
              const runAt = editFormRef.current.getFieldValue('runAt');
              console.log(freq, runAt);

              // TODO: auto backup
              bimClient.post('databaseBackup/auto', { freq, runAt }).then(json => {
                console.log(json);
              })

              return true;

            }}
          />
        )}
      </>
    );
  };

  const onNewBackupConfig = () => {
    openModal();
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <ResourceTable
        name={'Database Backups'}
        columns={columns}
        resource={`databaseBackup`}
        keyField={'key'}
        fitParent
        allowSearch
        pageSize={10}
        allowEdit={false}
        forceRerender={rerender}
        extras={
          <BackupConfig onNewBackupConfig={onNewBackupConfig}></BackupConfig>
        }
      />
      {_renderConfigModal()}

    </div>
  );
};

export default BackupList;
