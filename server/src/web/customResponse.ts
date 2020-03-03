export default class CustomResponse {
  constructor(success: boolean, data: any[] = [], errors: any[] = []) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }
  errors: any[];
  data: any[];
  success: boolean;
}
