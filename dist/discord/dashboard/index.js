//? Importing modules
import session from "express-session";
import favicon from "serve-favicon";
import { existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import ejs from "ejs";
import { EventEmitter } from "events";
import { PermissionsBitField } from "discord.js";
import morgan from "morgan";
import { fileURLToPath } from "node:url";
import { createRequire } from "module";
//? Importing the express app
import { app } from "../../website/setupExpress.js";
//? Setting up __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//! Without creating a require statement, the code will not work.
const require = createRequire(import.meta.url);
//! This is a fork of DiscordEasyDashboard!
//? Why did I need to make this? It was needed since I already have a setup website!
export default class Dashboard extends EventEmitter {
    constructor(client, options) {
        super();
        if (+process.versions.node.split(".") < 16)
            throw new Error("Dashboard need node-16+");
        if (!client)
            throw new Error("Client is required");
        this.client = client;
        this.app = app;
        this.details = {
            name: options?.name || client?.user?.username || null,
            description: options?.description || null,
            faviconPath: options?.faviconPath || null,
            serverUrl: options?.serverUrl || null,
            inviteUrl: options?.inviteUrl || null
        };
        const ready = client.isReady();
        if (ready == false) {
            client.on("ready", () => {
                (this.details.name = this.details.name === null ? this.client.user?.username : this.details.name);
            });
        }
        this._commands = [];
        this._settings = [];
        this.config = {
            baseUrl: options?.baseUrl || "http://localhost",
            noPortInCallBackUrl: options?.noPortInCallBackUrl || false,
            secret: options?.secret,
            logRequests: options?.logRequests || false,
            injectCss: options?.injectCss || null,
            theme: this._getTheme(options?.theme),
            permissions: options.permissions || [PermissionsBitField.Flags.ManageGuild],
            session: options?.session || null
        };
        if (!this.config.secret)
            console.warn("Without the client.secret paremeter, some features of the dashboard will be disabled, like Discord authetification or guild settings...");
        this._setup();
        this._checkRoutes();
        this._loadRoutes();
    }
    _getTheme(theme) {
        if (!theme)
            require(join(__dirname, "themes", "dark") + "/index.cjs");
        if (typeof theme === 'object')
            return theme;
        if (!existsSync(join(__dirname, "themes", theme)))
            throw new Error(`Theme ${theme} not found!`);
        return require(join(__dirname, "themes", theme) + "/index.cjs");
    }
    _setup() {
        this.app.set("views", join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        this.app.engine("ejs", async (path, data, cb) => {
            try {
                let html = await ejs.renderFile(path, data, { async: true });
                cb(null, html);
            }
            catch (e) {
                cb(e, "");
            }
        });
        if (this.details.faviconPath)
            this.app.use(favicon(this.details.faviconPath));
        if (this.config.logRequests) {
            this.app.use(morgan("dev"));
        }
        if (this.config.session) {
            this.app.use(this.config.session);
        }
        else {
            this.app.use(session({
                secret: `discord-easy-dashboard-${Date.now}-${this.client.user?.id}-${Math.random().toString(36)}`,
                resave: false,
                saveUninitialized: false
            }));
        }
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Credentials", 1);
            req.user = req.session.user;
            req.dashboardConfig = this.config;
            req.dashboardDetails = this.details;
            req.dashboardCommands = this._commands;
            req.client = this.client;
            req.dashboardEmit = (...args) => this.emit("", ...args);
            req.dashboardSettings = this._settings;
            next();
        });
    }
    _loadRoutes() {
        const files = readdirSync(join(__dirname, "routes"));
        const routes = files.filter((c) => c.split(".").pop() === "cjs");
        if (files.length === 0 || routes.length === 0)
            throw new Error("No routes were found!");
        for (let i = 0; i < routes.length; i++) {
            if ((!this.config.secret &&
                ["auth.cjs", "manage.cjs", "selector.cjs"].includes(routes[i])) ||
                routes[i] === "custom.cjs")
                continue;
            const route = require(`./routes/${routes[i]}`);
            this.app.use(route.name, route.Router);
        }
        // // Register 404 route for fallback
        // const fallback = require("./routes/custom.cjs");
        // this.app.use(fallback.name, fallback.Router);
    }
    _checkRoutes() {
        // Manual checking because the structure for 404 is weird
        if (!this.config.theme[404])
            console.warn(`No key found in the theme object for "404", falling back to the default one`);
        for (let routeFile of readdirSync(join(__dirname, "routes")).filter((e) => e.endsWith(".cjs"))) {
            if (["auth.cjs", "custom.cjs"].includes(routeFile))
                continue;
            const route = require(`${__dirname}/routes/${routeFile}`);
            let routeName;
            switch (route.name) {
                case "/":
                    routeName = "home";
                    break;
                case "/manage":
                    routeName = "guild";
                    break;
                default:
                    routeName = route.name.split("/")[1];
            }
            if (!this.config.theme[routeName])
                console.warn(`No key found in the theme object for "${route.name}", falling back to the default one`);
        }
    }
    registerCommand(name, description, usage) {
        this._commands.push({ name, description, usage });
    }
    addTextInput(name, description, validator, setter, getter) {
        this._settings.push({
            name,
            description,
            type: "text input",
            validator,
            set: setter,
            get: getter,
        });
    }
    addBooleanInput(name, description, setter, getter) {
        this._settings.push({ name, description, type: "boolean input", set: setter, get: getter });
    }
    addColorInput(name, description, setter, getter) {
        this._settings.push({ name, description, type: "color input", set: setter, get: getter });
    }
    addSelector(name, description, getSelectorEntries, setter, getter) {
        this._settings.push({
            name,
            description,
            type: "selector",
            getSelectorEntries,
            set: setter,
            get: getter,
        });
    }
}
