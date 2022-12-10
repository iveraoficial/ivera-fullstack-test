import express from 'express';
import crypto from 'crypto';
import { MongoClient, ObjectId } from 'mongodb';
import {
    IDatabaseAuthorization,
    IDatabaseRequestLog,
    IDatabaseUser
} from '../shared/database-types';
import cors from 'cors';
import {
    createIAuthorization,
    createIError,
    createIVoid,
    isICharacters,
    isIGetRequestLogsQuery,
    isIGetCharactersOffsetAndLimitQueryParameters,
    isIRegisterUser,
    isISignInUser,
    createILogsResult,
    createIRequestLog
} from '../schema/shared';
import bcrypt from 'bcrypt';
import { IAuthorization, IError, IVoid } from '../shared';
import Marvel from './Marvel';

(async () => {
    const mongoClient = await MongoClient.connect(
        'mongodb://database:27017'
    );
    const db = mongoClient.db('ivera_db');
    const marvel = new Marvel();
    const models = {
        users: db.collection<IDatabaseUser>('users'),
        authorizations: db.collection<IDatabaseAuthorization>('authorizations'),
        requestLogs: db.collection<IDatabaseRequestLog>('requestLogs')
    };
    const app = express();
    app.use(express.json());
    app.use((req, _, next) => {
        models.requestLogs.insertOne({
            method: req.method,
            pathname: req.url,
            createdAt: new Date()
        });
        next();
    });
    app.use(cors({
        origin: 'http://localhost:8000'
    }));
    app.get('/logs/:authId', async (req,res) => {
        const authorization = await models.authorizations.findOne({
            _id: new ObjectId(req.params.authId)
        });
        if(!authorization || !isIGetRequestLogsQuery(req.query)){
            res.writeHead(400).end();
            return;
        }
        const cursor = models.requestLogs.find().skip(
            parseInt(req.query.offset,10)
        ).limit(parseInt(req.query.limit,10))
        res.send(JSON.stringify(createILogsResult({
            logs: (await cursor.toArray()).map(l => createIRequestLog({
                method: l.method,
                createdAt: l.createdAt.toISOString(),
                pathname: l.pathname
            }))
        })));
    });
    app.post('/auth', async (req, res) => {
        const { body } = req;
        if (!isISignInUser(body)) {
            res.writeHead(400).end();
            return;
        }
        const user = await models.users.findOne({
            username: body.username
        });
        let response: IError | IAuthorization;
        if (!user) {
            response = createIError({
                message: 'no user was found with this username'
            });
        } else if (!(await bcrypt.compare(body.password, user.passwordHash))) {
            response = createIError({
                message: 'incorrect password'
            });
        } else {
            const value = crypto.randomBytes(1024 * 1024 * 1).toString('hex');
            const authId = new ObjectId();
            await models.authorizations.insertOne({
                _id: authId,
                userId: user._id,
                value,
                createdAt: new Date()
            });
            response = createIAuthorization({
                authId: authId.toString(),
                value
            });
        }
        res.send(JSON.stringify(response));
    });
    app.get('/characters/:characterId', async (req, res) => {
        const result = await marvel.sendRequest(
            `/v1/public/characters/${req.params.characterId}`            
        );
        res.send(JSON.stringify(result));
    });
    app.post('/user', async (req, res) => {
        const { body } = req;
        if (!isIRegisterUser(body)) {
            res.writeHead(400).end();
            return;
        }
        const result = await models.users.findOne({
            username: body.username
        });
        let response: IError | IVoid;
        if (result !== null) {
            response = createIError({
                message: 'a user with this username already exists'
            });
        } else if (body.username.length < 4 || body.password.length < 4) {
            response = createIError({
                message: 'both username and password input fields cannot be less than 4'
            });
        } else {
            const salt = await bcrypt.genSalt();
            await models.users.insertOne({
                createdAt: new Date(),
                username: body.username,
                passwordHash: await bcrypt.hash(body.password, salt)
            });
            response = createIVoid();
        }
        res.send(JSON.stringify(response));
    });
    app.get('/characters', async ({query}, res) => {
        console.log(query);
        if(!isIGetCharactersOffsetAndLimitQueryParameters(query)){
            res.writeHead(500).end();
            return;
        }
        const queryMap = new Map<string,string>(Object.entries(
            query
        ) as [string,string][]);
        for(const [k,v] of queryMap){
            switch(k){
                case 'nameStartsWith':
                    if(!v.length){
                        queryMap.delete(k);
                    }
                    break;
            }
        }
        const json = await marvel.sendRequest('/v1/public/characters',queryMap);
        if (!isICharacters(json)) {
            res.writeHead(500).end();
            return;
        }
        res.send(JSON.stringify(json, null, 4));
    });
    app.listen(8040, () => {
        console.log('running!');
    });
})().catch(reason => {
    console.error('fatal failure:\n\n%o', reason);
})
