import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServicesProvider {
  private clientRecord:any=[];
  private creatorHolderId:any;
  constructor(
    private sqlite: SQLite
  ) {
    console.log('Hello DatabaseServicesProvider Provider');
  }
  // insertClientDataHolder(cropId,userId,dateToday){
  // console.log("CROP ID : "+cropId+" USER ID : "+userId+" dateToday : "+dateToday);
  // this.sqlite.create({
  //   name: 'ionicdb.db',
  //   location: 'default'
  //     }).then((db: SQLiteObject) => {
  //       db.executeSql('INSERT INTO week(client_creator_id,cropping_id,user_date_created) VALUES("'+userId+'","'+cropId+'","'+dateToday+'")',{})
  //       .then(res => console.log("INSERT INTO client_details_holder_creator(client_creator_id,cropping_id,user_date_created) VALUES('"+userId+"','"+cropId+"','"+dateToday+"')"))
  //       .catch(e => console.log(e.message));
  //       db.executeSql('SELECT * FROM week ORDER BY week_id DESC LIMIT 1',{})
  //       .then(res => {
  //       console.log('Extracting last Id of week')
  //       if(res.rows.length > 0){
  //         console.log("last id inserted :"+res.rows.item(0).week_id);
  //         this.creatorHolderId = res.rows.item(0).week_id;
  //       }
  //     }).catch(e => console.log(e.message));
  //     }).catch(e => console.log(e.message));
  // }
  createWeekExpenses(userid,cropid){
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('INSERT INTO week(client_creator_id,cropping_id) VALUES("'+userid+'","'+cropid+'")', {})
    .then(res => {
      console.log("input_expenses details saved");
      console.log("INSERT INTO week(client_creator_id,cropping_id) VALUES('"+userid+"','"+cropid+"')");
      db.executeSql('SELECT week_id FROM week INNER JOIN client_details ON week.client_creator_id = client_details.rowid WHERE client_details.rowid = "'+userid+'" ORDER BY week_id DESC LIMIT 1',{})
      .then(res => {
        console.log('Extracting last Id of week table')
        if(res.rows.length > 0){
          console.log("last id inserted :"+res.rows.item(0).week_id);
          sessionStorage.setItem('week_id',res.rows.item(0).week_id);
        }
      }).catch(e => console.log(e.message));
    }).catch(e => console.log(JSON.stringify(e)));
  }).catch(e => console.log(e.message));
}
  insertInputExpenses(inputName,inputCost,cropId){
    // console.log("Creater Holder Id : "+this.creatorHolderId+" Input Name : "+inputName+" Input Cost : "+inputCost);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO input_expenses(week_input_rowid,input_crop_rowid,laborname,laborname_input_cost) VALUES("'+this.creatorHolderId+'","'+cropId+'","'+inputName+'","'+inputCost+'")', {})
      .then(res => {
        console.log("input_expenses details saved");
        console.log("INSERT INTO input_expenses(input_rowid,input_crop_rowid,laborname,laborname_input_cost) VALUES('"+this.creatorHolderId+"','"+cropId+"','"+inputName+"','"+inputCost+"')");
      }).catch(e => console.log(JSON.stringify(e)));
    }).catch(e => console.log(e.message));
  }
  insertLaborExpenses(manpower,mancost,mandays,laborname,cropId){
    // console.log("Creater Holder Id : "+this.creatorHolderId+" Man Power : "+manpower+" Man Cost : "+mancost+" Man days : "+mandays+" LaborName : "+laborname);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO labor_expenses(week_labor_rowid,labor_crop_rowid,laborname,labor_mancost,labor_manpower,labor_mandays) VALUES("'+this.creatorHolderId+'","'+cropId+","+laborname+'","'+mancost+'","'+manpower+'","'+mandays+'")', {})
      .then(res => {
        console.log("INSERT INTO labor_expenses(week_labor_rowid,labor_crop_rowid,laborname,labor_mancost,labor_manpower,labor_mandays) VALUES('"+this.creatorHolderId+"','"+cropId+"','"+laborname+"','"+mancost+"','"+manpower+"','"+mandays+"')");
      }).catch(e => console.log(JSON.stringify(e)));
    }).catch(e => console.log(e.message));
  }
  insertFoodExpenses(laborname,foodcost,cropId){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO food_expenses(week_food_rowid,food_crop_rowid,laborname,food_cost) VALUES("'+this.creatorHolderId+'","'+cropId+","+laborname+'","'+foodcost+'")', {})
      .then(res => {
        console.log("INSERT INTO food_expenses(week_food_rowid,food_crop_rowid,laborname,food_cost) VALUES('"+this.creatorHolderId+"','"+cropId+"','"+laborname+"','"+foodcost+"')");
      }).catch(e => console.log(JSON.stringify(e)));
    }).catch(e => console.log(e.message));
  }
  // insertAdminExpenses(adminName,adminCost,cropId){
  //   // console.log("Creater Holder Id : "+this.creatorHolderId+" Input Name : "+adminName+" Input Cost : "+adminCost);
  //   this.sqlite.create({
  //     name: 'ionicdb.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('INSERT INTO admin_expenses(admin_rowid,admin_crop_rowid,admin_name,admin_cost) VALUES("'+this.creatorHolderId+'","'+cropId+'","'+adminName+'","'+adminCost+'")', {})
  //     .then(res => {
  //       console.log("INSERT INTO admin_expenses(admin_rowid,admin_crop_rowid,admin_name,admin_cost) VALUES('"+this.creatorHolderId+"','"+cropId+"','"+adminName+"','"+adminCost+"')");
  //     }).catch(e => console.log(JSON.stringify(e)));
  //   }).catch(e => console.log(e.message));
  // }
  createCarrotsDatabase(){
    this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
      }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS client_details(rowid INTEGER PRIMARY KEY,client_land TEXT,client_name TEXT,client_age INT,client_location TEXT,user_date_created TEXT)',{})
    .then(res => console.log('Executed client details'))
    .catch(e => console.log(e.message));
    db.executeSql('CREATE TABLE IF NOT EXISTS cropping(croppping_id INTEGER PRIMARY KEY,client_user_id INT,date_created DATETIME DEFAULT CURRENT_TIMESTAMP,Foreign Key (client_user_id) REFERENCES client_details(rowid))',{})
    .then(res => console.log('Executed cropping holder'))
    .catch(e => console.log(e.message));
    db.executeSql('CREATE TABLE IF NOT EXISTS week(week_id INTEGER PRIMARY KEY,client_creator_id INT,cropping_id INT,user_date_created TEXT,Foreign Key (client_creator_id) REFERENCES client_details(rowid),Foreign Key (cropping_id) REFERENCES cropping(croppping_id))',{})
    .then(res => console.log('Executed client detail holder'))
    .catch(e => console.log(e.message));
    db.executeSql('CREATE TABLE IF NOT EXISTS input_expenses(input_id INTEGER PRIMARY KEY,week_input_rowid INTEGER NOT NULL,input_crop_rowid INTEGER NOT NULL,laborname TEXT,laborname_input_cost INT,Foreign Key (week_input_rowid) REFERENCES week(week_id),Foreign Key (input_crop_rowid) REFERENCES cropping(croppping_id))', {})
    .then(res => console.log('Executed SQL input expenses'))
    .catch(e => console.log(e.message));
    db.executeSql('CREATE TABLE IF NOT EXISTS labor_expenses(labor_id INTEGER PRIMARY KEY,week_labor_rowid INTEGER NOT NULL,labor_crop_rowid INTEGER NOT NULL,laborname TEXT,labor_mancost TEXT,labor_manpower TEXT,labor_mandays TEXT,Foreign Key (week_labor_rowid) REFERENCES week(week_id),Foreign Key (labor_crop_rowid) REFERENCES cropping(croppping_id))', {})
    .then(res => console.log('Executed SQL labor expenses'))
    .catch(e => console.log(e.message));
    db.executeSql('CREATE TABLE IF NOT EXISTS food_expenses(food_id INTEGER PRIMARY KEY,week_food_rowid INTEGER NOT NULL,food_crop_rowid INTEGER NOT NULL,laborname TEXT,food_cost INT,Foreign Key (week_food_rowid) REFERENCES week(week_id),Foreign Key (food_crop_rowid) REFERENCES cropping(croppping_id))', {})
    .then(res => console.log('Executed SQL labor expenses'))
    .catch(e => console.log(e.message));
    // db.executeSql('CREATE TABLE IF NOT EXISTS admin_expenses(admin_id INTEGER PRIMARY KEY,admin_rowid INTEGER NOT NULL,admin_crop_rowid INTEGER NOT NULL,admin_name TEXT,admin_cost TEXT,Foreign Key (admin_rowid) REFERENCES week(week_id),Foreign Key (admin_crop_rowid) REFERENCES cropping(croppping_id))', {})
    // .then(res => console.log('Executed SQL admin expenses'))
    // .catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
  }

  showConnectedData(client_id,cropping_id,week_id){
    // console.log("cropping id : "+cropping_id+" week id : "+week_id);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
        // db.executeSql('SELECT * FROM client_details INNER JOIN cropping ON client_details.rowid = cropping.client_user_id INNER JOIN client_details_holder_creator ON cropping.croppping_id = client_details_holder_creator.cropping_id INNER JOIN input_expenses ON input_expenses.input_rowid = client_details_holder_creator.holder_creator_id INNER JOIN labor_expenses ON labor_expenses.labor_rowid = client_details_holder_creator.holder_creator_id INNER JOIN admin_expenses ON admin_expenses.admin_rowid = client_details_holder_creator.holder_creator_id WHERE client_details.rowid = "'+client_id+'" AND cropping.croppping_id = "'+cropping_id+'"',{})
        // db.executeSql('SELECT * FROM client_details_holder_creator INNER JOIN input_expenses ON input_expenses.input_rowid = client_details_holder_creator.holder_creator_id INNER JOIN labor_expenses ON labor_expenses.labor_rowid = client_details_holder_creator.holder_creator_id INNER JOIN admin_expenses ON admin_expenses.admin_rowid = client_details_holder_creator.holder_creator_id WHERE client_details_holder_creator.client_creator_id = "'+client_id+'" AND client_details_holder_creator.cropping_id = "'+cropping_id+'"',{})
        // db.executeSql('SELECT * FROM week INNER JOIN input_expenses ON week.cropping_id = input_expenses.input_crop_rowid INNER JOIN labor_expenses ON week.cropping_id = labor_expenses.labor_crop_rowid INNER JOIN admin_expenses ON week.cropping_id = admin_expenses.admin_crop_rowid WHERE week.cropping_id = "'+cropping_id+'"',{})
        db.executeSql('SELECT * FROM week INNER JOIN cropping ON week.cropping_id = cropping.croppping_id INNER JOIN input_expenses ON week.cropping_id = input_expenses.input_crop_rowid AND week.week_id = input_expenses.week_input_rowid INNER JOIN labor_expenses ON week.cropping_id = labor_expenses.labor_crop_rowid AND week.week_id = labor_expenses.week_labor_rowid INNER JOIN food_expenses ON week.cropping_id = food_expenses.food_crop_rowid AND week.week_id = food_expenses.week_food_rowid WHERE cropping.croppping_id = "'+cropping_id+'" AND week.week_id ="'+week_id+'"',{})
        .then(res => {
          console.log("SELECT * FROM week INNER JOIN cropping ON week.cropping_id = cropping.croppping_id INNER JOIN input_expenses ON week.cropping_id = input_expenses.input_crop_rowid AND week.week_id = input_expenses.week_input_rowid INNER JOIN labor_expenses ON week.cropping_id = labor_expenses.labor_crop_rowid AND week.week_id = labor_expenses.week_labor_rowid INNER JOIN food_expenses ON week.cropping_id = food_expenses.food_crop_rowid AND week.week_id = food_expenses.week_food_rowid WHERE cropping.croppping_id = '"+cropping_id+"' AND week.week_id ='"+week_id);
        if(res.rows.length > 0){
          console.log("naa?");
          for(let rid=0; rid < res.rows.length; rid++){
            console.log("getting week :"+rid);
            // this.clientRecord.push(
            //   { cropid: res.rows.item(rid).cropping_id,
            //     week: res.rows.item(rid).week_id,
            //     // name: res.rows.item(rid).client_name,
            //     // location: res.rows.item(rid).client_location,
            //     // inputName: res.rows.item(rid).input_name,
            //     // inputCost: res.rows.item(rid).input_cost,
            //     // laborName: res.rows.item(rid).labor_name,
            //     // laborCost: res.rows.item(rid).labor_mancost,
            //     // laborPower: res.rows.item(rid).labor_manpower,
            //     // laborDays: res.rows.item(rid).labor_mandays,
            //     // adminName: res.rows.item(rid).admin_name,
            //     // adminCost: res.rows.item(rid).admin_cost
            //     });
          }
        }
        else{
          console.log("wala");
          return false;
        }
        }).catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
    console.log("test getting datas :"+JSON.stringify(this.clientRecord));
  }

  addNewCroppingCycle(client_id){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    // var storage = new SQLite();
    // storage.create({ name: "ionic.db", location: 'default'}).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO cropping(client_user_id) VALUES("'+client_id+'")', {})
      .then(res => {
        console.log("cropping added");
        console.log("INSERT INTO cropping(client_user_id) VALUES('"+client_id+"')");
      }).catch(e => console.log(e.message));
      // db.executeSql('SELECT * FROM cropping ORDER BY croppping_id DESC LIMIT 1',{})
      // .then(res => {
      //   console.log('Extracting last Id of cropping')
      //   if(res.rows.length > 0){
      //     console.log("last id inserted :"+res.rows.item(0).week_id);
      //     this.creatorHolderId = res.rows.item(0).week_id;
      //   }
      // }).catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
  }
}
