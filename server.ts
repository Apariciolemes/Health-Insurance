const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
const axios = require('axios')

const app = express();
app.use('/', serveStatic(path.join(__dirname, "/dist")));

app.get('/search/:uf/:city/:profession/:data', async function (req, res) {
    console.log(req)

    const params = { uf: req.params[0], city: req.params[1], profession: req.params[2], data: req.params[3] }

    const baseUrl = "http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com"
    const urlIBGE = "https://servicodados.ibge.gov.br/api/v1/localidades/distritos"

    const result = await axios.get(`${baseUrl}/profissao/${params.uf}/${params.city}?api-key=ddd70c32-fc98-4618-b494-a9698f824353`).then((resp) => resp.data);
    await axios.get(`${baseUrl}/entidade/${params.profession}/${params.uf}/${params.city}}?api-key=4b94dba2-5524-4632-939b-92df1c50a645`).then((resp) => resp.data);
    await axios.post(`${baseUrl}/plano?api-key=261fd4d0-fd9f-468a-afa9-f5a89ed3701c`, params.data).then((resp) => resp.data);
    await axios.get(urlIBGE).then((resp) => resp.data);

    res.send(result);
});


const port = process.env.PORT || 8085;
app.listen(port);
console.log("server started " + port);