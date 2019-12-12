import React, {Component} from 'react';
import { Grid, Button } from '@material-ui/core';
import Table from '../../Table';
import {employees} from './../../../services/employees'
import AddForm from './AddForm';
import Dialog from '../../Dialog';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

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

    addForm=<AddForm/>;

    openEditDialog=(data, oldData)=>{
        this.addForm=<AddForm data={data} oldData={oldData}/>
        this.setState({dialogTitle: "Modificar empleado"});
        this.setOpenTrue();
    }

    setOpenTrue=()=>{
        this.setState({openDialog: true});
    }

    setOpenFalse=()=>{
        this.setState({openDialog: false});
        this.setState({dialogTitle: "Agregar empleado"});
        console.log(employees)
        this.setState({data: employees})
        this.addForm=<AddForm/>
    }

    componentDidMount(){

    }

    render(){
        const {columns, data, openDialog, dialogTitle}=this.state;
        return(
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Table columns={columns} data={data} dataEdit={this.openEditDialog}/>
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