export const convertExternalAuthToInternal = ( external = {}) => {

    const result = {
        persona:  external.email, 
        identityId: external.identityId,
        username: external.userName, 
        rol: external.roles[0]?.normalizedName, 
        proyecto: external.proyecto.descripcion, 
        proyectoId: external.proyecto.id, 
        objetoContrato: 'Contrato PROTECH ingeniería'
    };

    return result;
}