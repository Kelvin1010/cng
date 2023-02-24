import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ResourceTable from '../../../core/components/resourceTable';
import { useCurrentUser } from '../../../core/hooks/ctx.hooks';
import { createPointFeldsSpec, mapToDto } from '../../../dto/point.dto';

const { Link } = Typography;

const columns = [
  {
    title: 'Point Name',
    dataIndex: 'name',
    width: '250px',
    render: (value) => value,
  },
  {
    title: 'Lon',
    dataIndex: 'lon',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Lat',
    dataIndex: 'lat',
    width: '80px',
    render: (value) => value,
  },
];

const filterOptionsList = [
];

const PointList = () => {
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
        addPermission={'System.Points.Create'}
        updatePermission={'System.Points.Update'}
        deletePermission={'System.Points.Delete'}
        name={'Points'}
        columns={columns}
        resource={`points`}
        // query={query}
        fitParent
        filterOptionsList={filterOptionsList}
        allowSearch
        allowAddNew
        allowEdit={true}
        fieldsSpec={createPointFeldsSpec}
        mapToDto={mapToDto}
        pageSize={10}
      />
    </div>
  );
};

export default PointList;
