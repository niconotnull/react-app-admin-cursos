import Swal from 'sweetalert2';
import { convertListToSelec } from '../helpers/ArrayHelper';

import { fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const examenStartListPages = (page = 0, size = 0) => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(
        `examenes/paginacion?page=${page}&size=${size}`
      );
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(examenList(body.content));
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

export const asignaturasStartList = () => {
  return async (dispatch) => {
    try {
      const response = await fetchSinToken('examenes/asignaturas/');
      const body = await response.json();
      const asignaturas = convertListToSelec(body);
      dispatch(asignaturasList(asignaturas));
    } catch (err) {
      console.error(err);
    }
  };
};

export const examenStartSave = (examen, preguntas) => {
  return async (dispatch) => {
    try {
      examen.preguntas = preguntas;
      const reponse = await fetchSinToken(`examenes/crear`, examen, 'POST');
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(examenStartListPages(0, 5));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const examenStartUpdate = (examen, id, preguntas) => {
  return async (dispatch) => {
    try {
      examen.preguntas = preguntas;
      const response = await fetchSinToken(`examenes/${id}`, examen, 'PUT');
      const body = await response.json();
      if (response.ok) {
        examen.id = id;
        dispatch(examenUpdate(body));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const examenStartLike = (termino) => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(`examenes/filtrar/${termino}`);
      const body = await reponse.json();

      if (reponse.ok) {
        dispatch(examenListLike(body));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const examenStartActive = (examen) => ({
  type: types.examenActive,
  payload: examen,
});

const asignaturasList = (asignaturas) => ({
  type: types.examenAsignaturas,
  payload: asignaturas,
});

const examenList = (examenes) => ({
  type: types.examenList,
  payload: examenes,
});

export const uiStartPaginatorPages = (pages, number, total) => ({
  type: types.uiPaginator,
  payload: { pages, number, total },
});

const examenUpdate = (examen) => ({
  type: types.examenUpdate,
  payload: examen,
});

const examenListLike = (list) => ({
  type: types.examenListLike,
  payload: list,
});
