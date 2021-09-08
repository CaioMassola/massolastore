// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuxProduct from 'App/Models/AuxProduct';

export default class AuxProductsController {

    async postProduct({response, request,auth}) {
        try {

            if(auth.user.permissions == '1'){
            const dados = request.only(['code', 'product']);
            const create = await AuxProduct.create(dados);

            return response.status(200).send({message: 'Produto cadastrado com sucesso!', create});
            }
             else {
                 return response.status(403).send({message: 'Você não tem permissão para registrar o produto!'})
             }
        }catch (e) {
            return response.status(400).send({message: 'Erro ao registrar o produto!', e});
        }

    }

    async getProduct({response, request, params}) {
        try {
            let read;
            if(params.code){
              read = await AuxProduct.findBy('code', params.code);
            }
            else {
              read = await AuxProduct.all();
            }

            if(!read){
                return response.status(200).send({message: 'Produto não encontrado!'});
            }
            
            return response.status(200).send({message: 'Produto encontrado!', read});
        }catch (e) {
            return response.status(400).send({message: 'Erro ao listar o produto!', e});
        }
    }
}
