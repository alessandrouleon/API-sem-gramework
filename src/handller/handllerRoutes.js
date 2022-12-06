const router = require("../routes/routes");

const handler = (request, response) => {
    const method = request.method;
    const url = request.url;

    const urlSplit = url.split("/").filter(Boolean);

    const resultRouter = router.filter((item) => {
        return (
            item.method.toLowerCase() === method.toLowerCase() &&
            item.url.toLowerCase().startsWith(`/${urlSplit[0].toLowerCase()}`)
        )
    });

    const executeRouter = resultRouter.find((item) => {
        const routerUrlSplit = item.url.split("/").filter(Boolean);
        return urlSplit.length === routerUrlSplit.length
    });

    if (!executeRouter) {
        response.statusCode = 404;
        return response.end("Not foud");
    }

    const objParams = {};

    const routerSplitUrl = executeRouter.url.split("/").filter(Boolean);

    routerSplitUrl.forEach((item, index) => {
        if (item.startsWith(":")) {
            const fomatField = item.replace(":", "");
            objParams[fomatField] = urlSplit[index];
        }
    });

    request.on("data", (data => {
        const body = JSON.parse(data);

        request.body = body;
    })).on("end", () => {
        request.params = objParams;
        return executeRouter.controller(request, response);
    });

}

module.exports = handler;