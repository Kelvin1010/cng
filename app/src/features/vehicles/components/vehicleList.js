import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ResourceTable from '../../../core/components/resourceTable';
import { useCurrentUser } from '../../../core/hooks/ctx.hooks';
import { createVehicleFeldsSpec, mapToDto } from '../../../dto/vehicle.dto';

const { Link } = Typography;

const columns = [
  {
    title: 'Vehicle Name',
    dataIndex: 'name',
    width: '250px',
    render: (value) => value,
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Busy Slots',
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

const VehicleList = () => {
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
        addPermission={'System.Vehicles.Create'}
        updatePermission={'System.Vehicles.Update'}
        deletePermission={'System.Vehicles.Delete'}
        name={'Vehicles'}
        columns={columns}
        resource={`vehicles`}
        // query={query}
        fitParent
        filterOptionsList={filterOptionsList}
        allowSearch
        allowAddNew
        allowEdit={true}
        fieldsSpec={createVehicleFeldsSpec}
        mapToDto={mapToDto}
        pageSize={10}
      />
    </div>
  );
};

export default VehicleList;
