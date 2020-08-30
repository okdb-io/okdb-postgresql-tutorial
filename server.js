const OkdbServer = require("okdb-server");

// create and start server on 7899 port by default
const options = {
    cors: {
        enabled: true
    },
    graphql: true, // <==== enable GraphQL server
    storage: {       
        graphql: "postgres" // <===== specify data source
    },   
    postgres: {
        host: 'localhost', 
        port: 5432,
        database: 'okdb_graphql1',
        user: 'okdb_user',  
        password: 'okdb_password'
    }
}
const okdb = new OkdbServer(options);


okdb.handlers().auth((token) => {    
    return true; // <===== open access, for demo purposes only. Typically you need to pass and validate your JWT token here.
});


// Handling Ctrl-C (workaround for Windows)
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}
//graceful shutdown on Ctrl-C (all other platforms)
process.on("SIGINT", function () {    
    okdb.stop(()=> {
        console.log("server stopped");
        process.exit();
    });
});