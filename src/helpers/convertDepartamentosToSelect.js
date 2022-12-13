export const convertDepartamentosToSelect = ( departamentos = []) => {

    const result = [];

    departamentos.map( departamento => {

        result.push({ value: departamento.id, label: `${departamento.descripcion}` });

    });

    return result;
}