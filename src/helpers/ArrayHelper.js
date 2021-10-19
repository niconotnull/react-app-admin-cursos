export const convertListToSelec = (lista) => {
  const newList = lista.filter((b) => b.padre === null);

  return newList.map((a) => {
    const b = {
      value: a.id,
      label: a.nombre,
      children: a.hijos.map((hijo) => {
        const b = {
          value: hijo.id,
          label: hijo.nombre,
        };
        return b;
      }),
    };
    return b;
  });
};
