import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ResourceTable from '../../../core/components/resourceTable';
import { useCurrentUser } from '../../../core/hooks/ctx.hooks';
import { editRoleFeldsSpec, mapToDto } from '../../../dto/role.dto';

const { Link } = Typography;

const groupMap = { Admin: 'Admin', Users: 'Users' };

const groupOptions = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Users',
    label: 'Users',
  },
];
const groupColorMap = { Admin: 'red', Users: 'green' };

const statusMap = { false: 'InActive', true: 'Active' };
const typeMap = { 0: 'System', 1: 'Project' };

const statusOptions = [
  {
    value: false,
    label: 'In Active',
  },
  {
    value: true,
    label: 'Active',
  },
];

const statusColorMap = { false: 'red', true: 'green' };


const columns = [
  {
    title: 'Role Name',
    dataIndex: 'name',
    width: '250px',
    render: (value) => value,
  },
  // {
  //   title: 'key',
  //   dataIndex: 'normName',
  //   width: '80px',
  //   render: (value) => value,
  // },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '80px',
    render: (value) => {
      return (
        <Tag color={statusColorMap[value]}>
          {typeMap[value]}
        </Tag>
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'active',
    width: '80px',
    render: (value) => {
      return (
        <Tag color={statusColorMap[value]}>
          {statusMap[value]}
        </Tag>
      )
    },
  },
];

const filterOptionsList = [
  {
    Options: groupOptions,
    ColorMap: groupColorMap,
    placeHolder: 'Group: All',
  },
];

const RoleList = () => {
  const currentuser = useCurrentUser();
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
        ctx={{ creatorId: currentuser.id }}
        name={'Roles'}
        columns={columns}
        resource={`roles`}
        fitParent
        filterOptionsList={filterOptionsList}
        allowSearch
        allowAddNew
        allowEdit={true}
        fieldsSpec={editRoleFeldsSpec}
        mapToDto={mapToDto}
        pageSize={10}
      />
    </div>
  );
};

export default RoleList;
