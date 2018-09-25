import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServicesProvider {
  // private clientRecord:any=[];
  // private creatorHolderId:any;
  private _thisWeekInputs:any = [];
  private _thisWeekLabor:any = [];
  private _thisWeekFood:any = [];
  private weekRecords:any = [];
  constructor(
    private sqlite: SQLite
  ) {
    console.log('Hello DatabaseServicesProvider Provider');
  }
  selectPresentWeekData(weekid,cropid){
    this._thisWeekInputs=[];
    this._thisWeekLabor=[];
    this._thisWeekFood=[];
    console.log('Collecting input data');
    this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
      }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM input_expenses WHERE input_expenses.week_input_rowid = "'+weekid+'" AND input_expenses.input_crop_rowid = "'+cropid+'"',{})
    .then(res => {
      if(res.rows.length > 0){
        for(let rid=0; rid < res.rows.length; rid++){
          // console.log("@databaseService.ts select inputs week->"+res.rows.item(rid).week_input_rowid+" crop->"+res.rows.item(rid).input_crop_rowid+" laborname->"+res.rows.item(rid).laborname_input+" inputname->"+res.rows.item(rid).inputname+" inputcost->"+res.rows.item(rid).laborname_input_cost);
          this._thisWeekInputs.push({ weekid : res.rows.item(rid).week_input_rowid, cropid : res.rows.item(rid).input_crop_rowid, laborname : res.rows.item(rid).laborname_input, inputname : res.rows.item(rid).inputname, inputcost : res.rows.item(rid).laborname_input_cost });
        }}
        // console.log("@dbservice provider week inputs obj->"+this._thisWeekInputs);
        var weekinputs = JSON.stringify(this._thisWeekInputs);
        sessionStorage.setItem('input', weekinputs);
        // console.log("@dbservice stringify inputs->"+weekinputs);
      }).catch(e => console.log(e.message));
    db.executeSql('SELECT * FROM labor_expenses WHERE labor_expenses.week_labor_rowid = "'+weekid+'" AND labor_expenses.labor_crop_rowid = "'+cropid+'"',{})
    .then(res => {
      if(res.rows.length > 0){
        // console.log('Collecting input data');
        for(let lib=0; lib < res.rows.length; lib++){
          // console.log("@databaseService.ts select labor week->"+res.rows.item(lib).week_labor_rowid+" crop->"+res.rows.item(lib).labor_crop_rowid+" laborname->"+res.rows.item(lib).laborname_labor+" mancost->"+res.rows.item(lib).labor_mancost+" manpower->"+res.rows.item(lib).labor_manpower+" mandays->"+res.rows.item(lib).labor_mandays);
          this._thisWeekLabor.push({ weekid : res.rows.item(lib).week_labor_rowid, cropid : res.rows.item(lib).labor_crop_rowid, laborname : res.rows.item(lib).laborname_labor, mancost : res.rows.item(lib).labor_mancost, manpower : res.rows.item(lib).labor_manpower, mandays : res.rows.item(lib).labor_mandays });
        }}
        // console.log("@dbservice provider week labor obj->"+this._thisWeekLabor);
        var weeklabor = JSON.stringify(this._thisWeekLabor);
        // console.log("@dbservice stringify labor->"+weeklabor);
        sessionStorage.setItem('labor', weeklabor);
      }).catch(e => console.log(e.message));
      db.executeSql('SELECT * FROM food_expenses WHERE food_expenses.week_food_rowid = "'+weekid+'" AND food_expenses.food_crop_rowid = "'+cropid+'"',{})
      .then(res => {
        if(res.rows.length > 0){
          console.log('Collecting input data');
          for(let fid=0; fid < res.rows.length; fid++){
            // console.log("@databaseService.ts select food week->"+res.rows.item(fid).week_food_rowid+" crop->"+res.rows.item(fid).food_crop_rowid+" laborname->"+res.rows.item(fid).laborname_food+" foodcost->"+res.rows.item(fid).food_cost);
            this._thisWeekFood.push({ weekid : res.rows.item(fid).week_food_rowid, cropid : res.rows.item(fid).food_crop_rowid, laborname : res.rows.item(fid).laborname_food, foodcost : res.rows.item(fid).food_cost });
          }}
          // console.log("@dbservice provider week labor obj->"+this._thisWeekFood);
          var weekfood = JSON.stringify(this._thisWeekFood);
          // console.log("@dbservice stringify food->"+weekfood);
          sessionStorage.setItem('food', weekfood);
        }).catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
  }
  createWeekExpenses(userid,cropid){
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('INSERT INTO week(client_creator_id,cropping_id) VALUES("'+userid+'","'+cropid+'")', {})
    .then(res => {
      console.log("week details saved");
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
  insertInputExpenses(crop_id,week_id,laborname,inputname,inputCost){
    console.log("@database-service.ts checking input expenses cropid ->"+crop_id+" weekid ->"+week_id+" laborname ->"+laborname+" inputname ->"+inputname+" inputcost ->"+inputCost);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO input_expenses(week_input_rowid,input_crop_rowid,laborname_input,inputname,laborname_input_cost) VALUES("'+week_id+'","'+crop_id+'","'+laborname+'","'+inputname+'","'+inputCost+'")', {})
      .then(res => {
        console.log("input_expenses details saved");
        console.log("INSERT INTO input_expenses(week_input_rowid,input_crop_rowid,laborname_input,inputname,laborname_input_cost) VALUES('"+week_id+"','"+crop_id+"','"+laborname+"','"+inputname+"','"+inputCost+"')");
      }).catch(e => console.log(JSON.stringify(e)));
    }).catch(e => console.log(e.message));
  }
  insertLaborExpenses(manpower,mancost,mandays,laborname,cropId,weekid){
    console.log("@database-service.ts checking labor expenses cropid ->"+cropId+" weekid ->"+weekid+" laborname ->"+laborname+" manpower ->"+manpower+" mancost ->"+mancost+ " mandays ->"+mandays);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO labor_expenses(week_labor_rowid,labor_crop_rowid,laborname_labor,labor_mancost,labor_manpower,labor_mandays) VALUES("'+weekid+'","'+cropId+'","'+laborname+'","'+mancost+'","'+manpower+'","'+mandays+'")', {})
      .then(res => {
        console.log("INSERT INTO labor_expenses(week_labor_rowid,labor_crop_rowid,laborname_labor,labor_mancost,labor_manpower,labor_mandays) VALUES('"+weekid+"','"+cropId+"','"+laborname+"','"+mancost+"','"+manpower+"','"+mandays+"')");
      }).catch(e => console.log(JSON.stringify(e)));
    }).catch(e => console.log(e.message));
  }
  insertFoodExpenses(weekid,cropid,laborname,foodcost){
    console.log("@database-service.ts checking food expenses cropid ->"+cropid+" weekid ->"+weekid+" laborname ->"+laborname+" foodcost ->"+foodcost);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO food_expenses(week_food_rowid,food_crop_rowid,laborname_food,food_cost) VALUES("'+weekid+'","'+cropid+'","'+laborname+'","'+foodcost+'")', {})
      .then(res => {
        console.log("INSERT INTO food_expenses(week_food_rowid,food_crop_rowid,laborname_food,food_cost) VALUES('"+weekid+"','"+cropid+"','"+laborname+"','"+foodcost+"')");
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
    db.executeSql('CREATE TABLE IF NOT EXISTS input_expenses(input_id INTEGER PRIMARY KEY,week_input_rowid INTEGER NOT NULL,input_crop_rowid INTEGER NOT NULL,laborname_input TEXT,inputname TEXT,laborname_input_cost INT,Foreign Key (week_input_rowid) REFERENCES week(week_id),Foreign Key (input_crop_rowid) REFERENCES cropping(croppping_id))', {})
    .then(res => console.log('Executed SQL input expenses'))
    .catch(e => console.log(e.message));
    db.executeSql('CREATE TABLE IF NOT EXISTS labor_expenses(labor_id INTEGER PRIMARY KEY,week_labor_rowid INTEGER NOT NULL,labor_crop_rowid INTEGER NOT NULL,laborname_labor TEXT,labor_mancost TEXT,labor_manpower TEXT,labor_mandays TEXT,Foreign Key (week_labor_rowid) REFERENCES week(week_id),Foreign Key (labor_crop_rowid) REFERENCES cropping(croppping_id))', {})
    .then(res => console.log('Executed SQL labor expenses'))
    .catch(e => console.log(e.message));
    db.executeSql('CREATE TABLE IF NOT EXISTS food_expenses(food_id INTEGER PRIMARY KEY,week_food_rowid INTEGER NOT NULL,food_crop_rowid INTEGER NOT NULL,laborname_food TEXT,food_cost INT,Foreign Key (week_food_rowid) REFERENCES week(week_id),Foreign Key (food_crop_rowid) REFERENCES cropping(croppping_id))', {})
    .then(res => console.log('Executed SQL labor expenses'))
    .catch(e => console.log(e.message));
    // db.executeSql('CREATE TABLE IF NOT EXISTS admin_expenses(admin_id INTEGER PRIMARY KEY,admin_rowid INTEGER NOT NULL,admin_crop_rowid INTEGER NOT NULL,admin_name TEXT,admin_cost TEXT,Foreign Key (admin_rowid) REFERENCES week(week_id),Foreign Key (admin_crop_rowid) REFERENCES cropping(croppping_id))', {})
    // .then(res => console.log('Executed SQL admin expenses'))
    // .catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
  }

  viewAllWeekActivity(cropid,userid){
    this.weekRecords = [];
    console.log("cropping id : "+cropid+" user id : "+userid);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
        // db.executeSql('SELECT * FROM client_details INNER JOIN cropping ON client_details.rowid = cropping.client_user_id INNER JOIN client_details_holder_creator ON cropping.croppping_id = client_details_holder_creator.cropping_id INNER JOIN input_expenses ON input_expenses.input_rowid = client_details_holder_creator.holder_creator_id INNER JOIN labor_expenses ON labor_expenses.labor_rowid = client_details_holder_creator.holder_creator_id INNER JOIN admin_expenses ON admin_expenses.admin_rowid = client_details_holder_creator.holder_creator_id WHERE client_details.rowid = "'+client_id+'" AND cropping.croppping_id = "'+cropping_id+'"',{})
        // db.executeSql('SELECT * FROM client_details_holder_creator INNER JOIN input_expenses ON input_expenses.input_rowid = client_details_holder_creator.holder_creator_id INNER JOIN labor_expenses ON labor_expenses.labor_rowid = client_details_holder_creator.holder_creator_id INNER JOIN admin_expenses ON admin_expenses.admin_rowid = client_details_holder_creator.holder_creator_id WHERE client_details_holder_creator.client_creator_id = "'+client_id+'" AND client_details_holder_creator.cropping_id = "'+cropping_id+'"',{})
        // db.executeSql('SELECT * FROM week INNER JOIN input_expenses ON week.cropping_id = input_expenses.input_crop_rowid INNER JOIN labor_expenses ON week.cropping_id = labor_expenses.labor_crop_rowid INNER JOIN admin_expenses ON week.cropping_id = admin_expenses.admin_crop_rowid WHERE week.cropping_id = "'+cropping_id+'"',{})
        db.executeSql('SELECT * FROM week INNER JOIN cropping ON week.cropping_id = cropping.croppping_id AND week.client_creator_id = cropping.client_user_id WHERE cropping.croppping_id = "'+cropid+'" AND cropping.client_user_id ="'+userid+'"',{})
        .then(res => {
          // console.log("SELECT * FROM week INNER JOIN cropping ON week.cropping_id = cropping.croppping_id INNER JOIN input_expenses ON week.cropping_id = input_expenses.input_crop_rowid AND week.week_id = input_expenses.week_input_rowid INNER JOIN labor_expenses ON week.cropping_id = labor_expenses.labor_crop_rowid AND week.week_id = labor_expenses.week_labor_rowid INNER JOIN food_expenses ON week.cropping_id = food_expenses.food_crop_rowid AND week.week_id = food_expenses.week_food_rowid WHERE cropping.croppping_id = '"+cropping_id+"' AND week.week_id ='"+week_id);
        if(res.rows.length > 0){
          console.log("naa?");
          for(let rid=0; rid < res.rows.length; rid++){
            console.log("getting week :"+res.rows.item(rid).week_id+" also crop id->"+res.rows.item(rid).croppping_id);
            this.weekRecords.push({
              weekid: res.rows.item(rid).week_id,
              croppingid: res.rows.item(rid).croppping_id,
              clientname: res.rows.item(rid).client_name,
              location: res.rows.item(rid).client_location,
              cropcreated: res.rows.item(rid).date_created
            });
            var weekRecords = JSON.stringify(this.weekRecords);
            sessionStorage.setItem('weekRecords', weekRecords);
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
            // db.executeSql('SELECT * FROM input_expenses INNER JOIN week ON input_expenses.week_input_rowid = week.week_id AND input_expenses.input_crop_rowid = week.cropping_id INNER JOIN labor_expenses ON labor_expenses.week_labor_rowid = week.week_id AND labor_expenses.labor_crop_rowid = week.cropping_id INNER JOIN food_expenses ON food_expenses.week_food_rowid = week.week_id AND food_expenses.food_crop_rowid = week.cropping_id WHERE week.cropping_id = "'+res.rows.item(rid).cropping_id+'" AND week.week_id = "'+res.rows.item(rid).week_id+'"',{})
            // .then(res => {
            //   if(res.rows.length > 0){
            //     for(let feedback=0; feedback < res.rows.length; feedback++){
            //       console.log("weekid->"+res.rows.item(feedback).week_id+" input expenses :"+res.rows.item(feedback).laborname_input+" inputname->"+res.rows.item(feedback).inputname+" cost sa inputs->"+res.rows.item(feedback).laborname_input_cost);
            //       console.log("weekid->"+res.rows.item(feedback).week_id+" labor expenses :"+res.rows.item(feedback).laborname_labor+" mandays->"+res.rows.item(feedback).labor_mandays+" mancost->"+res.rows.item(feedback).labor_mancost+" manpower->"+res.rows.item(feedback).labor_manpower);
            //       console.log("weekid->"+res.rows.item(feedback).week_id+" food expenses :"+res.rows.item(feedback).laborname_food+" foodcost->"+res.rows.item(feedback).food_cost);
            //     }
            //   }
            //   else{
            //     console.log("nothing");
            //   }
            // }).catch(e => console.log(e.message));
          }
        }
        else{
          console.log("wala");
        }
        }).catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
    // console.log("test getting datas :"+JSON.stringify(this.clientRecord));
  }
  // viewAllWeekActivity(cropid,userid){
  //   CREATE TABLE IF NOT EXISTS week(week_id INTEGER PRIMARY KEY,client_creator_id INT,cropping_id INT,user_date_created TEXT
  //   CREATE TABLE IF NOT EXISTS input_expenses(input_id INTEGER PRIMARY KEY,week_input_rowid INTEGER NOT NULL,input_crop_rowid INTEGER NOT NULL,laborname TEXT,inputname TEXT,laborname_input_cost INT
  //   CREATE TABLE IF NOT EXISTS labor_expenses(labor_id INTEGER PRIMARY KEY,week_labor_rowid INTEGER NOT NULL,labor_crop_rowid INTEGER NOT NULL,laborname TEXT,labor_mancost TEXT,labor_manpower TEXT,labor_mandays
  //     CREATE TABLE IF NOT EXISTS food_expenses(food_id INTEGER PRIMARY KEY,week_food_rowid INTEGER NOT NULL,food_crop_rowid INTEGER NOT NULL,laborname TEXT,food_cost INT
  //   this.sqlite.create({
  //   name: 'ionicdb.db',
  //   location: 'default'
  //     }).then((db: SQLiteObject) => {
  //   db.executeSql('SELECT * FROM week INNER JOIN input_expenses)',{})
  //   .then(res => console.log('Executed client details'))
  //   .catch(e => console.log(e.message));
  //   }).catch(e => console.log(e.message));
  // }
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
