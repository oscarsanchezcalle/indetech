export const convertDepartamentosToSelect = ( departamentos = []) => {

    const result = [];

    departamentos.map( departamento => {

        result.push({ value: departamento.id_departamento, label: `${departamento.departamento}` });

    });

    return result;
}