import catchAsync from '../../../utils/catchAsync.js';
import { Response, NextFunction } from 'express';
import { IRequest } from '../interfaces/IRequest.js';
import { Model as MongooseModel, Document } from 'mongoose';
import HttpError from '../../../utils/httpError.js';
import { IQuestion } from '../interfaces/IQuestion.js';
import { IQuiz } from '../interfaces/IQuiz.js';

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
      // check data is for current user
      const currentDoc: IQuestion | IQuiz | null = await this.Model.findById(
        req.params.id
      );

      if (currentDoc?.owner.toString() !== req.user?.id) {
        if (req?.user?.role === 'admin') next();
        else {
          return next(
            new HttpError(
              'You do not have permission to perform this action',
              403
            )
          );
        }
      }

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
      // check data is for current user
      const currentDoc: IQuestion | IQuiz | null = await this.Model.findById(
        req.params.id
      );

      if (currentDoc?.owner.toString() !== req.user?.id) {
        if (req?.user?.role === 'admin') next();
        else {
          return next(
            new HttpError(
              'You do not have permission to perform this action',
              403
            )
          );
        }
      }

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
