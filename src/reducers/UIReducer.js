import { types } from '../types/types';

const initialState = {
  modalOpen: false,
  modalOpenAlumno: false,
  modalOpenExamen: false,
  paginator: { pages: 0, number: 0, total: 0 },
  files: {
    file: null,
    url: '',
  },
};

export const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiPaginator:
      return {
        ...state,
        paginator: {
          pages: action.payload.pages,
          number: action.payload.number,
          total: action.payload.total,
        },
      };
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };
    case types.uiOpenModalAlumno:
      return {
        ...state,
        modalOpenAlumno: true,
      };
    case types.uiCloseModalAlumno:
      return {
        ...state,
        modalOpenAlumno: false,
      };
    case types.uiOpenModalExamen:
      return {
        ...state,
        modalOpenExamen: true,
      };
    case types.uiCloseModalExamen:
      return {
        ...state,
        modalOpenExamen: false,
      };
    case types.uiImageUpload:
      return {
        ...state,
        files: action.payload,
      };
    case types.uiImageRemove:
      return {
        ...state,
        files: {
          file: null,
          url: '',
        },
      };

    default:
      return state;
  }
};
