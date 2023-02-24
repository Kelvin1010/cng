import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ResourceTable from '../../../core/components/resourceTable';
import { useCurrentUser } from '../../../core/hooks/ctx.hooks';
import { createDriverFeldsSpec, mapToDto } from '../../../dto/driver.dto';

const { Link } = Typography;

const columns = [
  {
    title: 'Driver Name',
    dataIndex: 'name',
    width: '250px',
    render: (value) => value,
  },
  {
    title: 'Address',
    dataIndex: 'address',
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
    title: 'Phone',
    dataIndex: 'phone',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'busySlots',
    dataIndex: 'busySlots',
    width: '80px',
    render: (value) => value,
  },
];

const filterOptionsList = [
  // {
  //   field: 'roleId',
  //   Options: { source: 'roles?type=1', keyField: 'id', displayField: 'name' },
  //   ColorMap: groupColorMap,
  //   placeHolder: 'Group: All',
  // },
];

const DriverList = () => {
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
        addPermission={'System.Drivers.Create'}
        updatePermission={'System.Drivers.Update'}
        deletePermission={'System.Drivers.Delete'}
        name={'Drivers'}
        columns={columns}
        resource={`drivers`}
        // query={query}
        fitParent
        filterOptionsList={filterOptionsList}
        allowSearch
        allowAddNew
        allowEdit={true}
        fieldsSpec={createDriverFeldsSpec}
        mapToDto={mapToDto}
        pageSize={10}
      />
    </div>
  );
};

export default DriverList;
