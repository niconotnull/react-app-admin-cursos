import Swal from 'sweetalert2';
import { fetchSinToken } from '../helpers/fetch';
import { uploadFile } from '../helpers/uploadFile';
import { types } from '../types/types';
import { uiStartRemoveImage } from './ui';

export const alumnoStartList = () => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(`alumnos/listar`);
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(alumnoList(body));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const alumnoStartListPages = (page = 0, size = 0) => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(
        `alumnos/paginacion?page=${page}&size=${size}`
      );
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(alumnoList(body.content));
        dispatch(
          uiStartPaginatorPages(
            body.totalPages,
            body.number,
            body.totalElements
          )
        );
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const alumnoStartLike = (termino) => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(`alumnos/filtrar/${termino}`);
      const body = await reponse.json();

      if (reponse.ok) {
        dispatch(alumnoListLike(body));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const alumnoStartSave = (alumno) => {
  return async (dispatch, getState) => {
    const { file } = getState().ui.files;

    try {
      const reponse = await fetchSinToken(`alumnos/crear`, alumno, 'POST');
      const body = await reponse.json();
      if (reponse.ok) {
        await dispatch(startUploading(file, body));
        dispatch(alumnoStartListPages(0, 5));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const alumnoStartUpdate = (alumno, id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchSinToken(`alumnos/${id}`, alumno, 'PUT');
      const body = await response.json();
      if (response.ok) {
        alumno.id = id;
        dispatch(alumnoUpdate(alumno));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const alumnoStartDelete = (id) => {
  return async (dispatch) => {
    const response = await fetchSinToken(`alumnos/${id}`, '', 'DELETE');

    if (response.ok) {
      dispatch(alumnoDelete(id));
    } else {
      Swal.fire('Error', response, 'error');
    }
  };
};

export const startUploading = (file, alumno) => {
  return async (dispatch, getState) => {
    if (file) {
      const fileUrl = await uploadFile(file);
      alumno.urlFoto = fileUrl;
      await fetchSinToken(`alumnos/${alumno.id}`, alumno, 'PUT');

      dispatch(uiStartRemoveImage());
    }
  };
};

export const alumnoStartActive = (alumno) => ({
  type: types.alumnoActive,
  payload: alumno,
});

const alumnoUpdate = (alumno) => ({
  type: types.alumnoUpdate,
  payload: alumno,
});

const alumnoDelete = (id) => ({
  type: types.alumnoDelete,
  payload: id,
});

const alumnoList = (list) => ({
  type: types.alumnoList,
  payload: list,
});

const alumnoListLike = (list) => ({
  type: types.alumnoListLike,
  payload: list,
});

export const uiStartPaginatorPages = (pages, number, total) => ({
  type: types.uiPaginator,
  payload: { pages, number, total },
});

export const alumnoAdd = (alumno) => ({
  type: types.alumnoAdd,
  payload: alumno,
});
