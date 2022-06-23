exports.default =  class DBTable {
    constructor(id = "", created_at = 0, updated_at = 0){
      this.id = id;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
}