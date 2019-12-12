import React, {Component} from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import {createEmployee, modifyEmployee} from './../../../../services/employees';

class AddForm extends Component{
    constructor(props){
        super(props);
        const defaultData={id: null, name: null, last_name: null, email: null, phone: null}
        this.state={
            data: (props.data || defaultData),
        }
    }

    handleSubmit=()=>{
        const data=this.state.data;
        if(data.id){
            modifyEmployee(data).then(()=>{
                this.props.handleCancel();
            }, (e) => console.error(e))
        }else{
            createEmployee(data).then(()=>{
                this.props.handleCancel();
            }, (e) => console.error(e))
        }
    }

    handleChange=(event)=>{
        const val = event.target.value
        let data=this.state.data;
        data[event.target.name]=val;
        this.setState({ data });
    }

    render(){
        const {data}=this.state;
        return(
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        name="name" 
                        label="Nombre"
                        value={data.name}
                        fullWidth
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        name="last_name" 
                        label="Apellido"
                        value={data.last_name}
                        fullWidth
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        name="email" 
                        label="Correo"
                        value={data.email}
                        fullWidth
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        name="phone" 
                        label="Teléfono"
                        value={data.phone}
                        fullWidth
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button color="secondary" onClick={this.props.handleCancel}>Cancelar</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button color="primary" onClick={this.handleSubmit}>{data.id ? "modificar" : "crear"} empleado</Button>
                </Grid>
            </Grid>
        );
    }
}

export default AddForm;