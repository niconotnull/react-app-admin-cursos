import { Typography } from 'antd';
import { ButtonAdd } from '../ui/ButtonAdd';
import { ExamenModal } from './ExamenModal';
import { ExamenTable } from './ExamenTable';

const { Title } = Typography;

export const ExamenScreen = () => {
  return (
    <div>
      <Title>Lista de Examenes</Title>
      <ButtonAdd />
      <ExamenTable />
      <ExamenModal />
    </div>
  );
};
