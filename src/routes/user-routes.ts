import express from 'express';
import { genAccessToken, VerifyToken } from '../middelware/autentication';
import { validatorHandler } from '../validator/validator';
import { login, register } from '../schema/user-schema';
import User from '../models/user-model';
const app = express();

app.use(express.json())

/**
 * @swagger
 *  components: 
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          phone:
 *            type: string
 *            description: Phone login
 *            default: 584241797753
 *          password:
 *            type: string
 *            description: Password login
 *            default: IntelliNext
 */

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: Login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      description: Login credentials
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        descriptions: Login successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/User'
 *      500:
 *        descriptions: general error
 */


app.post('/users/login', validatorHandler(login, 'body'), async (req, res) => {
    try {

        const data: any = await User.findAll()
        // Solución alternativa para crear un usuario base con el que hacer las pruebas, para no requerir crearlo por BD.
        if(data == ''){
            let datos = {
                name: 'Luis Plaza',
                phone: '584241797753',
                email: 'suilppm@gmail.com',
                address: 'Los Teques, Miranda, Venezuela',
                password: 'IntelliNext'
            }

            await User.create(datos)
        }

        const { phone, password } = req.body;

        const user: any = await User.findOne({ where: { phone } })
        if (!user || !(await user.comparePassword(password)))
            return res.status(500).json({ status: false, messagge: "Usuario/Contraseña invalidos" })

        const access_token = await genAccessToken(phone)

        return res.status(200).json({ status: true, messagge: "Inicio de sesión exitoso", user, access_token, token_type: "bearer" })

    } catch (error: any) {
        return res.status(500).json({ status: false, messagge: error.message })
    }

})

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Get users
 *    tags: [User]
 *    responses:
 *      200:
 *        descriptions: Login successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/User'
 *      500:
 *        descriptions: general error
 */

app.get('/users', async (_req, res) => {
    try {

        const data: any = await User.findAll()

        if (!data)
            return res.status(500).json({ status: true, messagge: "Error al obtener usuarios" })

        return res.status(200).json({ status: true, messagge: "Consulta de usuarios exitosa", data: data })

    } catch (error: any) {
        return res.status(500).json({ status: false, messagge: error.message })
    }

})

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    summary: Get users by ID
 *    tags: [User]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: User ID
 *    responses:
 *      200:
 *        descriptions: Login successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/User'
 *      500:
 *        descriptions: general error
 */

app.get('/users/:id', VerifyToken, async (req, res) => {
    try {

        const { id } = req.params;

        const data: any = await User.findOne({ where: { id } })

        if (!data)
            return res.status(500).json({ status: true, messagge: "Error al obtener usuario" })

        return res.status(200).json({ status: true, messagge: "Consulta de usuario exitosa", data: data })

    } catch (error: any) {
        return res.status(500).json({ status: false, messagge: error.message })
    }

})

/**
 * @swagger
 *  components: 
 *    schemas:
 *      UserRegister:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Name user register
 *            default: Luis
 *          phone:
 *            type: string
 *            description: Phone user register
 *            default: 584241797753
 *          email:
 *            type: string
 *            description: Email user register
 *            default: suilppm@gmail.com
 *          address:
 *            type: string
 *            description: Address user register
 *            default: Los Teques, Miranda, Venezuela
 *          password:
 *            type: string
 *            description: Password user register
 *            default: 12sd3sdakajasd
 */

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: Register user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserRegister'
 *    responses:
 *      200:
 *        descriptions: Register successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/UserRegister'
 *      500:
 *        descriptions: general error
 */

app.post('/users', VerifyToken, validatorHandler(register, 'body'), async (req, res) => {
    try {

        const data = await User.create(req.body)

        if (!data)
            return res.status(500).json({ status: true, messagge: "Error al registrar usuario" })

        return res.status(200).json({ status: true, messagge: "Registro de usuario exitoso", data: data })

    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/v1/users/{id_user}:
 *  put:
 *    summary: Update user by ID
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserRegister'
 *    parameters:
 *      -   in: path
 *          name: id_user
 *          schema:
 *              type: integer
 *          required: true
 *          description: User ID
 *    responses:
 *      200:
 *        descriptions: Update successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/UserRegister'
 *      500:
 *        descriptions: general error
 */

app.put('/users/:id_user', VerifyToken, validatorHandler(register, 'body'), async (req, res) => {
    try {

        const data: any = await User.findOne({ where: { id: req.params.id_user } });
        data.name = req.body.name;
        data.phone = req.body.phone;
        data.email = req.body.email;
        data.address = req.body.address;
        data.passwrod = req.body.passwrod;
        data.statusId = req.body.statusId;
        await data.save()

        if (!data)
            return res.status(500).json({ status: true, messagge: "Error al actualizar usuario" })

        return res.status(200).json({ status: true, messagge: "Actualización de usuario exitoso", data: data })

    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/v1/users/{id_user}:
 *  delete:
 *    summary: Delete user by Id
 *    tags: [User]
 *    parameters:
 *      -   in: path
 *          name: id_user
 *          schema:
 *              type: integer
 *          required: true
 *          description: User ID
 *    responses:
 *      204:
 *        descriptions: Delete user
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/User'
 *      404:
 *        descriptions: general error
 */

app.delete('/users/:id_user', VerifyToken, async (req, res) => {
    try {
        const data: any = await User.destroy({ where: { id: req.params.id_user } });

        if(!data)
            return res.status(500).json({ status: true, messagge: "Error al eliminar usuario" })

        return res.status(204).json({ status: true, message: "Eliminación exitosa", data })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

export default app;