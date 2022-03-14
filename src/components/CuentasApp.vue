<template>
    <div class="container">
        <br>
        <ToastA />
        <PanelA  header="Cuentas del Cliente : ">
            <MenubarA :model="items" />

            <DataTable :value="cuentas" :paginator="true" :rows="10" :selection.sync="selecCuenta" selectionMode="single" responsiveLayout="scroll" dataKey="id">
                <ColumnA field="id" header="ID"></ColumnA>
                <ColumnA field="id_cliente" header="ID-CLIENTE"></ColumnA>
                <ColumnA field="tipo" header="TIPO DE CUENTA"></ColumnA>
                <ColumnA field="n_cuenta" header="# CUENTA"></ColumnA>
                <ColumnA field="moneda" header="MONEDA"></ColumnA>
                <ColumnA field="monto" header="MONTO"></ColumnA>
                <ColumnA field="fecha" header="F. CREACION"></ColumnA>
                <ColumnA field="sucursal" header="SUCURSAL"></ColumnA>
                
            </DataTable>
        </PanelA>
        
        <DialogA header="Nueva Cuenta" :visible.sync="displayModal" :containerStyle="{width: '50vw'}" :modal="true">
            <br>
            <InputTextA id="id_cliente" type="hidden" v-model="cuenta.id_cliente" class="p-inputtext-sm" />
            <span class="p-float-label">
                <DropdownA id="tipo" :options="stipo" optionLabel="name" optionValue="value" v-model="cuenta.tipo" placeholder="Tipo de Cuenta"  class="p-inputtext-sm"/>
                <label for="tipo">Tipo de Cuenta : </label>
            </span>
            <br>

            <span class="p-float-label">
                <InputTextA id="n_cuenta" type="text" v-model="cuenta.n_cuenta" class="p-inputtext-sm"/>
                <label for="n_cuenta">N. Cuenta : </label>
            </span>
            <br>
            <span class="p-float-label">
                <DropdownA id="moneda" :options="smoneda" optionLabel="name"  optionValue="value" v-model="cuenta.moneda" placeholder="Tipo de Moneda" class="p-inputtext-sm"/>
                <label for="moneda">Moneda : </label>
            </span>
            <br>

            <span class="p-float-label">
                <InputTextA id="monto" type="number" v-model="cuenta.monto" class="p-inputtext-sm" />
                <label for="monto">Monto Inicial : </label>
            </span>
            <br>

            <span class="p-float-label">
                <InputTextA id="fecha" type="text" v-model="cuenta.fecha" class="p-inputtext-sm" />
                <label for="fecha">Fecha de Creacion :</label>
            </span>
            <br>
            <span class="p-float-label">
                <DropdownA id="sucursal" :options="ssucursal" optionLabel="name"  optionValue="value" v-model="cuenta.sucursal" placeholder="Sucursal" class="p-inputtext-sm"/>
                <label for="sucursal">Sucursal : </label>
            </span>
            
            <template #footer>
                <ButtonA label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <ButtonA label="Guardar" icon="pi pi-check" @click="guardar" autofocus />
            </template>
        </DialogA>       

    </div>
</template>

<script>
import CuentasService from '../services/CuentasService';

export default ({
    name:'CuentasApp',
    props: ['idCliente'],
    data(){
        return {
            cuentas:null,
            cliente:this.idCliente,
            cuenta:{
                id:null,
                id_cliente:this.cliente,
                tipo:null,
                moneda:null,
                monto:null,
                fecha:null,
                sucursal:null
            },
            stipo: [
                {name: 'Caja de Ahorro', value: 'CAJA DE AHORRO'},
                {name: 'Cuenta Corriente', value: 'CUENTA CORRIENTE'}
            ],
            smoneda: [
                {name: 'BS', value: 'BS'},
                {name: 'US', value: 'US'}
            ],
            ssucursal: [
                {name: 'La Paz', value: 'LA PAZ'},
                {name: 'Cochabamba', value: 'COCHABAMBA'},
                {name: 'Santa Cruz', value: 'SANTA CRUZ'}
            ],
            selecCuenta:{
                id:null,
                id_cliente:null,
                tipo:null,
                moneda:null,
                monto:null,
                fecha:null,
                sucursal:null
            },
            items:[
                {
                    label:'Nueva Cuenta',
                    icon:'pi pi-fw pi-plus',
                    command:()=>{this.formularioGuardar();}
                },
                {
                    label:'Editar Cuenta',
                    icon:'pi pi-fw pi-pencil',
                    command:()=>{this.formularioEditar();}
                },
                {
                    label:'Eliminar Cuenta',
                    icon:'pi pi-fw pi-trash',
                    command:()=>{this.eliminar();}
                },
                {
                    label:'Actualizar',
                    icon:'pi pi-fw pi-refresh',
                    command:()=>{this.actualizar();}
                },
                {
                    label:'Salir',
                    icon:'pi pi-fw pi-angle-double-left',
                    command:()=>{this.salir();}
                }

            ],
            displayModal:false
        }
    },
    cuentaService : null,
    created(){
        this.cuentaService= new CuentasService();
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
            this.cuenta= this.selecCuenta;
            this.displayModal=true;
        },
        closeModal() {
            this.displayModal = false;
        },
        actualizar(){
            this.cuentaService.getListaCuenta(this.cliente).then(data=>{
            this.cuentas=data.data;
            console.log(data);
            })
            
        },
        guardar(){
            this.cuentaService.guardar(this.cuenta).then(data=>{
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
                this.cuentaService.eliminar(this.selecCuenta.id).then(data=>{
                    if(data.status==200)
                        this.$toast.add({severity:'success', summary: 'Alerta!!!!', detail:'Registro Eliminado Corectamente', life: 3000});
                        this.actualizar();
                });
            }
        },
        clean(){
            this.cuenta={
                id:null,
                id_cliente:this.cliente,
                tipo:null,
                moneda:null,
                monto:null,
                fecha:null,
                sucursal:null
            };
        },
        salir(){
            this.$router.push('/');
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