import { Table, Divider, Pagination, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  cursoStartActive,
  cursoStartById,
  cursoStartDelete,
  cursoStartListPages,
} from '../../actions/cursos';
import {
  uiStartOpenModal,
  uiStartOpenModalAlumno,
  uiStartOpenModalExamen,
} from '../../actions/ui';

const totalPage = 5;

export const CursosTable = () => {
  const dispatch = useDispatch();
  const { cursos } = useSelector((state) => state.curso);
  const { paginator } = useSelector((state) => state.ui);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch(cursoStartListPages(0, totalPage));
  }, [dispatch]);

  const showTotal = () => {
    return `Total  de ${paginator.total} alumnos`;
  };

  const showTotalAlumnos = (id) => {
    const curso = cursos.find((e) => e.id === id);
    return curso.alumnos?.length;
  };

  const onChange = (pageNumber) => {
    setCurrent(pageNumber);
    dispatch(cursoStartListPages(pageNumber - 1, totalPage));
  };

  const handleEditar = (id) => {
    const curso = cursos.find((a) => a.id === id);
    dispatch(cursoStartActive(curso));
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
      confirmButtonText: 'Si, eliminar el curso!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cursoStartDelete(id));
        Swal.fire('Eliminado!', 'El curso ha sido eliminado.', 'success');
      }
    });
  };

  const handleAddAlumnos = (id) => {
    dispatch(cursoStartById(id));
    dispatch(uiStartOpenModalAlumno());
  };

  const handleAddExamens = (id) => {
    dispatch(cursoStartById(id));
    dispatch(uiStartOpenModalExamen());
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      title: 'Alumnos',
      dataIndex: 'id',
      render: (id) => {
        return (
          <Button type='link' onClick={() => handleAddAlumnos(id)}>
            Agregar Alumnos ({showTotalAlumnos(id)})
          </Button>
        );
      },
    },
    {
      title: 'Exámenes',
      dataIndex: 'id',
      render: (id) => {
        return (
          <Button type='link' onClick={() => handleAddExamens(id)}>
            Agregar Exámenes ({showTotalAlumnos(id)})
          </Button>
        );
      },
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
            <EditOutlined style={{ fontSize: '19px' }} />
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
          <Button danger type='link' onClick={() => handleDelete(id)}>
            <DeleteOutlined style={{ fontSize: '19px' }} />
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
        dataSource={cursos}
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
