import { types } from '../types/types';

const initialState = {
  examenes: [],
  asignaturas: [],
  examenActive: null,
  examenesLike: [],
};

export const ExamenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.examenList:
      return {
        ...state,
        examenes: action.payload,
      };
    case types.examenAsignaturas:
      return {
        ...state,
        asignaturas: action.payload,
      };
    case types.examenActive:
      return {
        ...state,
        examenActive: action.payload,
      };
    case types.examenUpdate:
      return {
        ...state,
        examenes: state.examenes.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case types.examenListLike:
      return {
        ...state,
        examenesLike: action.payload,
      };
    default:
      return state;
  }
};
