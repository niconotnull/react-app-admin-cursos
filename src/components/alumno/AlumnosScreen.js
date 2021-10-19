import { Typography } from 'antd';
import { ButtonAdd } from '../ui/ButtonAdd';
import { AlumnoModal } from './AlumnoModal';

import { AlumnoTable } from './AlumnoTable';

const { Title } = Typography;

export const AlumnosScreen = () => {
  return (
    <div>
      <Title>Lista de Alumnos</Title>
      <ButtonAdd />
      <AlumnoTable />
      <AlumnoModal />
    </div>
  );
};
