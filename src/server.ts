// /src/server.ts
import log from './loaders/Debug';
import app from './app';

const port = process.env.PORT || 5437;
//const port = '';

app.listen(port, function() {
    console.log(`GSEC dashboard API has started successfully at PORT: ${port}`);
    log.msg('info','server',`GSEC dashboard API has started successfully at PORT: ${port}`);
});