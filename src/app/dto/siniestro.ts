export interface Siniestro {

    id: string;

    id_asegurado: string;
    identificacion_asegurado: string;
    nombre_asegurado: string;

    id_vehiculo: string;
    placa_vehiculo: string;

    id_usuario_perito: number;    
    identificacion_perito: string;
    nombre_perito: string;
    
    fecha: Date;
    ubicacion: string;
    detalles: string;
    personasHeridas: boolean;
    necesitaGrua: boolean;
    esPersonaNatural: boolean;
    estado: string;

}