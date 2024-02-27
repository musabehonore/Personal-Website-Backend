import { Request, Response } from 'express';
import Queries from '../models/Queries';
import { Error, Query } from "mongoose";
import { queryVal } from '../validations/queriesValidation';

class QueriesController {
  public async getAllQueries(req: Request, res: Response) {
    try {
      const queries = await Queries.find();
      res.json({ queries, message: 'These are the Queries' });
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getQueryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const query = await Queries.findById(id);
      if (!query) {
        return res.status(404).json({ message: 'Query not found' });
      }
      res.json({ query, message: 'This is the Query' });
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async createQuery(req: Request, res: Response) {
    try {
      const { name, email, message } = req.body;
      const { error } = queryVal.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const query = new Queries({
        name,
        email,
        message,
        date: new Date(),
      });
      const savedQuery = await query.save();
      res.status(201).json({ Query: savedQuery, message: 'Your Query is sent successfully' });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  public async deleteQuery(req: Request, res: Response) {
    try {
      await Queries.findByIdAndDelete(req.params.id);
      res.send({ message: "Query deleted!!" });
    } catch (error) {
      return res.status(500).send({ message: (error as Error).message });
    }
  }

}

export { QueriesController };
