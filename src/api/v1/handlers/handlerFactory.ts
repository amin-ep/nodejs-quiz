import catchAsync from '../../../utils/catchAsync.js';
import { Response, NextFunction } from 'express';
import { IRequest } from '../interfaces/IRequest.js';
import { Model as MongooseModel, Document } from 'mongoose';
import HttpError from '../../../utils/httpError.js';

export default class Factory<T extends Document> {
  constructor(protected Model: MongooseModel<T>) {}

  getAllDocuments = catchAsync(async (req: IRequest, res: Response) => {
    const docs = await this.Model.find();

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        docs,
      },
    });
  });

  createDocument = catchAsync(async (req: IRequest, res: Response) => {
    const newDocument = await this.Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        document: newDocument,
      },
    });
  });

  getDocumentById = catchAsync(async (req: IRequest, res: Response) => {
    const document = await this.Model.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

  updateDocument = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      const updatedDocument = await this.Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnOriginal: false,
        }
      );

      if (!updatedDocument) {
        return next(new HttpError(`Invalid Id: ${req.params.id}`, 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          document: updatedDocument,
        },
      });
    }
  );

  deleteDocument = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      const document = await this.Model.findByIdAndDelete(req.params.id);

      if (!document) {
        return next(new HttpError(`Invalid Id: ${req.params.id}`, 404));
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
}
