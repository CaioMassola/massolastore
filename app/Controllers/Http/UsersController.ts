// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import users from "App/Models/users";

export default class UsersController {

    async postUsers({response, request}){

        try {
            const create = request.only(['username', 'email', 'cpf', 'rg', 'birth_date', 'password']);
            const insert = await users.create({permissions: '0', ...create});

            return response.status(200).send({message: 'Usuário cadastrado com sucesso!', insert});
        
        }catch (e) {
            return response.status(400).send({message: 'Erro ao registrar o usuário!', e});
        }

    }

    async getUsers({response,params}){
        try {
            let obter;
        if(params.id){
            obter = await users.findBy('id', params.id);
            
        } else {
            obter = await users.all();
        }

        if(!obter){
            return response.status(200).send({message: 'Nenhum resultado encontrado!'});
        }

        return obter;

        }catch (e) {
            return response.status(400).send({message: 'Erro ao consultar o usuário!', e});
        }
    }
    
    async putUsers ({request, params, response}) {
        try {
            const { id } = params;
            const { username, email, cpf, rg, birth_date, password } = request.post();

            const dados = await users.findBy('id', id);

            if(!dados) {
                return response.status(200).send({message: 'Usuário não encontrado!'});
            }

            //atualizar
            dados.username = username,
            dados.email = email,
            dados.cpf = cpf,
            dados.rg = rg,
            dados.birth_date = birth_date,
            dados.password = password,
            dados.id = id

            await dados.save();

            return response.status(200).send({message: 'Usuário atualizado com sucesso!', dados});
      
        }catch (e) {
            return response.status(400).send({message: 'Erro ao atualizar o usuário!', e});
        }
    }

    async deleteUsers({response, params}){
        try {
            const { id } = params;

            const dados = await users.findBy('id', id);

            if(!dados) {
                return response.status(200).send({message: 'Usuário não encontrado!'});
            }

            await dados.delete();

            return response.status(200).send({message: 'Usuário deletado com sucesso!'});

        }catch(e){
            return response.status(400).send({message: 'Erro ao deletar o usuário!', e});
        }
    }
}
