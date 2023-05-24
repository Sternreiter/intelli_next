import boom from '@hapi/boom';

export function validatorHandler(schema: any, property: any) {
  return (req: any, res: any, next: any) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(res.status(400).json({status: 400 , message: boom.badRequest(error).message, data: []}));
    }
    next();
  }
}