import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ResourceTable from '../../../core/components/resourceTable';
import { useCurrentUser } from '../../../core/hooks/ctx.hooks';
import { editUserFeldsSpec, mapToDto } from '../../../dto/user.dto';

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
    title: 'Full Name',
    dataIndex: 'fullName',
    width: '250px',
    render: (value) => value,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Status',
    dataIndex: 'active',
    width: '80px',
    render: (value) => {
      console.log(value);
      return (
        <Tag color={statusColorMap[value]}>
          {statusMap[value]}
        </Tag>
      )
    },
  },
  // TODO Add user roles
  // {
  //   title: 'Group Name',
  //   dataIndex: 'Group',
  //   width: '120px',
  //   render: (_, { Group }) => (
  //     <Tag color={groupColorMap[Group]} key={Group}>
  //       {groupMap[Group]}
  //     </Tag>
  //   ),
  // },
];

const filterOptionsList = [
  {
    Options: groupOptions,
    ColorMap: groupColorMap,
    placeHolder: 'Group: All',
  },
];

const UserList = () => {
  const currentUser = useCurrentUser();
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
        ctx={{ creatorId: currentUser.id }}
        name={'Users'}
        columns={columns}
        resource={`users`}
        fitParent
        filterOptionsList={filterOptionsList}
        allowSearch
        // allowAddNew
        allowEdit={true}
        fieldsSpec={editUserFeldsSpec}
        mapToDto={mapToDto}
        pageSize={10}
      />
    </div>
  );
};

export default UserList;
