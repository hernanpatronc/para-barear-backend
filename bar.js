const properties = [
    "id",
    "nombre",
    "ubicacion",
    "zona",
    "logo",
    "imagenes",
    "descripcion",
    "telefono",
    "cervezas",
    "web",
    "latitud",
    "longitud",
    "habilitado",
];

const mandatoryProperties = [
    "id",
    "nombre",
    "logo",
    "zona",
    "ubicacion"
]

exports = module.exports = {
    properties,
    mandatoryProperties
}