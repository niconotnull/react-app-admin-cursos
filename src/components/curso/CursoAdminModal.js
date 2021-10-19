import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import icono from '../../assets/images/usuario-upload.jpg';
import { Tabs, Table, Button, AutoComplete, Typography } from 'antd';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { uiStartCloseModalAlumno } from '../../actions/ui';
import { customStylesExamen } from '../../helpers/AlumnoHelper';
import { alumnoStartLike } from '../../actions/alumno';
import { useState } from 'react';
import {
  cursoStartActive,
  cursoStartAddAlumnos,
  cursoStartDeleteAlumnoCurso,
} from '../../actions/cursos';

const { TabPane } = Tabs;

const { Title } = Typography;

Modal.setAppElement('#root');

export const CursoAdminModalModal = () => {
  const dispatch = useDispatch();
  const { modalOpenAlumno } = useSelector((state) => state.ui);
  const { cursoActive } = useSelector((state) => state.curso);
  const { alumnosLike } = useSelector((state) => state.alumno);
  const [options, setOptions] = useState([]);
  const [alumnosAdmin, setAlumnosAdmin] = useState([]);
  const [defaultActiveKey, setDefaultActiveKey] = useState('1');

  const closeModal = () => {
    dispatch(uiStartCloseModalAlumno());
  };

  const afterOpenModal = () => {
    dispatch(cursoStartActive(null));
    setAlumnosAdmin([]);
  };

  const columnsCursosAlumnos = [
    {
      title: 'Foto',
      dataIndex: 'urlFoto',
      render: (urlFoto) => {
        return (
          <img
            src={urlFoto !== null ? urlFoto : icono}
            className='pointer img-thumbanail-small  mg-circle-table-small'
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
      title: 'Eliminar',
      dataIndex: 'id',
      fixed: 'right',
      render: (id) => {
        return (
          <Button
            danger
            type='text'
            onClick={() => handleDeleteAlumnoCurso(id)}>
            <DeleteOutlined style={{ fontSize: '19px' }} />
          </Button>
        );
      },
    },
  ];

  const columnsCursosAlumnosAdd = [
    {
      title: 'Id',
      dataIndex: 'id',
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
      title: 'Eliminar',
      dataIndex: 'id',
      fixed: 'right',
      render: (id) => {
        return (
          <Button
            danger
            type='text'
            onClick={() => handleDeleteAlumnoAdmin(id)}>
            <DeleteOutlined style={{ fontSize: '19px' }} />
          </Button>
        );
      },
    },
  ];

  const onSearch = (searchText) => {
    console.log('');
    if (searchText.length !== 0) {
      dispatch(alumnoStartLike(searchText));
      const lista = alumnosLike.map((a) => valueParce(a));

      setOptions(lista);
    }
  };
  const onSelect = (data) => {
    setAlumnosAdmin([
      dividirCadena(data.replace('- ', ' '), ' '),
      ...alumnosAdmin,
    ]);
  };

  const valueParce = (val) => ({
    key: val.id,
    value: val.id + '- ' + val.nombre + ' ' + val.apellido,
  });

  const dividirCadena = (cadenaADividir, separador) => {
    var arrayDeCadenas = cadenaADividir.split(separador);
    return {
      id: arrayDeCadenas[0],
      nombre: arrayDeCadenas[1],
      apellido: arrayDeCadenas[2],
    };
  };

  const handleSaveAlumnos = () => {
    console.log('Save alumnos, ', alumnosAdmin);
    if (alumnosAdmin.length > 0) {
      dispatch(cursoStartAddAlumnos(cursoActive?.id, alumnosAdmin));
      Swal.fire(
        'Correcto',
        'Alumnos agregados al curso correctamente',
        'success'
      );
      setAlumnosAdmin([]);
      setDefaultActiveKey('1');
    }
  };

  const handleDeleteAlumnoAdmin = (id) => {
    setAlumnosAdmin(alumnosAdmin.filter((a) => a.id !== id));
  };

  const handleDeleteAlumnoCurso = (id) => {
    const alumno = cursoActive?.alumnos.find((a) => a.id === id);
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar almuno del curso!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cursoStartDeleteAlumnoCurso(cursoActive?.id, alumno));
      }
    });
  };

  const onChangeTab = (value) => {
    console.log('tab cambiadno ', value);
    setDefaultActiveKey(value);
  };

  return (
    <div>
      <Modal
        isOpen={modalOpenAlumno}
        onAfterClose={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesExamen}
        closeTimeoutMS={200}
        contentLabel='Example Modal'
        className='modalCursoAdmin ant-advanced-search-form'
        overlayClassName='modal-fondo'>
        <Title level={4} type='success'>
          {cursoActive?.nombre}
        </Title>
        <Tabs activeKey={defaultActiveKey} onChange={onChangeTab}>
          <TabPane tab='Alumnos del Curso' key='1'>
            <Table
              columns={columnsCursosAlumnos}
              dataSource={cursoActive?.alumnos}
              rowKey='id'
              pagination={false}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}></div>
          </TabPane>
          <TabPane tab='Administrar alumnos' key='2'>
            <AutoComplete
              allowClear={true}
              options={options}
              style={{ width: 600 }}
              onSelect={(e) => onSelect(e)}
              onSearch={onSearch}
              placeholder='Buscar Alumnos'
            />

            <Table
              columns={columnsCursosAlumnosAdd}
              dataSource={alumnosAdmin}
              rowKey='id'
              pagination={false}
            />
            <Button
              type='primary'
              onClick={handleSaveAlumnos}
              style={{ marginTop: 10 }}
              block
              icon={<SaveOutlined />}>
              Agregar Alumnos nuevos
            </Button>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};
