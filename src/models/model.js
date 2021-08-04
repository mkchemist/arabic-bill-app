import database from "../db/database";
export default class Model {
  constructor(table) {
    this.table = table;
    this.query = {};
  }

  /**
   * get all from table
   *
   * @param {String} table
   * @returns
   */
  static all(table) {
    let sql = `SELECT * FROM ${table}`;

    let stmt = database.prepare(sql);

    let res = stmt.all();

    return Promise.resolve(res);
  }

  /**
   * add where condition
   *
   * @param {String|Object} name
   * @param {mixed} value
   * @returns {Model}
   */
  where(name, value) {
    if (typeof name === "object") {
      Object.keys(name).map((key) => {
        this.query[key] = name[key];
      });
    } else if (typeof name === "string") {
      this.query[name] = value;
    }
    return this;
  }

  /**
   * check if the given query has a where condition
   *
   * @returns  {Boolean}
   */
  hasQueryParams() {
    return Object.keys(this.query).length > 0;
  }

  /**
   * generate where condition string
   *
   * @returns {String}
   */
  prepareQueryParams() {
    let parts = [];
    Object.keys(this.query).map((key) => {
      if (key.match(/LIKE/)) {
        parts.push(`${key} '${this.query[key]}'`);
      } else {
        parts.push(`${key}='${this.query[key]}'`);
      }
    });

    let query = "WHERE ";
    query += parts.join(" AND ");

    return query;
  }

  /**
   * generate where like condition
   *
   * @param {String} name
   * @param {String} value
   * @returns {Model}
   */
  whereLike(name, value) {
    this.query[`${name} LIKE `] = `%${value}%`;
    return this;
  }

  /**
   * generate collection Query
   *
   * @returns {Array}
   */
  generateCollectionQuery() {
    let query = "SELECT * FROM " + this.table;
    if (this.hasQueryParams()) {
      query += `  ${this.prepareQueryParams()}`;
    }

    return query;
  }

  /**
   * get all results
   *
   * @returns {Promise}
   */
  get() {
    let query = this.generateCollectionQuery();
    let stmt = database.prepare(query);
    let res = stmt.all();
    return Promise.resolve(res);
  }

  /**
   * get first result
   *
   * @returns {Promise}
   */
  first() {
    let query = this.generateCollectionQuery();
    query += " LIMIT 1";
    let stmt = database.prepare(query);
    let res = stmt.all();
    return Promise.resolve(res);
  }

  /**
   * get limited results
   * 
   * @param {Number} n 
   * @returns {Promise}
   */
  limit(n) {
    let query = this.generateCollectionQuery();
    query += " LIMIT "+n;
    let stmt = database.prepare(query);
    let res = stmt.all();
    return Promise.resolve(res);
  }

  /**
   * add new item
   * 
   * @param {String} table 
   * @param {Object} data 
   * @returns {Object}
   */
  static create(table, data = {}) {
    if(typeof table !== "string") {
      throw new TypeError("Table name must be a string");
    }
    let cols = [];
    let vals = [];
    let replaced = [];
    Object.keys(data).map(key => {
      cols.push(key)
      replaced.push('?');
      vals.push(data[key])
    });

    let sql = `INSERT INTO ${table} (${cols.join(',')}) VALUES(${replaced.join(',')})`;
    console.log(sql)
    let stmt = database.prepare(sql);
    let info = stmt.run(...vals);

    return info;
    
  }

  static raw(sql) {
    let stmt = database.prepare(sql);

    return stmt;
  }


}
