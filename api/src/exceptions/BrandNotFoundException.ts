import HttpException from './HttpException';

class BrandNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Not found`, `Brand with id ${id} not found`);
  }
}

export default BrandNotFoundException;
