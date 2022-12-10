import perf_hooks from 'perf_hooks';
import crypto from 'crypto';
import { marvelInfo } from './config';
import fetch from 'node-fetch';

export default class Marvel {
    public constructor(){

    }
    public async sendRequest(pathname: string, query: Map<string,string> = new Map()){
        const ts = perf_hooks.performance.timeOrigin + perf_hooks.performance.now();
        const url = new URL(pathname,marvelInfo.url);
        url.searchParams.set(
            'ts',
            `${ts}`
        );
        /**
         * set hash and apikey
         */
        const hash = crypto.createHash('md5');
        hash.update(`${ts}${marvelInfo.privateKey}${marvelInfo.publicKey}`);
        url.searchParams.set('hash',hash.digest('hex'));
        url.searchParams.set('apikey',marvelInfo.publicKey);

        for(const [k,v] of query){
            url.searchParams.set(k,v);
        }

        return await (await fetch(url.href)).json();
    }
}