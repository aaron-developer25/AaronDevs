/****

        [ CREADO POR: AARON DEVELOPER ]
    {Funciones con acceso a la data de la JCE}
            {JUNTA CENTRAL ELECTORAL}

    ACCESOS:

    - Consultar Datos de Personas por Cedula
    

 ****/



    function getPersonaCedula(cedula, callback){
        var apiUrl = "https://api-ov.intrant.gob.do/api/User/ValidaCedula/";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);       
                var Datos = [];

                if (response.Nombre != null) {                                   
                    Datos.Nombre = response.Nombre;
                    Datos.Apellidos = response.Apellidos;
                    Datos.Nacimiento = response.Nacimiento;
                    Datos.Email = response.Email;
                    Datos.Sexo = response.Sexo;
                    Datos.Telefono = response.Telefono;

                    callback(Datos);

                } else {
                    callback(null);
                }
            }
        };

        var data = {
            "ID1": cedula.substring(0, 3),
            "ID2": cedula.substring(3, 10),
            "ID3": cedula.substring(10)
        };

        var jsonData = JSON.stringify(data);
        xhr.send(jsonData);
    }