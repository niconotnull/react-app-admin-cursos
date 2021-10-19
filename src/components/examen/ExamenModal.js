import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { Form, Input, Button, Card, Cascader } from 'antd';
import { uiStartCloseModal } from '../../actions/ui';
import {
  customStylesExamen,
  layout,
  validateMessages,
} from '../../helpers/AlumnoHelper';
import { useEffect, useState } from 'react';
import {
  asignaturasStartList,
  examenStartActive,
  examenStartSave,
  examenStartUpdate,
} from '../../actions/examen';
import { initExamen } from '../../helpers/InitColumnsHelper';
import { PreguntasTable } from './PreguntasTable';

Modal.setAppElement('#root');

export const ExamenModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { examenActive } = useSelector((state) => state.examen);
  const { asignaturas } = useSelector((state) => state.examen);

  const [valuesForm, setValuesForm] = useState(initExamen);

  const { id, nombre, asignaturaPadre, asignaturaHija, preguntas } = valuesForm;

  useEffect(() => {
    if (examenActive !== null) {
      setValuesForm((e) => ({
        ...e,
        id: examenActive.id,
        nombre: examenActive.nombre,
        asignaturaPadre: {
          id: examenActive.asignaturaPadre.id,
          nombre: examenActive.asignaturaPadre.nombre,
        },
        asignaturaHija: {
          id: examenActive.asignaturaHija.id,
          nombre: examenActive.asignaturaHija.nombre,
        },
        preguntas: examenActive.preguntas,
      }));
    } else {
      setValuesForm(initExamen);
    }
  }, [examenActive]);

  useEffect(() => {
    dispatch(asignaturasStartList());
  }, [dispatch]);

  const afterOpenModal = () => {
    dispatch(examenStartActive(null));
  };

  const closeModal = () => {
    dispatch(uiStartCloseModal());
  };

  const onFinish = (values) => {
    console.log(values.preguntas);
    if (examenActive) {
      dispatch(examenStartUpdate(valuesForm, id, values.preguntas));
    } else {
      dispatch(examenStartSave(valuesForm, values.preguntas));
    }

    dispatch(uiStartCloseModal());
    const message = examenActive
      ? 'Se actualizo correctamente'
      : 'Se guardo correctamente';
    Swal.fire('Correcto', message, 'success');
  };

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  const searchDescriptionPadre = (idPradre) => {
    const asigP = asignaturas.find((e) => e.value === idPradre);
    return asigP.label;
  };

  const searchDescriptionHija = (idPradre, idHija) => {
    const asigP = asignaturas.find((e) => e.value === idPradre);
    const asigH = asigP.children.find((w) => w.value === idHija);
    return asigH.label;
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onAfterClose={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesExamen}
        closeTimeoutMS={200}
        contentLabel='Example Modal'
        className='modalExamen ant-advanced-search-form'
        overlayClassName='modal-fondo'>
        <Card
          type='inner'
          title={examenActive ? 'Actualizar Examen' : 'Nuevo Examen'}>
          <Form
            {...layout}
            name='nest-messages'
            onFinish={onFinish}
            validateMessages={validateMessages}
            initialValues={{
              preguntas: preguntas,
            }}
            layout='vertical'>
            <Form.Item
              name={['examen', 'nombre']}
              label='Nombre'
              initialValue={nombre}
              rules={[{ required: true }]}
              onChange={(values) => {
                setValuesForm((e) => ({
                  ...e,
                  nombre: values.target.value,
                }));
              }}>
              <Input />
            </Form.Item>
            <Form.Item
              name={['examen', 'asignatura']}
              label='Asignatura'
              rules={[{ required: false }]}>
              <Input.Group compact>
                <Cascader
                  style={{ width: '100%', height: '30%' }}
                  options={asignaturas}
                  onChange={(values) => {
                    setValuesForm((e) => ({
                      ...e,
                      asignaturaPadre: {
                        id: values[0],
                        nombre: searchDescriptionPadre(values[0]),
                      },
                      asignaturaHija: {
                        id: values[1],
                        nombre: searchDescriptionHija(values[0], values[1]),
                      },
                    }));
                  }}
                  defaultValue={
                    asignaturaPadre.id !== 0
                      ? [asignaturaPadre.nombre, asignaturaHija.nombre]
                      : null
                  }
                  placeholder='Seleccinar Asignatura/Sub-Asignatura'
                  showSearch={filter}
                />
              </Input.Group>
            </Form.Item>
            <PreguntasTable />

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
              <Button type='primary' htmlType='submit' block>
                Guardar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
