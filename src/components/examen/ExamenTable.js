import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Divider, Pagination, Button } from 'antd';
import moment from 'moment';
import { examenStartActive, examenStartListPages } from '../../actions/examen';
import { uiStartOpenModal } from '../../actions/ui';

const totalPage = 5;

export const ExamenTable = () => {
  const dispatch = useDispatch();
  const { examenes } = useSelector((state) => state.examen);
  const { paginator } = useSelector((state) => state.ui);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch(examenStartListPages(0, totalPage));
  }, [dispatch]);

  const showTotal = () => {
    return `Total  de ${paginator.total} examenes`;
  };

  const handleEditar = (id) => {
    const examen = examenes.find((a) => a.id === id);
    dispatch(examenStartActive(examen));
    dispatch(uiStartOpenModal());
  };
  const handleDelete = () => {};

  const onChange = (pageNumber) => {
    setCurrent(pageNumber);
    dispatch(examenStartListPages(pageNumber - 1, totalPage));
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      title: 'Fecha',
      dataIndex: 'createAt',
      render: (createAt) => {
        const noteDate = moment(createAt);
        return noteDate.format('MMMM Do YYYY, h:mm:ss a');
      },
    },
    {
      title: 'Editar',
      dataIndex: 'id',
      fixed: 'right',
      render: (id) => {
        return (
          <Button type='link' onClick={() => handleEditar(id)}>
            Editar
          </Button>
        );
      },
    },
    {
      title: 'Eliminar',
      dataIndex: 'id',
      fixed: 'right',
      render: (id) => {
        return (
          <Button danger type='text' onClick={() => handleDelete(id)}>
            Eliminar
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Divider />

      <Table
        columns={columns}
        dataSource={examenes}
        rowKey='id'
        pagination={false}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}>
        <Pagination
          current={current}
          total={paginator.total}
          onChange={onChange}
          defaultCurrent={1}
          showTotal={showTotal}
          pageSize={totalPage}
          defaultPageSize={totalPage}
        />
      </div>
    </div>
  );
};
