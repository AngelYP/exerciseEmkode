import React from 'react';
import Employees from './Employees';
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.css'

export default function Container(){
    return(
        <div>
            <Employees/>
        </div>
    );
}