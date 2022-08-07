export const convertExternalAuthToInternal = ( external = {}) => {

    const roles = [];

    if ( Array.isArray(external.Roles) ) {
        roles.push(external.Roles);
    }

    const result = {
        persona:  external.unique_name, 
        identityId: external.jti,
        username: external.unique_name, 
        rol: Array.isArray(external.Roles) ? roles[0]: [external.Roles], 
        proyecto: external.Proyecto, 
        proyectoId: external.ProyectoId, 
        objetoContrato: 'Contrato PROTECH ingeniería'
    };

    return result;
}