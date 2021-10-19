import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const PreguntasTable = () => {
  const handleAddPreguntas = (values) => {
    console.log('Values : ', values);
  };

  return (
    <Form.List name='preguntas'>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, texto, fieldKey, ...field }) => (
            <Space key={key} style={{ marginBottom: 1 }} align='baseline'>
              <Form.Item
                {...field}
                name={[name, 'texto']}
                initialValue={texto}
                fieldKey={[fieldKey, 'texto']}
                rules={[{ required: true, message: 'Agregar una pregunta' }]}>
                <Input placeholder='First Name' />
              </Form.Item>
              <MinusCircleOutlined
                onClick={() => remove(name)}
                style={{ marginRight: 10 }}
              />
            </Space>
          ))}
          <Form.Item>
            <Button
              type='dashed'
              onClick={() => add()}
              block
              icon={<PlusOutlined />}>
              Agregar Pregunta
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
