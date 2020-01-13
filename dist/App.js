"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var hbs = require("hbs");
var App = /** @class */ (function () {
    function App() {
        var app = express();
        // app.engine("hbs", expressHbs({
        //     layoutsDir: path.join(__dirname, "/Views/Layouts"),
        //     defaultLayout: "Layout",
        //     extname: "hbs"
        // }));
        // app.set("view options", { layout: "Layouts/Layout" });
        app.set("view engine", "hbs");
        app.set("views", path.join(__dirname, "/Views"));
        hbs.registerPartials(path.join(__dirname, "/Views/Partials"));
        hbs.registerHelper("getTime", function () {
            var myData = new Date();
            var hour = myData.getHours();
            var minute = myData.getMinutes();
            var second = myData.getSeconds();
            var meniteStr;
            if (minute < 10) {
                meniteStr = "0" + minute;
            }
            var secondStr;
            if (minute < 10) {
                secondStr = "0" + second;
            }
            return "Current time: " + hour + ":" + minute + ":" + second;
        });
        app.use("/contact", function (req, res) {
            res.render("Contact.hbs", {
                title: "My Contacts",
                emails: ["my@gmail.com", "your@gmail.com"],
                emailsVisible: true
            });
        });
        app.use("/", function (req, res) {
            res.render("Home.hbs", { title: "Admin", layout: "Layouts/Layout" });
        });
        var port = process.env.PORT || 3000;
        app.listen(port, function () {
            console.log("Listening the port: " + port);
        });
    }
    return App;
}());
new App();
//# sourceMappingURL=App.js.map