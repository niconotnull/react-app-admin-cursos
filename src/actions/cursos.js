import Swal from 'sweetalert2';
import { fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const cursoStartList = () => {
  return async (dispatch) => {
    try {
      const response = await fetchSinToken('cursos/listar');
      const body = await response.json();
      if (response.ok) {
        dispatch(cursosList(body));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const cursoStartListPages = (page = 0, size = 0) => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(
        `cursos/paginacion?page=${page}&size=${size}`
      );
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(cursosList(body.content));
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

export const cursoStartSave = (curso) => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(`cursos/crear`, curso, 'POST');
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(cursoStartListPages(0, 5));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const cursoStartDelete = (id) => {
  return async (dispatch) => {
    const response = await fetchSinToken(`cursos/${id}`, '', 'DELETE');

    if (response.ok) {
      dispatch(cursoDelete(id));
    } else {
      Swal.fire('Error', response, 'error');
    }
  };
};

export const cursoStartUpdate = (curso, id) => {
  return async (dispatch) => {
    try {
      const response = await fetchSinToken(`cursos/${id}`, curso, 'PUT');
      const body = await response.json();
      if (response.ok) {
        curso.id = id;
        dispatch(cursoUpdate(curso));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const cursoStartById = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetchSinToken(`cursos/${id}`);
      const body = await response.json();
      if (response.ok) {
        dispatch(cursoStartActive(body));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const cursoStartAddAlumnos = (idCurso, alumnos) => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(
        `cursos/${idCurso}/asignar-alumnos`,
        alumnos,
        'PUT'
      );
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(cursoStartById(idCurso));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const cursoStartAddExamenes = (idCurso, examenes) => {
  console.log('Asignar examenes : ', examenes);
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(
        `cursos/${idCurso}/asignar-examenes`,
        examenes,
        'PUT'
      );
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(cursoStartById(idCurso));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const cursoStartDeleteAlumnoCurso = (idCurso, alumno) => {
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(
        `cursos/${idCurso}/eliminar-alumno`,
        alumno,
        'PUT'
      );
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(cursoActiveDeleteAlumno(alumno.id));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const cursoStartDeleteExamenCurso = (idCurso, examen) => {
  console.log('delete examen ', examen);
  return async (dispatch) => {
    try {
      const reponse = await fetchSinToken(
        `cursos/${idCurso}/eliminar-examen`,
        examen,
        'PUT'
      );
      const body = await reponse.json();
      if (reponse.ok) {
        dispatch(cursoActiveDeleteExamen(examen.id));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const cursoStartActive = (curso) => ({
  type: types.cursoActive,
  payload: curso,
});

const cursosList = (cursos) => ({
  type: types.cursoList,
  payload: cursos,
});

const cursoDelete = (id) => ({
  type: types.cursoDelete,
  payload: id,
});

const cursoActiveDeleteAlumno = (id) => ({
  type: types.cursoActiveDeleteAlumno,
  payload: id,
});

const cursoActiveDeleteExamen = (id) => ({
  type: types.cursoActiveDeleteExamen,
  payload: id,
});

const cursoUpdate = (curso) => ({
  type: types.cursoUpdate,
  payload: curso,
});

export const uiStartPaginatorPages = (pages, number, total) => ({
  type: types.uiPaginator,
  payload: { pages, number, total },
});
