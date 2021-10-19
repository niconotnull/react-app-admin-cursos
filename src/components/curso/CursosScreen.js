import { Typography } from 'antd';
import { ButtonAdd } from '../ui/ButtonAdd';
import { CursoAdminModalModal } from './CursoAdminModal';
import { CursoExamenModal } from './CursoExamenModal';
import { CursoModal } from './CursoModal';
import { CursosTable } from './CursosTable';

const { Title } = Typography;

export const CursosScreen = () => {
  return (
    <div>
      <Title>Lista de Cursos</Title>
      <ButtonAdd />
      <CursosTable />
      <CursoModal />
      <CursoAdminModalModal />
      <CursoExamenModal />
    </div>
  );
};
