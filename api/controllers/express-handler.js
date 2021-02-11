const { errorHandler } = require('./express-error-handler');

function expressHandler({ validator, handler }) {
    return async (request, response) => {
        try {
            const responseJson = await handler(request, response);
            response.json(validator(responseJson));
        } catch (err) {
            console.log('[expressHandler error]:', err);
            errorHandler(err, response);
        }
    };
}

function expressHandlerValue({ validator, handler }) {
    return async (request, response) => {
        try {
            const responseValue = await handler(request, response);
            response.send(validator(responseValue));
        } catch (err) {
            console.log('[expressHandlerValue error]:', err);
            errorHandler(err, response);
        }
    };
}

function expressHandlerRedirect({ validator, handler }) {
    return async (request, response) => {
        try {
            const responseValue = await handler(request, response);
            response.redirect(validator(responseValue).url);
        } catch (err) {
            console.log('[expressHandlerRedirect error]:', err);
            errorHandler(err, response);
        }
    };
}
function expressHandlerRender({ validator, handler }) {
    return async (request, response) => {
        try {
            await handler(request, response);
            // response.redirect(validator(responseValue).url);
        } catch (err) {
            console.log('[expressHandlerRender error]:', err);
            errorHandler(err, response);
        }
    };
}

module.exports = {
    expressHandlerRender, expressHandlerRedirect, expressHandlerValue, expressHandler
}