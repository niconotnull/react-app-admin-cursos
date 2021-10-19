import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { uiStartOpenModal } from '../../actions/ui';

export const ButtonAdd = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(uiStartOpenModal());
  };

  return (
    <>
      <Button
        type='primary'
        shape='circle'
        icon={<PlusCircleOutlined />}
        size='large'
        onClick={handleOpenModal}
        className='fab'
      />
    </>
  );
};
