import { combineReducers } from 'redux';
import { AlumnoReducer } from './AlumnoReducer';
import { CursoReducer } from './CursoReducer';
import { ExamenReducer } from './ExamenReducer';
import { UIReducer } from './UIReducer';

export const reducers = combineReducers({
  curso: CursoReducer,
  examen: ExamenReducer,
  alumno: AlumnoReducer,
  ui: UIReducer,
});
