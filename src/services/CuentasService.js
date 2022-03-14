import axios from "axios";

const cuenta_api="http://localhost:8080/cuenta/";
export default class CuentaService{
    getListaCuenta(id){
        return axios.get(cuenta_api+"listar/"+id);
    }

    guardar(cuenta){
        return axios.post(cuenta_api+"guardar",cuenta);
    }

    eliminar(id){
        return axios.delete(cuenta_api+"eliminar/"+id);
    }

}