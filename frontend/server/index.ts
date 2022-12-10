import express from 'express';
import path from 'path';
import child_process from 'child_process';

(async () => {
    const app = express();
    app.use(express.json());
    app.use(express.static(path.resolve(__dirname,'../public')));
    app.all('/*',(_,res) => {
        res.sendFile(path.resolve(__dirname,'../public/index.html'));
    });
    app.listen(8000);

    /**
     * turn webpack on
     */
    child_process.spawn('npx',[
        'webpack',
        '--config',path.resolve(__dirname,'../webpack/webpack.config.ts'),
        '-w'
    ],{
        stdio: 'inherit',
        env: {
            ...process.env,
            NODE_OPTIONS: '--require ts-node/register',
            TS_NODE_PROJECT: path.resolve(__dirname,'../webpack/tsconfig.json')
        }
    });
})().catch(reason => {
    console.error(reason);
});
