import R from 'ramda';
import { isShortPhone, isEmail } from '@ssc/common';

import BaseModel from '../../bin/model';

const definition = {};

class Model extends BaseModel {
  constructor(app, options) {
    super(app, options, definition);
  }

  // eslint-disable-next-line
  getType({ category, data }) {
    return category || 'Customer';
    // return category;
  }

  async findContacts(context) {
    const {
      query: { text, $sort, $limit, $skip = 0, ...query },
    } = context;
    let textSearch = '';
    let score = 0;
    if (text) {
      const terms = R.pipe(
        R.trim,
        R.split(' '),
        R.filter(t => t),
      )(text);
      terms.forEach(term => {
        if (isShortPhone.test(term) && !query.phone) {
          query.phone = RegExp(`^\\+?${term}\\d{0,3}$`, 'i');
        } else if (isEmail.test(term) && !query.email) {
          query.email = term;
        } else {
          score += 1;
          textSearch = `${textSearch} ${term}`;
        }
      });
    }
    if (textSearch) {
      const aggregate = [
        {
          $match: { $text: { $search: text } },
        },
        { $match: query },

        {
          $addFields: {
            searchScore: { $meta: 'textScore' },
          },
        },
        {
          $match: {
            searchScore: { $gte: score / 2 },
          },
        },
      ];
      if ($limit === 0) {
        const count = await this.app.models.contact.Model.aggregate(
          aggregate.concat({ $count: 'total' }),
        ).toArray();
        return count[0] || { total: 0 };
      }
      return this.app.models.contact.Model.aggregate(
        aggregate.concat([{ $sort: { searchScore: -1, ...$sort, _id: 1 } }, { $skip }, { $limit }]),
        context,
      ).toArray();
    }
    // Don't allow to search all contacts
    if (R.isEmpty(query)) {
      if ($limit === 0) {
        return { total: null };
      }
      return null;
    }

    context.query = query;
    return this.app.models.contact.find(context);
  }
}

export default Model;
