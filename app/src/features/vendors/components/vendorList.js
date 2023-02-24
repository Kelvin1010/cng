import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ResourceTable from '../../../core/components/resourceTable';
import { useCurrentUser } from '../../../core/hooks/ctx.hooks';
import { createVendorFeldsSpec, mapToDto } from '../../../dto/vendor.dto';

const { Link } = Typography;

const columns = [
  {
    title: 'Vendor Name',
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
    title: 'avgLoadingTimePerM3',
    dataIndex: 'avgLoadingTimePerM3',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'avgProductivity',
    dataIndex: 'avgProductivity',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'maxVehiclePerTime',
    dataIndex: 'maxVehiclePerTime',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'avgLoadingTimePerVehicle',
    dataIndex: 'avgLoadingTimePerVehicle',
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

const VendorList = () => {
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
        addPermission={'System.Vendors.Create'}
        updatePermission={'System.Vendors.Update'}
        deletePermission={'System.Vendors.Delete'}
        name={'Vendors'}
        columns={columns}
        resource={`vendors`}
        // query={query}
        fitParent
        filterOptionsList={filterOptionsList}
        allowSearch
        allowAddNew
        allowEdit={true}
        fieldsSpec={createVendorFeldsSpec}
        mapToDto={mapToDto}
        pageSize={10}
      />
    </div>
  );
};

export default VendorList;
