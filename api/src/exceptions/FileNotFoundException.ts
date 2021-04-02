import HttpException from './HttpException';

class FileNotFoundException extends HttpException {
  constructor(error: string) {
    super(404, `File not found`, error);
  }
}

export default FileNotFoundException;
