export interface Peritaje {

    id: string;

    id_siniestro: string;

    id_asegurado: string;
    identificacion_asegurado: string;
    nombre_asegurado: string;

    id_vehiculo: string;
    placa_vehiculo: string;

    id_usuario_perito: number;    
    identificacion_perito: string;
    nombre_perito: string;
    
    
    codigo: string;
    ruta_archivos: string;
    fecha: Date;
    procede: boolean;
    
}