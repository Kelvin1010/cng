import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ResourceTable from '../../../core/components/resourceTable';
import { useCurrentUser } from '../../../core/hooks/ctx.hooks';
import { createRequestFeldsSpec, mapToDto } from '../../../dto/request.dto';

const { Link } = Typography;

const columns = [
  {
    title: 'Customer',
    dataIndex: 'customerId',
    width: '250px',
    render: (value) => value,
  },
  {
    title: 'Demand',
    dataIndex: 'demand',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Erliest Time',
    dataIndex: 'erliestTime',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Latest Time',
    dataIndex: 'latestTime',
    width: '80px',
    render: (value) => value,
  },
  {
    title: 'Request Time',
    dataIndex: 'requestTime',
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

const RequestList = () => {
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
        addPermission={'System.Requests.Create'}
        updatePermission={'System.Requests.Update'}
        deletePermission={'System.Requests.Delete'}
        name={'Requests'}
        columns={columns}
        resource={`requests`}
        // query={query}
        fitParent
        filterOptionsList={filterOptionsList}
        allowSearch
        allowAddNew
        allowEdit={true}
        fieldsSpec={createRequestFeldsSpec}
        mapToDto={mapToDto}
        pageSize={10}
      />
    </div>
  );
};

export default RequestList;
