export interface Siniestro {

    id: string;

    codigo: string;
    id_asegurado: string;
    identificacion_asegurado: string;
    nombre_asegurado: string;

    id_vehiculo: string;
    placa: string;

    identificacion_contraparte: string;    
    nombre_contraparte: string;
    
    fecha: Date;
    ubicacion: string;
    detalles: string;
    personasHeridas: boolean;
    necesitaGrua: boolean;
    esPersonaNatural: boolean;
    estado: string;

}