/* importar libreria jsonwebtoken */
import jwt from 'jsonwebtoken'
const SEED_AUTHENTICATION = process.env.SEED_AUTHENTICATION;

/*   Generar token*/

export let genAccessToken = (user = '') => {
	return jwt.sign({
		user
	}, `${SEED_AUTHENTICATION}`, { expiresIn: '1h' }
	)
}

/* Autenticar token */

export let VerifyToken = (req: any, res: any, next: any) => {
	let token = req.get('Authorization');
	token = token.replace('Bearer ', '')

	jwt.verify(token, `${SEED_AUTHENTICATION}`, (err: any, decoded: any) => {
		if (err) {
			return res.status(200).json({
				status: 302,
				message: 'Token Invalido',
			});
		}
		req.usuario = decoded.user;
		next();
	});
};