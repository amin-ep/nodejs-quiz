import { Document, Query } from 'mongoose';

type QueryObject = {
  [key: string]: string | boolean | number | undefined;
};

export default class ApiFeatures {
  constructor(
    public query: Query<Document[], Document>,
    private queryString: {
      sort?: string;
      limit: number;
      page: number;
      fields: string;
    }
  ) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj: QueryObject = { ...this.queryString };
    const fields = ['page', 'sort', 'fields', 'limit'];
    fields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.limit) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
