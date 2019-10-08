import mysql from 'mysql';

export default class MySql {
  private static _instance: MySql;

  cnn: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    console.log('clase inicializada');

    this.cnn = mysql.createConnection({
      host: 'localhost',
      user: 'node_user',
      password: '123456',
      database: 'node_db',
    });

    this.conectarDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  static ejecutarQuery(query: string, calback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log('Error en query');
        console.log(err);
        return calback(err);
      }

      if (results.length === 0) return calback('No se encuenran registros');

      return calback(null, results);
    });
  }

  private conectarDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }

      this.conectado = true;
      console.log('Base de datos online');
    });
  }
}
