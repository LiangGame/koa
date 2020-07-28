const moment = require('moment');
const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('../config/config');

console.log('init sequelize...');

function generateId () {
  return uuid.v4();
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel (name, attributes) {
  const attrs = {
    id: {
      type: ID_TYPE,
      primaryKey: true,
      comment: '主键',
    },
  };

  for (const key in attributes) {
    const value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false,
      };
    }
  }

  attrs.createdAt = {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
    comment: '创建时间',
    get () {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    },
  };
  attrs.updatedAt = {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
    comment: '更新时间',
    get () {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    },
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false,
    comment: '版本',
  };
  console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, function (k, v) {
    if (k === 'type') {
      for (const key in Sequelize) {
        if (key === 'ABSTRACT' || key === 'NUMBER') {
          continue;
        }
        const dbType = Sequelize.DataTypes[key];
        if (typeof dbType === 'function') {
          if (v instanceof dbType) {
            if (v._length) {
              return `${dbType.key}(${v._length})`;
            }
            return dbType.key;
          }
          if (v === dbType) {
            return dbType.key;
          }
        }
      }
    }
    return v;
  }, '  '));
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        const now = Date.now();
        if (obj.isNewRecord) {
          console.log('will create entity...' + obj);
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          console.log('will update entity...');
          obj.updatedAt = now;
          obj.version++;
        }
      },
    },
  });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

const exp = {
  defineModel: defineModel,
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({ force: true });
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  },
};

for (const type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
