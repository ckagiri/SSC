// eslint-disable-next-line
import { log } from '../../bin/helpers';

export function base64(i) {
  return Buffer.from(i, 'utf8').toString('base64');
}

export function unbase64(i) {
  return Buffer.from(i, 'base64').toString('utf8');
}

const PREFIX = 'cursor';

export function offsetToCursor(offset) {
  return base64(PREFIX + offset);
}

/**
 * Rederives the offset from the cursor string.
 */
export function cursorToOffset(cursor) {
  return parseInt(
    unbase64(cursor).substring(PREFIX.length),
    10,
  );
}

export function getOffsetWithDefault(
  cursor,
  defaultOffset,
) {
  if (typeof cursor !== 'string') {
    return defaultOffset;
  }
  const offset = cursorToOffset(cursor);
  return Number.isNaN(offset) ? defaultOffset : offset;
}

export const connection = async (
  entity,
  find,
  query,
  { first, after, last, before },
  context,
) => {
  const { total } = await find({
    ...context,
    paginate: { default: 1, max: 1 },
    query: { ...query, $limit: 0 },
  });
  const beforeOffset = getOffsetWithDefault(before, total);
  const afterOffset = getOffsetWithDefault(after, -1);

  let startOffset = Math.max(afterOffset, -1) + 1;
  let endOffset = Math.min(beforeOffset, total);
  if (typeof first === 'number') {
    if (first < 0) {
      throw new Error(
        'Argument "first" must be a non-negative integer',
      );
    }

    endOffset = Math.min(endOffset, startOffset + first);
  }
  if (typeof last === 'number') {
    if (last < 0) {
      throw new Error(
        'Argument "last" must be a non-negative integer',
      );
    }

    startOffset = Math.max(startOffset, endOffset - last);
  }

  query.$skip = startOffset;
  query.$limit = endOffset - startOffset;
  context.query = query;
  context.paginate = {
    default: endOffset - startOffset,
    max: endOffset - startOffset,
  };
  // log(entity);

  const result = await find(context);
  const data = Array.isArray(result)
    ? result
    : result.data || [];
  const edges = data.map((value, index) => ({
    cursor: offsetToCursor(startOffset + index),
    node: entity.fromData(value, context),
  }));

  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];
  const lowerBound = after ? afterOffset + 1 : 0;
  const upperBound = before ? beforeOffset : total;

  return {
    total,
    edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage:
        typeof last === 'number'
          ? startOffset > lowerBound
          : false,
      hasNextPage:
        typeof first === 'number'
          ? endOffset < upperBound
          : false,
    },
  };
};
