'use strict';
import {
  Model,
} from 'sequelize';

type ProjectAssAttributes = {
  ProjectId: number;
  UserId:string;
};
module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectAssignment extends Model <ProjectAssAttributes>{

    declare ProjectId: number;
    declare UserId: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  ProjectAssignment.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProjectAssignment',
  });
  return ProjectAssignment;
};