import { Request, Response } from 'express';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  request,
  response,
  requestBody,
  httpPut,
  httpDelete,
  queryParam,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import TYPES from '../../constants/types/types';
import PersonService from '../../domain/person/services/personService';
import { mapFromRequest } from '../mappers/personMap';
import CustomResponse from '../customResponse';

@controller('/person')
export default class PersonController implements interfaces.Controller {
  public personService: PersonService;

  constructor(
    @inject(TYPES.services.PersonService) personService: PersonService
  ) {
    this.personService = personService;
  }

  @httpGet('/')
  async getAll(@response() res: Response): Promise<any> {
    try {
      const result = await this.personService.get();

      res.status(200).json(new CustomResponse(true, result));
    } catch (error) {
      res.status(500).json(new CustomResponse(false, [], [error.message]));
    }
  }

  @httpGet('/existing')
  async getExisting(@response() res: Response): Promise<any> {
    try {
      const result = await this.personService.getActiveOrInactive();

      res.status(200).json(new CustomResponse(true, result));
    } catch (error) {
      res.status(500).json(new CustomResponse(false, [], [error.message]));
    }
  }

  @httpGet('/:id')
  async getbyId(
    @response() res: Response,
    @requestParam() id: string
  ): Promise<any> {
    try {
      if (!id || id === '')
        return res.status(400).json(new CustomResponse(false, [], ['']));

      const result = await this.personService.getById(id);

      res.status(200).json(new CustomResponse(true, [result]));
    } catch (error) {
      res.status(500).json(new CustomResponse(false, [], [error.message]));
    }
  }

  @httpPost('/')
  async create(
    @response() res: Response,
    @requestBody() body: any
  ): Promise<any> {
    try {
      if (!body || !body.name || body.name === '')
        return res.status(400).json(new CustomResponse(false, [], ['']));

      const person = mapFromRequest(body);
      await this.personService.create(person);

      res.status(201).json(new CustomResponse(true));
    } catch (error) {
      res.status(500).json(new CustomResponse(false, [], [error.message]));
    }
  }

  @httpPut('/')
  async update(
    @response() res: Response,
    @requestBody() body: any
  ): Promise<any> {
    try {
      if (!body || !body.name || body.name === '' || !body.status)
        return res.status(400).json(new CustomResponse(false, [], ['']));

      const person = mapFromRequest(body);
      await this.personService.update(person);

      res.status(204).json(new CustomResponse(true));
    } catch (error) {
      res.status(500).json(new CustomResponse(false, [], [error.message]));
    }
  }

  @httpDelete('/:id')
  async delete(
    @response() res: Response,
    @requestParam() id?: string
  ): Promise<any> {
    try {
      if (!id || id === '')
        return res.status(400).json(new CustomResponse(false, [], ['']));

      await this.personService.deletePerson(id);

      res.status(204).json(new CustomResponse(true));
    } catch (error) {
      res.status(500).json(new CustomResponse(false, [], [error.message]));
    }
  }
}
