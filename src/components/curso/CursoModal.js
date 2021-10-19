import Modal from 'react-modal';

import { Form, Input, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  cursoStartActive,
  cursoStartSave,
  cursoStartUpdate,
} from '../../actions/cursos';
import { uiStartCloseModal } from '../../actions/ui';
import Swal from 'sweetalert2';
import {
  customStyles,
  layout,
  validateMessages,
} from '../../helpers/AlumnoHelper';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const initCurso = {
  id: 0,
  nombre: '',
};

Modal.setAppElement('#root');

export const CursoModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { cursoActive } = useSelector((state) => state.curso);

  const [formValues, setFormValues] = useState(initCurso);
  const { id, nombre } = formValues;

  useEffect(() => {
    if (cursoActive !== null) {
      setFormValues({
        id: cursoActive.id,
        nombre: cursoActive.nombre,
      });
    } else {
      setFormValues(initCurso);
    }
  }, [cursoActive]);

  const closeModal = () => {
    dispatch(uiStartCloseModal());
  };

  const afterOpenModal = () => {
    dispatch(cursoStartActive(null));
  };

  const onFinish = (values) => {
    if (cursoActive) {
      dispatch(cursoStartUpdate(values.alumno, id));
    } else {
      dispatch(cursoStartSave(values.alumno));
    }
    dispatch(uiStartCloseModal());
    const message = cursoActive
      ? 'Se actualizo correctamente'
      : 'Se guardo correctamente';
    Swal.fire('Correcto', message, 'success');
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onAfterClose={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        contentLabel='Example Modal'
        className='modal ant-advanced-search-form'
        overlayClassName='modal-fondo'>
        <Title level={2}>
          {cursoActive ? 'Actualizar Curso' : 'Nuevo Curso'}
        </Title>
        <hr />

        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}>
          <Form.Item
            name={['alumno', 'nombre']}
            label='Nombre'
            initialValue={nombre}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
