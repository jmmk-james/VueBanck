<template>
    <div class="container">
        
        <ToastA />
        <PanelA  header="Lista de Clientes">
            <MenubarA :model="items" />

            <DataTable :value="clientes" :paginator="true" :rows="10" :selection.sync="selecCliente" selectionMode="single" responsiveLayout="scroll" dataKey="id">
                <ColumnA field="id" header="ID"></ColumnA>
                <ColumnA field="nombre" header="NOMBRE"></ColumnA>
                <ColumnA field="paterno" header="Ap. PATERNO"></ColumnA>
                <ColumnA field="materno" header="Ap. MATERNO"></ColumnA>
                <ColumnA field="tipo" header="T. Documento"></ColumnA>
                <ColumnA field="di" header="N DOCUMENTO"></ColumnA>
                <ColumnA field="fecha_nac" header="F. NACIMIENTO"></ColumnA>
                <ColumnA field="genero" header="GENERO"></ColumnA>
                
            </DataTable>
        </PanelA>

        <DialogA header="Nuevo Cliente" :visible.sync="displayModal" :containerStyle="{width: '50vw'}" :modal="true">
            <br>
            <span class="p-float-label">
                <InputTextA id="nombre" type="text" v-model="cliente.nombre" class="p-inputtext-sm" />
                <label for="nombre">Nombre : </label>
            </span>
            <br>

            <span class="p-float-label">
                <InputTextA id="paterno" type="text" v-model="cliente.paterno" class="p-inputtext-sm" />
                <label for="paterno">Ap. Paterno : </label>
            </span>
            <br>

            <span class="p-float-label">
                <InputTextA id="materno" type="text" v-model="cliente.materno" class="p-inputtext-sm" />
                <label for="materno">Ap. Materno : </label>
            </span>
            <br>

            <span class="p-float-label">
                <DropdownA id="tipo" :options="stipo" optionLabel="name" optionValue="value" v-model="cliente.tipo" placeholder="Tipo de Documento"  class="p-inputtext-sm"/>
                <label for="tipo">Tipo de Documento : </label>
            </span>
            <br>

            <span class="p-float-label">
                <InputTextA id="di" type="text" v-model="cliente.di" class="p-inputtext-sm"/>
                <label for="di">N. Documento : </label>
            </span>
            <br>

            <span class="p-float-label">
                <InputTextA id="fecha" type="text" v-model="cliente.fecha_nac" class="p-inputtext-sm" />
                <label for="fecha">Fecha de Nacimiento</label>
            </span>
            <br>
            <span class="p-float-label">
                <DropdownA id="genero" :options="sgenero" optionLabel="name"  optionValue="value" v-model="cliente.genero" placeholder="Tipo de Genero" class="p-inputtext-sm"/>
                <label for="genero">Genero : </label>
            </span>
            
            <template #footer>
                <ButtonA label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <ButtonA label="Guardar" icon="pi pi-check" @click="guardar" autofocus />
            </template>
        </DialogA>
    </div>
</template>

<script>
import ClienteService from '../services/ClienteService';

export default ({
    name:'ClienteApp',
    data(){
        return {
            clientes:null,
            cliente:{
                id:null,
                nombre:null,
                paterno:null,
                materno:null,
                tipo:null,
                di:null,
                fecha:null,
                genero:null
            },
            stipo: [
                {name: 'C.I.', value: 'CI'},
                {name: 'RUT', value: 'RUT'},
                {name: 'Otro', value: 'OTRO'}
            ],
            sgenero: [
                {name: 'MASCULINO', value: 'MASCULINO'},
                {name: 'FEMENINO', value: 'FEMENINO'},
                {name: 'OTRO', value: 'OTRO'}
            ],
            selecCliente:{
                id:null,
                nombre:null,
                paterno:null,
                materno:null,
                tipo:null,
                di:null,
                fecha:null,
                genero:null
            },
            items:[
                {
                    label:'Agregar',
                    icon:'pi pi-fw pi-plus',
                    command:()=>{this.formularioGuardar();}
                },
                {
                    label:'Editar',
                    icon:'pi pi-fw pi-pencil',
                    command:()=>{this.formularioEditar();}
                },
                {
                    label:'Eliminar',
                    icon:'pi pi-fw pi-trash',
                    command:()=>{this.eliminar();}
                },
                {
                    label:'Ver Cuentas',
                    icon:'pi pi-fw pi-wallet',
                    command:()=>{this.formularioCuenta();}
                },
                {
                    label:'Actualizar',
                    icon:'pi pi-fw pi-refresh',
                    command:()=>{this.actualizar();}
                }
            ],
            displayModal:false
        }
    },
    clienteService : null,
    created(){
        this.clienteService= new ClienteService();
    },
    mounted(){
        this.actualizar();
    },
    methods:{
        formularioGuardar(){
            this.clean();
            this.displayModal=true;
        },
        formularioEditar(){
            this.cliente= this.selecCliente;
            this.displayModal=true;
        },
        closeModal() {
            this.displayModal = false;
        },
        actualizar(){
            this.clienteService.getListaCliente().then(data=>{
            this.clientes=data.data;
            console.log(data);
            })
            
        },
        guardar(){
            this.clienteService.guardar(this.cliente).then(data=>{
                if(data.status==200){
                    this.closeModal();
                    this.clean();
                    this.actualizar();
                }

                console.log(data);
            })
        },
        eliminar(){
            if(confirm("Esta segur@ de Eliminar el registro")){
                this.clienteService.eliminar(this.selecCliente.id).then(data=>{
                    if(data.status==200)
                        this.$toast.add({severity:'success', summary: 'Alerta!!!!', detail:'Registro Eliminado Corectamente', life: 3000});
                        this.actualizar();
                });
            }
        },
        formularioCuenta(){
            this.$router.push('/cuentas/'+this.selecCliente.id);
        },
        clean(){
            this.cliente={
                id:null,
                nombre:null,
                paterno:null,
                materno:null,
                tipo:null,
                di:null,
                fecha:null,
                genero:null
            };
        }
    }
})
</script>

<style scoped>
    .p-button {
        margin: 0 .5rem 0 0;
        min-width: 10rem;
    }

    p {
        margin: 0;
    }

    .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
