import axios from "axios";

const cliente_api="http://localhost:8080/cliente/";
export default class ClienteService{
    getListaCliente(){
        return axios.get(cliente_api+"listar");
    }

    guardar(cliente){
        return axios.post(cliente_api+"guardar",cliente);
    }

    eliminar(id){
        return axios.delete(cliente_api+"eliminar/"+id);
    }

}