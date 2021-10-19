import { types } from '../types/types';

const initialState = {
  alumnos: [],
  alumnoActive: null,
  alumnosLike: [],
  alumnoAdd: null,
};

export const AlumnoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.alumnoList:
      return {
        ...state,
        alumnos: action.payload,
      };
    case types.alumnoActive:
      return {
        ...state,
        alumnoActive: action.payload,
      };
    case types.alumnoUpdate:
      return {
        ...state,
        alumnos: state.alumnos.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case types.alumnoDelete:
      return {
        ...state,
        alumnos: state.alumnos.filter((a) => a.id !== action.payload),
      };
    case types.alumnoListLike:
      return {
        ...state,
        alumnosLike: action.payload,
      };
    case types.alumnoAdd:
      return {
        ...state,
        alumnoAdd: action.payload,
      };
    default:
      return state;
  }
};
