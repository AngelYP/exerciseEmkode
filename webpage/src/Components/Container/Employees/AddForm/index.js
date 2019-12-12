import React, {Component} from 'react';
import { Grid, TextField } from '@material-ui/core';

class AddForm extends Component{
    constructor(props){
        super(props);
        const defaultData={id: null, name: null, last_name: null, email: null, phone: null}
        this.state={
            data: (props.data || defaultData),
            oldData: (props.oldData || defaultData)
        }
    }

    componentDidMount(){
    }

    handleChange=(event)=>{
        const val = event.target.value
        let data=this.state.data;
        console.log(data)
        console.log(this.state.oldData)
        data[event.target.name]=val;
        this.setState({ data });
    }

    render(){
        const {data}=this.state;
        return(
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                        name="name" 
                        label="Nombre"
                        value={data.name}
                        fullWidth
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    qwe
                </Grid>
            </Grid>
        );
    }
}

export default AddForm;