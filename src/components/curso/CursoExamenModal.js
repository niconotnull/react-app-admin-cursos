import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Table, Button, AutoComplete, Typography } from 'antd';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { uiStartCloseModalExamen } from '../../actions/ui';
import { customStylesExamen } from '../../helpers/AlumnoHelper';
import { useState } from 'react';
import { examenStartLike } from '../../actions/examen';
import {
  cursoStartAddExamenes,
  cursoStartDeleteExamenCurso,
} from '../../actions/cursos';

const { TabPane } = Tabs;
const { Title } = Typography;

export const CursoExamenModal = () => {
  const dispatch = useDispatch();

  const { cursoActive } = useSelector((state) => state.curso);

  const { modalOpenExamen } = useSelector((state) => state.ui);
  const [options, setOptions] = useState([]);
  const { examenesLike } = useSelector((state) => state.examen);

  const [examenesAdmin, setExamenesAdmin] = useState([]);
  const [examenesLista, setExamenesLista] = useState([]);

  const [defaultActiveKey, setDefaultActiveKey] = useState('1');

  const afterOpenModal = () => {};

  const closeModal = () => {
    dispatch(uiStartCloseModalExamen());
  };

  const onSearch = (searchText) => {
    if (searchText.length !== 0) {
      dispatch(examenStartLike(searchText));
      const lista = examenesLike.map((a) => valueParce(a));
      setOptions(lista);
    }
  };

  const valueParce = (val) => ({
    key: val.id,
    value: val.id + '- ' + val.nombre,
  });

  const handleSaveExamenes = () => {
    if (examenesAdmin.length > 0) {
      dispatch(cursoStartAddExamenes(cursoActive?.id, examenesLista));
      Swal.fire(
        'Correcto',
        'Examenes agregados al curso correctamente',
        'success'
      );
      setExamenesAdmin([]);
      setExamenesLista([]);
      setDefaultActiveKey('1');
    }
  };

  const onChangeTab = (value) => {
    setDefaultActiveKey(value);
  };

  const onSelect = (data) => {
    setExamenesAdmin([dividirCadena(data, ' '), ...examenesAdmin]);
  };

  const dividirCadena = (cadenaADividir, separador) => {
    var arrayDeCadenas = cadenaADividir.split('- ');
    setExamenesLista([...examenesLista, examenesLike[0]]);
    return {
      id: arrayDeCadenas[0],
      nombre: arrayDeCadenas[1],
    };
  };

  const handleDeleteExamenCurso = (id) => {
    const examen = cursoActive?.examenes.filter((a) => a.id !== id);
    delete cursoActive.examenes;
    cursoActive.examenes = examen;
    console.log('cursoActive ', cursoActive);
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar examen del curso!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cursoStartDeleteExamenCurso(cursoActive?.id, cursoActive));
      }
    });
  };

  const handleDeleteAlumnoAdmin = (id) => {
    setExamenesAdmin(examenesAdmin.filter((a) => a.id !== id));
  };

  const columnsCursosExamenesAdd = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
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

  const columnsCursosExamenes = [
    {
      title: 'Materia',
      dataIndex: 'nombre',
    },
    {
      title: 'Asignatura',
      render: (record) => record.asignaturaPadre.nombre,
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
            onClick={() => handleDeleteExamenCurso(id)}>
            <DeleteOutlined style={{ fontSize: '19px' }} />
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        isOpen={modalOpenExamen}
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
          <TabPane tab='Examénes del Curso' key='1'>
            <Table
              columns={columnsCursosExamenes}
              dataSource={cursoActive?.examenes}
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
          <TabPane tab='Administrar exámenes' key='2'>
            <AutoComplete
              allowClear={true}
              options={options}
              style={{ width: 600 }}
              onSelect={(e) => onSelect(e)}
              onSearch={onSearch}
              placeholder='Buscar exámen'
            />

            <Table
              columns={columnsCursosExamenesAdd}
              dataSource={examenesAdmin}
              rowKey='id'
              pagination={false}
            />
            <Button
              type='primary'
              onClick={handleSaveExamenes}
              style={{ marginTop: 10 }}
              block
              icon={<SaveOutlined />}>
              Agregar Examenes nuevos
            </Button>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};
