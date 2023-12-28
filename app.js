const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const router = express.Router();
const port = process.env.port || 8000;
const server = require("http").createServer(app);
const db = require("./models");
const doctorMiddle = require("./middlewares/doctorsMiddlewares.js");
const patientMiddle = require("./middlewares/patientMiddlewares.js");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
console.log("good");
function registerRoute(route, app_obj) {
    for (const key in route) {
        if (!route[key]["auth"]) {
            if (route[key]["type"] == "post") {
                app_obj.post(key, route[key]["handler"]);
            } else if (route[key]["type"] == "get") {
                app_obj.post(key, route[key]["handler"]);
            }
        }
    }
}
db.sequelize.sync().then(() => {
    server.listen(port);
    const doctorRouter = require("./routers/doctor_routes.js");
    const patientRouter = require("./routers/patient_routes.js");
    registerRoute(doctorRouter, app);
    app.post("/doctor/login/", doctorRouter["/doctor/login/"]["handler"]);
    app.post("/doctor/update/", doctorMiddle.isOwner, doctorRouter["/doctor/update/"]["handler"]);
    app.post("/patient/signUp/", patientRouter["/patient/signUp/"]["handler"]);
    app.post("/patient/login/", patientRouter["/patient/login/"]["handler"]);
    app.post("/patient/update/", patientMiddle.isOwner, patientRouter["/patient/update/"]["handler"]);
    app.post("/patient/account/", patientMiddle.isOwner, patientRouter["/patient/account/"]["handler"]);
    app.post("/patient/Write/Message/", patientMiddle.HasSession, patientRouter["/patient/Write/Message/"]["handler"]);
    app.post("/patient/get/Messages/", patientMiddle.isOwner, patientMiddle.HasSession, patientRouter["/patient/get/Messages/"]["handler"]);
});
