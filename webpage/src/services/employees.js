import { SERVER_BASE_URL } from "./../constants";

export const getEmployees =async function () {
    try {
        const response = await fetch(`${SERVER_BASE_URL}`,{
            headers: {
                'Content-Type': 'application/json',
            }}
        );
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);

        return json;
    } catch (error) {
        console.log(error);
        return null
    }
}

export const createEmployee = async function (data) {
    try {
        const response = await fetch(`${SERVER_BASE_URL}/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const modifyEmployee = async function (data) {
    console.log(data)
    try {
        const response = await fetch(`${SERVER_BASE_URL}/edit`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const deleteEmployee = async function (data) {
    console.log(data)
    try {
        const response = await fetch(`${SERVER_BASE_URL}/delete`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const employees=[
    {id: 1, name: "Allan", last_name: "Poe", email: "allan_poe_09@email.com", phone: "4435679083"},
    {id: 2, name: "Clive S.", last_name: "Lewis", email: "cs_lewis_98@email.com", phone: "4437094524"},
];