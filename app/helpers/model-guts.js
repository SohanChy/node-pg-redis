'use strict'

// The guts of a model that uses Knexjs to store and retrieve data from a
// database using the provided `knex` instance. Custom functionality can be
// composed on top of this set of common guts.
//
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)
module.exports = ({
  knex = {},
  name = 'name',
  tableName = 'tablename',
  selectableProps = [],
  timeout = parseInt(process.env.DB_TIMEOUT) || 5
}) => {
  class Paginator {
    constructor(total,limit,offset,dataLength,page) {
        this.total = total;
        this.dataLength = dataLength,
        this.limit = limit;
        this.offset = offset;
        this.from = offset + 1;
        this.to = offset + dataLength;
        this.page = page;
        this.lastPage = Math.ceil(total / limit);
    }
  }

  const queryBuilder = function(){
    return knex.select(selectableProps)
    .from(tableName)
    .timeout(timeout);
  }

  const filteredQueryBuilder = function(filters = {}){
    let knexQb = knex.select(selectableProps)
    .from(tableName)
    .timeout(timeout);

    for(let filterKey in filters){
      knexQb.where(filterKey,filters[filterKey]);
    }

    return knexQb;
  }

  const paginateQuery = async function(knexQb,limit = 200, page = 1, dontCount = true){
    const offset = (page - 1) * limit
    let data = null;
    let total = null;
    if(dontCount){
        data = await knexQb.offset(offset).limit(limit)
        total = data.length
    }
    else {
        data = await knexQb.offset(offset).limit(limit)    
        total = ( await knex.from(tableName).timeout(timeout).count('* as count').first() ).count
    }

    return {
        paginator: new Paginator(total,limit,offset,data.length,page),
        data
    };

}

const create = props => {
  delete props.id // not allowed to set `id`

  return knex.insert(props)
    .returning(selectableProps)
    .into(tableName)
    .timeout(timeout)
}
  const findAll = () => knex.select(selectableProps)
    .from(tableName)
    .timeout(timeout)

  const find = filters => knex.select(selectableProps)
    .from(tableName)
    .where(filters)
    .timeout(timeout)

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = filters => find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results

      return results[0]
    })

  const findById = id => knex.select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  const update = (id, props) => {
    delete props.id // not allowed to set `id`

    return knex.update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout)
  }

  const destroy = id => knex.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
    queryBuilder,
    paginateQuery,
    filteredQueryBuilder
  }
}
