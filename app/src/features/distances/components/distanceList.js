import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ResourceTable from '../../../core/components/resourceTable';
import { useCurrentUser } from '../../../core/hooks/ctx.hooks';
import { createDistanceFeldsSpec, mapToDto } from '../../../dto/distance.dto';

const { Link } = Typography;

const columns = [
  {
    title: 'From',
    dataIndex: 'fromPointId',
    width: '250px',
    render: (value) => value,
  },
  {
    title: 'To',
    dataIndex: 'toPointId',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Length',
    dataIndex: 'length',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'TimeToTravel',
    dataIndex: 'timeToTravel',
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

const DistanceList = () => {
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
        addPermission={'System.Distances.Create'}
        updatePermission={'System.Distances.Update'}
        deletePermission={'System.Distances.Delete'}
        name={'Distances'}
        columns={columns}
        resource={`distances`}
        // query={query}
        fitParent
        filterOptionsList={filterOptionsList}
        allowSearch
        allowAddNew
        allowEdit={true}
        fieldsSpec={createDistanceFeldsSpec}
        mapToDto={mapToDto}
        pageSize={10}
      />
    </div>
  );
};

export default DistanceList;
