/****

        [ CREADO POR: AARON DEVELOPER ]
    {Funciones con acceso a la data de la DGII}

    ACCESOS:

    - Consultar Construbuyentes por RNC/Cedula 
    

 ****/




    function getContribuyentes(rnc_cedula, callback) {
        const proxyUrl = 'https://corsproxy.io/';
        const urlConsultaRnc = "https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx";
    
        const fetchViaProxy = (url, options) => {
            return fetch(proxyUrl + url, options);
        };
    
        return fetchViaProxy(urlConsultaRnc)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
    
                let formData = "";
                formData += "ctl00$smMain=ctl00$cphMain$upBusqueda|ctl00$cphMain$btnBuscarPorRNC&";
                formData += "ctl00$cphMain$txtRNCCedula=" + encodeURIComponent(rnc_cedula) + "&";
                formData += "ctl00$cphMain$txtRazonSocial=&";
                formData += "__EVENTTARGET=&";
                formData += "__EVENTARGUMENT=&";
                formData += "__VIEWSTATEGENERATOR=" + encodeURIComponent(doc.querySelector("input[name='__VIEWSTATEGENERATOR']").value) + "&";
                formData += "__VIEWSTATE=" + encodeURIComponent(doc.querySelector("input[name='__VIEWSTATE']").value) + "&";
                formData += "__EVENTVALIDATION=" + encodeURIComponent(doc.querySelector("input[name='__EVENTVALIDATION']").value) + "&";
                formData += "__ASYNCPOST=true&";
                formData += "ctl00$cphMain$btnBuscarPorRNC=BUSCAR";
    
                return fetchViaProxy(urlConsultaRnc, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData
                });
            })
            .then(response => response.text())
            .then(responseText => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(responseText, 'text/html');
    
                const response = {
                    success: false
                };
    
                const datosContribuyenteElement = doc.querySelector("#cphMain_dvDatosContribuyentes");
                if (datosContribuyenteElement && datosContribuyenteElement.children.length > 0) {
                    response.rnc = doc.querySelector("tr:nth-child(1) > td:nth-child(2)")?.textContent.trim();
                    response.nombreRazonSocial = doc.querySelector("tr:nth-child(2) > td:nth-child(2)")?.textContent.trim();
                    response.nombreComercial = doc.querySelector("tr:nth-child(3) > td:nth-child(2)")?.textContent.trim();
                    response.categoria = doc.querySelector("tr:nth-child(5) > td:nth-child(4)")?.textContent.trim();
                    response.regimenDePagos = doc.querySelector("tr:nth-child(5) > td:nth-child(2)")?.textContent.trim();
                    response.estado = doc.querySelector("tr:nth-child(6) > td:nth-child(2)")?.textContent.trim();
                    response.actividadEconomica = doc.querySelector("tr:nth-child(7) > td:nth-child(2)")?.textContent.trim();
                    response.administracionLocal = doc.querySelector("tr:nth-child(8) > td:nth-child(2)")?.textContent.trim();
                    response.success = true;
    
                    callback(response);
                } else {
                    //response.message = doc.querySelector("#cphMain_lblInformacion")?.textContent.trim();
                    callback(null);
                }
            });
    }
    