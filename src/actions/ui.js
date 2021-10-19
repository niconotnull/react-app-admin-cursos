import { types } from '../types/types';

export const uiStartPaginatorPages = (pages, number, total) => ({
  type: types.uiPaginator,
  payload: { pages, number, total },
});

export const uiStartOpenModal = () => ({
  type: types.uiOpenModal,
});

export const uiStartCloseModal = () => ({
  type: types.uiCloseModal,
});

export const uiStartOpenModalAlumno = () => ({
  type: types.uiOpenModalAlumno,
});

export const uiStartCloseModalAlumno = () => ({
  type: types.uiCloseModalAlumno,
});

export const uiStartOpenModalExamen = () => ({
  type: types.uiOpenModalExamen,
});

export const uiStartCloseModalExamen = () => ({
  type: types.uiCloseModalExamen,
});

export const uiStartUploadImage = (file) => {
  return {
    type: types.uiImageUpload,
    payload: file,
  };
};

export const uiStartRemoveImage = () => ({
  type: types.uiImageRemove,
});
