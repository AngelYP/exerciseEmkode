import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import Table from '../../Table';
import {employees, getEmployees, deleteEmployee} from './../../../services/employees'
import AddForm from './AddForm';
import Dialog from '../../Dialog';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import alertifyjs from "alertifyjs";

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 100,
    left: 'auto',
    position: 'fixed',
};

class Employees extends Component{
    constructor(){
        super();
        this.state={
            columns: [
                { title: 'Nombre', field: 'name' },
                { title: 'Apellido', field: 'last_name' },
                { title: 'Correo', field: 'email' },
                { title: 'Teléfono', field: 'phone', type: 'numeric' },
            ],
            data: employees, 
            openDialog: false,
            dialogTitle: "Agregar empleado"
        }
    }

    addForm=<AddForm handleCancel={this.setOpenFalse}/>;

    async getData() {
        getEmployees().then(({ employees }) => {
            this.setState({data: employees})
        })
    }

    deleteEmployee=(data)=>{
        deleteEmployee(data).then(()=>{
            this.getData();
            alertifyjs.success("Empleado eliminado correctamente")
        }, (e) => console.error(e))
    }

    openEditDialog=(data, oldData)=>{
        this.addForm=<AddForm data={data} oldData={oldData} handleCancel={this.setOpenFalse}/>
        this.setState({dialogTitle: "Modificar empleado"});
        this.setState({openDialog: true});
    }

    setOpenTrue=()=>{
        this.addForm=<AddForm handleCancel={this.setOpenFalse}/>
        this.setState({dialogTitle: "Agregar empleado"});
        this.setState({openDialog: true});
    }

    setOpenFalse=()=>{
        this.getData();
        this.setState({openDialog: false});
        this.addForm=<AddForm handleCancel={this.setOpenFalse}/>
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        const {columns, data, openDialog, dialogTitle}=this.state;
        return(
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <br/>
                        <Table columns={columns} data={data} dataEdit={this.openEditDialog} dataDelete={this.deleteEmployee}/>
                        <br/>
                    </Grid>
                    <Dialog open={openDialog} handleCancel={this.setOpenFalse} content={this.addForm} title={dialogTitle} size={"lg"}/>
                </Grid>
                <Fab aria-label="Add" color="primary" style={style} onClick={this.setOpenTrue}>
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}

export default Employees;