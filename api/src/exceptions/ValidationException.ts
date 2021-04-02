import HttpException from './HttpException';

class ValidationException extends HttpException {
  constructor(error: any) {
    super(400, 'Bad Request', error);
  }
}

export default ValidationException;
