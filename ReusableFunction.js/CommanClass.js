class CRUDOperations {
    constructor(model) {
      this.model = model;  // The model (e.g., Gender, User, etc.)
    }
  
    // Create Operation
    async create(data) {
      try {
        const createdDocument = new this.model(data);
        return await createdDocument.save();
      } catch (err) {
        throw new Error(`Error creating document: ${err.message}`);
      }
    }
  
    // Read All Operation
    async find(obj) {
      try {
        const documents = await this.model.find(obj);
        return documents;
      } catch (err) {
        throw new Error(`Error retrieving documents: ${err.message}`);
      }
    }
  
  
    // Read One Operation (by condition)
    async findOne(condition) {
      try {
        return await this.model.findOne(condition);  // Just return the result, don't handle "not found"
      } catch (err) {
        throw new Error(`Error retrieving document: ${err.message}`);
      }
    }
  
    // Update Operation
    async update(obj, data) {
      try {
        const updatedDocument = await this.model.findOneAndUpdate(obj, data, {
          new: true,
          runValidators: true,
        });
        return updatedDocument;
      } catch (err) {
        throw new Error(`Error updating document: ${err.message}`);
      }
    }
  
  
  }
  
  module.exports = CRUDOperations;
  