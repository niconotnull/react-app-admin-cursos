import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiStartCloseModal, uiStartUploadImage } from '../../actions/ui';
import { Form, Input, Button, Typography } from 'antd';
import Swal from 'sweetalert2';
import {
  alumnoStartActive,
  alumnoStartSave,
  alumnoStartUpdate,
} from '../../actions/alumno';
import {
  customStyles,
  layout,
  validateMessages,
} from '../../helpers/AlumnoHelper';

import icono from '../../assets/images/usuario-upload.jpg';

const { Title } = Typography;

const initAlumno = {
  id: 0,
  nombre: '',
  apellido: '',
  email: '',
  urlFoto: null,
};

Modal.setAppElement('#root');

export const AlumnoModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { alumnoActive } = useSelector((state) => state.alumno);

  const [valuesA, setValues] = useState(initAlumno);

  const { id, nombre, apellido, email, urlFoto } = valuesA;

  useEffect(() => {
    if (alumnoActive !== null) {
      setValues({
        id: alumnoActive.id,
        nombre: alumnoActive.nombre,
        apellido: alumnoActive.apellido,
        email: alumnoActive.email,
        urlFoto: alumnoActive.urlFoto,
      });
    } else {
      setValues(initAlumno);
    }
  }, [alumnoActive]);

  const afterOpenModal = () => {
    dispatch(alumnoStartActive(null));
  };

  const closeModal = () => {
    dispatch(uiStartCloseModal());
  };

  const onFinish = (values) => {
    if (alumnoActive) {
      dispatch(alumnoStartUpdate(values.alumno, id));
    } else {
      dispatch(alumnoStartSave(values.alumno));
    }
    dispatch(uiStartCloseModal());
    const message = alumnoActive
      ? 'Se actualizo correctamente'
      : 'Se guardo correctamente';
    Swal.fire('Correcto', message, 'success');
  };

  const handlePinctureClick = () => {
    if (alumnoActive === null) {
      document.querySelector('#fileSelector1').click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uiStartUploadImage({ file, url: '' }));
      readFile(e);
    }
  };

  const readFile = (e) => {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById('myimage');
    imgtag.title = selectedFile.name;

    reader.onload = function (e) {
      imgtag.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
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
        <input
          id='fileSelector1'
          type='file'
          name='file'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Title level={2}>
          {alumnoActive ? 'Actualizar Alumno' : 'Nuevo Alumno'}
        </Title>
        <hr />

        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}>
          <Form.Item
            name={['alumno', 'urlFoto']}
            label='Foto'
            initialValue={urlFoto}>
            <img
              id='myimage'
              onClick={() => handlePinctureClick()}
              src={urlFoto !== null ? urlFoto : icono}
              className='pointer img-thumbanail2  mg-circle-table  '
              alt='nass'
            />
          </Form.Item>
          <Form.Item
            name={['alumno', 'nombre']}
            label='Nombre'
            initialValue={nombre}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['alumno', 'apellido']}
            label='Apellido'
            initialValue={apellido}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['alumno', 'email']}
            label='Email'
            initialValue={email}
            rules={[{ type: 'email', required: true }]}>
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
