import React, {Component} from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import {createEmployee, modifyEmployee} from './../../../../services/employees';
import alertifyjs from "alertifyjs";

class AddForm extends Component{
    constructor(props){
        super(props);
        const defaultData={id: null, name: "", last_name: "", email: "", phone: ""}
        this.state={
            data: (props.data || defaultData),
        }
    }

    validateDataSubmit=()=>{
        const {name, last_name, email, phone}=this.state.data;
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(name.length>0 && last_name.length>0 && email.length>0 && phone.length>0){
            if(phone.length<10){
                alertifyjs.warning("El número de teléfono debe de ser de 10 dígitos");
                return false;
            }if(!re.test(email.toLowerCase())){
                alertifyjs.warning("Coloque un correo válido");
                return false;
            }
            else return true
        }
        else{
            alertifyjs.warning("No puede haber campos vacíos");
            return false;
        }
    }

    handleSubmit=()=>{
        const data=this.state.data;
        if(this.validateDataSubmit()){
            if(data.id){
                modifyEmployee(data).then(()=>{
                    this.props.handleCancel();
                    alertifyjs.success("Empleado modificado correctamente")
                }, (e) => console.error(e))
            }else{
                createEmployee(data).then(()=>{
                    this.props.handleCancel();
                    alertifyjs.success("Empleado creado correctamente")
                }, (e) => console.error(e))
            }
        }
    }

    validateData=(val, field)=>{
        switch(field){
            case "phone":
                if(val.length<=10){
                    if(val.charAt(val.length-1)==='0' || val.charAt(val.length-1)==='1' || val.charAt(val.length-1)==='2' || val.charAt(val.length-1)==='3' || val.charAt(val.length-1)==='4' || val.charAt(val.length-1)==='5' || val.charAt(val.length-1)==='6' || val.charAt(val.length-1)==='7' || val.charAt(val.length-1)==='8' || val.charAt(val.length-1)==='9') return true;
                    else{
                        if(val.length===1){
                            const data=this.state.data;
                            data.phone="";
                            this.setState({data});
                        }
                        alertifyjs.warning("Sólo se admiten números");
                        return false;
                    }
                }
                else{
                    alertifyjs.warning("La longitud máxima de este campo es 10");
                    return false;
                }
            default:
                if(val.length<=45) return true;
                else{
                    alertifyjs.warning("La longitud máxima de este campo es 45");
                    return false;
                }
        }
    }

    handleChange=(event)=>{
        const val = event.target.value;
        const field = event.target.name;
        if(this.validateData(val, field)){
            let data=this.state.data;
            data[field]=val;
            this.setState({ data });
        }
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