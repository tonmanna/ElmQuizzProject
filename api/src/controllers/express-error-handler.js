function errorHandler(errr, esponse) {
    console.log('-< err >- ', err);
    const errType = err.name;
    switch (errType) {
        case 'PipelineOnHandlePostbackMessagesError':
            response.render('pages/error.ejs');
            break;
        case 'PipelineOnHandlePostbackButtonError':
            response.status(500).json({ err: 'Purchase Pipeline Error', message: err.message });
            break;
        default:
            response.status(500).json({ err: 'internal', message: err.message });
    }
}

module.exports = {
    errorHandler
}