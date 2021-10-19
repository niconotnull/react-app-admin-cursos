import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Divider, Pagination, Button } from 'antd';
import Swal from 'sweetalert2';
import moment from 'moment';

import icono from '../../assets/images/usuario-upload.jpg';

import {
  alumnoStartActive,
  alumnoStartDelete,
  alumnoStartListPages,
} from '../../actions/alumno';
import { uiStartOpenModal } from '../../actions/ui';

const totalPage = 5;

export const AlumnoTable = () => {
  const dispatch = useDispatch();
  const { alumnos } = useSelector((state) => state.alumno);
  const { paginator } = useSelector((state) => state.ui);

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch(alumnoStartListPages(0, totalPage));
  }, [dispatch]);

  const onChange = (pageNumber) => {
    setCurrent(pageNumber);
    dispatch(alumnoStartListPages(pageNumber - 1, totalPage));
  };

  const showTotal = () => {
    return `Total  de ${paginator.total} alumnos`;
  };

  const handlePrueba = (id) => {
    const alumno = alumnos.find((a) => a.id === id);
    dispatch(alumnoStartActive(alumno));
    dispatch(uiStartOpenModal());
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar alumno!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(alumnoStartDelete(id));
        Swal.fire('Eliminado!', 'El alumno ha sido eliminado.', 'success');
      }
    });
  };

  const columns = [
    {
      title: 'Foto',
      dataIndex: 'urlFoto',
      render: (urlFoto) => {
        return (
          <img
            src={urlFoto !== null ? urlFoto : icono}
            className='pointer img-thumbanail  mg-circle-table'
            alt='imagen'
          />
        );
      },
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
    },
    {
      title: 'Email',
      dataIndex: 'email',
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
          <Button type='link' onClick={() => handlePrueba(id)}>
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
        dataSource={alumnos}
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
