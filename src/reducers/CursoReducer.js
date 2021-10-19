import { types } from '../types/types';

const initialState = {
  cursos: [],
  cursoActive: null,
};

export const CursoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.cursoList:
      return {
        ...state,
        cursos: action.payload,
      };
    case types.cursoActive:
      return {
        ...state,
        cursoActive: action.payload,
      };
    case types.cursoUpdate:
      return {
        ...state,
        cursos: state.cursos.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case types.cursoDelete:
      return {
        ...state,
        cursos: state.cursos.filter((a) => a.id !== action.payload),
      };
    case types.cursoActiveDeleteAlumno:
      return {
        ...state,
        cursoActive: {
          ...state.cursoActive,
          alumnos: state.cursoActive.alumnos.filter(
            (a) => a.id !== action.payload
          ),
        },
      };

    case types.cursoActiveDeleteExamen:
      console.log('action.payload ', action.payload);
      return {
        ...state,
        cursoActive: {
          ...state.cursoActive,
          alumnos: state.cursoActive.examenes.filter(
            (a) => a.id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
