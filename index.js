///      ॐ 卐 ॐ      ॐ 卐 ॐ      ॐ 卐 ॐ      श्री गणेश      ॐ 卐 ॐ      ॐ 卐 ॐ      ॐ 卐 ॐ      ///

import { createServer } from 'http';
import { config } from 'dotenv';
import app from './app.js';
config()


const server = createServer(app)
const port = process.env.APPID || process.env.PORT


try {
    server.listen(port, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Backend running on port ${port}`);
    })
} catch (error) {
    console.log(error)

}

///      ॐ 卐 ॐ      ॐ 卐 ॐ      ॐ 卐 ॐ      श्री गणेश      ॐ 卐 ॐ      ॐ 卐 ॐ      ॐ 卐 ॐ      ///