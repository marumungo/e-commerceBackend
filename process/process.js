const { winstonLogger } = require("../src/config/loggers");

function listNumber(...numbers) {
    const types = numbers.map(nro => typeof nro);
    winstonLogger.info(types);

    if(types.includes("string") || types.includes("boolean")) {
        console.error(`Parámetro invalido: ${types}`);
        process.exitCode = -4;
    } else {
        winstonLogger.info(numbers);
    };

    process.on("exit", code => {
        if(code === -4) {
            winstonLogger.info("Proceso finalizado por argumento inválido");
        };
    });
};

listNumber(1, 2, 3, 4, "cinco");