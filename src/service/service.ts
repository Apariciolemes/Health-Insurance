import axios from 'axios';
const baseUrl = "http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com"

export const listProfession = (uf: string, city: string) => axios.get(`${baseUrl}/profissao/${uf}/${city}?api-key=ddd70c32-fc98-4618-b494-a9698f824353`).then((resp) => resp.data);
export const listEntity = (uf: string, city: string, profession: string) => axios.get(`${baseUrl}/entidade/${profession}/${uf}/${city}}?api-key=4b94dba2-5524-4632-939b-92df1c50a645`).then((resp) => resp.data);
export const listPlansByCustomer = (data: any) => axios.post(`${baseUrl}/plano?api-key=261fd4d0-fd9f-468a-afa9-f5a89ed3701c`, data).then((resp) => resp.data);
export const getDistricts = () => axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/distritos').then((resp) => resp.data);