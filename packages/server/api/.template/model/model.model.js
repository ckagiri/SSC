import BaseModel from '../../model';


// Definition has higher priority to model.definition file
const definition = {
};

// this.method - unsecure method
// this.service.method - secure and hooked method
class Model extends BaseModel {
  constructor(app, options) {
    super(app, options, definition);
  }
  
}

export default Model;
