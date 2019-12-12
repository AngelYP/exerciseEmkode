<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app = new \Slim\App;

//get all eployees
$app->get("/employees", function(Request $request, Response $response){
    $query = "SELECT * FROM employees";
    try{
        $db = new db();
        $db = $db->conn();
        $res = $db->query($query);
        if($res->rowCount()>0){
            $employees = $res->fetchAll(PDO::FETCH_OBJ);
            return json_encode(["employees"=>$employees]);
        }else{
            echo json_encode("No hay empleados");
        }
        $res = null;
        $db = null;
    }catch(PDOException $e){
        echo "{\"error\" : {\"text\":".$e->getMessage()."}";
    }
});

//create employee
$app->post("/employees/add", function(Request $request, Response $response){
    $name = $request->getParam('name');
    $last_name = $request->getParam('last_name');
    $email = $request->getParam('email');
    $phone = $request->getParam('phone');

    $query = "INSERT INTO employees (name, last_name, email, phone) VALUES
        (:name, :last_name, :email, :phone)";

    try{
        $db = new db();
        $db = $db->conn();
        $res = $db->prepare($query);

        $res->bindParam(':name', $name);
        $res->bindParam(':last_name', $last_name);
        $res->bindParam(':email', $email);
        $res->bindParam(':phone', $phone);

        $res->execute();
        return json_encode("Empleado insertado");

        $res = null;
        $db = null;
    }catch(PDOException $e){
        echo "{\"error\" : {\"text\":".$e->getMessage()."}";
    }
});

//edit employee
$app->post("/employees/edit", function(Request $request, Response $response){
    $id = $request->getParam('id');
    $name = $request->getParam('name');
    $last_name = $request->getParam('last_name');
    $email = $request->getParam('email');
    $phone = $request->getParam('phone');

    $query = "UPDATE employees SET
        name = :name,
        last_name = :last_name,
        email = :email,
        phone = :phone
        WHERE id = :id"
    ;

    try{
        $db = new db();
        $db = $db->conn();
        $res = $db->prepare($query);

        $res->bindParam(':id', $id);
        $res->bindParam(':name', $name);
        $res->bindParam(':last_name', $last_name);
        $res->bindParam(':email', $email);
        $res->bindParam(':phone', $phone);

        $res->execute();
        return json_encode("Empleado insertado");

        $res = null;
        $db = null;
    }catch(PDOException $e){
        echo "{\"error\" : {\"text\":".$e->getMessage()."}";
    }
});

//delete employee
$app->post("/employees/delete", function(Request $request, Response $response){
    $id = $request->getParam('id');

    $query = "DELETE FROM employees WHERE id=$id";

    try{
        $db = new db();
        $db = $db->conn();
        $res = $db->prepare($query);
        $res->execute();

        if($res->rowCount()>0) return json_encode("Empleado eliminado");
        else return json_encode("Error al eliminar");

    }catch(PDOException $e){
        echo "{\"error\" : {\"text\":".$e->getMessage()."}";
    }
});