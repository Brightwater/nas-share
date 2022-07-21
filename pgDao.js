import pkg from 'pg';
const Pool = pkg.Pool;
const pool = new Pool({
  user: 'nassync',
  host: 'localhost',
  database: 'nassync',
  password: 'io3j4f9esf',
  port: 5432,
})

export class Pg {
    async getAppData() {
        let data = {}
        try {
            data = await pool.query("select data from documents d where id = 1")
            data = await data.rows[0].data
        
            return await data
        } catch (err) {
            throw err
            
        }
    }

    async setUserProps(path,port) {
        let data = {}
        try {
            let qry = "update documents set data = data || '{\"userStoragePaths\": \"" + 
                       path + "\"}'"
            data = pool.query(qry)
            qry = "update documents set data = data || '{\"portNumber\": " + 
                       port + "}'"
            data = pool.query(qry)
        } catch (err) {
            throw err
        }

        return await data
    }
}