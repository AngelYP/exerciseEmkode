import React from 'react';
import MaterialTable from 'material-table';

export default function Table({columns, data, dataEdit, dataDelete}){
    return(
        <div>
            <MaterialTable
                title="Empleados"
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Modificar usuario',
                        onClick: (event, rowData) => dataEdit(rowData, rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar usuario',
                        onClick: (event, rowData) => dataDelete(rowData)
                    }
                ]}    
                options={{
                    search: true
                }}
            />
            
        </div>
    );
}