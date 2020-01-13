import * as express from "express";
import * as path from "path";
import * as hbs from "hbs";

class App
{
    public constructor()
    {
        let app = express();

        // app.engine("hbs", expressHbs({
        //     layoutsDir: path.join(__dirname, "/Views/Layouts"),
        //     defaultLayout: "Layout",
        //     extname: "hbs"
        // }));
        // app.set("view options", { layout: "Layouts/Layout" });
        app.set("view engine", "hbs");
        app.set("views", path.join(__dirname, "/Views"));
        hbs.registerPartials(path.join(__dirname, "/Views/Partials"));

        hbs.registerHelper("getTime", () => {
            let myData = new Date();
            let hour = myData.getHours();
            let minute = myData.getMinutes();
            let second = myData.getSeconds();
            let meniteStr: string;
            if (minute < 10)
            {
                meniteStr = "0" + minute;
            }
            let secondStr: string;
            if (minute < 10)
            {
                secondStr = "0" + second;
            }
            return "Current time: " + hour + ":" + minute + ":" + second;
        });

        app.use("/contact",
            (req: express.Request, res: express.Response) =>
            {
                res.render("Contact.hbs", {
                    title: "My Contacts",
                    emails: ["my@gmail.com", "your@gmail.com"],
                    emailsVisible: true
                });
            });

        app.use("/",
            (req: express.Request, res: express.Response) =>
            {
                res.render("Home.hbs", { title: "Admin", layout: "Layouts/Layout" });
            });

        let port = process.env.PORT || 3000;
        app.listen(port, () =>
        {
            console.log("Listening the port: " + port);
        });
    }
}

new App();